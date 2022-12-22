const express = require('express');
require('dotenv').config({ path: `./app/config.env` });
const logger = require('morgan');
const cors = require('cors');
const printMessage = require('print-message');
const bodyParser = require('body-parser');
const apiRouter = require('./app/routes/api');
const app = express();
app.use( logger('dev') );

// PORT CONFIG
const PORT = process.env.PORT || 3000;

//CORS CONFIG
app.use(cors({ origin: '*' }));

// SE INICIALIZA LA BASE DE DATOS
const db = require('./app/db');

// SE SINCRONIZA LA BASE DE DATOS PARA IMPLEMENTAR LOS ULTIMOS CAMBIOS EN EL SERVIDOR SQL
//db.sequelize.sync({ force: true }).then(()=> { console.log('Base de datos sincronizada'); });

app.use( bodyParser.json({ limit: '50mb' }) );
app.use( bodyParser.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: true }) );


app.use('/api' , apiRouter);

app.use('/', (req, res) => res.json({ "name": "DATEO API", "api-version": "1.0", "services-status": 200, "port": PORT }) );

app.listen( PORT, () => 
{
    printMessage(
    [
        "Server: OK",
        `Port  : ${ PORT }`
    ], 
    {
        border: true, 
        color: 'green', 
        borderColor: 'red' 
    });    
});