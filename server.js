const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la raíz del proyecto
app.use(express.static(path.join(__dirname)));

// Configuración de multer - guardar temporalmente y luego mover con nombre fijo
const upload = multer({ dest: path.join(__dirname, 'uploads/'), limits: { fileSize: 5 * 1024 * 1024 } });

app.post('/upload-logo', upload.single('logo'), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, message: 'No file' });

  const targetPath = path.join(__dirname, 'assets', 'renova.jpg');

  fs.rename(req.file.path, targetPath, (err) => {
    if (err) {
      console.error('Error saving file:', err);
      return res.status(500).json({ ok: false, message: 'Error saving file' });
    }
    return res.json({ ok: true, path: '/assets/renova.jpg' });
  });
});

// Crear carpeta uploads si no existe
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
