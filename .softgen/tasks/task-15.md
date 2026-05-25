---
title: Configurar envío de correos desde formularios
status: in_progress
priority: high
type: feature
tags: [email, backend, api]
created_by: agent
created_at: 2026-05-25
position: 15
---

## Notes
Implementar sistema completo de envío de correos para leads capturados en formularios. Usar Resend (servicio moderno, gratuito hasta 100 emails/día, ideal para Next.js).

**Configuración necesaria:**
- Cuenta Resend (resend.com)
- API Key en variables de entorno
- Dominio verificado (opcional, pero recomendado)

**Flujo:**
1. Usuario envía formulario → API valida datos
2. API envía 2 correos:
   - Notificación al admin de ALDALU con datos del lead
   - Confirmación automática al cliente

## Checklist
- [x] Instalar dependencia `resend`
- [x] Crear archivo de configuración `.env.local` con instrucciones
- [x] Actualizar API `/api/lead` con lógica de envío
- [x] Crear templates HTML para emails (admin + cliente)
- [x] Crear documento completo de instrucciones
- [ ] Usuario registra cuenta en Resend y obtiene API key
- [ ] Usuario configura API key en .env.local
- [ ] Usuario verifica dominio en Resend (opcional pero recomendado)
- [ ] Probar envío desde formulario en vivo

## Acceptance
- Admin recibe correo con datos completos cada vez que un usuario llena el formulario
- Cliente recibe confirmación automática al email proporcionado
- Errores de envío se manejan correctamente sin romper UX del formulario