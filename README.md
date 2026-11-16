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
`npm run build` собирает сайт в папку `out/`. На обычный хостинг загружается содержимое этой папки, в корень сайта. `node_modules` и исходники загружать не нужно.
