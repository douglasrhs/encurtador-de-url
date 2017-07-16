const express = require('express')
const router = express.Router()
const User = require('../api/user/user')
const Stats = require('../api/stats/stats')


module.exports = function (server) {

    // Prefix Routes    
    server.use('/', router)
    // Routes
    server.get('/', function(req, res){
        res.send('Hello Encurtador-de-url!')
    })

    //ENDPOINT NAO REQUISITADO CRIADA PARA TESTES
    router.route('/urls')
        .get(function (req, res){
            Stats.find(function(err, stats){
                if(err)
                    res.status(404).send(err)

                res.status(200).json({stats})
            })
        })
    // GET /urls/:id (ok) (esse endpoint ñ deve ser restful)
    router.route('/urls/:_id')
        .get(function(req, res){
            Stats.findById(req.params._id,function(err, stats){
                if(err)
                    return res.status(404).send(err)

                console.log(stats.url)

                stats.hits = stats.hits + 1

                stats.save(function(err){
                    if(err)
                        return res.status(400).send(err)
                    else{
                        res.status(301)
                        .json({Location : stats.url})
                    }
                })
                
                //.redirect(301, stats.url);
            })
        })
        // DELETE /urls/:id (ok)
        .delete(function(req, res){
            Stats.remove({
                _id: req.params._id
            }, function(err){
                if(err)
                    res.status(404).send(err)

                res.status(200).json({message: 'Url deleted'})
            })
        })

   
    // POST /users/:_id/urls (ok)
    router.route('/users/:_id/urls')
        .post(function(req, res){            
            User.findById(req.params._id, function(err, user){
                if(err){ console.log('user not FIND :)'); throw err}

                console.log(req.body)
                var stats = new Stats()
                stats.url = req.body.url
                stats.hits = req.body.hits
                stats.shortUrl = req.body.shotUrl
                stats.save(function(err){
                    if(err)
                        return res.status(400).send(err)
                    
                    res.status(201).json({
                        _id : stats._id,
                        hits: stats.hits,
                        url : stats.url,
                        shortUrl: stats.shortUrl
                    })
                })
            })
        })  
    // GET /stats     
    router.route('/stats')
        .get(function(req, res){
            var statsGlobal = {urlCount: 0, totalHits: 0, topUrls: {}}
            var someStats = new Stats()
            Stats.count({}, function(err, c){
                statsGlobal.urlCount = c
            })
             /* FIND PARA CONTAR TOTALHITS*/
            Stats.find(function(err, stats){
                if (err)
                    res.send(err);
                    
                var hits = 0
                stats.forEach(function(key){
                    hits += key.hits
                })
                statsGlobal.totalHits = hits;    
                //res.send(statsGlobal)                              
            }) 
            // FIND PARA SELECIONAR TOP 10 URLS
            Stats.find({})
                .limit(10)
                .sort({ hits: -1})
                .exec(function(err, data){
                    if(err)
                        throw err

                    //console.log(res)
                    statsGlobal.topUrls = data;
                    res.send(statsGlobal) 
                })
            
            
            

            // Stats.aggregate([
            //     { $group: { _id: '$_id', totalHits: { $sum: 'hits'} } }
            // ], function(err, docs){
            //     console.log('totalHits is ' + docs.totalHits)
            //     res.json(docs)
            // })

           
               
        })                     
    // GET /stats/:id (ok)
    router.route('/stats/:_id')
        .get(function(req, res){
            console.log('GET /stats/:id')
            console.log(req.params)
            Stats.findById(req.params._id, function(err, stats){
                if(err)
                    res.send(err)

                res.json(stats)
            })   
        }) 
    // GET /users/userId/stats
    // POST /users  (ok)
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
                if(err)
                    return res.status(409).send(err)
                
                res.status(201).json({
                    _id: user._id,
                    userId : user.userId                    
                })                
            })
        })
    // DELETE /user/:_id  (ok)
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
                    res.status(404).send(err)

                res.status(200).json({message: 'User deleted'})
            })
        })    
}