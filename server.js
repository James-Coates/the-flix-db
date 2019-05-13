/* eslint-disable no-console */
const http = require('http');
const url = require('url');
const fs = require('fs');

// Create Server
http
  .createServer((request, response) => {
    // Parse request URL
    const addr = request.url;
    const q = url.parse(addr, true);
    // Initialise file path
    let filePath = '';

    // Check if URL path contains documentation ? documentation : index
    if (q.pathname.includes('documentation')) {
      filePath = (__dirname, 'documentation.html');
    } else {
      filePath = 'index.html';
    }

    // Read file in filePath
    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      }
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    });

    // Log requests: request URL, timestamp
    fs.appendFile('log.txt', `URL: ${addr}\nTimestamp: ${new Date()}\n\n`, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('New entry added to log');
      }
    });
  })
  .listen(8080);
