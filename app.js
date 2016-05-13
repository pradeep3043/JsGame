var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req,res){
	res.sendFile(__dirname + '/client/index.html');
	
});
app.use('/clent',express.static(__dirname + '/client'));
serv.listen(2000);
console.log("Server Started.");

var SOCKET_LIST = {};
var PLAYER_LIST = {};

var Player = function(id){
	var self = {
		x:100,
		y:250,
		id:id,
		number:"" + Math.floor(10 * Math.random()),
		pressingright:false,
		//mouse:false,
		mouseForward:false,
		mouseBackward:false,
		step:10,
		
	}
	self.updatePosition = function(){
    //updatePosition
		if(self.mouseForward == true){			
				self.x += self.step;
		self.mouseForward = false;	}							
			else if (self.mouseBackward == true){			
				self.x -= self.step;
			self.mouseBackward = false;		}		
} 

	return self;
}

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
	socket.id = Math.random();	 
	SOCKET_LIST[socket.id] = socket;	
	
	var player = Player(socket.id);
	PLAYER_LIST[socket.id] = player;
	
	socket.on('disconnect',function(){
		delete SOCKET_LIST[socket.id];
		delete PLAYER_LIST[socket.id];
	});
	
	socket.on('keyPress',function(data){
		if(data.inputId==='right')
		player.pressingright = data.state;	
			else if (data.inputId==='mouseForward')
				player.mouseForward = data.state;
				//concole.log('received mouse');
				else if (data.inputId==='mouseBackward')
				player.mouseBackward = data.state;
				
	});
	
});

//localhost:2000

setInterval(function(){
	var pack = [];
		for(var i in PLAYER_LIST){
			var player = PLAYER_LIST[i];
			player.updatePosition();			
			pack.push({
				x:player.x,
				y:player.y,
				number:player.number
		
			});
		}
		
		for(var i in SOCKET_LIST){
			var socket = SOCKET_LIST[i];
			socket.emit('newPositions',pack);
			
		}
	
		
		
		
},1000/25); // this will be called every 40msec