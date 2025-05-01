import express from 'express';
import { 
  registerTrainer, 
  getTrainers, 
  getTrainerById,
  loginTrainer,
  logoutTrainer
} from '../controllers/trainer.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

router.post('/', upload.single('profilePicture'), registerTrainer);
router.post('/login', loginTrainer);
router.post("/logout", logoutTrainer);


router.get('/', getTrainers);
router.get('/:id', getTrainerById);
// router.put('/:id', protect, admin, upload.single('profilePicture'), updateTrainer);
// router.delete('/:id', protect, admin, deleteTrainer);


export { router as trainerRoute };

