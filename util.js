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

module.exports = { errorHandler, CustomError }