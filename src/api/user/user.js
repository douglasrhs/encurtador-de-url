const restful = require('node-restful')
const mongoose = restful.mongoose

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true}
})

module.exports = restful.model('User', userSchema)