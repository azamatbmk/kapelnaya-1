# Капельная №1 — сайт клиники

Next.js (static export) по макету главной. Домен-заглушка: `kapelnaya1.ru` — замените в `lib/site.ts`, `public/robots.txt`, `public/sitemap.xml` после регистрации.

## Страницы
- `/` — клиника (главная)
- `/vrachi/bekoev/` — страница врача (Бекоев) внутри сайта клиники
- `/politika-konfidencialnosti/` — политика ПДн (черновик)

## Запуск
```bash
npm install
npm run dev
```

Сборка: `npm run build` → папка `out/`.

## Деплой
Dockerfile + Caddy на порту 8080 (Timeweb App Platform).
