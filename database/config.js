const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
        throw new Error('Failed to connect to MongoDB');
    }
}

module.exports = {
    dbConnection
}