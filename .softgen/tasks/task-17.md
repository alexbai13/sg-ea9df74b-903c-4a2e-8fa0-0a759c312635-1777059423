---
title: Crear página de contacto dedicada
status: in_progress
priority: high
type: feature
tags: [contacto, mapa, formulario]
created_by: agent
created_at: 2026-05-28
position: 17
---

## Notes
Crear una página de contacto completa (/contacto) con mapa interactivo de ubicación en Querétaro, formulario de contacto extendido, información de contacto detallada y horarios de atención. Debe integrarse con el menú de navegación.

## Checklist
- [ ] Crear página src/pages/contacto.tsx con estructura completa
- [ ] Integrar mapa de Google Maps con ubicación en Querétaro
- [ ] Crear formulario de contacto extendido (nombre, correo, teléfono, asunto, mensaje)
- [ ] Mostrar información de contacto (dirección, teléfono, correo, WhatsApp)
- [ ] Añadir horarios de atención
- [ ] Actualizar Navigation.tsx para incluir link a página de contacto
- [ ] Crear API endpoint /api/contacto para procesar formulario
- [ ] Integrar envío de correos con sistema SMTP existente
- [ ] Añadir SEO específico para página de contacto

## Acceptance
- La página /contacto es accesible desde el menú de navegación
- El mapa muestra correctamente la ubicación de ALDALU en Querétaro
- El formulario funciona y envía correos al equipo de ALDALU
- Toda la información de contacto es precisa y actualizada