const restful = require('node-restful')
const mongoose = restful.mongoose

const urlSchema = new mongoose.Schema({
    url: { type: String, required: true}
})

module.exports = restful.model('Url', urlSchema)