var Hapi = require('hapi');
var server = new Hapi.Server(3000);
var debug = require('debug')('server');

var routes = require('./routes');
var ws = require('./ws')(server.listener);

// set routes
server.route(routes);

server.start(function() {
 debug( 'Server running at: ' + server.info.uri);

});
