const express = require('express')
const User = require('../api/user/user')
const userService = require('../api/user/userService')
module.exports = function (server) {

    // API Routes
    const router = express.Router()
    server.use('/api', router)
    // Routes
    server.get('/', function(req, res){
        res.send('Hello World!')
        console.log('homepage')
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
    //userService.register(router, '/users')// /api/users
    router.route('/users')
        .get(function(req, res){
            User.find(function(err, users){
                if (err)
                    res.send(err);
                    
                res.json(users)                  
            })    
        })
        .post(function(req, res){
            const user = new User()
            user.userId = req.body.userId

            user.save(function(err){
                if(err){
                    res.send(err)
                    res.sendStatus(409)
                }
                res.sendStatus(201)
                res.json({userId : user.userId})                
            })
        })
    router.route('/users/:_id')
        .get(function(req, res){
            User.findById(req.params._id, function(err, user){
                if(err)
                    res.send(err)

                res.json(user)
            })
        })
        .delete(function(req, res){
            User.remove({
                _id: req.params._id
            }, function(err){
                if(err)
                    res.send(err)

                res.json({message: 'User deleted'})
            })
        })
}