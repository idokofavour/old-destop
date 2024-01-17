const path = require('path')
const express = require('express');
const cors = require('cors');

require('dotenv').config()
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB()
const app = express();

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// Cors middleware
app.use(cors({
    origin: ['http://localhost:8000', 'http://localhost:3000'],
    credentials: true,
}))

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the TodoList API' })
})

const listsRouter = require('./route/lists');
app.use('/api/lists', listsRouter);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
