const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear el servidor
const app = express();


//Puerto de la app
const port = process.env.port || 4000;

//Conectar a la base de datos
conectarDB();

//Habilita cors
app.use(cors());

//Habilitar express.json
app.use(express.json({ extended: true }))

app.use('/api/users', require('./routes/users'));
app.use('/api/games', require('./routes/games'));

//arranca la app
// arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});