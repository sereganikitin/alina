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

Поддомен: **alina.cd-agency.ru** (VPS, nginx, статика из `out/`).

## Структура

- `src/app/` — страницы и layout
- `src/components/` — компоненты (Hero, Wave, …)
- `public/photos/` — оптимизированные фото для сайта
- `design/` — исходные материалы: ТЗ (`.docx`), оригиналы фото, референсы
