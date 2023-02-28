import { openDb } from "../db/configDB.js";
import bcrypt from 'bcrypt';


export async function createTable () {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS usuarios(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, documento TEXT, tipo TEXT, senha TEXT)') 
    })
}

export async function insertUsuario (usuario) {
    const hashedSenha = await bcrypt.hash(usuario.senha, 10);
    openDb().then(db => {
        db.run('INSERT INTO usuarios(nome,email,documento,tipo,senha) VALUES (?, ?, ?, ?, ?)', 
        [usuario.nome, usuario.email, usuario.documento, usuario.tipo, hashedSenha]) 
    })
}

export async function updateUsuario (usuario) {
    const hashedSenha = await bcrypt.hash(usuario.senha, 10);
    openDb().then(db => {
        db.run('UPDATE usuarios SET nome=?,email=?,documento=?,tipo=?,senha=? WHERE id=?', 
        [usuario.nome, usuario.email, usuario.documento, usuario.tipo, hashedSenha, usuario.id]) 
    })
}
