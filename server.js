'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost');
const userSchema = Mongoose.Schema({
    username: String,
    password: String,
    dob: Date,
    token: String
});
userSchema.methods.setToken = function(token) {
    this.token = token;
    console.log('set token field for the user');
}

const User = Mongoose.model('User', userSchema);

const angRoutes = [
    'about',
    'login',
    'create'
];
const AUTH_SECRET_KEY = 'MySecretKey2'; // Never share the secret key

const server = new Hapi.Server();
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
            console.log('querying db for users...');
            User.find(function(err, users) {
                if (err) throw err;
                console.log(users);
            });
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
            User.findOne({username: usr}, function(err, user) {
                if (err) { console.log('found error'); throw err;}
                //TODO: generate token
                if (user) {
                    user.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJob3dhcmQiLCJwYXNzd29yZCI6ImFiYzEyMyIsImRvYiI6IjE5OTMtMDItMThUMDY6MDA6MDAuMDAwWiJ9.xmMiS-iJ1iLGabFdR0tmpiwy_8Ul4JAXJGsgI4yMy6Q');
                    console.log('found an existing user: ' + user);                                    
                }
                reply(err, user);
            });
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

    server.route({
        method: 'POST',
        path: '/api/create',
        config: {
            auth: false
        },
        handler: function(request, reply) {
            var body = request.payload['body'];
            //TODO: query for existing users with the same username
            var resp = {
                success: false
            };
            User.findOne({username: body['username']}, function(err, user) {
                if (user) {
                    // A user with that username already exists
                    reply(null, resp);
                } else {
                    const user = new User({
                        username: body['username'],
                        password: body['password'],
                        dob: body['dob'],
                        token: '' // token does not persist in the db, but is instead set on successful user login
                    });
                    user.save(function(err, user) {
                        if (err) throw err;
                        resp.success = true;
                        reply(null, resp);
                    });
                }
            });
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

const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: ' ));
db.once('open', function() {
    console.log('Database connected. Starting server...');
    server.register({
        register: Inert
    }, function(err) {
        if (err) throw err;
        server.start((err) => {
            if (err) throw err;
            console.log('Server is listening on ' + server.info.uri.toLowerCase())
        });
    });
    
});

/**
 * Helper functions
 */
const validate = function(decoded, request, callback) {
    //TODO: more validation checks like add _id to the jwt
    User.findOne({username: decoded.username, password: decoded.password, dob: decoded.dob}, function(err, user) {
        if (err) { console.log('validation error'); throw err; }
        if (user) {
            return callback(null, true);
        }

        return callback(null, false);
    });
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