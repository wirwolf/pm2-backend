const debug = require('debug')('app');

var axon = require('axon');
var sock = axon.socket('sub');
var nssocket = require('nssocket');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://127.0.0.1:27017/myproject';

var collection = null;
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    if(err) {
        debug(err);
        return;
    }
    console.log("Connected successfully to server");
    collection = db.collection('documents');
});




sock.on('message', function(msg){
    console.log('---one---');
    var data = JSON.parse(msg);
    if(data.data['axm:reply']) {
        console.log('!------REPLY----------!');
        console.log(data.data['axm:reply']);
        console.log('!------REPLY----------!');
    } else {
        /*collection.insert(data.data, function (err, result) {
            console.log('Insert into mongo')
        });*/
        //console.log(data.data);
        //console.log(data.data.monitoring);
        console.dir(data.data.status.data);
        //status.data.process[3]
    }

});




var server = nssocket.createServer(function(_socket) {

    console.log('Got new connection [REVERSE INTERACTOR]');

    server.on('cmd', function(data) {
        if(_socket.connected) {
            console.log('Sending command %j', data);
            _socket.send(data._type, data);
        } else {
            debug('Not found socket');
        }

    });
});

server.on('error', function(e) {
    console.error('Disconected!');
    console.error(e);
});
//server.once('trigger:action:success', success);

server.once('trigger:action:success', function(e) {
    console.error('trigger:action:success!');
    console.error(e);
});


server.on('listening', function() {
    debug('Listening start on:4322');
    //action(null, server);
});



const ACTION_PM2_START_LOGGING = 'startLogging';
const ACTION_PM2_RESTART = 'restart';




function action() {
    setInterval(function () {
        //console.log('!');
        server.emit('cmd', {
            //_type : 'trigger:action',
            _type : 'trigger:pm2:action',
            parameters  : {"name":"logrotate"},
            //action_name : 'refresh:db'
            method_name : ACTION_PM2_RESTART
        });



        /*_server.emit('cmd', {
            _type : 'trigger:action',
            process_id : 0,
            action_name : 'ping'
        });*/
    }, 5000);

}

function sendPM2Command(name, parameters) {

}
//monitor.


server.listen(4322);
sock.bind(8080);
