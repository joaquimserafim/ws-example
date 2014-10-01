var extend = require('util')._extend;
var debug = require('debug')('routes');

var routes = {};

routes.index = {
  method: 'GET',
  path: '/',
  handler: function(req, reply) {
    var html = '<div>' +
      '<h1>Welcome to my WS chat</h1>' +
      '<p><a href="index.html">click here for the chat</a></p>' +
      '</div>';
    reply(html);
  }
};

routes.staticFiles = {
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'static',
      listing: true
    }
  }
};

module.exports = Object.keys(routes).map(function(route) {
  debug('create route: ' + route);
  return routes[route];
});
