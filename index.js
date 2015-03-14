'use strict'
var express = require('express'),
    npm = require('npm'),
    bower = require('bower'),
    apiRouter = express.Router(),
    request = require('request'),
    app = express()


apiRouter.get('/npm', function(req, res){
    var q = req.query.q.split(',')
    console.log('Search Query: %s', q)
    npm.commands.search(q, false, function(err, data){
        if(err) {
            console.error('ERROR: ', err)
            res.send(err) 
        } else {
            res.send(data)
        }
    })
})

apiRouter.get('/bower', function(req, res){
    var q = req.query.q
    bower.commands
    .search(q, {})
    .on('end', function(data){
        res.send(data)
    })
    .on('error', function(err){
        res.send(err)
    })
})

apiRouter.get('/gems', function(req, res){
    var q = req.query.q
    request('http://rubygems.org/api/v1/gems/' + q + '.json', function(err, response, body){
        if(err) {
            res.send(err)
        } else {
            res.send(body)
        }
    })
})

app.use('/api', apiRouter)

npm.load({}, function(){
    app.listen(8889, '0.0.0.0', function(){
        console.log('Listening on http://%s:%s', '0.0.0.0', 8889)
    })
})
