const express = require('express')
const router = express.Router()
const User = require('../api/user/user')
const Url = require('../api/url/url')
const Stats = require('../api/stats/stats')


module.exports = function (server) {

    // Prefix Routes    
    server.use('/', router)
    // Routes
    server.get('/', function(req, res){
        res.send('Hello World!')
    })

    router.route('/urls')
        .get(function(req, res){
            Url.find(function(err, urls){
                if(err)
                    console.log(err)

                res.json(urls);
            })
        })
    // GET /urls/:id (esse endpoint ñ deve ser restful)
    router.route('/urls/:_id')
        .get(function(req, res){
            Url.findById(req.params._id,function(err, url){
                if(err)
                    return res.send(err)

                console.log(url.url)
                res.json({Location: url.url}).redirect(301, url.url);
            })
        })

   
    // POST /users/:userId/urls    
    router.route('/users/:_id/urls')
        .post(function(req, res){
            User.findById(req.params._id, function(err, user){
                if(err)
                    return res.send(err)

                var url = new Url()
                url.url = req.body.url
                url.save(function(err){
                    if(err)
                        return res.status(400).send(err)
                    
                    res.status(201).json({
                        _id : url._id,
                        hits: url.hits,
                        url : url.url,
                        shortUrl: url.shortUrl
                    })               
                })                
            })
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
                if(err)
                    return res.status(409).send(err)
                
                res.status(201).json({
                    _id: user._id,
                    userId : user.userId                    
                })                
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
                    res.status(404).send(err)

                res.status(200).json({message: 'User deleted'})
            })
        })

    
}