const mongoose = require('mongoose')
const { Schema } = mongoose
const { v4: uuidv4 } = require('uuid');
const { Director } = require('./directorService')

const MoviesSchema = Schema({
    title: String,
    rating: Number,
    comments: Array,
    // directorId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'directors'
    // },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    }

})

const Movies = mongoose.model("movies", MoviesSchema)

async function getMovies(req, res) {
    try {
        const {rating} = req.query;
        console.log("gg = ", rating)
        const movies = await Movies.find({rating: rating})
        console.log(movies);
        return res.status(200).json(movies);
    } catch (error) {
        return res.status(500).send("Ошибка при получении фильмов");
    }
}

async function createMovie(req, res) {
    try {
        const movieData = {
            title: req.body.title,
            rating: req.body.rating,
            comments: req.body.comments || [],
            // directorId: req.body.directorId,
            category: req.body.category || [],

        };
        const movie = await Movies.create(movieData);

        await Director.findByIdAndUpdate(req.body.directorId, {
            $push: { moviesId: movie._id }
        });
        return res.status(201).send("movie created")
    } catch (err) {
        return res.status(500).send("Ошибка при добавлении фильма: " + err)
    }
}

async function updateMovie(req, res) {
    try {
        const { id } = req.body
        console.log("id = ", id)
        const movie = await Movies.findByIdAndUpdate(
            { _id: id },
            {
                title: req.body.title,
                rating: req.body.rating,
                comments: req.body.comments,
                directorId: req.body.directorId
            },
            {
                new: true
            }
        );
        if (!movie) {
            return res.status(404).send("Фильм не найден");
        }
        console.log("movUp = ", movie);
        console.log("Фильм изменен");
        return res.status(200).send("Фильм изменен");
    } catch (exc) {
        return res.status(500).send("Ошибка при изменении: " + exc);
    }
}

async function deleteMovie(req, res) {
    try {
        const movie = await Movies.findByIdAndDelete(req.body.id)

        if (!movie) {
            return res.status(404).send("Фильм не найден")
        }
        console.log("movDel = ", movie)

        console.log("Фильм удален")
        return res.status(200).send("Фильм удален")
    } catch (exc) {
        console.log("Ошибка при удалении: ", exc)
    }
}

async function addComments(req, res) {
    try {
        const { comment } = req.body;
        console.log("comments = ", comment)

        console.log("Доб")
        const movies = await Movies.findByIdAndUpdate(
            { _id: '66620688244bfd43082cb180' },
            { $push: { comments: { id: `${uuidv4()}`, comment } } },
            { new: true }
        )
        if (!movies) {
            return res.status(404).send("Фильм не найден");
        }
        console.log("comm = ", movies)
        console.log("Комментарий добавлен")
        return res.status(200).send("Комментарий добавлен")
    } catch (exc) {
        console.log("Ошибка при добавлении комментария: " + exc)
    }

}

function deleteComments(req, res) {

}
module.exports = { createMovie, updateMovie, getMovies, deleteMovie, addComments };