import express from 'express';
import workoutController from '../controller/WorkoutController.js';
import authController from '../controller/AuthController.js';

const router = express.Router();

router.post('/store/workout', authController.verifyToken, workoutController.registerWorkout);

export default router;
