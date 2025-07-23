
const mongoose = require('mongoose')

const connectDB = async (url) => {
    try {
        await mongoose.connect(url)
        console.log('Connected to Database.');
    }catch(error){
        console.error(error);
        console.error('Failed to connect in Database.');
    }
}

module.exports = connectDB