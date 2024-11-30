const mongoose = require('mongoose')
const {Schema} = mongoose 


async function addComments(req, res){
    try {
        const { comments } = req.body;
        console.log("comments = ", comments)

        console.log("Доб")
        const movies = await Movies.findByIdAndUpdate(
            { _id: '66620688244bfd43082cb180' },
            { comments },
            { new: true }
        )
        if (!movies) {
            return res.status(404).send("Фильм не найден");
        }
        console.log("comm = ", movies)
        console.log("Комментарий добавлен")
        return res.status(200).send("Комментарий добавлен");
    } catch (exc) {
        console.log("Ошибка при добавлении комментария: " + exc)
    }

}