//Author: Steven Muller
//Purpose: this is our main server which lists off our drone activity, should a drone become stationary, a counter for each drone within our system will start counting up
//should any drone have a drone_speed_timeout count of 10 or more, its text color upon next update will change to yellow

var http = require('http');
var net = require('net'); 

var host = '127.0.0.1' ;


var drone_uid = [1,2,3,4,5,6,7,8,9,10];
var drone_coord = [0,0,0,0,0,0,0,0,0,0];
var drone_speed = [0,0,0,0,0,0,0,0,0,0];
var drone_speed_timeout = [0,0,0,0,0,0,0,0,0,0];
var data_string = "";
var drone_string_array = [0,0,0,0,0,0,0,0,0,0,0];
var data_to_be_written;
var received_data = [];
var i = 0;


var server = http.createServer(function(req,res) {res.writeHead(200, {'Content-Type': 'text/html'});

     if(data_to_be_written != null)
     {
        res.write(data_to_be_written);
        res.end();
     }
    

}).listen(8082);
    


var tcp_server = net.createServer(function(socket) 
{   

    

    socket.on('data', function(data) {
        
        data_string = data + '';
        

        received_data = data_string.split(",");
        

        
            i = received_data[0] ;// to identify the correct drone within any array index,
           
        
            if(drone_speed[i] ===0 )// if drone speed is 0 increment its corresponding timeout count by 1
            {
                ++drone_speed_timeout[i];
                
                            drone_string_array.splice (i,0,'<p><span style="color: red"> Drone unit ID: '+ drone_uid[i] + '</span> Drone coordinates:  ' + received_data[1] + ' Drone Speed :  '+ received_data[2] + '</p> <br/>');

                        
                                data_to_be_written = 

                                '<!DOCTYPE html>'+
                                '<html>'+
                                ' <head>'+
                                ' <meta charset="utf-8" />'+
                                ' <title>Drone Tracker</title>'+
                                ' </head>'+ 
                                ' <body>'+
                                    drone_string_array[0] +
                                    drone_string_array[1] +
                                    drone_string_array[2] +
                                    drone_string_array[3] +
                                    drone_string_array[4] +
                                    drone_string_array[5] +
                                    drone_string_array[6] +
                                    drone_string_array[7] +
                                    drone_string_array[8] +
                                    drone_string_array[9] +
                                ' </body>'+
                                '</html>';
                                
            }

            if(drone_speed[i] != 0)// if drone speed is not 0 update its position and speed
            {
                
               
                            drone_string_array.splice (i,0,'<p><span style="color: green"> Drone unit ID: '+ drone_uid[i] + '</span> Drone coordinates:  ' + drone_coord[received_data[1]] + 'Drone Speed :  '+ drone_speed[received_data[2]] + '</p> <br/>');
                        
                                data_to_be_written = 

                                '<!DOCTYPE html>'+
                                '<html>'+
                                ' <head>'+
                                ' <meta charset="utf-8" />'+
                                ' <title>Drone Tracker</title>'+
                                ' </head>'+ 
                                ' <body>'+
                                    drone_string_array[0] +
                                    drone_string_array[1] +
                                    drone_string_array[2] +
                                    drone_string_array[3] +
                                    drone_string_array[4] +
                                    drone_string_array[5] +
                                    drone_string_array[6] +
                                    drone_string_array[7] +
                                    drone_string_array[8] +
                                    drone_string_array[9] +
                                ' </body>'+
                                '</html>';
                                
                drone_speed_timeout[i] = 0;// if a drone still had a timeout counter on it, reverse to 0
           }
        

           
          
       
        
        
});
    

});

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

tcp_server.listen(8080,"localhost");


