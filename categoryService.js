const mongoose = require('mongoose')

const CategorySchema = Schema({
    name: String,
    categories: Array
})

export const Category = mongoose.model("categories", CategorySchema)