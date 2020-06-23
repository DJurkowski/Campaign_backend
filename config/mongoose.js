const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const db = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@database-w54dm.mongodb.net/campaign?retryWrites=true&w=majority`;

        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log('MongoDB Connected ...');

    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;