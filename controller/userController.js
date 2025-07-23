const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { CustomError } = require('../util')

const register = async (req, res) => {
    const { fullName, email, password } = req.body

    try{
        const existingUser = User.findOne({ email })

        if(existingUser) throw new CustomError('Email already in use.', 409)
        if(password.length < 6) throw new CustomError('Password must be at least 6 characters long.', 400)

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create( { fullName, email, password: hashedPassword } )

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiredIn: '1h' })

        res.status(201).json({ message: 'Successfully created an account.', token })
    }catch(error){
        console.error(error);
        console.error('Register Failed!');
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try{
        const user = User.findOne({ email })

        if(!user) throw new CustomError('User does not exist.', 404)

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) throw new CustomError('Wrong Password. Try again.', 400)

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})

        res.status(200).json({ message: 'Login Successfully.', token, tasks: user.tasks })

    }catch(error){
        console.error(error);
        console.error('Register Failed!');
    }
}


module.exports ={ register, login }