"use strict";

// ---- defaults (структура должна совпадать с сайтом) ----
const DEFAULTS = {
  hero: {
    quote: "«Тебе нужно больше помощи, чем ты думаешь»",
    image: "/photos/hero-beige-2.jpg",
    // Порядок важен: иконки в Hero сопоставляются по позиции
    // (0 — клиенты/человечек, 1 — часы, 2 — ноутбук/практика).
    stats: [
      { value: "Более 200", label: "клиентов" },
      { value: "Более 15 000", label: "часов сессий" },
      { value: "10 лет", label: "практики" },
    ],
    security: { title: "Безопасность", note: "Гарантирую конфиденциальность" },
    cta: {
      primary: "Записаться на первую встречу",
      secondary: "Как проходит работа",
    },
  },
  about: {
    title:
      "Психолог, EMDR-терапевт, IFS-терапевт, танцевально-двигательный терапевт",
    lead: "Действительный член Национальной ассоциации EMDR.",
    methods: [
      "EMDR-терапия",
      "IFS-подход (работа с частями)",
      "Соматические практики",
      "Проективные методики",
      "Интегральные методики из разных подходов",
    ],
    image: "/photos/about.jpg",
  },
  education: {
    lead:
      "Непрерывный профессиональный путь: в профессии с 17 лет, более 10 лет практики. Дипломы государственного образца — ниже.",
    diplomas: [
      { title: "Высшее психологическое образование", scan: "" },
      { title: "Преподаватель психологии", scan: "" },
      { title: "EMDR-терапевт", scan: "" },
      { title: "IFS-терапевт", scan: "" },
      { title: "Танцевально-двигательный терапевт", scan: "" },
      { title: "Действительный член Национальной ассоциации EMDR", scan: "" },
    ],
    extra: [
      "Регулярное ежегодное повышение квалификации",
      "Публикация в «Psychologies»",
      "Опыт преподавания психологии — 4 года",
    ],
  },
  principles: {
    requests: [
      "Травма любого характера",
      "Травма привязанности",
      "Потеря и горе",
      "Абьюз (моральный / физический / сексуализированный)",
      "ПТСР",
      "РПП",
      "Тема границ",
      "Чувство стыда и вины",
      "Созависимые отношения",
      "Сепарация от родителей",
      "Поиск ресурса",
      "Психосоматика",
      "Принятие тела",
    ],
    withWhom:
      "Со взрослыми людьми в долгосрочной онлайн-терапии. Подробности об условиях и форматах — в разделе «Консультация».",
    image: "/photos/principles.jpg",
  },
  approach: {
    paragraphs: [
      "В работе я опираюсь на запрос: мы вместе держим в фокусе то, ради чего вы пришли, и сверяемся с этим на каждой сессии. Если мы от запроса отходим — я говорю об этом и объясняю, зачем.",
      "Мне важно, чтобы терапия была не только бережной, но и эффективной — поэтому я слежу за исследованиями и опираюсь на доказательные методы. При этом контакт и теплота для меня — высокая ценность: рядом можно быть разным.",
      "Терапия — это не про то, чтобы переделать себя. Это про то, чтобы узнать и понять себя, научиться быть с собой в контакте и жить так, как комфортно именно вам.",
    ],
  },
  consultation: {
    facts: [
      { label: "Формат", value: "Онлайн, из любой точки мира" },
      { label: "Язык", value: "Русскоязычная терапия" },
      { label: "Регулярность", value: "Раз в неделю, в долгосрочной работе" },
      { label: "Стоимость", value: "8 000 ₽ за сессию" },
    ],
    note:
      "Записаться можно в Telegram или WhatsApp — отвечаю лично. Или оставьте заявку через форму на сайте.",
  },
  faq: [
    { q: "Как проходит первая сессия?", a: "Знакомимся, я расспрашиваю о запросе…" },
    { q: "В каком формате мы работаем?", a: "Только онлайн, раз в неделю, долгосрочно." },
    { q: "Сколько стоит сессия?", a: "8 000 ₽ за сессию. Оплата в рублях." },
  ],
  contacts: {
    note: "Написать можно в любой удобный мессенджер — отвечаю лично.",
    docs: [
      { label: "Политика конфиденциальности", url: "" },
      { label: "Согласие на обработку персональных данных", url: "" },
      { label: "Договор оферты", url: "" },
    ],
  },
};

let content = {};

// ---- api ----
async function api(url, opts = {}) {
  const r = await fetch(url, {
    credentials: "same-origin",
    headers: opts.body && !(opts.body instanceof FormData) ? { "Content-Type": "application/json" } : undefined,
    ...opts,
  });
  if (r.status === 401) {
    showLogin();
    throw new Error("unauth");
  }
  return r;
}
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2000);
}
function deepMerge(def, over) {
  if (Array.isArray(def)) return over !== undefined ? over : def;
  if (def && typeof def === "object") {
    const out = {};
    for (const k of Object.keys(def)) out[k] = deepMerge(def[k], over ? over[k] : undefined);
    return out;
  }
  return over !== undefined ? over : def;
}

// ---- auth ----
function showLogin() {
  document.getElementById("login").classList.remove("hidden");
  document.getElementById("panel").classList.add("hidden");
}
function showPanel() {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("panel").classList.remove("hidden");
}
async function doLogin() {
  const login = document.getElementById("l-login").value.trim();
  const password = document.getElementById("l-pass").value;
  const r = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ login, password }),
  });
  if (r.ok) {
    showPanel();
    loadAll();
  } else {
    document.getElementById("l-err").textContent = "Неверный логин или пароль";
  }
}
async function doLogout() {
  await fetch("/api/logout", { method: "POST", credentials: "same-origin" });
  showLogin();
}
async function changePass() {
  const password = document.getElementById("new-pass").value;
  const r = await api("/api/password", { method: "POST", body: JSON.stringify({ password }) });
  if (r.ok) {
    document.getElementById("new-pass").value = "";
    toast("Пароль изменён");
  } else toast("Минимум 6 символов");
}

// ---- tabs ----
function showTab(name) {
  for (const t of document.querySelectorAll(".tab"))
    t.classList.toggle("active", t.dataset.tab === name);
  for (const id of ["content", "media", "bookings", "settings"])
    document.getElementById("tab-" + id).classList.toggle("hidden", id !== name);
  if (name === "media") loadMedia();
  if (name === "bookings") loadBookings();
}

// ---- form builders ----
function h(tag, attrs = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") e.className = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else if (v !== undefined && v !== null) e.setAttribute(k, v);
  }
  for (const kid of kids) if (kid != null) e.append(kid.nodeType ? kid : document.createTextNode(kid));
  return e;
}
function fText(label, obj, key) {
  const inp = h("input", { type: "text", value: obj[key] || "" });
  inp.addEventListener("input", () => (obj[key] = inp.value));
  return h("div", {}, h("label", {}, label), inp);
}
function fArea(label, obj, key) {
  const inp = h("textarea", {}, obj[key] || "");
  inp.addEventListener("input", () => (obj[key] = inp.value));
  return h("div", {}, h("label", {}, label), inp);
}
function fMedia(label, obj, key, accept) {
  const wrap = h("div", {}, h("label", {}, label));
  const prev = h("div");
  function renderPrev() {
    prev.innerHTML = "";
    if (obj[key]) {
      if (obj[key].toLowerCase().endsWith(".pdf"))
        prev.append(h("a", { href: obj[key], target: "_blank", class: "muted" }, "📄 " + obj[key]));
      else prev.append(h("img", { src: obj[key], class: "field-img-prev" }));
    }
  }
  const inp = h("input", { type: "text", value: obj[key] || "", placeholder: "URL или загрузите файл" });
  inp.addEventListener("input", () => { obj[key] = inp.value; renderPrev(); });
  const file = h("input", { type: "file", accept: accept, class: "hidden" });
  file.addEventListener("change", async () => {
    if (!file.files[0]) return;
    const fd = new FormData(); fd.append("file", file.files[0]);
    const r = await api("/api/upload", { method: "POST", body: fd });
    if (r.ok) { const d = await r.json(); obj[key] = d.url; inp.value = d.url; renderPrev(); toast("Файл загружен"); }
    else toast("Не удалось загрузить");
  });
  const btn = h("button", { class: "btn-ghost btn-sm", type: "button", onclick: () => file.click() }, "Загрузить файл");
  renderPrev();
  wrap.append(inp, h("div", { class: "row", style: "margin-top:6px" }, btn, file), prev);
  return wrap;
}
function listText(label, arr) {
  const box = h("div", {}, h("label", {}, label));
  const list = h("div");
  function render() {
    list.innerHTML = "";
    arr.forEach((val, i) => {
      const inp = h("input", { type: "text", value: val });
      inp.addEventListener("input", () => (arr[i] = inp.value));
      const del = h("button", { class: "btn-ghost btn-sm", type: "button", onclick: () => { arr.splice(i, 1); render(); } }, "✕");
      list.append(h("div", { class: "row", style: "margin-bottom:6px" }, h("div", { style: "flex:1" }, inp), del));
    });
  }
  render();
  const add = h("button", { class: "btn-ghost btn-sm", type: "button", onclick: () => { arr.push(""); render(); } }, "+ добавить");
  box.append(list, add);
  return box;
}
function listObj(label, arr, fields, factory) {
  const box = h("div", {}, h("label", {}, label));
  const list = h("div");
  function render() {
    list.innerHTML = "";
    arr.forEach((item, i) => {
      const card = h("div", { class: "item" });
      for (const f of fields) {
        if (f.type === "image") card.append(fMedia(f.label, item, f.key, "image/*"));
        else if (f.type === "pdf") card.append(fMedia(f.label, item, f.key, "application/pdf"));
        else if (f.type === "area") card.append(fArea(f.label, item, f.key));
        else card.append(fText(f.label, item, f.key));
      }
      card.append(h("button", { class: "btn-ghost btn-sm", type: "button", style: "margin-top:8px", onclick: () => { arr.splice(i, 1); render(); } }, "Удалить"));
      list.append(card);
    });
  }
  render();
  const add = h("button", { class: "btn-ghost btn-sm", type: "button", onclick: () => { arr.push(factory()); render(); } }, "+ добавить");
  box.append(list, add);
  return box;
}
function section(title, ...nodes) {
  return h("div", { class: "card" }, h("h3", {}, title), ...nodes);
}

function renderContent() {
  const root = document.getElementById("tab-content");
  root.innerHTML = "";
  const c = content;
  root.append(
    section("Шапка", fArea("Цитата", c.hero, "quote"),
      listObj("Цифры (число + подпись)", c.hero.stats, [{ key: "value", label: "Число" }, { key: "label", label: "Подпись" }], () => ({ value: "", label: "" })),
      fArea("Бейдж «безопасность» — заголовок", c.hero.security, "title"),
      fArea("Бейдж «безопасность» — подпись", c.hero.security, "note"),
      fArea("Кнопка (текст)", c.hero.cta, "primary"),
      fArea("Ссылка рядом (текст)", c.hero.cta, "secondary"),
      fMedia("Фото шапки", c.hero, "image", "image/*")),
    section("Обо мне", fArea("Заголовок", c.about, "title"), fArea("Подпись", c.about, "lead"), listText("Методы", c.about.methods), fMedia("Фото в арке", c.about, "image", "image/*")),
    section("Образование", fArea("Вступление", c.education, "lead"),
      listObj("Дипломы", c.education.diplomas, [{ key: "title", label: "Название" }, { key: "scan", label: "Скан", type: "image" }], () => ({ title: "", scan: "" })),
      listText("Доп. строки", c.education.extra)),
    section("Принципы работы", listText("Запросы (с чем работаю)", c.principles.requests), fArea("С кем я работаю", c.principles, "withWhom"), fMedia("Фото (внизу секции, дуга сверху)", c.principles, "image", "image/*")),
    section("О подходе", listText("Абзацы", c.approach.paragraphs)),
    section("Консультация",
      listObj("Факты", c.consultation.facts, [{ key: "label", label: "Заголовок" }, { key: "value", label: "Значение" }], () => ({ label: "", value: "" })),
      fArea("Примечание", c.consultation, "note")),
    section("FAQ", listObj("Вопросы", c.faq, [{ key: "q", label: "Вопрос" }, { key: "a", label: "Ответ", type: "area" }], () => ({ q: "", a: "" }))),
    section("Контакты", fArea("Текст", c.contacts, "note"),
      listObj("Документы (PDF)", c.contacts.docs, [{ key: "label", label: "Название" }, { key: "url", label: "Файл PDF", type: "pdf" }], () => ({ label: "", url: "" }))),
    h("div", { class: "save-bar" }, h("button", { class: "btn", onclick: saveContent }, "Сохранить изменения"), h("span", { class: "muted" }, "правки появятся на сайте сразу"))
  );
}
async function saveContent() {
  const r = await api("/api/content", { method: "PUT", body: JSON.stringify(content) });
  toast(r.ok ? "Сохранено" : "Ошибка сохранения");
}

// ---- media ----
async function loadMedia() {
  const root = document.getElementById("tab-media");
  root.innerHTML = "";
  const file = h("input", { type: "file", accept: "image/*,application/pdf", class: "hidden" });
  file.addEventListener("change", async () => {
    if (!file.files[0]) return;
    const fd = new FormData(); fd.append("file", file.files[0]);
    const r = await api("/api/upload", { method: "POST", body: fd });
    toast(r.ok ? "Загружено" : "Ошибка"); loadMedia();
  });
  root.append(section("Загрузить файл", h("div", { class: "row" }, h("button", { class: "btn", type: "button", onclick: () => file.click() }, "Выбрать файл"), file, h("span", { class: "muted" }, "jpg, png, webp, pdf — до 20 МБ"))));
  const r = await api("/api/media");
  const items = await r.json();
  const grid = h("div", { class: "media-grid" });
  for (const m of items) {
    const card = h("div", { class: "media-card" });
    card.append(m.isPdf ? h("div", { class: "pdfbox" }, "📄") : h("img", { src: m.url }));
    const copy = h("button", { class: "btn-ghost btn-sm", type: "button", onclick: () => { navigator.clipboard.writeText(m.url); toast("URL скопирован"); } }, "URL");
    const del = h("button", { class: "btn-ghost btn-sm", type: "button", onclick: async () => { await api("/api/media/" + encodeURIComponent(m.name), { method: "DELETE" }); loadMedia(); } }, "Удалить");
    card.append(h("div", { style: "margin:6px 0;word-break:break-all" }, m.name), h("div", { class: "row" }, copy, del));
    grid.append(card);
  }
  root.append(section("Файлы", grid));
}

// ---- bookings ----
async function loadBookings() {
  const root = document.getElementById("tab-bookings");
  root.innerHTML = "";
  const r = await api("/api/bookings");
  const list = await r.json();
  const head = h("div", { class: "row", style: "justify-content:space-between" },
    h("h3", { style: "margin:0" }, "Заявки (" + list.length + ")"),
    h("a", { class: "btn-ghost btn-sm", href: "/api/bookings.csv" }, "Скачать CSV"));
  const table = h("table");
  table.append(h("tr", {}, h("th", {}, "Дата"), h("th", {}, "Имя"), h("th", {}, "Контакт"), h("th", {}, "Запрос"), h("th", {}, "")));
  for (const b of list) {
    const mark = h("button", { class: "btn-ghost btn-sm", type: "button", onclick: async () => { await api("/api/bookings/" + b.id, { method: "PATCH", body: JSON.stringify({ handled: !b.handled }) }); loadBookings(); } }, b.handled ? "✓ обработана" : "отметить");
    const d = new Date(b.createdAt).toLocaleString("ru-RU");
    const tr = h("tr", { style: b.handled ? "opacity:.55" : "" }, h("td", {}, d), h("td", {}, b.name), h("td", {}, b.contact), h("td", {}, b.message || "—"), h("td", {}, mark));
    table.append(tr);
  }
  root.append(section("", head, list.length ? table : h("p", { class: "muted" }, "Пока нет заявок.")));
}

// ---- init ----
async function loadAll() {
  const r = await api("/api/content");
  content = deepMerge(DEFAULTS, await r.json());
  renderContent();
}
(async function init() {
  try {
    const r = await fetch("/api/me", { credentials: "same-origin" });
    if (r.ok) { showPanel(); loadAll(); } else showLogin();
  } catch { showLogin(); }
})();
