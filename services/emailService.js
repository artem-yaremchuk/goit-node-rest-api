import nodemailer from "nodemailer";
import pug from "pug";
import { convert } from "html-to-text";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.from = process.env.EMAIL_FROM;
  }

  _initTransporter() {
    const transportConfig = {
      host: process.env.MAILGUN_HOST,
      port: process.env.MAILGUN_PORT,
      auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASS,
      },
    };

    return nodemailer.createTransport(transportConfig);
  }

  async _send(template, subject) {
    const html = pug.renderFile(
      path.join(process.cwd(), "views", "email", `${template}.pug`),
      {
        url: this.url,
        subject,
      },
    );

    const emailConfig = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    await this._initTransporter().sendMail(emailConfig);
  }

  async sendVerification() {
    await this._send("verify", "Account Verification");
  }
}
