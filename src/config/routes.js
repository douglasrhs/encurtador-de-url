const express = require('express')

module.exports = function (server) {

    // API Routes
    const router = express.Router()
    server.use('/api', router)
    // Routes
    server.get('/', function(req, res){
        res.send('Hello World!')
    })
    // GET /urls/:id (esse endpoint ñ deve ser restful)
    // POST /users/:userId/urls
    // GET /stats
    // GET /users/userId/stats
    // GET /stats/:id
    // DELETE /urls/:id
    // POST /users
    // DELETE /user/:userId

    // USER Routes
    /*router.route('/users')
        .post(function(req, res){

            const user 
        })
    */
    const userService = require('../api/user/userService')
    userService.register(router, '/users')


}