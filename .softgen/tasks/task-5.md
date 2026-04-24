---
title: Confirmation Page (Success)
status: in_progress
priority: medium
type: feature
tags: [cro, ux, form]
created_by: agent
created_at: 2026-04-24
position: 5
---

## Notes
Página de "Gracias" dedicada tras enviar el formulario. Mejora el tracking de conversiones (ej. GA4) y ofrece una mejor experiencia con opción a contacto rápido por WhatsApp.

## Checklist
- [ ] Crear src/pages/gracias.tsx con animación de éxito
- [ ] Añadir botón para regresar al inicio y botón secundario de WhatsApp
- [ ] Actualizar LeadForm para redirigir a /gracias en lugar de mostrar mensaje en línea

## Acceptance
- Al llenar el formulario, el usuario es redirigido a /gracias
- La página de gracias mantiene el estilo visual de la marca