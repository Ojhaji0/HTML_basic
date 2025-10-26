const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Hello! I am Ayush Ojha</h1>');
    }

    else if (req.url === '/create' && req.method === 'POST') {
        fs.writeFile('./my_intr.txt', 'My name is Ayush Ojha. I am pursuing B.Tech AI from Amity University Lucknow.', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>Error creating file</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<h1>File Created</h1>');
            }
        });
    }

    else if (req.url === '/read' && req.method === 'GET') {
        fs.readFile('./my_intr.txt', 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>File not found</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`<h1>Content inside: ${data}</h1>`);
            }
        });
    }

    else if (req.url === '/update' && req.method === 'PUT') {
        fs.appendFile('./my_intr.txt', '\nThis is another line.', (err) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>File not found</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<h1>Line appended</h1>');
            }
        });
    }

    else if (req.url === '/delete' && req.method === 'DELETE') {
        fs.unlink('./my_intr.txt', (err) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>File not found</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<h1>File Deleted</h1>');
            }
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

server.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});

