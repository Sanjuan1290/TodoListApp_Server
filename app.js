require('dotenv').config()
require('express-async-errors')

const express = require('express');
const app = express();
const userRouter = require('./router/userRouter')
const connectDB = require('./db/connect')
const cors = require('cors')
const { errorHandler } = require('./util')

app.use(express.json())

app.use('/api/v1', userRouter)

cors()

app.use(errorHandler)

const port = process.env.PORT || 3000
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port)
        console.log('server is listening in port:', port);
    }catch(err){
        console.error(err, ': listen port Error');
    }
}

start()