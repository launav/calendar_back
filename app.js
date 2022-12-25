const express = require('express');
const { DBConnection } = require('./database/config')
const cors = require('cors')

// DOTENV
require('dotenv').config();

//SERVIDOR EXPRESS
const app = express();
const port = process.env.PORT || 3000;

//CONECTAR A BBDD
DBConnection();


//CORS
app.use(cors());


//CONFIGURAR CARPETA PUBLIC|| use es un middleworld
app.use(express.static(__dirname + '/public'))


//PARSEAR EL JSON
app.use(express.json());


//RUTAS
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/events', require('./routes/calendarRoutes'));


//PONER PUERTO A LA ESCUCHA
app.listen(port, () => {
    console.log(`Servidor a la escucha del puerto ${port}`);
});