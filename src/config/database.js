const mongoose = require('mongoose')
mongoose.Promise = global.Promise //mais para tirar um aviso de advertencia

module.exports = mongoose.connect('mongodb://localhost/encurtadordeurl')
