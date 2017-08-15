'use strict';

const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();
const angRoutes = [
    'about',
    'login',
];

const mockUserData = [ //TODO: eventually pull this from db
    {
        id: 2131,
        username: 'bhoward',
        password: 'abc123',
        dob: new Date('02/18/1993')
    }
];

server.connection({
    host: 'localhost',
    port: 8080
});

/**
 * API routes
 */
server.route({
    method: 'GET',
    path: '/api/data',
    handler: function(request, reply) {
        console.log('in data endpoint');
        var payload = {
            users: ['Brandon Howard', 'Ricky Bobby'],
            data: 212131314141
        };

        reply(null, payload);
    }
});

server.route({
    method: 'POST',
    path: '/api/login',
    handler: function(request, reply) {
        var body = request.payload['body'];
        var usr = body['username'];
        var pwd = body['password'];
        var user = findUser(usr, pwd);
        var resp = {
            user: user
        };
        
        reply(null, resp);
    }
});

/**
 * Angular routes
 */
server.route({
    method: 'GET',
    path: '/{p?}',
    handler: function(request, reply) {
        var myFile = 'index.html';
        if (!isAngRoute(request.params.p)) { // let angular handle it's own routes
            myFile = request.params.p;
        }
        var fs = require('fs');
        var path = require('path');
        var myPath = path.join(__dirname, 'dist', myFile);
        if (fs.existsSync(myPath)) {
            reply.file(myPath);
        } else {
            console.log("no reply: " + myPath);
        }
    }
});

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

/**
 * Helper functions
 */
const isAngRoute = function(route) {
    if (route === undefined) { return true; }
    for (var i = 0; i < angRoutes.length; i++) {
        if (route === angRoutes[i]) {
            return true;
        }
    }

    return false;
};

const findUser = function(name, pwd) {
    for (var i=0, count=mockUserData.length; i < count; i++) {
        var user = mockUserData[i];
        if (user.username === name) {
            if (user.password === pwd) {
                return user;
            }
        }
    }

    return null;
};