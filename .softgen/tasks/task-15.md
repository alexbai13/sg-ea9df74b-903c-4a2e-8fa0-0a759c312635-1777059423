---
title: Configurar envío de correos desde formularios (IONOS SMTP)
status: in_progress
priority: high
type: feature
tags: [email, smtp, ionos, formulario]
created_by: agent
created_at: 2026-05-25
position: 15
---

## Notes
Configurar sistema de envío de correos electrónicos usando el servidor SMTP de IONOS existente. Cuando un usuario envía el formulario, se notifica al equipo de ALDALU y se envía confirmación automática al cliente.

## Checklist
- [x] Instalar Nodemailer (compatible con SMTP)
- [x] Configurar archivo `.env.local` con credenciales SMTP de IONOS
- [x] Actualizar API `/api/lead` para envío SMTP
- [x] Usar templates HTML existentes (admin + cliente)
- [x] Crear documento de instrucciones específico para IONOS
- [ ] Usuario configura credenciales SMTP en .env.local
- [ ] Reiniciar servidor de desarrollo
- [ ] Probar envío desde formulario en vivo
- [ ] Verificar recepción de emails (admin + cliente)

## Acceptance
- El equipo de ALDALU recibe notificación con datos completos del lead cuando se envía el formulario
- El cliente recibe email de confirmación automática
- Sistema funciona sin errores usando infraestructura SMTP de IONOS existente