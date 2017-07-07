const express = require('express')
const User = require('../api/user/user')
const Url = require('../api/url/url')

//opção ao realizar o Update trazer os dados novos e fazer as validações novamente
User.updateOptions({ new: true, runValidators: true})

module.exports = function (server) {

    // API Routes
    const router = express.Router()
    server.use('/', router)
    // Routes
    server.get('/', function(req, res){
        res.send('Hello World!')
    })
    // GET /urls/:id (esse endpoint ñ deve ser restful)
    router.route('/urls/:_id')
        .get(function(req, res){
            Url.findById(req.params._id,function(err, url){
                if(err)
                    console.log(err)

                res.redirect(301, Url.destino);
            })
        })
    // POST /users/:userId/urls
    router.route('/users/:_id/urls')
        .post(function(req, res){
            var user = new User()
            user = User.findById(req.params._id, function(err, user){
                if(err)
                    res.send(err)

                console.log(user)
                return user
            })
            var url = new Url()
            url.url = req.params.url

        })
    // GET /stats
    // GET /users/userId/stats
    // GET /stats/:id
    // DELETE /urls/:id
    
    

    
    router.route('/users')
        .get(function(req, res){
            User.find(function(err, users){
                if (err)
                    res.send(err);
                    
                res.json(users)                  
            })    
        })
        // POST /users  (ok)
        .post(function(req, res){
            const user = new User()
            user.userId = req.body.userId
            user.save(function(err){
                if(err){
                    res.status(409)
                    res.send(err)
                }
                res.status(201)
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
        // DELETE /user/:userId  (ok)
        .delete(function(req, res){
            User.remove({
                _id: req.params._id
            }, function(err){
                if(err)
                    res.send(err)

                res.json({message: 'User deleted'})
            })
        })

    // ----- Utilizando a lib node-restful
    //const userService = require('../api/user/userService')
    //userService.register(router, '/users')// /api/users
}