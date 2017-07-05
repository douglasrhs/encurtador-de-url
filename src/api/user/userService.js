const User = require('./user')

User.methods(['get', 'post'])
User.updateOptions({ new: true, runValidators: true})


module.exports = User