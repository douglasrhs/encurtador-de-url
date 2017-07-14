const mongoose = require('mongoose')


const statsSchema = new mongoose.Schema({
    hits: {type: Number, default: 0},
    urlCount: {type: Number},
    topUrls: []
    
})

module.exports = mongoose.model('Stats', statsSchema)