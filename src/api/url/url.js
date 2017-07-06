const restful = require('node-restful')
const mongoose = restful.mongoose

const urlSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true}
})

module.exports = restful.model('Url', userSchema)