import { openDb } from "../db/configDB.js";

export async function createTabelaTreinos() {
  return openDb().then((db) => {
    return db.exec(
      'CREATE TABLE IF NOT EXISTS treinos(id_treinos INTEGER PRIMARY KEY AUTOINCREMENT, data_inicio DATE, hora_inicio TIME, usuario_id INTEGER, FOREIGN KEY(usuario_id) REFERENCES usuarios(id) )'
    );
  });
}

const registerWorkout = async (req, res) => {
  try {
    const db = await openDb();

    const userId = req.userId;
    const { data_inicio, hora_inicio } = req.body;

    await db.run(
      'INSERT INTO treinos (data_inicio, hora_inicio, usuario_id) VALUES (?, ?, ?)',
      [data_inicio, hora_inicio, userId]
    );
    
    res.json({ message: 'Treino registrado com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

export default {
  registerWorkout,
};
