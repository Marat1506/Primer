const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { createMovie, getMovies, updateMovie, deleteMovie, addComments } = require('./moviesService')
const { createDirector } = require('./directorService')
const { checkMovie } = require('./validate')
const {validationResult} = require('express-validator')
const { createUser, authorization, getUser } = require('./UserService')


const app = express()

const port = 3000

const url = 'mongodb://localhost:27017/main';

mongoose.connect(url)

app.use(express.json())
app.use(cors())

app.get('/movies', (req, res) => {
    getMovies(req, res)
})
app.post('/movies', checkMovie, (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    createMovie(req, res)
})
app.put('/movies', async (req, res) => {
    updateMovie(req, res)
})
app.delete('/movies', async (req, res) => {
    deleteMovie(req, res)
})


app.route('/director')
    .post((req, res) => {
        createDirector(req, res)
    })

app.listen(port, () => {
    console.log("conncet to 3000 port")
})


app.post('/createUser', async(req, res) => {
    createUser(req, res)
})

app.get('/auth', async(req, res) => {
    authorization(req, res)
})

app.get('/getUser', async(req, res) => {
    getUser(req, res)
})

module.exports = {app}