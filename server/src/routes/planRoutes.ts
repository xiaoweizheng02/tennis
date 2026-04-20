import express from 'express';
import { planController } from '../controllers/planController.js';

const router = express.Router();

router.post('/', planController.createPlan);
router.get('/:id', planController.getPlan);
router.get('/', planController.getPlans);
router.put('/:id', planController.updatePlan);
router.delete('/:id', planController.deletePlan);
router.put('/:id/complete', planController.completePlan);
router.get('/recommended', planController.getRecommendedPlans);

export default router;