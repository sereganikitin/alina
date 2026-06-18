"use strict";
/**
 * Админка лендинга Алины.
 * Отдаёт /admin (UI) и /api (контент, медиа, заявки).
 * Данные:
 *   DATA_DIR/config.json      — учётка админа (логин + bcrypt-хэш) и jwt-секрет
 *   DATA_DIR/bookings.json    — заявки с формы
 *   SITE_DIR/content.json     — редактируемые тексты (отдаётся статикой публичному сайту)
 *   SITE_DIR/media/           — загруженные фото и PDF (отдаётся статикой)
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");

const PORT = process.env.PORT || 3010;
// Данные живут отдельно от статики сайта, чтобы деплой их не затирал.
// nginx отдаёт content.json и /media/ из DATA_DIR через alias.
const DATA_DIR = process.env.DATA_DIR || "/var/www/alina-data";
const MEDIA_DIR = path.join(DATA_DIR, "media");
const CONTENT_PATH = path.join(DATA_DIR, "content.json");
const CONFIG_PATH = path.join(DATA_DIR, "config.json");
const BOOKINGS_PATH = path.join(DATA_DIR, "bookings.json");

for (const d of [DATA_DIR, MEDIA_DIR]) fs.mkdirSync(d, { recursive: true });

// --- конфиг/учётка ---
function loadConfig() {
  if (fs.existsSync(CONFIG_PATH)) return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  const login = process.env.ADMIN_LOGIN || "alina";
  const password = process.env.ADMIN_PASSWORD || "changeme";
  const cfg = {
    login,
    passwordHash: bcrypt.hashSync(password, 10),
    jwtSecret: crypto.randomBytes(32).toString("hex"),
  };
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2));
  console.log("Создан config.json. Логин:", login);
  return cfg;
}
let config = loadConfig();

function readJson(p, fallback) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
}
function writeJson(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}

// --- приложение ---
const app = express();
app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// авторизация
function auth(req, res, next) {
  const token = req.cookies && req.cookies.token;
  if (!token) return res.status(401).json({ error: "Не авторизовано" });
  try {
    req.user = jwt.verify(token, config.jwtSecret);
    next();
  } catch {
    res.status(401).json({ error: "Сессия истекла" });
  }
}

app.post("/api/login", (req, res) => {
  const { login, password } = req.body || {};
  if (
    login === config.login &&
    password &&
    bcrypt.compareSync(password, config.passwordHash)
  ) {
    const token = jwt.sign({ login }, config.jwtSecret, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 7 * 24 * 3600 * 1000,
      path: "/",
    });
    return res.json({ ok: true });
  }
  res.status(401).json({ error: "Неверный логин или пароль" });
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.json({ ok: true });
});

app.get("/api/me", auth, (req, res) => res.json({ login: req.user.login }));

app.post("/api/password", auth, (req, res) => {
  const { password } = req.body || {};
  if (!password || password.length < 6)
    return res.status(400).json({ error: "Минимум 6 символов" });
  config.passwordHash = bcrypt.hashSync(password, 10);
  writeJson(CONFIG_PATH, config);
  res.json({ ok: true });
});

// контент
app.get("/api/content", (req, res) => res.json(readJson(CONTENT_PATH, {})));
app.put("/api/content", auth, (req, res) => {
  if (!req.body || typeof req.body !== "object")
    return res.status(400).json({ error: "Некорректные данные" });
  writeJson(CONTENT_PATH, req.body);
  res.json({ ok: true });
});

// медиа: загрузка
const allowed = new Set([".jpg", ".jpeg", ".png", ".webp", ".pdf"]);
const storage = multer.diskStorage({
  destination: MEDIA_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path
      .basename(file.originalname, ext)
      .replace(/[^a-z0-9а-яё_-]+/gi, "-")
      .slice(0, 40);
    const stamp = crypto.randomBytes(4).toString("hex");
    cb(null, `${base}-${stamp}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    cb(null, allowed.has(path.extname(file.originalname).toLowerCase())),
});

app.post("/api/upload", auth, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Файл не принят (jpg/png/webp/pdf, до 20 МБ)" });
  res.json({ url: `/media/${req.file.filename}`, name: req.file.originalname });
});

app.get("/api/media", auth, (req, res) => {
  const files = fs
    .readdirSync(MEDIA_DIR)
    .filter((f) => allowed.has(path.extname(f).toLowerCase()))
    .map((f) => ({
      url: `/media/${f}`,
      name: f,
      isPdf: f.toLowerCase().endsWith(".pdf"),
      mtime: fs.statSync(path.join(MEDIA_DIR, f)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);
  res.json(files);
});

app.delete("/api/media/:name", auth, (req, res) => {
  const name = path.basename(req.params.name);
  const p = path.join(MEDIA_DIR, name);
  if (fs.existsSync(p)) fs.unlinkSync(p);
  res.json({ ok: true });
});

// заявки
app.post("/api/bookings", (req, res) => {
  const { name, contact, message } = req.body || {};
  if (!name || !contact)
    return res.status(400).json({ error: "Укажите имя и контакт" });
  const list = readJson(BOOKINGS_PATH, []);
  list.push({
    id: crypto.randomBytes(6).toString("hex"),
    name: String(name).slice(0, 200),
    contact: String(contact).slice(0, 200),
    message: String(message || "").slice(0, 2000),
    createdAt: new Date().toISOString(),
    handled: false,
  });
  writeJson(BOOKINGS_PATH, list);
  res.json({ ok: true });
});

app.get("/api/bookings", auth, (req, res) =>
  res.json(readJson(BOOKINGS_PATH, []).slice().reverse())
);

app.patch("/api/bookings/:id", auth, (req, res) => {
  const list = readJson(BOOKINGS_PATH, []);
  const b = list.find((x) => x.id === req.params.id);
  if (b) {
    if (typeof req.body.handled === "boolean") b.handled = req.body.handled;
    writeJson(BOOKINGS_PATH, list);
  }
  res.json({ ok: true });
});

app.get("/api/bookings.csv", auth, (req, res) => {
  const list = readJson(BOOKINGS_PATH, []);
  const esc = (s) => `"${String(s || "").replace(/"/g, '""')}"`;
  const rows = [["Дата", "Имя", "Контакт", "Запрос", "Обработано"]];
  for (const b of list)
    rows.push([b.createdAt, b.name, b.contact, b.message, b.handled ? "да" : "нет"]);
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=bookings.csv");
  res.send("﻿" + rows.map((r) => r.map(esc).join(",")).join("\n"));
});

// статика админ-UI
app.use("/admin", express.static(path.join(__dirname, "public")));
app.get(/^\/admin(\/.*)?$/, (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.listen(PORT, "127.0.0.1", () =>
  console.log(`alina-admin на http://127.0.0.1:${PORT}`)
);
