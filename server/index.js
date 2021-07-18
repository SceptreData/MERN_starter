const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const db = require('./db')
const movieRouter = require('./routes/MoviesRouter')

const app = express()
const API_PORT = 3000



app.use(express.json())
app.use(express.urlencoded({
	extended: true
}))
app.use(cors())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))


app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.use('/api', movieRouter)

app.listen(API_PORT, ()=> console.log(`Server running on ${API_PORT}`))