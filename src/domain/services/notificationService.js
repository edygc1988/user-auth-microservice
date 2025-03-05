require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

class NotificationService {
  static async sendEmail(to, subject, html) {
    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL_USER,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken.token,
        },
      });

      const mailOptions = {
        from: `Notificaciones <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html, // Se usa HTML en lugar de texto plano
      };

      await transporter.sendMail(mailOptions);
      console.log("📧 Email enviado con éxito a:", to);
    } catch (error) {
      console.error("❌ Error enviando el email:", error);
    }
  }

  static async sendLoginEmail(to) {

    const ipResponse = await fetch("https://api64.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    const locationResponse = await fetch(`http://ip-api.com/json/${ip}`);
    const locationData = await locationResponse.json();
    const location = `${locationData.city}, ${locationData.country}`;

    const time = new Date().toLocaleString();
    const subject = "🔑 Notificación de Inicio de Sesión";
    const html = `
      <h2>Se detectó un inicio de sesión</h2>
      <p>Detalles:</p>
      <ul>
        <li><strong>IP:</strong> ${ip}</li>
        <li><strong>Ubicación:</strong> ${location}</li>
        <li><strong>Fecha y hora:</strong> ${time}</li>
      </ul>
      <p>Si no reconoces este inicio de sesión, cambia tu contraseña de inmediato.</p>
    `;
    await this.sendEmail(to, subject, html);
  }

  static async sendUserRegistrationEmail(to, name) {
    const subject = "🎉 Bienvenido a Nuestro Sistema";
    const html = `
      <h2>Hola, ${name} 👋</h2>
      <p>Gracias por registrarte en nuestra plataforma.</p>
      <p>Puedes iniciar sesión con tus credenciales y comenzar a usar el sistema.</p>
    `;
    await this.sendEmail(to, subject, html);
  }

  static async sendCompanyRegistrationEmail(to, companyName) {
    const subject = "🏢 Empresa Registrada con Éxito";
    const html = `
      <h2>Registro exitoso de empresa</h2>
      <p>La empresa <strong>${companyName}</strong> ha sido registrada correctamente.</p>
      <p>Puedes acceder al sistema con la cuenta del administrador.</p>
    `;
    await this.sendEmail(to, subject, html);
  }

  static async sendPersonRegistrationEmail(to, personName) {
    const subject = "✅ Registro de Persona Individual";
    const html = `
      <h2>Hola, ${personName}!</h2>
      <p>Tu registro en nuestra plataforma ha sido exitoso.</p>
      <p>Ya puedes acceder con tus credenciales.</p>
    `;
    await this.sendEmail(to, subject, html);
  }

  static async sendEmployeeRegistrationEmail(to, employeeName, employerName) {
    const subject = "👨‍💼 Te han registrado como empleado";
    const html = `
      <h2>Hola, ${employeeName}!</h2>
      <p>Has sido registrado como empleado en nuestra plataforma bajo el empleador <strong>${employerName}</strong>.</p>
      <p>Puedes acceder a tu cuenta y empezar a marcar tus horarios.</p>
    `;
    await this.sendEmail(to, subject, html);
  }
}

module.exports = NotificationService;
