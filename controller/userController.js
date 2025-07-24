const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { CustomError } = require('../util')

const register = async (req, res) => {
    const { fullName, email, password } = req.body

    try{
        const existingUser = await User.findOne({ email })

        if(existingUser){
            res.status(409).json({ message: 'Email already in use.' })
            return
        }

        if(password.length < 6) {
            res.status(400).json({ message: 'Password must be at least 6 characters long.' })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create( { fullName, email, password: hashedPassword } )

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(201).json({ message: 'Successfully created an account.', token })
    }catch(error){
        console.error(error);
        console.error('Register Failed!');
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try{
        const user = await User.findOne({ email })

        if(!user){
            res.status(404).json({ message: 'User does not exist.' })
            return
        } 
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(400).json({ message: 'Wrong Password. Try again.' })
            return
        } 
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})

        res.status(200).json({ message: 'Login Successfully.', token, tasks: user.tasks })

    }catch(error){
        console.error(error);
        console.error('Login Failed!');
    }
}

const verify = async (req, res) => {
    const { id } = req.user
    const user = await User.findOne({ _id: id })

    if(!user){
        throw new CustomError("User cannot be found after verifying the JWT!", 404)
    }

    res.status(200).json({ message: "Token valid", tasks: user.tasks })
}

const addTask = async (req, res) => {
    const authHeader = req.headers.authorization
    const { title, description, priority, dueDate, status } = req.body

    if(!authHeader || !authHeader.startsWith('Bearer')) throw new CustomError('Unauthorized', 401)

    const token = authHeader.split('Bearer ')[1]
    const { id } = jwt.verify(token, process.env.JWT_SECRET)

    const updatedUser = await User.findOneAndUpdate( 
        {_id: id}, { $push: { tasks: { title, description, priority, dueDate: new Date(dueDate), status } } }, {new: true} )

    console.log(updatedUser);
    if(!updatedUser) throw new CustomError("User not found! this shouldn't happen btw")

    res.status(200).json({ message: 'Added Task Successfully.', tasks: updatedUser.tasks})
}

const editTask = async (req, res) => {
    
}

const removeTask = async (req, res) => {
    
}

module.exports ={ register, login, verify, addTask, editTask, removeTask }