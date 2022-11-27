const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

// Servidor de Express
const app = express();

// Base de Datos
dbConnection();

// CORS
app.use(cors());

// Directorio Público - Aplicacion React
app.use(express.static('public'));

// Lectura y Parseo de Body
app.use(express.json());

// Rutas

// Autenticación
app.use('/api/auth', require('./routes/auth'));

// Evntos de Calendario
app.use('/api/events', require('./routes/events'));

// Mostrar frontend para la ruta auth/login
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// CRUD de eventos

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});