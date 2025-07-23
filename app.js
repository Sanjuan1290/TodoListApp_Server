require('dotenv').config
require('express-async-errors')

const express = require('express');
const app = express();
const cors = require('cors')
const { errorHandler } = require('./util')

app.use(express.json())



cors()

app.use(errorHandler)

const port = process.env.PORT || 3000
const start = () => {
    try{
        app.listen(port)
        console.log('server is listening in port:', port);
    }catch(err){
        console.error(err, ': listen port Error');
    }
}

start()