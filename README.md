# Лендинг психолога Алины

Сайт-визитка психолога (EMDR / IFS / танцевально-двигательная терапия).

## Стек

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- Статический экспорт (`output: "export"`) → папка `out/`, отдаётся через nginx

## Разработка

```bash
npm install
npm run dev      # http://localhost:3000
```

## Сборка статики

```bash
npm run build    # генерирует ./out со статикой
```

## Деплой

Поддомен: **alina.cd-agency.ru** (VPS `72.56.39.225`, nginx отдаёт статику из `out/`).

```bash
bash deploy.sh    # сборка + загрузка на сервер
```

Детали:
- Файлы лежат в `/var/www/alina.cd-agency.ru` (отдельный server-блок nginx, SSL от Let's Encrypt/certbot, автопродление).
- На сервере есть другие проекты — деплой затрагивает только свою директорию и свой конфиг.

## Структура

- `src/app/` — страницы и layout
- `src/components/` — компоненты (Hero, Wave, …)
- `public/photos/` — оптимизированные фото для сайта
- `design/` — исходные материалы: ТЗ (`.docx`), оригиналы фото, референсы
