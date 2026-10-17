# Страницы услуг: блоки и изображения — 17.10.2026

Изменения внесены в основную рабочую копию `Desktop/s-work/amur-build`.

У всех 16 услуг на пяти языках (`ru`, `hy`, `en`, `de`, `fr`) сразу после первого экрана расположен информационный блок с нумерованными карточками. Использован общий существующий компонент и индивидуальные тексты услуг. На семи основных страницах блок перенесён из нижней части страницы; на девяти специализированных страницах сохранён существующий верхний блок. Другие информационные разделы сохранены.

Каждой услуге назначены два отдельных изображения: первый экран и описание. Всего 32 разных изображения; между услугами фотографии не повторяются. Один набор изображений используется в переводах одной и той же услуги. 26 иллюстраций созданы встроенным `image_gen`, шесть существующих фотографий сохранены. Новые изображения подписаны как иллюстрации ИИ, их alt переведены на пять языков. Эти изображения не добавлялись в портфолио.

Новые WebP занимают суммарно 5 535 778 байт; максимальный файл — 390 620 байт. Используется существующий Next.js Image: приоритетная загрузка главного изображения, отложенная загрузка изображения описания и адаптивные размеры. Проверены HTTP 200 и корректное декодирование всех 32 изображений через `/_next/image`; при ширине 640 px максимальный ответ составил 66 388 байт.

## Проверки

- `npm run seo:check` — успешно, включая уникальность фотографий, наличие файлов, перевод alt и отсутствие неопубликованных статей в sitemap.
- `npm run seo:check -- --base-url http://127.0.0.1:3019` — успешно: 120 индексируемых страниц, 50 вариантов устаревших URL, 3 редиректа слеша, 15 ожидаемых 404, внутренние ссылки, hreflang, schema. На всех 80 страницах услуг проверены порядок разделов, нумерация карточек, фотографии и подписи.
- `npm run calculator:check` — успешно; шесть сценариев строительства/дизайна на пяти языках. Расчёт ремонта по-прежнему требует обращения.
- `npm run typecheck`, `npm run lint`, `npm run build` — успешно. Сборка пререндерит 138 страниц.
- Prettier для изменённых исходников и `git diff --check` — успешно.
- 42 проверки адаптивной сетки в браузере: все 16 русских страниц при ширине 320 и 1280 px, оба шаблона на пяти языках при 390 px. Переполнений нет; верхний блок везде второй, после первого экрана. Дополнительно проверены последние три замены фотографий.
- Сравнение HTML всех 120 индексируемых страниц до и после: title, description и остальные SEO-метаданные, H1, canonical, hreflang, sitemap, robots.txt, JSON-LD и HTTP-статусы совпадают. Основной текст, FAQ и существующие ссылки сохранены. Изменён порядок заголовков на 35 страницах (7 услуг × 5 языков), поскольку блок перемещён наверх. Клиентский JavaScript не увеличился. Содержимое страниц за пределами отдельных услуг совпадает.

Проверки выполнены локально на production-сборке. По этим проверкам технических SEO-регрессий не обнаружено; позиции поисковой выдачи ими не измеряются.

## Изменённые файлы этого обновления

| Файл | Причина |
| --- | --- |
| `components/services/base-service-page.tsx` | Информационный блок сразу под первым экраном; отдельные hero/details изображения. Существующие карточки работ дома сохранены ниже описания. |
| `components/services/service-landing-content.tsx` | Общий идентификатор верхнего блока и разные изображения первого экрана и описания. |
| `components/services/service-planning.tsx` | Настраиваемые идентификатор и надзаголовок для повторного использования блока. |
| `components/services/service-page.tsx` | Отдельная видимая подпись фотографии без потери описательного alt. |
| `config/service-media.config.ts` | 32 уникальных изображения для 16 услуг, локализованные alt и подписи. Не изменяет metadata или схемы. |
| `scripts/seo-check.mjs` | Проверка полного покрытия услуг, уникальности URL/содержимого файлов, формата/размера WebP и локализации изображений. |
| `scripts/lib/crawl-seo.mjs` | Проверка позиции блока, карточек, реального SSR img, alt, подписи и стратегии загрузки. |
| `docs/service-image-generation.json` | Полный набор промптов, путей и размеров новых изображений; генератор — встроенный image_gen. |
| `docs/service-visuals-validation.md` | Этот отчёт об изменениях и проверках. |

Тексты в ранее добавленном `messages/service-planning.ts` использованы без изменений. Ранее подготовленные изменения Git не удалены и не переиндексированы. Коммит и публикация не выполнялись.

Новые графические файлы (каждый содержит отдельную иллюстрацию указанной услуги и позиции):

- `public/images/services/electrical-work-yerevan-hero.webp`
- `public/images/services/renovation-hero.webp`
- `public/images/services/apartment-interior-design-yerevan-hero.webp`
- `public/images/services/office-renovation-yerevan-hero.webp`
- `public/images/services/capital-renovation-yerevan-hero.webp`
- `public/images/services/cosmetic-renovation-yerevan-hero.webp`
- `public/images/services/plumbing-work-yerevan-hero.webp`
- `public/images/services/renovation-details.webp`
- `public/images/services/house-construction-details.webp`
- `public/images/services/interior-design-details.webp`
- `public/images/services/commercial-construction-details.webp`
- `public/images/services/design-details.webp`
- `public/images/services/monolithic-work-details.webp`
- `public/images/services/facade-and-roofing-details.webp`
- `public/images/services/apartment-renovation-yerevan-details.webp`
- `public/images/services/new-build-renovation-details.webp`
- `public/images/services/turnkey-renovation-details.webp`
- `public/images/services/apartment-interior-design-yerevan-details.webp`
- `public/images/services/office-renovation-yerevan-details.webp`
- `public/images/services/capital-renovation-yerevan-details.webp`
- `public/images/services/cosmetic-renovation-yerevan-details.webp`
- `public/images/services/plumbing-work-yerevan-details.webp`
- `public/images/services/electrical-work-yerevan-details.webp`
- `public/images/services/facade-and-roofing-hero.webp`
- `public/images/services/turnkey-renovation-hero.webp`
- `public/images/services/new-build-renovation-hero.webp`
