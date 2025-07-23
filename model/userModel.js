const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please enter your name.'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        trim: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email.']
    },
    password: {
        type: String,
        required: [true, 'Please provide your password.'],
        minlength: [6, 'Password must be at least 6 characters long.']
    },
    tasks: {
        type: [{
            title: String,
            description: String,
            priority: {
                type: String,
                enum: ['Low', "High"],
                default: 'Low'
            },
            dueDate: Date,
            status: {
                type: String,
                enum: ['Pending', "Completed"],
                default: 'Pending'
            }
        }]
    }
})

module.exports = mongoose.model('User', userSchema)