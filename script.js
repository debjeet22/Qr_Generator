// script.js
document.addEventListener("DOMContentLoaded", () => {
  const qrData = document.getElementById("qrData");
  const qrTitle = document.getElementById("qrTitle");
  const qrSize = document.getElementById("qrSize");
  const qrColor = document.getElementById("qrColor");
  const qrFrame = document.getElementById("qrFrame");
  const generateBtn = document.getElementById("generateBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const qrCanvas = document.getElementById("qrCanvas");
  const qrCodeTitle = document.getElementById("qrCodeTitle");
  const spinner = document.getElementById("spinner");
  const charCount = document.getElementById("charCount");

  let qrCode; // Declare the QRious instance variable

  qrData.addEventListener("input", () => {
      charCount.textContent = `${qrData.value.length} / 300 characters`;
  });

  generateBtn.addEventListener("click", () => {
      const data = qrData.value.trim();
      const size = parseInt(qrSize.value);
      const color = qrColor.value;
      const title = qrTitle.value.trim();

      if (!data) {
          alert("Please enter text or a valid URL.");
          return;
      }

      // Show spinner during generation
      spinner.style.display = "block";

      setTimeout(() => {
          if (!qrCode) {
              qrCode = new QRious({
                  element: qrCanvas,
              });
          }

          qrCode.set({
              value: data,
              size: size,
              foreground: color,
          });

          // Add decorative frame if selected
          qrCanvas.style.border = qrFrame.checked ? "10px solid #007bff" : "none";

          // Display title if provided
          qrCodeTitle.style.display = title ? "block" : "none";
          qrCodeTitle.textContent = title;

          qrCanvas.style.display = "block";
          downloadBtn.disabled = false;

          // Hide spinner after generation
          spinner.style.display = "none";
      }, 1000); // Simulate loading delay
  });

  downloadBtn.addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = qrCanvas.toDataURL("image/png");
      link.download = "qr-code.png";
      link.click();
  });
});
