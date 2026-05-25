# 📧 Configuración de Envío de Correos - ALDALU

## 🎯 ¿Qué hace esto?

Cuando un usuario llena el formulario de contacto, el sistema:

1. ✅ **Envía notificación al equipo ALDALU** con todos los datos del lead
2. ✅ **Envía confirmación automática al cliente** confirmando que recibieron su solicitud

---

## ⚡ Configuración Rápida (5 minutos)

### Paso 1: Crear cuenta en Resend (GRATIS)

1. Ve a: **https://resend.com/signup**
2. Regístrate con tu correo (Google login disponible)
3. Confirma tu email

**Costo:** GRATIS hasta 100 emails/día (3,000/mes) - suficiente para empezar

---

### Paso 2: Obtener tu API Key

1. Una vez dentro, ve a: **https://resend.com/api-keys**
2. Click en **"Create API Key"**
3. Dale un nombre: `ALDALU Production`
4. Permisos: **"Full access"** o **"Sending access"**
5. **COPIA la clave** (empieza con `re_...`) - solo la verás una vez

---

### Paso 3: Configurar variables de entorno

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Pega tu API Key:

```bash
RESEND_API_KEY=re_TuClaveAquiCopiada123456789

# Cambia este correo por el que quieres recibir notificaciones
EMAIL_TO=info@aldalu.com.mx

# Este es el remitente (déjalo así por ahora)
EMAIL_FROM=onboarding@resend.dev
```

3. **IMPORTANTE:** Reinicia el servidor de desarrollo:
   - Detén el servidor (Ctrl+C)
   - Ejecuta: `npm run dev`

---

### Paso 4: ¡Probar!

1. Ve a tu sitio web
2. Llena el formulario de contacto
3. Verifica:
   - ✅ Recibes notificación en `EMAIL_TO`
   - ✅ El cliente recibe confirmación automática
   - ✅ No hay errores en la consola

---

## 🚀 Configuración Avanzada (Opcional - Producción)

### Verificar tu dominio propio

Para enviar desde `@aldalu.com.mx` en vez de `@resend.dev`:

1. Ve a: **https://resend.com/domains**
2. Click en **"Add Domain"**
3. Ingresa: `aldalu.com.mx`
4. Resend te dará registros DNS para configurar:
   - SPF
   - DKIM
   - DMARC
5. Configura estos registros en tu proveedor de dominios (GoDaddy, Cloudflare, etc.)
6. Espera verificación (5 min - 24 hrs)
7. Una vez verificado, actualiza `.env.local`:

```bash
EMAIL_FROM=info@aldalu.com.mx
```

**Beneficios:**
- ✅ Mejor deliverability (menos spam)
- ✅ Marca profesional
- ✅ Tracking de emails

---

## 📊 Monitoreo

### Ver emails enviados

Ve a: **https://resend.com/emails**

Aquí puedes:
- Ver todos los correos enviados
- Estado de entrega (delivered, bounced, opened)
- Logs de errores

---

## 🔧 Solución de Problemas

### ❌ "RESEND_API_KEY no configurada"

**Problema:** No configuraste la API Key  
**Solución:**
1. Verifica que `.env.local` tiene `RESEND_API_KEY=re_...`
2. Reinicia el servidor (detén y ejecuta `npm run dev` de nuevo)

---

### ❌ Los correos no llegan

**Problema:** Correos enviados pero no recibidos  
**Solución:**
1. Revisa la carpeta de SPAM/Promociones
2. Verifica en https://resend.com/emails el estado del envío
3. Si usas `@resend.dev`, algunos correos pueden bloquearlo
4. Considera verificar tu dominio propio

---

### ❌ Error 401 Unauthorized

**Problema:** API Key inválida  
**Solución:**
1. Genera una nueva API Key en Resend
2. Cópiala bien (sin espacios)
3. Actualiza `.env.local`
4. Reinicia servidor

---

## 💰 Precios Resend

| Plan | Emails/mes | Costo |
|------|-----------|-------|
| **Gratis** | 3,000 | $0 USD |
| **Pro** | 50,000 | $20 USD/mes |
| **Enterprise** | Ilimitado | Contactar |

**Para ALDALU:** Plan Gratis es suficiente al inicio (100 leads/día)

---

## 📝 Personalización

### Cambiar templates de correo

Los templates HTML están en: `src/lib/email-templates.ts`

Puedes modificar:
- Colores (actualmente usa colores de ALDALU)
- Textos
- Estructura
- Agregar logo

---

## 🔐 Seguridad

- ✅ **NUNCA** subas `.env.local` a Git (ya está en `.gitignore`)
- ✅ **NUNCA** compartas tu `RESEND_API_KEY` públicamente
- ✅ Si expones la clave, regenera una nueva inmediatamente

---

## ✅ Checklist de Implementación

- [ ] Cuenta Resend creada
- [ ] API Key obtenida
- [ ] `.env.local` configurado con API Key
- [ ] `EMAIL_TO` configurado con correo del equipo
- [ ] Servidor reiniciado
- [ ] Prueba realizada exitosamente
- [ ] Emails recibidos (admin + cliente)
- [ ] (Opcional) Dominio verificado para producción

---

## 🆘 Soporte

Si tienes problemas:

1. **Documentación Resend:** https://resend.com/docs
2. **Status de Resend:** https://status.resend.com
3. **Soporte Resend:** support@resend.com

---

**¡Listo!** 🎉 Tu sistema de correos está configurado y funcionando.