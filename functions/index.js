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

drive.mongo=function(req,resp){
    console.log('/mongo')
    resp.send("Hello from path/mongo at "+Date()+" :-) ! ");
}



exports.drive = functions.https.onRequest((request, response) => {
    if(drive.path[request.url.slice(1)]){ // does it exist and is it on?
        console.log('found path /'+request.url.slice(1))
        drive[request.url.slice(1)](request, response) // follow the path
    }else{
        response.send("Hello from MathBiol's Drive at "+Date()+" :-) !! ");
    }
    
});