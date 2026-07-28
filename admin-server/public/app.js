"use strict";

// ---- defaults (структура должна совпадать с сайтом) ----
const DEFAULTS = {
  hero: {
    quote: "«Тебе нужно больше помощи, чем ты думаешь»",
    image: "/photos/hero-beige-2.jpg",
    // Порядок важен: иконки в Hero сопоставляются по позиции
    // (0 — клиенты/человечек, 1 — часы, 2 — ноутбук/практика).
    stats: [
      { value: "10 лет", label: "опыта" },
      { value: "Более 15 000", label: "часов сессий" },
      { value: "Более 200", label: "клиентов" },
    ],
    security: { title: "Этика", note: "конфиденциальность, проф. гигиена" },
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
    links: [
      { label: "EMDR Russia", url: "" },
      { label: "IFS Russia", url: "" },
      { label: "EMDR Europe", url: "" },
    ],
  },
  education: {
    lead:
      "Непрерывный профессиональный путь: в профессии с 17 лет, более 10 лет практики. Дипломы государственного образца — ниже.",
    diplomas: [
      { title: "Высшее психологическое образование", placeholder: "", scan: "" },
      { title: "Преподаватель психологии", placeholder: "", scan: "" },
      { title: "EMDR-терапевт", placeholder: "", scan: "" },
      { title: "IFS-терапевт", placeholder: "", scan: "" },
      { title: "Танцевально-двигательный терапевт", placeholder: "", scan: "" },
      { title: "Действительный член Национальной ассоциации EMDR", placeholder: "", scan: "" },
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
    circles: ["Круг 1", "Круг 2", "Круг 3"],
    side: {
      title: "Бережно и по делу",
      items: [
        {
          title: "Индивидуальный подход и работа в интегративном ключе",
          text: "Я совмещаю разные методики (инструментарий) в зависимости от запроса клиента.",
        },
        {
          title: "Безопасность и бережность",
          text: "Клиент определяет границы пространства, то есть имеет право на «нет», «стоп», на любые чувства и проявления себя, возникающие в процессе. Кроме насилия над собой и терапевтом.",
        },
        {
          title: "Конфиденциальность",
          text: "Кроме случаев намерения или причинения вреда себе, другим людям или ситуаций нарушения закона.",
        },
        {
          title: "Живость контакта",
          text: "Я не дистантный и не «холодный» терапевт. Проявляю эмоции и эмпатично присутствую на сессии.",
        },
      ],
    },
  },
  approach: {
    intro: "",
    image: "/photos/hero-beige-3.jpg",
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
  funFacts: {
    image: "",
    title: "Интересные факты обо мне",
    text: "<ul><li>У меня СДВГ и РАС</li><li>Я гедонист</li><li>Люблю путешествовать, много живу в разных странах</li><li>Говорю на нескольких языках</li><li>У меня дипломная работа по буддизму и этнопсихологии</li><li>Люблю людей, и мне кажется, что мир интересный.</li></ul>",
  },
  blog: {
    posts: [],
  },
  faqImage: "",
  faq: [
    { q: "Как проходит первая сессия?", a: "Знакомимся, я расспрашиваю о запросе…" },
    { q: "В каком формате мы работаем?", a: "Только онлайн, раз в неделю, долгосрочно." },
    { q: "Сколько стоит сессия?", a: "8 000 ₽ за сессию. Оплата в рублях." },
  ],
  contacts: {
    note: "Написать можно в любой удобный мессенджер — отвечаю лично.",
    telegramUrl: "",
    whatsappUrl: "",
    telegramChannelUrl: "",
    instagramUrl: "",
    emdrUrl: "",
    ifsUrl: "",
    emdrEuropeUrl: "",
  },
  legal: {
    privacyBody:
      "<p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта, которым управляет [ФИО/статус — самозанятый или ИП, ИНН] (далее — «Оператор»).</p><p>Используя сайт и оставляя заявку через форму записи, пользователь подтверждает согласие с условиями настоящей Политики.</p><p><b>1. Какие данные собираются</b></p><p>При заполнении формы записи Оператор получает: имя, контакт для связи (телефон, мессенджер или email), а также текст сообщения, если пользователь его оставил. Иные данные (IP-адрес, сведения о браузере и устройстве, файлы cookie) могут собираться автоматически для работы сайта и анализа посещаемости.</p><p><b>2. Файлы cookie</b></p><p>Сайт использует файлы cookie — небольшие текстовые файлы, которые сохраняются в браузере и позволяют сайту работать корректно. Продолжая пользоваться сайтом, пользователь соглашается на использование cookie. Cookie можно отключить в настройках браузера — часть функций сайта при этом может работать некорректно.</p><p><b>3. Цели обработки персональных данных</b></p><ul><li>связь с пользователем по вопросу записи на консультацию;</li><li>оказание психологических консультаций;</li><li>информирование о статусе заявки.</li></ul><p><b>4. Правовые основания обработки</b></p><p>Обработка персональных данных осуществляется на основании согласия субъекта персональных данных в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».</p><p><b>5. Хранение и защита данных</b></p><p>Оператор принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного доступа, уничтожения, изменения, блокирования, копирования и распространения. Данные хранятся не дольше, чем это необходимо для целей обработки, либо до отзыва согласия.</p><p><b>6. Передача данных третьим лицам</b></p><p>Оператор не передаёт персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ, либо когда это необходимо для оказания услуг (например, использование сервиса видеосвязи для проведения консультации).</p><p><b>7. Права субъекта персональных данных</b></p><p>Пользователь вправе в любой момент запросить информацию о своих персональных данных, потребовать их уточнения, блокирования или уничтожения, а также отозвать согласие на обработку — любым способом связи, указанным в разделе «Контакты».</p><p><b>8. Изменение Политики</b></p><p>Оператор вправе вносить изменения в настоящую Политику. Актуальная версия всегда доступна на этой странице.</p>",
    personalDataBody:
      "<p>Настоящим я, оставляя заявку через форму на сайте, даю своё согласие [ФИО/статус Оператора, ИНН] (далее — «Оператор») на обработку моих персональных данных на следующих условиях.</p><p><b>1. Перечень персональных данных</b></p><p>Согласие даётся на обработку следующих данных: имя, контактные данные (телефон, мессенджер и/или email), содержание сообщения, оставленного в форме записи.</p><p><b>2. Цели обработки</b></p><ul><li>связь с субъектом персональных данных для уточнения деталей записи;</li><li>организация и проведение консультаций;</li><li>направление информационных сообщений, связанных с оказанием услуг.</li></ul><p><b>3. Действия с персональными данными</b></p><p>Согласие даётся на сбор, запись, систематизацию, накопление, хранение, уточнение, использование, передачу (предоставление, доступ), обезличивание, блокирование, удаление и уничтожение персональных данных — с использованием средств автоматизации и без их использования.</p><p><b>4. Срок действия согласия</b></p><p>Согласие действует бессрочно с момента предоставления и может быть отозвано в любой момент путём уведомления Оператора. В этом случае обработка персональных данных прекращается, а данные подлежат уничтожению, если иное не предусмотрено законодательством РФ.</p><p><b>5. Правовое основание</b></p><p>Обработка персональных данных осуществляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».</p><p>С условиями обработки персональных данных согласен(на).</p>",
    offerBody:
      "<p>Настоящий документ является публичной офертой [ФИО/статус — самозанятый или ИП, ИНН] (далее — «Исполнитель») и содержит существенные условия оказания услуг психологического консультирования (далее — «Услуги»).</p><p><b>1. Общие положения</b></p><p>В соответствии со статьёй 437 Гражданского кодекса РФ данный документ является официальным предложением (публичной офертой) Исполнителя. Акцептом (полным и безоговорочным принятием условий) настоящей оферты считается оставление заявки через форму записи на сайте и/или оплата Услуг.</p><p><b>2. Предмет договора</b></p><p>Исполнитель оказывает Заказчику услуги психологического консультирования в формате онлайн-встреч (видеосвязь). Формат, длительность и периодичность встреч указаны в разделе «Консультация» на сайте.</p><p><b>3. Порядок записи и оплаты</b></p><p>Запись на консультацию осуществляется через форму на сайте либо через мессенджеры, указанные в разделе «Контакты». Стоимость услуг указана в разделе «Консультация». Оплата производится в порядке, согласованном с Исполнителем перед проведением сессии.</p><p><b>4. Перенос и отмена сессии</b></p><p>Условия переноса и отмены встречи, включая сроки предупреждения без потери оплаты, указаны в разделе «Вопросы и ответы» на сайте и являются неотъемлемой частью настоящей оферты.</p><p><b>5. Права и обязанности сторон</b></p><p>Исполнитель обязуется оказывать Услуги профессионально и добросовестно, соблюдать конфиденциальность в соответствии с этическими принципами психологического консультирования и Политикой конфиденциальности сайта. Заказчик обязуется предоставлять достоверную информацию и своевременно сообщать об отмене или переносе встречи.</p><p><b>6. Ответственность сторон</b></p><p>Психологическое консультирование не является медицинской услугой и не заменяет медицинскую или психиатрическую помощь. Исполнитель не гарантирует конкретный результат консультирования, поскольку результат зависит от совместной работы обеих сторон.</p><p><b>7. Конфиденциальность</b></p><p>Содержание консультаций конфиденциально и не разглашается третьим лицам, за исключением случаев, предусмотренных законодательством РФ (например, угроза жизни и здоровью клиента или третьих лиц).</p><p><b>8. Срок действия и изменение оферты</b></p><p>Оферта действует бессрочно. Исполнитель вправе вносить изменения в условия, актуальная редакция всегда размещена на этой странице.</p><p><b>9. Реквизиты Исполнителя</b></p><p>[ФИО, статус, ИНН, ОГРНИП (если применимо), контактные данные].</p>",
    cookieText:
      "Мы используем файлы cookie, чтобы сайт работал корректно. Продолжая пользоваться сайтом, вы соглашаетесь с этим и с политикой конфиденциальности.",
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
  for (const id of ["content", "blog", "media", "bookings", "settings"])
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

// ---- rich text (жирный/курсив/подчёркнутый + абзацы) ----
// Тот же формат, что понимает richTextToHtml на сайте: если в строке уже
// есть теги — это HTML из этого редактора; если нет — старый простой текст
// с абзацами через пустую строку.
const RICH_ALLOWED_TAGS = new Set(["p", "b", "strong", "i", "em", "u", "br", "div", "ul", "ol", "li"]);
function escapeHtmlText(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function sanitizeRichHtml(htmlStr) {
  let out = htmlStr.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "");
  out = out.replace(/<!--[\s\S]*?-->/g, "");
  out = out.replace(/<\/?([a-zA-Z0-9]+)[^>]*>/g, (match, tag) => {
    const t = String(tag).toLowerCase();
    if (!RICH_ALLOWED_TAGS.has(t)) return "";
    return match.startsWith("</") ? `</${t}>` : `<${t}>`;
  });
  return out;
}
function legacyToRichHtml(raw) {
  if (!raw) return "";
  if (/<[a-z][\s\S]*>/i.test(raw)) return sanitizeRichHtml(raw);
  return raw
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtmlText(p).replace(/\n/g, "<br>")}</p>`)
    .join("");
}
function fRich(label, obj, key) {
  const toolbar = h("div", { class: "rich-toolbar" });
  const editor = h("div", { class: "rich-editor", contenteditable: "true" });
  editor.innerHTML = legacyToRichHtml(obj[key] || "");
  obj[key] = editor.innerHTML;
  function cmdBtn(cmd, cls, label2) {
    return h("button", {
      type: "button",
      class: cls,
      onmousedown: (e) => e.preventDefault(),
      onclick: () => {
        document.execCommand(cmd, false, null);
        editor.focus();
        obj[key] = sanitizeRichHtml(editor.innerHTML);
      },
    }, label2);
  }
  toolbar.append(
    cmdBtn("bold", "b", "Ж"),
    cmdBtn("italic", "i", "К"),
    cmdBtn("underline", "u", "Ч"),
    cmdBtn("insertUnorderedList", "list", "☰")
  );
  editor.addEventListener("focus", () => document.execCommand("defaultParagraphSeparator", false, "p"));
  editor.addEventListener("input", () => { obj[key] = sanitizeRichHtml(editor.innerHTML); });
  editor.addEventListener("paste", (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text/plain");
    document.execCommand("insertText", false, text);
  });
  return h("div", {}, h("label", {}, label), toolbar, editor);
}
function listRich(label, arr) {
  const box = h("div", {}, h("label", {}, label));
  const list = h("div");
  function render() {
    list.innerHTML = "";
    arr.forEach((val, i) => {
      const item = { text: val };
      const field = fRich("", item, "text");
      const del = h("button", { class: "btn-ghost btn-sm", type: "button", style: "margin-top:6px", onclick: () => { arr.splice(i, 1); render(); } }, "Удалить");
      const sync = () => { arr[i] = item.text; };
      const ed = field.querySelector(".rich-editor");
      ed.addEventListener("input", sync);
      ed.addEventListener("blur", sync);
      const handle = dragHandle();
      const row = h("div", { class: "item drag-row" }, h("div", { class: "row", style: "justify-content:space-between;align-items:center" }, handle, reorderControls(i, arr, render)), field, del);
      attachDrag(row, handle, i, arr, render);
      list.append(row);
    });
  }
  render();
  const add = h("button", { class: "btn-ghost btn-sm", type: "button", onclick: () => { arr.push(""); render(); } }, "+ добавить");
  box.append(list, add);
  return box;
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
// ---- перестановка пунктов в списках (перетаскиванием за ручку "⠿" + запасные кнопки ↑/↓) ----
// Ручка — единственный draggable-элемент внутри карточки/строки: если сделать draggable
// всю карточку, это ломает выделение текста мышью в текстовых полях/rich-редакторе
// (браузер начинает нативный drag вместо выделения). Ручка запускает drag, а картинкой
// перетаскивания показываем всю карточку (setDragImage), чтобы визуально двигалась она целиком.
function dragHandle() {
  return h("span", { class: "drag-handle", title: "Перетащите, чтобы изменить порядок" }, "⠿");
}
function reorderControls(i, arr, render) {
  const up = h("button", {
    class: "btn-ghost btn-sm", type: "button", title: "Переместить вверх",
    disabled: i === 0 ? "disabled" : undefined,
    onclick: () => { if (i > 0) { [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; render(); } },
  }, "↑");
  const down = h("button", {
    class: "btn-ghost btn-sm", type: "button", title: "Переместить вниз",
    disabled: i === arr.length - 1 ? "disabled" : undefined,
    onclick: () => { if (i < arr.length - 1) { [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]]; render(); } },
  }, "↓");
  return h("div", { class: "reorder-btns" }, up, down);
}
function attachDrag(row, handle, i, arr, render) {
  handle.draggable = true;
  handle.addEventListener("dragstart", (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(i));
    try { e.dataTransfer.setDragImage(row, 16, 16); } catch {}
    row.classList.add("dragging");
  });
  handle.addEventListener("dragend", () => row.classList.remove("dragging"));
  row.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    row.classList.add("drag-over");
  });
  row.addEventListener("dragleave", () => row.classList.remove("drag-over"));
  row.addEventListener("drop", (e) => {
    e.preventDefault();
    row.classList.remove("drag-over");
    const from = Number(e.dataTransfer.getData("text/plain"));
    if (Number.isNaN(from) || from === i) return;
    const [moved] = arr.splice(from, 1);
    arr.splice(i, 0, moved);
    render();
  });
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
      const handle = dragHandle();
      const row = h("div", { class: "row drag-row", style: "margin-bottom:6px" }, handle, h("div", { style: "flex:1" }, inp), reorderControls(i, arr, render), del);
      attachDrag(row, handle, i, arr, render);
      list.append(row);
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
      const card = h("div", { class: "item drag-row" });
      const handle = dragHandle();
      card.append(h("div", { class: "row", style: "justify-content:space-between;align-items:center" }, handle, reorderControls(i, arr, render)));
      for (const f of fields) {
        if (f.type === "image") card.append(fMedia(f.label, item, f.key, "image/*"));
        else if (f.type === "pdf") card.append(fMedia(f.label, item, f.key, "application/pdf"));
        else if (f.type === "area") card.append(fArea(f.label, item, f.key));
        else if (f.type === "rich") card.append(fRich(f.label, item, f.key));
        else if (f.type === "scan") card.append(fMedia(f.label, item, f.key, "image/*,application/pdf")); // ← добавить эту строку
        else card.append(fText(f.label, item, f.key));
      }
      card.append(h("button", { class: "btn-ghost btn-sm", type: "button", style: "margin-top:8px", onclick: () => { arr.splice(i, 1); render(); } }, "Удалить"));
      attachDrag(card, handle, i, arr, render);
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
    section("Обо мне", fArea("Заголовок", c.about, "title"), fRich("Подпись", c.about, "lead"), listText("Методы", c.about.methods), fMedia("Фото в арке", c.about, "image", "image/*"),
      listObj("Кнопки-ссылки (ассоциации)", c.about.links, [{ key: "label", label: "Текст на кнопке" }, { key: "url", label: "Ссылка" }], () => ({ label: "", url: "" }))),
    section("Образование", fRich("Вступление", c.education, "lead"),
      listObj("Дипломы", c.education.diplomas, [{ key: "title", label: "Название" }, { key: "placeholder", label: "Заглушка (превью на карточке)", type: "image" }, { key: "scan", label: "Скан (открывается в попапе, можно скачать)", type: "scan" }], () => ({ title: "", placeholder: "", scan: "" })),
      listText("Доп. строки", c.education.extra)),
    section("Принципы работы", listText("Запросы (с чем работаю)", c.principles.requests), fRich("С кем я работаю", c.principles, "withWhom"), fMedia("Фото (дуга сверху)", c.principles, "image", "image/*"),
      listText("Подписи в кругах под фото (используются первые 3)", c.principles.circles),
      fArea("Блок у фото — заголовок", c.principles.side, "title"),
      listObj("Блок у фото — пункты", c.principles.side.items, [{ key: "title", label: "Заголовок пункта" }, { key: "text", label: "Текст пункта", type: "rich" }], () => ({ title: "", text: "" }))),
    section("О подходе", fRich("Вводный текст (у первой буквы — крупная буквица)", c.approach, "intro"), fMedia("Фото справа от текста", c.approach, "image", "image/*"), listRich("Абзацы", c.approach.paragraphs)),
    section("Консультация",
      listObj("Факты", c.consultation.facts, [{ key: "label", label: "Заголовок" }, { key: "value", label: "Значение" }], () => ({ label: "", value: "" })),
      fRich("Примечание", c.consultation, "note")),
    section("Интересные факты обо мне (перед FAQ)",
      fMedia("Фото", c.funFacts, "image", "image/*"),
      fText("Заголовок", c.funFacts, "title"),
      fRich("Текст", c.funFacts, "text")),
    section("FAQ", fMedia("Фото справа от блока FAQ (необязательно)", c, "faqImage", "image/*"),
      listObj("Вопросы", c.faq, [{ key: "q", label: "Вопрос" }, { key: "a", label: "Ответ", type: "rich" }], () => ({ q: "", a: "" }))),
    section("Контакты", fRich("Текст", c.contacts, "note"),
      fText("Ссылка Telegram (кнопка написать)", c.contacts, "telegramUrl"),
      fText("Ссылка WhatsApp (кнопка написать)", c.contacts, "whatsappUrl"),
      fText("Ссылка на Telegram-канал", c.contacts, "telegramChannelUrl"),
      fText("Ссылка на Instagram", c.contacts, "instagramUrl"),
      fText("Ссылка EMDR Russia (значок в футере)", c.contacts, "emdrUrl"),
      fText("Ссылка IFS Russia (значок в футере)", c.contacts, "ifsUrl"),
      fText("Ссылка EMDR Europe (значок в футере)", c.contacts, "emdrEuropeUrl")),
    section("Юридические страницы (/privacy, /personal-data, /offer + баннер cookie)",
      fRich("Политика конфиденциальности — текст страницы", c.legal, "privacyBody"),
      fRich("Согласие на обработку персональных данных — текст страницы", c.legal, "personalDataBody"),
      fRich("Договор оферты — текст страницы", c.legal, "offerBody"),
      fArea("Текст баннера cookie (внизу экрана)", c.legal, "cookieText")),
    h("div", { class: "save-bar" }, h("button", { class: "btn", onclick: saveContent }, "Сохранить изменения"), h("span", { class: "muted" }, "правки появятся на сайте сразу"))
  );
}
async function saveContent() {
  const r = await api("/api/content", { method: "PUT", body: JSON.stringify(content) });
  toast(r.ok ? "Сохранено" : "Ошибка сохранения");
}

// Блог — на отдельной вкладке (не в общем списке текстов), т.к. статей
// со временем станет много и общая вкладка «Тексты» стала бы слишком
// длинной. Сохраняет тот же общий объект content, той же saveContent().
function renderBlog() {
  const root = document.getElementById("tab-blog");
  root.innerHTML = "";
  const c = content;
  root.append(
    section("Статьи блога",
      listObj("Статьи", c.blog.posts,
        [
          { key: "title", label: "Заголовок" },
          { key: "slug", label: "URL статьи (латиницей, без пробелов, напр. trevoga)" },
          { key: "date", label: "Дата публикации" },
          { key: "cover", label: "Обложка", type: "image" },
          { key: "excerpt", label: "Краткое описание (для превью)", type: "area" },
          { key: "body", label: "Текст статьи", type: "rich" },
        ],
        () => ({ title: "", slug: "", date: "", cover: "", excerpt: "", body: "" })
      )),
    h("div", { class: "save-bar" }, h("button", { class: "btn", onclick: saveContent }, "Сохранить изменения"), h("span", { class: "muted" }, "правки появятся на сайте сразу"))
  );
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
  renderBlog();
}
(async function init() {
  try {
    const r = await fetch("/api/me", { credentials: "same-origin" });
    if (r.ok) { showPanel(); loadAll(); } else showLogin();
  } catch { showLogin(); }
})();
