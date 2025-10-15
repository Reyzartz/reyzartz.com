const express = require('express')
const server = require('http').createServer()

const app = express();
const PORT = 3000

app.get('/', function(req, res) {
	res.sendFile("index.html", { root: __dirname })
})

server.on('request', app)
server.listen(PORT, () => {
	console.log("Listening on PORT", PORT)
})
