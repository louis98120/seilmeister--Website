const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { name, company, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' });
    }

    // Create transporter with checkdomain SMTP
    const transporter = nodemailer.createTransport({
      host: 'host286.checkdomain.de',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Map subject values to readable text
    const subjectMap = {
      'anfrage': 'Projektanfrage',
      'angebot': 'Angebotsanfrage',
      'kooperation': 'Kooperationsanfrage',
      'sonstiges': 'Sonstiges'
    };
    const subjectText = subjectMap[subject] || subject;

    // Email content
    const mailOptions = {
      from: `"Seilmeister Website" <kontakt1@seil-meister.de>`,
      to: 'kontakt1@seil-meister.de',
      replyTo: email,
      subject: `Kontaktanfrage: ${subjectText}`,
      html: `
        <h2>Neue Kontaktanfrage über die Website</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Unternehmen:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${company || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">E-Mail:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Telefon:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Betreff:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${subjectText}</td>
          </tr>
        </table>
        <h3 style="margin-top: 20px;">Nachricht:</h3>
        <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</p>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
        <p style="color: #999; font-size: 12px;">Diese E-Mail wurde über das Kontaktformular auf seil-meister.de gesendet.</p>
      `,
      text: `
Neue Kontaktanfrage über die Website

Name: ${name}
Unternehmen: ${company || '-'}
E-Mail: ${email}
Telefon: ${phone || '-'}
Betreff: ${subjectText}

Nachricht:
${message}

---
Diese E-Mail wurde über das Kontaktformular auf seil-meister.de gesendet.
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'E-Mail wurde erfolgreich gesendet.' });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({
      error: 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.',
      debug: error.message,
      code: error.code
    });
  }
};
