const server = require('../../../../index');
const router = server.getRouter();

exports.rootPath = '/test';

router.get('/', function(req, res) {
    console.log('路由访问');
    res.send({
        'test': 'test'
    });
});

router.get('/didi', function(req, res) {
    res.send({
        'test': 'didi'
    });
});

exports.router = router;