import express from "express";
import { insertUsuario,  updateUsuario} from "../controller/UserController.js";

const router = express.Router();

router.get('/users', (req, res) => {
    res.json({ msg: "Funcionando!" });
});

router.post('/user', (req, res) => {
    insertUsuario(req.body);
    res.json({ msg: "Usuário adicionado!" });
})

//Ajustar a verificação do ID
router.put('/user', (req, res) => {
    if (req.body && !req.body.id) {
        res.json({ msg: "ID não encontrado", statusCode: 400 });
    } else {
        updateUsuario(req.body);
        res.json({ msg: "Usuário atualizado!" });
    }
})


// router.post("/login", authController.login)

export default router