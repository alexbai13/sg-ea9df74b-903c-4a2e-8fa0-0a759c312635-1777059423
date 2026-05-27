import type { LeadFormData } from "./validations";

type LeadData = {
  nombre: string;
  edad: string;
  correo: string;
  telefono: string;
  servicio: string;
  valorInmueble?: string;
  enganche?: string;
  ingresos?: string;
  desarrollo?: string;
  situacionLaboral?: string;
  estadoCivil?: string;
  estatusInfonavit?: string;
  valorAuto?: string;
  engancheAuto?: string;
  historialCrediticio?: string;
  tipoPension?: string;
  montoPension?: string;
  prestamoActivo?: string;
};

export function getAdminEmailHTML(data: LeadFormData): string {
  const optionalFields = [];

  if (data.servicio === "Crédito Hipotecario") {
    if (data.situacionLaboral) optionalFields.push(`<strong>Situación Laboral:</strong> ${data.situacionLaboral}`);
    if (data.estadoCivil) optionalFields.push(`<strong>Estado Civil:</strong> ${data.estadoCivil}`);
    if (data.estatusInfonavit) optionalFields.push(`<strong>Estatus Infonavit:</strong> ${data.estatusInfonavit}`);
    if (data.valorInmueble) optionalFields.push(`<strong>Valor Inmueble:</strong> $${Number(data.valorInmueble).toLocaleString('es-MX')}`);
    if (data.enganche) optionalFields.push(`<strong>Enganche Disponible:</strong> $${Number(data.enganche).toLocaleString('es-MX')}`);
    if (data.ingresos) optionalFields.push(`<strong>Ingresos Mensuales:</strong> $${Number(data.ingresos).toLocaleString('es-MX')}`);
    if (data.desarrollo) optionalFields.push(`<strong>Desarrollo:</strong> ${data.desarrollo}`);
  } else if (data.servicio === "Crédito Automotriz (Kavak)") {
    if (data.valorAuto) optionalFields.push(`<strong>Valor Auto:</strong> $${Number(data.valorAuto).toLocaleString('es-MX')}`);
    if (data.engancheAuto) optionalFields.push(`<strong>Enganche:</strong> $${Number(data.engancheAuto).toLocaleString('es-MX')}`);
    if (data.historialCrediticio) optionalFields.push(`<strong>Buró de Crédito:</strong> ${data.historialCrediticio}`);
  } else if (data.servicio === "Préstamos Personales IMSS") {
    if (data.tipoPension) optionalFields.push(`<strong>Tipo de Pensión:</strong> ${data.tipoPension}`);
    if (data.montoPension) optionalFields.push(`<strong>Pensión Mensual:</strong> $${Number(data.montoPension).toLocaleString('es-MX')}`);
    if (data.prestamoActivo) optionalFields.push(`<strong>Préstamos Activos:</strong> ${data.prestamoActivo}`);
  }

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Lead - ALDALU</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #4ECDC4 0%, #D946EF 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                🎯 Nuevo Lead Capturado
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                ${new Date().toLocaleString('es-MX', { dateStyle: 'full', timeStyle: 'short' })}
              </p>
            </td>
          </tr>

          <!-- Servicio Badge -->
          <tr>
            <td style="padding: 24px 40px 0 40px;">
              <div style="background-color: #D946EF; color: #ffffff; display: inline-block; padding: 8px 20px; border-radius: 20px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                ${data.servicio}
              </div>
            </td>
          </tr>

          <!-- Datos principales -->
          <tr>
            <td style="padding: 24px 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 18px; font-weight: 600; border-bottom: 2px solid #4ECDC4; padding-bottom: 12px;">
                Datos de Contacto
              </h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top; width: 35%;">
                    <strong style="color: #1a1a1a;">Nombre:</strong>
                  </td>
                  <td style="padding: 10px 0; color: #1a1a1a; font-size: 14px;">
                    ${data.nombre}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;">
                    <strong style="color: #1a1a1a;">Edad:</strong>
                  </td>
                  <td style="padding: 10px 0; color: #1a1a1a; font-size: 14px;">
                    ${data.edad} años
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;">
                    <strong style="color: #1a1a1a;">Correo:</strong>
                  </td>
                  <td style="padding: 10px 0;">
                    <a href="mailto:${data.correo}" style="color: #4ECDC4; text-decoration: none; font-size: 14px; font-weight: 500;">
                      ${data.correo}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;">
                    <strong style="color: #1a1a1a;">Teléfono:</strong>
                  </td>
                  <td style="padding: 10px 0;">
                    <a href="tel:+52${data.telefono}" style="color: #4ECDC4; text-decoration: none; font-size: 14px; font-weight: 500;">
                      ${data.telefono}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${optionalFields.length > 0 ? `
          <!-- Información adicional -->
          <tr>
            <td style="padding: 0 40px 24px 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 18px; font-weight: 600; border-bottom: 2px solid #D946EF; padding-bottom: 12px;">
                Precalificación / Perfil
              </h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                ${optionalFields.map(field => `
                <tr>
                  <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; line-height: 1.6;">
                    ${field}
                  </td>
                </tr>
                `).join('')}
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- CTA -->
          <tr>
            <td style="padding-top: 20px; text-align: center;">
              <a href="https://wa.me/52442506819?text=Hola%20ALDALU" 
                 style="display: inline-block; padding: 14px 28px; background-color: #25D366; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
                💬 Contactar por WhatsApp
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; color: #999; font-size: 12px; line-height: 1.5;">
                Este correo fue generado automáticamente desde el formulario de contacto de <strong style="color: #1a1a1a;">ALDALU</strong>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function getClientEmailHTML(nombre: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Solicitud - ALDALU</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #4ECDC4 0%, #D946EF 100%); padding: 40px; text-align: center;">
              <div style="width: 80px; height: 80px; margin: 0 auto 20px; background-color: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 48px;">✅</span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                ¡Solicitud Recibida!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 24px 0; color: #1a1a1a; font-size: 16px; line-height: 1.6;">
                Hola <strong>${nombre}</strong>,
              </p>
              <p style="margin: 0 0 24px 0; color: #666; font-size: 15px; line-height: 1.7;">
                Hemos recibido tu solicitud de asesoría financiera. Uno de nuestros <strong style="color: #1a1a1a;">asesores certificados</strong> se pondrá en contacto contigo en las próximas <strong style="color: #D946EF;">24 horas</strong> para ayudarte a encontrar la mejor opción de crédito.
              </p>

              <!-- Info Box -->
              <div style="background-color: #f0fffe; border-left: 4px solid #4ECDC4; padding: 20px; margin: 24px 0; border-radius: 6px;">
                <h3 style="margin: 0 0 12px 0; color: #1a1a1a; font-size: 16px; font-weight: 600;">
                  ¿Qué sigue?
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 14px; line-height: 1.8;">
                  <li>Revisaremos tu perfil financiero</li>
                  <li>Compararemos opciones entre más de 15 bancos</li>
                  <li>Te presentaremos las mejores alternativas personalizadas</li>
                  <li>Te acompañaremos durante todo el proceso</li>
                </ul>
              </div>

              <p style="margin: 24px 0 20px; color: #64748b; font-size: 15px; line-height: 1.6;">
                Mientras tanto, si tienes alguna duda o prefieres contactarnos directamente, puedes escribirnos por WhatsApp.
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td align="center">
                    <a href="https://wa.me/52442506819?text=Hola%20ALDALU" 
                       style="display: inline-block; padding: 14px 28px; background-color: #25D366; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
                      💬 Escríbenos por WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 32px 40px; text-align: center; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0 0 12px 0; color: #1a1a1a; font-weight: 600; font-size: 15px;">
                ALDALU - Tu supermercado financiero
              </p>
              <p style="margin: 0; color: #999; font-size: 13px; line-height: 1.6;">
                Querétaro, México<br>
                <a href="https://aldalu.com.mx" style="color: #4ECDC4; text-decoration: none;">www.aldalu.com.mx</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}