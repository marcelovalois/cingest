import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// These id's and secrets should come from .env file.
const CLIENT_ID = '425807355417-kevq2inenr1mkfjl7rqqb8akc8fj57pr.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04fE8-xFEBthPCgYIARAAGAQSNwF-L9IrULJfnzqU2IAiRvP78nOq3ImL55Px_gTAl3p7me0Gf2Ulxec8rewiMAizQf-cO8hVgz8';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(service=null) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'mmv147.valois@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'mmv147.valois@gmail.com',
      to: 'rjcs@cin.ufpe.br',
      subject: 'Relatório',
      text: service ? service : 'Hello from gmail email using API',
      // html: '<h1>Hello from gmail email using API</h1>',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

export default sendMail;
// sendMail()
//   .then((result) => console.log('Email sent...', result))
//   .catch((error) => console.log(error.message));