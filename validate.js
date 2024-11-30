const { body } = require('express-validator')

const checkMovie = [
    body('title', 'Отсутствует поле title').trim().isLength({ min: 3 }),
    body('rating', 'Значение должно быть в диапазоне от 0 до 10').isInt({ min: 0, max: 10 }),
    body('comments', 'Отсутствует поле comments').isArray(),
    body('directorId', 'Отсутствует поле directorId').notEmpty()
]
module.exports = { checkMovie }