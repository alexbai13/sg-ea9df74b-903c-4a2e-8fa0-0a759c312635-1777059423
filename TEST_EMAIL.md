# 🧪 Diagnóstico de Envío de Correos - ALDALU

## ❌ PROBLEMA REPORTADO
- ✅ Correo al cliente: **SÍ llega**
- ❌ Correo a ALDALU (con info del formulario): **NO llega**

---

## 🔍 POSIBLES CAUSAS

### 1️⃣ Contraseña SMTP no configurada
**Síntoma:** Ningún correo se envía
**Solución:** En `.env.local`, cambia:
```bash
SMTP_PASS=TuContraseñaAquí  ← Esto es un placeholder
```
Por tu contraseña real:
```bash
SMTP_PASS=tu_contraseña_real_de_ionos
```

### 2️⃣ IONOS bloquea envíos FROM = TO (mismo correo)
**Síntoma:** El correo al cliente llega, pero el de ALDALU no
**Causa:** Muchos servidores SMTP rechazan correos donde el remitente y destinatario son idénticos
**Solución:** En `.env.local`, cambia:
```bash
EMAIL_FROM=info@aldalu.com.mx
EMAIL_TO=info@aldalu.com.mx  ← Problema: mismo correo
```
Por:
```bash
EMAIL_FROM=info@aldalu.com.mx
EMAIL_TO=ventas@aldalu.com.mx  ← Diferente correo
```

### 3️⃣ Correo en carpeta de SPAM
**Solución:** Revisa la carpeta de spam/correo no deseado de `info@aldalu.com.mx`

### 4️⃣ Filtros de IONOS bloqueando
**Solución:** Revisa la configuración de filtros anti-spam en tu panel de IONOS

---

## ✅ CÓMO VERIFICAR QUÉ ESTÁ PASANDO

### Paso 1: Ver los logs en tiempo real
```bash
pm2 logs --lines 100
```

### Paso 2: Enviar un formulario de prueba

Ve a tu sitio y llena el formulario. En los logs verás:

**Si la contraseña está mal:**
```
❌ ERROR enviando email al admin:
   Código: EAUTH
   Mensaje: Invalid login
```

**Si FROM = TO está bloqueado:**
```
❌ ERROR enviando email al admin:
   Código: 550
   Mensaje: Sender and recipient cannot be the same
```

**Si todo está bien:**
```
✅ Email ADMIN enviado exitosamente
   MessageID: <abc123@ionos.mx>
✅ Email CLIENTE enviado exitosamente
   MessageID: <def456@ionos.mx>
```

---

## 🛠️ SOLUCIÓN RÁPIDA (OPCIÓN A)

**Usa un correo diferente para recibir los leads:**

1. Edita `.env.local`:
```bash
EMAIL_TO=ventas@aldalu.com.mx
```

2. Reinicia el servidor:
```bash
pm2 restart all
```

3. Prueba el formulario

---

## 🛠️ SOLUCIÓN ALTERNATIVA (OPCIÓN B)

**Recibe en múltiples correos:**

1. Edita `.env.local`:
```bash
EMAIL_TO=info@aldalu.com.mx,ventas@aldalu.com.mx,comercial@aldalu.com.mx
```

2. Reinicia y prueba

---

## 📞 SI NADA FUNCIONA

1. Verifica que `SMTP_PASS` es correcta
2. Verifica que `info@aldalu.com.mx` existe y está activa en IONOS
3. Contacta a soporte de IONOS: podrían tener restricciones específicas
4. Considera usar un servicio dedicado como Resend (3,000 emails gratis/mes)

---

## ✨ CONFIGURACIÓN RECOMENDADA FINAL

```bash
# .env.local
SMTP_HOST=smtp.ionos.mx
SMTP_PORT=587
SMTP_USER=info@aldalu.com.mx
SMTP_PASS=tu_contraseña_real

EMAIL_FROM=info@aldalu.com.mx
EMAIL_TO=ventas@aldalu.com.mx  ← Diferente para evitar bloqueos
```

**¿Por qué esto funciona mejor?**
- FROM (info@) se ve profesional al cliente
- TO (ventas@) recibe los leads sin conflictos SMTP
- Ambos correos pueden estar redirigidos a la misma bandeja en IONOS