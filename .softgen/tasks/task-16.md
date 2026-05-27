---
title: Mejorar calidad de imágenes y logos
status: todo
priority: high
type: bug
tags: [ui, images, nextjs]
created_by: agent
created_at: 2026-05-27
position: 16
---

## Notes
El usuario reporta que las imágenes y logos se ven muy pixelados y de baja calidad. Esto se debe a la optimización automática por defecto de Next.js `next/image`. Necesitamos forzar la calidad al máximo para las fotos y desactivar la optimización para los logos (SVG/PNG con texto).

## Checklist
- [ ] En `src/components/Navigation.tsx`: Añadir la propiedad `unoptimized` a los componentes `<Image>` de los logos de ALDALU
- [ ] En `src/components/Footer.tsx`: Añadir la propiedad `unoptimized` al componente `<Image>` del logo
- [ ] En `src/components/Hero.tsx`: Cambiar `quality={90}` a `quality={100}` en la foto principal (`andalu_cuadrado1.png`)
- [ ] En `src/components/ServicesSection.tsx`: Añadir `quality={100}` a las imágenes generadas (`young-professional-1.png`, etc.)
- [ ] En `src/components/HowItWorks.tsx`: Cambiar `quality={90}` a `quality={100}` en la imagen `andalu_cuadrado1_1_.png`

## Acceptance
- Los logos de navegación y footer se ven completamente nítidos (sin compresión de Next.js).
- Las fotografías de las personas en las secciones principales cargan con su calidad visual máxima y no se ven pixeladas.