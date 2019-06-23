import express from 'express';

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/app1db');
var ObjectID = require('mongodb').ObjectID;

//
export default (app, http) => {
    app.use(express.json());
    //
    app.get('/foo', (req, res) => {
        res.json({msg: 'foo-1234BB'});
    });
    //
    app.post('/bar', (req, res) => {
        console.log(req.body.title )
        res.json(req.body);
    });
    //
    app.get('/api_books_index', function(req, res) {
        var collection = db.get('books');
        collection.find({},{},function(e,docs){
            //console.log("#doc");
            var param = {"docs": docs };
            res.json(param);
        });
    });
    //
    app.get('/api_books_show/:id', function(req, res) {
        console.log(req.params.id  );
        var collection = db.get('books');
        collection.find({"_id": new ObjectID(req.params.id)},{},function(e,docs){
            //console.log("#doc");
            var param = {"docs": docs };
            res.json(param);
        });
    });    
    //delete
    app.get('/api_books_delete/:id', function(req, res) {
        console.log(req.params.id  );
        var collection = db.get('books');
        collection.findOneAndDelete( { _id: new ObjectID( req.params.id ) }, {}, function(err, r){
            //console.log("#doc");
//            var param = {"docs": docs };
            res.json(r);
        });
    });    

    //update
    app.post('/api_books_update', (req, res) => {
        console.log(req.body )
//        var obj = req.body;
        var obj = { "title": req.body.title ,
                    "content": req.body.content
                    };
        var collection = db.get('books');
        collection.findOneAndUpdate( { _id: new ObjectID( req.body.id ) }, obj, {}, function(err, r){
            if (err) throw err;
            res.json(req.body);
            db.close();
        });        
    });        
    //
    app.post('/api_books_new', (req, res) => {
        console.log(req.body.title )
        var obj = req.body;
        var collection = db.get('books');
        collection.insert(obj , function(err, result ) {
            if (err) throw err;
            res.json(req.body);
            db.close();
        });        
    }); 
    /* todos */
    app.get('/api_todos_index', function(req, res) {
        var collection = db.get('todos');
        var items = [];
        collection.find({},{},function(e,docs){
            docs.forEach( function (item) {
                //toTimeString
                items.push(item);
            });
            var param = {"docs": items };
            res.json(param);
        });
    });
    //
    app.post('/api_todos_new', (req, res) => {
        console.log(req.body.title )
        var obj = req.body;
        obj.up_date = new Date();
        console.log( obj )
        var collection = db.get('todos');
        collection.insert(obj , function(err, result ) {
            if (err) throw err;
            res.json(req.body);
            db.close();
        });        
    });    
    app.get('/api_todos_show/:id', function(req, res) {
        console.log(req.params.id  );
        var collection = db.get('todos');
        collection.find({"_id": new ObjectID(req.params.id)},{},function(e,docs){
            //console.log("#doc");
            var param = {"docs": docs };
            res.json(param);
        });
    });
    //
    //update
    app.post('/api_todos_update', (req, res) => {
        console.log(req.body )
//        var obj = req.body;
        var obj = { "title": req.body.title ,
                    "content": req.body.content,
                    "complete": req.body.complete,
                    "up_date" : new Date()
                    };

        var collection = db.get('todos');
        collection.findOneAndUpdate( { _id: new ObjectID( req.body.id ) }, obj, {}, function(err, r){
            if (err) throw err;
            res.json(req.body);
            db.close();
        });        
    });
    //
    //delete
    app.get('/api_todos_delete/:id', function(req, res) {
        console.log(req.params.id  );
        var collection = db.get('todos');
        collection.findOneAndDelete( { _id: new ObjectID( req.params.id ) }, {}, function(err, r){
            //console.log("#doc");
//            var param = {"docs": docs };
            res.json(r);
        });
    });                 

}
