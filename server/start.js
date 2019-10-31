'use strict';
const path = require('path');
const http = require('http');

const log = require('./lib/common/log');

function getPort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        return 3000;
    }
    if(val >= 0) {
        return val
    }
    return false
}

function onError(error) {
    console.log(error, 'error');
}

function onListening(server) {
    const address = server.address();

    log.success('Listening:' + address.port);
}

module.exports = function(app, options) {
    let port = getPort(options.port || 3000);
    app.set('port', port);
    const server = http.createServer(app);
    return new Promise((resolve, reject)=> {
        server.listen(port);
        server.on('error', e=>{
            onError(e);
            reject(e);
        });
        server.on('listening', function() {
            onListening(server);
            resolve({
                port: port
            });
        });
    });
}
