const mongoose = require('mongoose')
const {Schema} = mongoose
const { v4: uuidv4 } = require('uuid');

const directorSchema = Schema({
    name: String,
    moviesId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movies' }]

})


const Director = mongoose.model('directors', directorSchema)


function createDirector(req, res){
    try {
        const directorData = {
            name: req.body.name,
            moviesId: req.body.moviesId || []
        };
        Director.create(directorData)
        console.log("Директор создан")
        return res.status(200).send("Директор создан")
    } catch (error) {
        return res.status(500).send("Ошибка при создании директора")
        
    }
}

module.exports = {Director, createDirector}