const server = require('../../index');



server.init({
    appDir: __dirname
}).then(function() {
    server.start();
})

