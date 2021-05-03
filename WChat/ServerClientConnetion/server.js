var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
app.listen(8000); 
function handler (req, res) { 
		fs.readFile('../Templates/index.html', function (err, data) { 
		if (err) { 
				res.writeHead(500); 
				return res.end('Error loading index.html'); 
		} 
   res.writeHead(200); 
   res.end(data); 
   }); 
 }
const users = {};

io.on('connection', socket => {
		socket.on('new-user-joined', name => {
				users[socket.id] = name;
				for(let user in users){
						console.log(user);
				}
				socket.broadcast.emit('user-joined', name);
		})
		socket.on('send', mess => {
				console.log(mess)
				socket.broadcast.emit('recive', {
						mes: mess,
						name: users[socket.id],
						time: new Date(),
				});
		})
})
