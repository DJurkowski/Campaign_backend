const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongoose');
const app = express();

app.use(cors());

connectDB();

app.use(express.json({extended: false}));

app.use('/api/projects', require('./routes/project'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started in port ${PORT}`));