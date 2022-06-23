const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

//console.log(process.env);

const app = express();

//Data Base
dbConnection();



app.use( cors() );

app.use( express.json() );

//public
app.use( express.static('public') );

//routes
app.use( '/api/auth', require('./routes/auth') );

app.listen( process.env.PORT, () => {
    console.log(`running in ${ process.env.PORT }`);
    }
);