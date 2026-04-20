import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { analyzeController } from '../controllers/analyzeController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/video', upload.single('videoFile'), analyzeController.analyzeVideo);
router.get('/:id', analyzeController.getAnalysisResult);
router.get('/history', analyzeController.getAnalysisHistory);
router.delete('/:id', analyzeController.deleteAnalysis);
router.get('/professional-actions', analyzeController.getProfessionalActions);

export default router;