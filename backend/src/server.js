require('dotenv').config();
const routes = require('./routes/index.js');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// creating app
const app = express()

// cors
app.use(cors());



// MongoDB connection
mongoose.connect(process.env.DATABASE_URL, {})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB:', err));

//middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})



//routes
app.use('/', routes)




// server listen

app.listen(process.env.PORT, () => {
    console.log('listenning on port', process.env.PORT)
})
