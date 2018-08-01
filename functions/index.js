const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// List endpoints

var ep = {
    'upload':true, //'upload files',
    'listUploaded':true, //'list uploaded files',
    'download':true, //'download files',
    'mongo':true //manage a mongo connection
};

var mongodb= require('mongodb')

var drive={
    path:{
        'upload':true, //'upload files',
        'listUploaded':true, //'list uploaded files',
        'download':true, //'download files',
        'mongo':true //manage a mongo connection
    }
}

drive.mongo=function(req,res){
    console.log('/mongo',req.query)
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    const mongo= require('mongodb').MongoClient
    // extract connection and database
    /*
    const qCon = req.query.connect.match(/(.*)\/(.*)/)
    var url=qCon[1]
    var dbName=qCon[2]
    var uri = decodeURIComponent(req.query.connect)
    
    mongo.connect(url,function(err, client) {
        if(err){
            res.end(err)
        }else{
            debugger
        }
    }
    */

    //res.end('hello from mathbiol drive/mongo at '+Date())

    
    var url = 'mongodb://localhost:27017';
    var dbName = 'test';

    mongo.connect(url,function(err, client) {
        if(err){
            res.status(200).end(err)
        }else{
            var col = client.db(dbName).collection(dbName)
            col.find({}).toArray(function(err, items) {
                console.log(err,items)
                res.status(200).end(JSON.stringify(items))
            })
            //debugger
        }
    })
    
    


    // engage mongo following http://mongodb.github.io/node-mongodb-native/3.1/api/
    //const MongoClient = mongodb.MongoClient
    //MongoClient.connect(url, function(err, client) {
    //  client.close();  
    //})
    //resp.send("Hello from path/mongo at "+Date()+" :-) ! ");
    
    /*
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.status(200).send(JSON.stringify({dt:123}))
    */
}



exports.drive = functions.https.onRequest((request, response) => {
    var rq=decodeURIComponent(request.url)
    var pth='/'
    if(rq.match('\/([^\?]*)')){
        pth=rq.match('\/([^\?]*)')[1]
    }
    if(drive.path[pth]){ // does it exist and is it on?
        console.log('found path /'+pth)
        drive[pth](request, response) // follow the path
    }else{
        response.send("Hello from MathBiol's Drive at "+Date()+" :-) !! ");
    }
    
});