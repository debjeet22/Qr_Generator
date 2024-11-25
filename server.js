const express = require("express");
const bodyParser = require("body-parser");
const QRCode = require("qrcode");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files from "public" directory

// Route to generate QR code
app.post("/generate", async (req, res) => {
  const { link, color, bgColor } = req.body;

  if (!link) {
    return res.status(400).send({ error: "Link is required!" });
  }

  try {
    const options = {
      color: {
        dark: color || "#000000", // QR code color
        light: bgColor || "#ffffff", // Background color
      },
    };

    const qrCodeDataURL = await QRCode.toDataURL(link, options);
    res.send({ qrCode: qrCodeDataURL });
  } catch (error) {
    res.status(500).send({ error: "Failed to generate QR code." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
