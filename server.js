'use strict';

const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();
const angRoutes = [
    'about',
    'login'
];
const AUTH_SECRET_KEY = 'MySecretKey'; // Never share the secret key

const mockUserData = [ //TODO: eventually pull this from db
    {
        id: 2131,
        username: 'bhoward',
        password: 'abc123',
        dob: new Date('02/18/1993'),
        token: ''
    }
];

server.connection({
    host: 'localhost',
    port: 8080
});

/**
 * Plugins
 */
server.register(require('hapi-auth-jwt2'), function(err) {
    if (err) { throw err; }
    
    server.auth.strategy('jwt', 'jwt', {
        key: AUTH_SECRET_KEY, 
        validateFunc: validate,
        verifyOptions: {
            algorithms: ['HS256']
        }
    });

    server.auth.default('jwt');

    /**
     * API routes
     */
    server.route({
        method: 'GET',
        path: '/api/data',
        config: {
            auth: 'jwt'
        },
        handler: function(request, reply) {
            var payload = {
                restrictedData: '1023486101010' + '.restrictedData' + '.112233445566778899'
            };
            reply(null, payload).header('Authorization', request.headers.authorization);
        }
    });

    server.route({
        method: 'POST',
        path: '/api/login',
        config: {
            auth: false
        },
        handler: function(request, reply) {
            var body = request.payload['body'];
            var usr = body['username'];
            var pwd = body['password'];
            var user = findUser(usr, pwd);
            var resp = {
                user: user
            };
            if (user) {
                //TODO: actually generate this
                user.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEzMX0.uW4NZ9ST-zchZ5Dm50jV3IiO4u76t1wCy6zcfbqgwj0';
            }
            
            reply(null, resp);
        }
    });

    server.route({
        method: 'POST',
        path: '/api/logout',
        config: {
            auth: 'jwt'
        },
        handler: function(request, reply) {
            var body = request.payload['body'];
            var user = body['user'];
            var success = false;
            if (user) {
                user.token = '';
                success = true;
            }
            var resp = {
                'success': success
            }

            reply(null, resp).header('Authorization', request.headers.authorization);
        }
    });

    /**
     * Angular routes
     */
    server.route({
        method: 'GET',
        path: '/{p?}',
        config: {
            auth: false
        },
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
                myPath = path.join(__dirname, 'dist', 'index.html');
                reply.file(myPath);
            }
        }
    });
});// end hapi-auth-jwt plugin

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
const validate = function(decoded, request, callback) {
    //TODO: more validation checks
    console.log("validating user");    
    for (var i=0, count=mockUserData.length; i<count; i++) {
        var user = mockUserData[i];
        if (user.id === decoded.id) {
            return callback(null, true);
        }
    }

    return callback(null, false);
};

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