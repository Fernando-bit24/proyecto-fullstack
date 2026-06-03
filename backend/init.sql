-- Script de inicialización de la base de datos
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de ejemplo
INSERT INTO usuarios (nombre, email) VALUES
  ('Fernando García', 'l221140029@surnayarit.tecnm.mx'),
  ('Ana López', 'ana.lopez@ejemplo.com'),
  ('Carlos Ramos', 'carlos.ramos@ejemplo.com');
