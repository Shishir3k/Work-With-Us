const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { firstName, lastName, email, mobile, device, address, skills } = req.body;

  if (!firstName || !lastName || !email || !mobile || !device || !address || !skills) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const fullName = `${firstName} ${lastName}`;
    const emailBody = `
New Join Application:

Full Name: ${fullName}
Email: ${email}
Mobile: ${mobile}
Device: ${device}
Address: ${address}

What they can do:
${skills}
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Join Application from ${fullName}`,
      text: emailBody
    });

    res.status(200).json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};
