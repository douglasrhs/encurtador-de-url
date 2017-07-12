const User = require('./user')

User.methods(['get', 'post', 'delete'])
User.updateOptions({ new: true, runValidators: true})

User.route('.post', function(req, res, next){
    const user = new User()
    user.userId = req.body.userId
    user.save(function(err){
        if(err.code === 11000){
            res.status(409).json({error: 'E11000 - duplicate key error'})            
            next(new Error('There was a duplicate key error'))
        } else if(err){
            res.status(409).send(err)
            next(err)
        }
        res.status(201).json({
            id : user.userId                    
        })                
    })
    next()
})

User.route('recommended', function(req, res, next) {
  res.send('I have a recommendation for you!');
  next()
})



module.exports = User