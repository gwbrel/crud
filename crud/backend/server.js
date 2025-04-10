require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
        return;
    }
    console.log("Conectado ao MySQL");
});

// Criar usuário
app.post("/users", (req, res) => {
    const { nome, email, pswd } = req.body;
    const sql = "INSERT INTO users (nome, email, pswd) VALUES (?, ?, ?)";
    db.query(sql, [nome, email, pswd], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Usuário criado!", id: result.insertId });
    });
});

// Listar usuários
app.get("/users", (req, res) => {
    db.query("SELECT id, nome, email FROM users", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Buscar usuário por ID
app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT id, nome, email FROM users WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0] || {});
    });
});

// Atualizar usuário
app.put("/users/:id", (req, res) => {
    const { nome, email, pswd } = req.body;
    const { id } = req.params;
    const sql = "UPDATE users SET nome = ?, email = ?, pswd = ? WHERE id = ?";
    db.query(sql, [nome, email, pswd, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Usuário atualizado!" });
    });
});

// Deletar usuário
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Usuário deletado!" });
    });
});

app.listen(9090, () => {
    console.log("Servidor rodando na porta 9090");
});


