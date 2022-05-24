import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  secure: true,
  port: parseInt(process.env.MAIL_PORT, 10),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

type MailOptions = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export function sendEmail(args: MailOptions): Promise<any> {
  console.log(args);
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.MAIL_USER,
        to: args.to,
        subject: args.subject,
        text: args.text,
      },
      (err, info) => {
        if (info?.messageId) {
          resolve(info);
          return;
        }
        console.log(err);
        reject(err);
      },
    );
  });
}

export function sendDeferredEmail(args: MailOptions): void {
  transporter.once('idle', () => {
    if (transporter.isIdle()) {
      transporter.sendMail({
        from: process.env.MAIL_USER,
        to: args.to,
        subject: args.subject,
        text: args.text,
      });
    }
  });
}
