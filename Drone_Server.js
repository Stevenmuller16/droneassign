//Author: Steven Muller
//Purpose: this is our main server which lists off our drone activity, should a drone become stationary, a counter for each drone within our system will start counting up
//should any drone have a drone_speed_timeout count of 10 or more, its text color upon next update will change to yellow

var http = require('http');
var net = require('net'); 

var host = '127.0.0.1';

var drone_uid = [1,2,3,4,5,6,7,8,9,10];
var drone_coord = [0,0,0,0,0,0,0,0,0,0];
var drone_speed = [0,0,0,0,0,0,0,0,0,0];
var drone_speed_timeout = [0,0,0,0,0,0,0,0,0,0];

var received_data = [];


var tcp_server = net.createServer(function(socket) 
{ 

    socket.on('data', function(data) {
        
    
        
        received_data = data.split(",");

        
            var i = received_data[0] - 1;// to identify the correct drone within any array index,
           
        
            if(drone_speed[i] ===0 )// if drone speed is 0 increment its corresponding timeout count by 1
            {
                ++drone_speed_timeout[i];
                if(drone_speed_timeout >= 10)// if a drone is stationary for 10 or more seconds, change the color of the text to yellow
                {
                    function addMessage(author, message, color, dt) {
                        content.prepend('<p><span style="color:' + yellow + '">'
                            + drone_uid[i + 1] + '</span> @ coordinates ' + drone_coord[received_data[1]] + 'at speed :'
                            + drone_speed[received_data[2]] + '</p>');
                }
            }

            if(drone_speed[i] != 0)// if drone speed is not 0 update its position and speed
            {
                function addMessage(author, message, color, dt) {
                    content.prepend('<p><span style="color:' + green + '">'
                        + drone_uid[i + 1] + '</span> @ coordinates ' + drone_coord[i] + 'at speed :'
                        + drone_speed[i] + '</p>');

                drone_speed_timeout[i] = 0;// if a drone still had a timeout counter on it, reverse to 0
           }

           
          
       
        
        
    });
    
    // Add a 'close' event handler to this instance of socket
    socket.on('close', function(data) {

        
    });


}).tcp_server.listen(8000,host);


