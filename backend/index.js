const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS: permite que el Front-End (otro contenedor) haga peticiones a esta API
app.use(cors());
app.use(express.json());

// Conexión a MySQL usando variables de entorno
const db = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'apppassword',
  database: process.env.DB_NAME || 'appdb',
  waitForConnections: true,
  connectionLimit: 10,
});

// GET / — Estado de la API
app.get('/', (req, res) => {
  res.json({ mensaje: 'API del proyecto Fullstack funcionando', status: 'ok' });
});

// GET /api/usuarios — Obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST /api/usuarios — Crear un nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const { nombre, email } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Se requiere nombre y email' });
  }
  db.query(
    'INSERT INTO usuarios (nombre, email) VALUES (?, ?)',
    [nombre, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ mensaje: 'Usuario creado', id: result.insertId, nombre, email });
    }
  );
});

// DELETE /api/usuarios/:id — Eliminar un usuario
app.delete('/api/usuarios/:id', (req, res) => {
  db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Usuario eliminado' });
  });
});

// GET /api/db-test — Verificar conexión con la base de datos
app.get('/api/db-test', (req, res) => {
  db.query('SELECT 1 + 1 AS resultado', (err, results) => {
    if (err) return res.status(500).json({ error: 'Sin conexión con la base de datos', detalle: err.message });
    res.json({ mensaje: 'Conexión exitosa con MySQL', resultado: results[0].resultado });
  });
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto ${PORT}`);
});
