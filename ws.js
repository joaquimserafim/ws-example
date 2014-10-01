var io = require('socket.io');
var debug = require('debug')('ws');
var stringify = require('json-stringify-safe');

module.exports = function(httpListenner) {
  return WS(httpListenner);
};

// using the Revealing Module Pattern
// see for more @ https://carldanley.com/js-revealing-module-pattern/
function WS(httpListenner) {
  // creating the socket.io server
  var ws = io(httpListenner);

  var clients = {};

  ws.on('connection', function(socket) {
    debug('new user connected ' + socket.id);

    // save the client
    clients[socket.id] = socket;
    debug('clients on: ' + Object.keys(clients).length);

    // use for server events
    socket.emit('server_events', {clientId: socket.id});

    // emiter for chat_message
    socket.on('chat_message', function(data) {
      debug('new chat message: ' + data);
      debug('clients on: ' + Object.keys(clients).length);
      
      // send the message for the rest of clients
      // and not the current sender
      Object.keys(clients).forEach(function(client) {
        if (clients[client].id !== socket.id) {
          clients[client].emit('chat_message', {
            client: socket.id,
            message: data
          });
          debug('send chat to: ' + clients[client].id);
        }
      });
    });

    socket.on('disconnect', function(){
      debug('user disconnected ' + socket.id);
      delete clients[socket.id];
      debug('clients on: ' + Object.keys(clients).length);
    });
  });
}
