//const restful = require('node-restful')
//const mongoose = restful.mongoose
//ou 
const mongoose = require('mongoose')

mongoose.set('debug', true)

//MODEL
const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true, index: true }
})
    


//module.exports = restful.model('User', userSchema)
//ou
module.exports = mongoose.model('User', userSchema)