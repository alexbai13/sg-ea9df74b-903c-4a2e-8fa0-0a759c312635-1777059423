# 📧 Configuración de Envío de Correos - ALDALU (IONOS SMTP)

## 🎯 ¿Qué hace esto?

Cuando un usuario llena el formulario de contacto, el sistema:

1. ✅ **Envía notificación al equipo ALDALU** con todos los datos del lead
2. ✅ **Envía confirmación automática al cliente** confirmando que recibieron su solicitud

El sistema usa **tu servidor SMTP de IONOS** (tu propia infraestructura de correo).

---

## ⚡ Configuración (3 minutos)

### Paso 1: Obtener credenciales SMTP de IONOS

Necesitas 4 datos de tu cuenta de correo IONOS:

1. **Host SMTP:** `smtp.ionos.mx` (para México) o `smtp.ionos.com`
2. **Puerto:** `587` (recomendado - STARTTLS)
3. **Usuario:** Tu correo completo (ej: `info@aldalu.com.mx`)
4. **Contraseña:** La contraseña de ese correo en IONOS

#### ¿Dónde encuentro esto?

**Opción A: Panel de IONOS**
1. Inicia sesión en: https://www.ionos.mx/
2. Ve a **Productos → Email**
3. Selecciona tu correo (`info@aldalu.com.mx`)
4. Busca **Configuración SMTP** o **Configuración de cliente de correo**

**Opción B: Documentación IONOS**
- Host: `smtp.ionos.mx` (México) o `smtp.ionos.com`
- Puerto: `587` (STARTTLS) o `465` (SSL/TLS)
- Autenticación: Requerida

---

### Paso 2: Configurar variables de entorno

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Completa con tus datos de IONOS:

```bash
# Configuración SMTP de IONOS
SMTP_HOST=smtp.ionos.mx
SMTP_PORT=587
SMTP_USER=info@aldalu.com.mx
SMTP_PASS=TuContraseñaReal

# Remitente (debe coincidir con SMTP_USER)
EMAIL_FROM=info@aldalu.com.mx

# Destinatario de notificaciones
EMAIL_TO=info@aldalu.com.mx
```

3. **IMPORTANTE:** Reinicia el servidor de desarrollo:
   - Detén el servidor (Ctrl+C en la terminal)
   - Ejecuta de nuevo: `npm run dev`
   - O usa el botón **"Restart Server"** en Softgen (arriba a la derecha)

---

### Paso 3: ¡Probar!

1. Ve a tu sitio web en el navegador
2. Llena el formulario de contacto con datos de prueba
3. Verifica:
   - ✅ El formulario se envía sin errores
   - ✅ Recibes notificación en tu bandeja de `info@aldalu.com.mx`
   - ✅ El email de prueba recibe confirmación automática
   - ✅ No hay errores en la consola del servidor

---

## 🔧 Configuraciones Alternativas

### Si usas puerto 465 (SSL/TLS)

```bash
SMTP_PORT=465
```

### Si tienes autenticación de 2 factores (2FA)

IONOS puede requerir una **contraseña de aplicación** específica:

1. Ve a tu panel de IONOS
2. Configuración de seguridad del correo
3. Genera una "contraseña de aplicación"
4. Usa esa contraseña en `SMTP_PASS` en vez de tu contraseña normal

---

## 📊 Monitoreo

### Ver correos enviados

Dependiendo de tu plan de IONOS:

- **Panel IONOS:** Algunos planes tienen logs de envío
- **Consola del servidor:** Los logs aparecen en tu terminal donde corre `npm run dev`
- **Bandeja de Salida:** Verifica en tu cliente de correo (Outlook, Gmail, etc.)

---

## 🔧 Solución de Problemas

### ❌ "Configuración SMTP incompleta"

**Problema:** Faltan datos en `.env.local`  
**Solución:**
1. Verifica que **todas** las variables estén configuradas (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)
2. Asegúrate de que no haya espacios antes/después de los valores
3. Reinicia el servidor

---

### ❌ "Error de autenticación" o "535 Authentication failed"

**Problema:** Usuario o contraseña incorrectos  
**Solución:**
1. Verifica que `SMTP_USER` sea tu correo COMPLETO: `info@aldalu.com.mx`
2. Verifica que la contraseña sea correcta
3. Si tienes 2FA activado, usa una **contraseña de aplicación**
4. Prueba iniciar sesión en webmail de IONOS con las mismas credenciales

---

### ❌ "Connection timeout" o "ECONNREFUSED"

**Problema:** No puede conectar al servidor SMTP  
**Solución:**
1. Verifica el `SMTP_HOST`: 
   - México: `smtp.ionos.mx`
   - Internacional: `smtp.ionos.com`
2. Verifica el puerto: `587` o `465`
3. Asegúrate de tener conexión a internet
4. Verifica que tu firewall no bloquee el puerto

---

### ❌ Los correos llegan a SPAM

**Problema:** Correos van a carpeta de spam  
**Solución:**
1. **SPF/DKIM:** Verifica que tu dominio tenga configurados estos registros DNS en IONOS
2. **Dominio verificado:** Asegúrate de usar un correo `@aldalu.com.mx` verificado
3. **Contenido:** Evita palabras spam en el asunto
4. **Agrega a contactos:** Pide a los destinatarios agregar `info@aldalu.com.mx` a sus contactos

---

### ❌ "Self signed certificate"

**Problema:** Error de certificado SSL  
**Solución:**
Ya está configurado `rejectUnauthorized: false` para desarrollo.  
Para producción en Vercel, cambia a `true` en `src/pages/api/lead.ts`.

---

## 🔐 Seguridad

### ✅ Protección de Credenciales

- ✅ **NUNCA** subas `.env.local` a Git (ya está en `.gitignore`)
- ✅ **NUNCA** compartas tu `SMTP_PASS` públicamente
- ✅ En producción (Vercel), configura las variables de entorno en el panel de Vercel
- ✅ Usa contraseñas fuertes o contraseñas de aplicación

### 🚀 Configuración para Producción (Vercel)

Cuando despliegues a Vercel:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega cada variable:
   - `SMTP_HOST` = `smtp.ionos.mx`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = `info@aldalu.com.mx`
   - `SMTP_PASS` = `TuContraseña`
   - `EMAIL_FROM` = `info@aldalu.com.mx`
   - `EMAIL_TO` = `info@aldalu.com.mx`
4. Re-deploy el proyecto

---

## 💰 Costos

**IONOS SMTP:** Ya incluido en tu plan de correo electrónico actual.  
Sin costos adicionales por envío de correos (límites según tu plan de IONOS).

---

## 📝 Personalización

### Cambiar templates de correo

Los templates HTML están en: `src/lib/email-templates.ts`

Puedes modificar:
- Colores (actualmente usa la paleta de ALDALU)
- Textos y mensajes
- Estructura del correo
- Agregar logo de ALDALU
- Agregar footer personalizado

---

## ✅ Checklist de Implementación

- [ ] Credenciales SMTP de IONOS obtenidas
- [ ] `.env.local` configurado con todas las variables
- [ ] Servidor reiniciado (`npm run dev`)
- [ ] Prueba realizada exitosamente
- [ ] Email recibido en bandeja del equipo
- [ ] Confirmación automática recibida por cliente
- [ ] (Producción) Variables configuradas en Vercel
- [ ] (Opcional) SPF/DKIM verificados para mejor deliverability

---

## 🆘 Soporte

Si tienes problemas:

1. **Soporte IONOS México:** 
   - Tel: 800 953 0084
   - https://www.ionos.mx/ayuda

2. **Documentación IONOS SMTP:**
   - https://www.ionos.mx/ayuda/correo/configurar-correo-en-outlook/configuracion-smtp-de-ionos/

3. **Verificar estado de servicios IONOS:**
   - https://status.ionos.com/

---

## 📧 Datos SMTP de Referencia IONOS

### México
```
Host: smtp.ionos.mx
Puerto: 587 (STARTTLS) o 465 (SSL/TLS)
Seguridad: STARTTLS o SSL/TLS
Autenticación: Requerida
```

### Internacional
```
Host: smtp.ionos.com
Puerto: 587 (STARTTLS) o 465 (SSL/TLS)
Seguridad: STARTTLS o SSL/TLS
Autenticación: Requerida
```

---

**¡Listo!** 🎉 Tu sistema de correos IONOS está configurado y funcionando.