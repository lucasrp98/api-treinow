import express from "express";
import authController from "../controller/AuthController.js";

const router = express.Router();

router.post('/login', authController.login);

router.get('/protegido', authController.verifyToken, (req, res) => {
  res.json({ message: 'Acesso permitido' });
});

export default router