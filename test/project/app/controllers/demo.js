const server = require('../../../../index');
const config = server.config;
const router = server.getRouter();

console.log(config, 'config');
exports.rootPath = '/demo';



router.get('/', function(req, res) {
    res.send({
        'test': 'test'
    });
});

router.get('/test', function(req, res) {
    res.send({
        'test': 'didi'
    });
});

exports.router = router;