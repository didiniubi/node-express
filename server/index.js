'use strict';

const path = require('path');
const http = require('http');
const fs = require('fs-extra');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser'); // 实现对cookie的解析
const bodyParser = require('body-parser');


const log = require('./lib/common/log');


class Demo {
    init(Options) {
        this.appDir = Options.appDir || '' //项目根路径
        return new Promise((resolve, reject) => {
            log.info('开始读取配置');
            // fs.exists(path, callback) 测试某个目录下的文件是否存在
            fs.exists(path.join(this.appDir, './config.json'), (exist) => {
                if(exist) {
                    fs.readFile(path.join(this.appDir, './config.json')).then((json) => {
                        let config = JSON.parse(json);
                        log.success('获取配置文件成功');
                        resolve(config);
                    }).catch((err) => {
                        log.error('读取配置文件错误');
                        reject(err);
                    })
                }
            });
        }).then((config) => {
            this.config = config;
            log.success('读取配置成功');
            this.appName = this.config.appName || 'common-name';
            log.info('开始初始化app');
            return this._initApp();
        }).then(() => {
            // 路由访问前操作
        }).then(() => {
            // 注册路由
            // 初始化路由
            const initRouter = require('./router'); //初始化路由
            log.success('初始化路由前过滤器成功');
            log.info('开始初始化路由');
            return initRouter.call(this);
        }).then(() => {
            // 路由访问后操作
            return Promise.resolve();
        }).then(() => {
            // 应该完事了
            return Promise.resolve();
        })
    }
    _initApp() {
        // express 配置
        const express = require('express');
        this.app = express(); // express app实例
        const app = this.app;
        const appDir = this.appDir;
        const viewPath = path.join(appDir, 'views/') // 模板目录 （前端页面）
        if(fs.existsSync(viewPath)) { // 未测试
            app.set('views', viewPath);
            app.engine('html', handlebars.engine);
            app.set('view engine', 'html');
        }else {
            log.info('没有模板目录,略过模板引擎注册');
        }
        return Promise.resolve();
    }
    /**
     * 获取express Router对象
     */
    getRouter() {
        const express = require('express');
        return express.Router();
    }
    /**
     * 启动服务
     */
    start() {
        const startFun = require('./start'); //启动服务
        if(!this.app) throw new Error('need init');
        log.info('开始启动应用');
        return startFun(this.app, this.config);
    }


}



// const server = http.createServer(function (req, res) {
//     if (req.url == "/") {
//         res.end("Hello world!");
//     }
// });

// server.listen(8000);

module.exports = Demo;