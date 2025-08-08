const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// POST route
app.post("/submit", async (req, res) => {
  const { name, email, phone, address, skills, portfolio } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shishirprogramer7569@gmail.com",        // 🔁 Replace this
      pass: "wydqwgpunsvaiigm",           // 🔁 Use Gmail App Password
    },
  });

  const mailOptions = {
    from: email,
    to: "shishir.code3k@proton.me",           // 🔁 Where client receives mail
    subject: `New Work Application from ${name}`,
    html: `
      <h3>New Application Received</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Skills:</strong> ${skills}</p>
      <p><strong>Portfolio:</strong> ${portfolio || 'N/A'}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
