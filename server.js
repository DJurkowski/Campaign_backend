const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongoose');
const app = express();

app.use(cors());

app.use(express.json({extended: false}));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started in port ${PORT}`));