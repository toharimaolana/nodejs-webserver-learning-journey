const http = require('http');
 
const requestListener = (request, response) => {
    // Set default headers
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Powered-By', 'Node.js');

    // Set default status code
    response.statusCode = 200;
 
    const { method, url } = request;
 
    if(url === '/') {
        if(method === 'GET') {
            response.statusCode = 200; // OK
            response.end(JSON.stringify({
                message: 'Selamat datang di homepage!'
            }));
        } else {
            response.statusCode = 400; // Method Not Allowed
            response.end(JSON.stringify({
                massage : `Halaman tidak dapat diakses menggunakan ${method} request`
            }));
        }
    } else if(url === '/about') {
        if(method === 'GET') {
            response.statusCode = 200; // OK
            response.end(JSON.stringify({
                message: 'Selamat datang di halaman about!'
            }));
        } else if(method === 'POST') {
            let body = [];
    
            request.on('data', (chunk) => {
                body.push(chunk);
            });
 
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.statusCode = 200; // OK
                response.end(JSON.stringify({
                    message: `Selamat datang di halaman about, ${name}!`
                }));
            });
        } else {
            response.statusCode = 400; // Method Not Allowed
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses menggunakan ${method} request`
            }));
        }
    } else {
        response.statusCode = 404; // Not Found
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!'
            }));
    }

    if(method === "PUT"){
        // 
    }
    if(method === "DELETE"){
        // 
    }
};
 
const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});