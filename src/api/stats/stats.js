const mongoose = require('mongoose')

const statsSchema = new mongoose.Schema({
    url: { type: String, required: true},
    hits: { type: Number, default: 0},
    shortUrl: { type: String , default: 'http://<host>[:<port>]/asdfeiba'} 
})

module.exports = mongoose.model('Stats', statsSchema)