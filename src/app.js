const server = require('./config/server')
require('./config/database.js')
require('./config/routes')(server)