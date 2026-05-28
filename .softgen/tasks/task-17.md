---
title: Crear página de contacto dedicada
status: done
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
- [x] Crear página src/pages/contacto.tsx con estructura completa
- [x] Integrar mapa de Google Maps con ubicación en Querétaro
- [x] Crear formulario de contacto extendido (nombre, correo, teléfono, asunto, mensaje)
- [x] Mostrar información de contacto (dirección, teléfono, correo, WhatsApp)
- [x] Añadir horarios de atención
- [x] Actualizar Navigation.tsx para incluir link a página de contacto
- [x] Crear API endpoint /api/contacto para procesar formulario
- [x] Integrar envío de correos con sistema SMTP existente
- [x] Añadir SEO específico para página de contacto