import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

// Tipos
interface ContactFormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Sanitización (igual que en frontend, pero más estricta)
function sanitizeString(str: string): string {
  return str
    .trim()
    .replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[m] || m)
    )
    .slice(0, 1000);
}

// Validación en servidor
function validateContactData(data: unknown): data is ContactFormData {
  if (typeof data !== "object" || data === null) return false;

  const obj = data as Record<string, unknown>;

  // Validar nombre
  if (typeof obj.nombre !== "string" || obj.nombre.trim().length < 3) {
    return false;
  }
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(obj.nombre)) {
    return false;
  }

  // Validar email
  if (typeof obj.email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(obj.email)) {
    return false;
  }

  // Validar asunto
  const validSubjects = ["consulta", "reserva", "disponibilidad", "otro"];
  if (typeof obj.asunto !== "string" || !validSubjects.includes(obj.asunto)) {
    return false;
  }

  // Validar mensaje
  if (typeof obj.mensaje !== "string" || obj.mensaje.trim().length < 10) {
    return false;
  }

  return true;
}

// Crear transporter de Nodemailer
async function createTransporter() {
  const emailUser = process.env.SMTP_EMAIL;
  const emailPass = process.env.SMTP_PASSWORD;

  if (!emailUser || !emailPass) {
    throw new Error("SMTP_EMAIL y SMTP_PASSWORD no están configuradas");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
}

// Mapear asunto a descripción
function getSubjectLabel(asunto: string): string {
  const labels: Record<string, string> = {
    consulta: "Consulta General",
    reserva: "Información sobre Reserva",
    disponibilidad: "Consultar Disponibilidad",
    otro: "Otro",
  };
  return labels[asunto] || asunto;
}

// Endpoint POST
export const POST: APIRoute = async ({ request }) => {
  // Solo aceptar POST
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Método no permitido",
      } as ApiResponse),
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // Parsear el body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          message: "JSON inválido",
        } as ApiResponse),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validar los datos
    if (!validateContactData(body)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Datos inválidos",
        } as ApiResponse),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Sanitizar los datos
    const sanitizedData: ContactFormData = {
      nombre: sanitizeString(body.nombre),
      email: body.email.trim().toLowerCase(),
      asunto: body.asunto,
      mensaje: sanitizeString(body.mensaje),
    };

    // Crear transporter
    const transporter = await createTransporter();

    // HTML para el email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
            .header { background-color: #d97706; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: white; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #d97706; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
            .value { margin-top: 5px; padding: 10px; background-color: #f0f0f0; border-left: 3px solid #d97706; }
            .footer { text-align: center; font-size: 12px; color: #999; padding: 20px; border-top: 1px solid #eee; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📬 Nuevo Mensaje de Contacto</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nombre</div>
                <div class="value">${sanitizedData.nombre}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${sanitizedData.email}">${
      sanitizedData.email
    }</a></div>
              </div>
              <div class="field">
                <div class="label">Asunto</div>
                <div class="value">${getSubjectLabel(
                  sanitizedData.asunto
                )}</div>
              </div>
              <div class="field">
                <div class="label">Mensaje</div>
                <div class="value" style="white-space: pre-wrap;">${
                  sanitizedData.mensaje
                }</div>
              </div>
            </div>
            <div class="footer">
              <p>Este mensaje fue enviado desde el formulario de contacto de Mirador de Luz</p>
              <p>${new Date().toLocaleString("es-AR")}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar email
    await transporter.sendMail({
      from: sanitizedData.email,
      replyTo: sanitizedData.email,
      to: process.env.CONTACT_EMAIL || "miradordeluz2019@gmail.com",
      subject: `[Mirador de Luz] ${getSubjectLabel(sanitizedData.asunto)} - ${
        sanitizedData.nombre
      }`,
      html: htmlContent,
      text: `
Nuevo mensaje de contacto:

Nombre: ${sanitizedData.nombre}
Email: ${sanitizedData.email}
Asunto: ${getSubjectLabel(sanitizedData.asunto)}

Mensaje:
${sanitizedData.mensaje}
      `,
    });

    // Email de confirmación al usuario
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL || "miradordeluz2019@gmail.com",
      to: sanitizedData.email,
      subject: "Hemos recibido tu mensaje - Mirador de Luz",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { color: #d97706; padding-bottom: 10px; border-bottom: 2px solid #d97706; }
              .content { padding: 20px 0; }
              .button { background-color: #d97706; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 15px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>¡Hemos recibido tu mensaje!</h2>
              </div>
              <div class="content">
                <p>Hola ${sanitizedData.nombre},</p>
                <p>Gracias por contactarte con <strong>Mirador de Luz</strong>. Hemos recibido tu mensaje correctamente y nos pondremos en contacto contigo a la brevedad posible.</p>
                <p><strong>Detalles de tu mensaje:</strong></p>
                <ul>
                  <li><strong>Asunto:</strong> ${getSubjectLabel(
                    sanitizedData.asunto
                  )}</li>
                  <li><strong>Email:</strong> ${sanitizedData.email}</li>
                  <li><strong>Fecha:</strong> ${new Date().toLocaleString(
                    "es-AR"
                  )}</li>
                </ul>
                <p>Si tienes más preguntas, no dudes en escribirnos nuevamente.</p>
                <p><strong>¡Esperamos poder ayudarte pronto!</strong></p>
                <p style="margin-top: 30px; color: #999; font-size: 12px;">
                  Mirador de Luz | Villa Santa Cruz del Lago, Córdoba, Argentina<br>
                  WhatsApp: +54 9 3813 51 3513<br>
                  <a href="https://instagram.com/miradordeluz">Instagram</a> | <a href="https://facebook.com/miradordeluz">Facebook</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Hola ${sanitizedData.nombre},

Gracias por contactarte con Mirador de Luz. Hemos recibido tu mensaje correctamente y nos pondremos en contacto contigo a la brevedad posible.

Detalles de tu mensaje:
- Asunto: ${getSubjectLabel(sanitizedData.asunto)}
- Email: ${sanitizedData.email}
- Fecha: ${new Date().toLocaleString("es-AR")}

¡Esperamos poder ayudarte pronto!

Mirador de Luz
Villa Santa Cruz del Lago, Córdoba, Argentina
      `,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Mensaje enviado correctamente. Pronto nos comunicaremos contigo.",
      } as ApiResponse),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error en endpoint de contacto:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Error al enviar el mensaje. Por favor intenta más tarde.",
        error: error instanceof Error ? error.message : "Error desconocido",
      } as ApiResponse),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
