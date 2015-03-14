'use strict'
var express = require('express'),
    npm = require('npm'),
    bower = require('bower'),
    apiRouter = express.Router(),
    app = express()


apiRouter.get('/npm', function(req, res){
    var q = req.query.q.split(',')
    console.log('Search Query: %s', q)
    npm.commands.search(q, false, function(err, data){
        res.send(data)
    })
})

app.use('/api', apiRouter)

npm.load({}, function(){
    app.listen(8889, '0.0.0.0', function(){
        console.log('Listening on http://%s:%s', '0.0.0.0', 8889)
    })
})
