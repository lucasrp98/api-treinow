import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { openDb } from "../db/configDB.js";

const dbPromise = openDb();

const SECRET = 'secret_key';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, SECRET, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {

  const tokenHeader = req.headers["authorization"];
  const token = tokenHeader && tokenHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.userId = decoded.id;
    next();
  });
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const db = await dbPromise;
    const usuario = await db.get(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (!usuario) {
      return res
        .status(404)
        .json({ message: 'Usuário não encontrado' });
    }

    bcrypt.compare(senha, usuario.senha, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erro no servidor' });
      }

      // console.log(result);

      if (!result) {
        return res
          .status(401)
          .json({ message: 'Usuário não autorizado' });
      }

      const token = generateToken(usuario.id);

      res.json({ message: 'Login bem-sucedido', token });

    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};


export default {
  verifyToken,
  login,
};
