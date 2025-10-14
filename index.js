const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

http.createServer((req, res) => {
	const filePath = path.join(__dirname, "index.html");
	fs.streamFile(filePath, (err, stream) => {
		if (err) {
			res.writeHead(404);
			res.end('Not Found');
		} else {
			stream.pipe(res);
		}
	});
}).listen(port, () => {
	console.log(`Server running on port ${port}`);
});


