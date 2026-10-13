# Noti Zowl - Plataforma web de noticias (Entrega final)

Aplicación Front-end en **Angular 21** (componentes standalone, data binding, enrutamiento, servicios y signals),
con **Bootstrap 5.3**, datos desde `public/data/noticias.json` y persistencia en `localStorage`.
Módulo Desarrollo de Front-end - Politécnico Grancolombiano.

## Ejecutar en local
```bash
npm install
npx ng serve          # http://localhost:4200
```
## Compilar y desplegar
```bash
npx ng build --base-href /Entrega-Numero-7-Front-End/     # genera dist/notizowl/browser
```
El despliegue en GitHub Pages es automático con `.github/workflows/deploy.yml`
(en el repositorio: Settings > Pages > Source: **GitHub Actions**).

## Estructura
- `src/app/models`      interfaz `Noticia`
- `src/app/services`    `NoticiasService`: JSON + localStorage + estado (signals)
- `src/app/components`  header, footer y tarjeta reutilizable
- `src/app/pages`       inicio, noticias, detalle, favoritos, contacto y administrar
- `public/`             data/, img/ (logo.png, favicon, noticia-N.jpg, SVG), video/hero.mp4
