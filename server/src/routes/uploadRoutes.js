import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../../public/uploads');

// Ensure directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

router.post('/', requireAdmin, (req, res) => {
  try {
    const { image, filename } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: 'Aucune image reçue' });
    }

    // If it's a data URL (data:image/png;base64,....)
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      // It's already a normal web URL
      return res.json({ success: true, url: image });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    let ext = '.jpg';
    if (mimeType.includes('png')) ext = '.png';
    else if (mimeType.includes('webp')) ext = '.webp';
    else if (mimeType.includes('jpeg')) ext = '.jpg';
    else if (mimeType.includes('gif')) ext = '.gif';

    const safeName = (filename || 'produit')
      .replace(/\.[^/.]+$/, '') // remove existing extension
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);

    const uniqueFilename = `${Date.now()}-${safeName}${ext}`;
    const filePath = path.join(uploadsDir, uniqueFilename);

    fs.writeFileSync(filePath, buffer);

    const host = req.get('host') || 'localhost:5000';
    const protocol = req.protocol || 'http';
    const fileUrl = `${protocol}://${host}/uploads/${uniqueFilename}`;

    return res.json({
      success: true,
      url: fileUrl,
      filename: uniqueFilename
    });
  } catch (error) {
    console.error('Erreur upload image:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
