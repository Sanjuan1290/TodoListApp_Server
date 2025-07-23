const jwt = require('jsonwebtoken')

class CustomError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }   
}

function errorHandler(err, req, res, next){
    const message = err.message || "Something wen't wrong."
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({ message })
}

async function auth(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) throw new CustomError('Unauthorized', 401)

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next()
    }catch(error){
        throw new CustomError('Invalid or expired token', 401)
    }
}

module.exports = { errorHandler, CustomError, auth }