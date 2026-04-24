---
title: Design system + Hero + Navigation
status: done
priority: urgent
type: feature
tags: [design, hero, nav]
created_by: agent
created_at: 2026-04-24
position: 1
---

## Notes
Configurar paleta ALDALU (aqua, rosa, fucsia, menta, negro), tipografías Sora + Outfit, y construir nav sticky + hero section con animaciones Framer Motion. Tono consultivo: "Donde las grandes decisiones encuentran respaldo". CTA principal al formulario.

## Checklist
- [ ] Configurar globals.css con paleta ALDALU (aqua primary, fuchsia accent, mint muted, pink secondary)
- [ ] Registrar fuentes Sora + Outfit en tailwind.config.ts, colores custom
- [ ] Crear Navigation con logo SVG ALDALU + links ancla + CTA "Asesoría Gratis"
- [ ] Crear Hero: headline "Donde las grandes decisiones encuentran respaldo", subtítulo, CTA doble, imagen Unsplash Querétaro
- [ ] Animaciones de entrada staggered con Framer Motion
- [ ] Actualizar index.tsx con nav + hero visibles

## Acceptance
- La página carga con colores aqua/rosa/fucsia, fuentes Sora/Outfit
- Hero visible con CTA funcional que scrollea al formulario