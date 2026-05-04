---
title: SEO, 404 Branded & Performance Optimization
status: done
priority: high
type: feature
tags: [seo, performance, 404]
created_by: agent
created_at: 2026-05-04
position: 10
---

## Notes
Añadir meta etiquetas SEO y Open Graph dinámicas en todas las páginas. Crear una vista de 404 con diseño de ALDALU. Optimizar rendimiento usando lazy loading para imágenes e importaciones dinámicas (next/dynamic) para componentes debajo del "fold".

## Checklist
- [ ] Agregar `<SEO>` en `index.tsx`, `privacidad.tsx`, `gracias.tsx`, y `404.tsx`
- [ ] Construir página `404.tsx` alineada a la marca con CTA de retorno
- [ ] Implementar `loading="lazy"` en imágenes secundarias
- [ ] Usar `next/dynamic` en `index.tsx` para secciones pesadas (Testimonios, Blog, FAQ)

## Acceptance
- Todas las páginas principales tienen OG tags e imagen (og-image.png)
- La página 404 tiene un look premium y funcional
- Las imágenes y componentes pesados se cargan de forma diferida, mejorando el performance