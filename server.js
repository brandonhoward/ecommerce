'use strict';

const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();
const angRoutes = [
    'about',
    'login',
];

server.connection({
    host: 'localhost',
    port: 8080
});

server.route({
    method: 'GET',
    path: '/{p?}',
    handler: function(request, reply) {
        console.log("__dirname: " + __dirname);
        console.log("hello from base handler");
        var fs = require('fs');
        var path = require('path');
        var myFile = 'index.html';
        if (request.params.p) {
            myFile = request.params.p;
        }
        var myPath = path.join(__dirname, 'dist', myFile);
        console.log("path: " + myPath);
        if (fs.existsSync(myPath)) {
            reply.file(myPath);
        } else {
            console.log("could not load file");
        }
    }
});

/*server.route({
    method: 'GET',
    path: '/{p}',
    handler: function(request, reply) {
        var myFile = 'index.html';
        var isAngRoute = function(route) {
            if (route === undefined) { return true; }
            for (var i = 0; i < angRoutes.length; i++) {
                if (route === angRoutes[i]) {
                    return true;
                }
            }

            return false;
        };
            console.log("request: " + request.params.p);
        if (!isAngRoute(request.params.p)) { // let angular handle it's own routes
            //console.log("param: " + request.params.p);
            console.log("is not an angular route");
            myFile = request.params.p;
        }
        var fs = require('fs');
        var path = require('path');
        var myPath = path.join(__dirname, 'dist', myFile);
        //console.log("myPath: " + myPath);
        if (fs.existsSync(myPath)) {
            reply.file(myPath);
        } else {
            //console.log("no reply: " + myPath);
        }
    }
});*/

//TODO: send 404s on bad page requests

server.register({
    register: Inert
}, function(err) {
    if (err) throw err;
    server.start((err) => {
        if (err) throw err;
        console.log('Server is listening on ' + server.info.uri.toLowerCase())
    });
});