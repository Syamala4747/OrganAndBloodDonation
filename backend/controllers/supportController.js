import nodemailer from 'nodemailer';

export async function sendSupportEmail(req, res) {
  const { name, email, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'syamala7072@gmail.com',
        pass: 'your-app-password-here' // Use Gmail App Password
      }
    });

    await transporter.sendMail({
      from: email,
      to: 'syamala7072@gmail.com',
      subject: `Support Query from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
