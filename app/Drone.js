
var net = require('net');
//var randomint = require('random-int');

var HOST = '127.0.0.1';
var PORT = 8080;

var UID_array = [1,2,3,4,5,6,7,8,9,10];
var UID_counter = 0;//keeps track of the current ID to select for the next Interval, ensures every ID will get an update
var Coord_array = ['50 50','61 -61', '48.02 48.02', '40.741895 -73.98', '41.432 -62.88', '52.324 43.23', '27 -62'  ];
var speed = 0;
var selected_coord;
var position_return_string;

var client = new net.Socket();
client.connect(PORT, "localhost", function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);// here for debugging to see if connection is successful
    

});

process.on('uncaughtException', function (err) {
    console.log(err);
}); 
// Add a 'data' event handler for the client socket
// data is what the server sent to this sockets


// Add a 'close' event handler for the client socket

function send_position_update()
{

    if(UID_counter === null)
    {
        UID_counter = 0;
    }
    position_return_string = UID_array[UID_counter] + ',';
    UID_counter++;
    position_return_string += ''+ Coord_array[Math.floor(Math.random() * (7 - 0) + 0)] + ',';
    speed = Math.floor(Math.random() * (2 - 0) + 0);
    position_return_string +=  speed ;

    client.write(position_return_string);

    if(UID_counter > UID_array.length)
    {
        UID_counter = 0;
    }

        
}

setInterval( send_position_update , 1000); 