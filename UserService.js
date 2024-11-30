const { Schema, default: mongoose } = require("mongoose");
const jwt = require('jsonwebtoken');



const UserSchema = Schema({
    email: String,
    username: String,
    roles: [String],
    token: String,

})

const User = mongoose.model('User', UserSchema)


async function createUser(req, res) {
    try {
        const token = await jwt.sign({ email: req.body.email }, 'secret')
        const userData = {
            email: req.body.email,
            username: req.body.username,
            roles: req.body.roles,
            token: token
        }
        const user = await User.create(userData)
        return res.status(201).json("Пользователь создан")
    } catch (error) {
        return res.status(500).json("Ошибка при создании пользователя")
    }
}

async function authorization(req, res) {
    try {
        const user = await User.findOne({ token: req.body.token });
        
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json("Пользователь не найден");
        }
    } catch (error) {
        return res.status(500).json("Ошибка при авторизации");
    }


}

async function getUser(req, res) {
    try {
        const user = req.headers.authorization.split(' ')
        console.log('user = ', user)

        const data = await User.find({email: user[0], token: user[1]})
        if(data.length != 0){
            console.log("gg = ", data.length)
            const users = await User.find()
            return res.status(200).json(users)
        } 
        console.log("data = ", data)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json('Ошибка при получении пользователей')
    }
}

module.exports = { createUser, authorization, getUser }