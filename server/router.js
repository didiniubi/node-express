'use strict';
const path = require('path');
const fs = require('fs');
const recursive = require('recursive-readdir');
const log = require('./lib/common/log');

module.exports = function() {
    const app = this.app;
    const routerPath = path.join(this.appDir, '/app/controllers/');
    return new Promise( (resolve, reject) => {
        if(fs.existsSync(routerPath)) {
            return recursive(routerPath, (err, file) => {
                if(err) {
                    log.error('路由出错');
                    return reject(err);
                }
                file.forEach((filePath) => {
                    const controller = require(filePath);
                    // 载入路由
                    app.use(controller.rootPath.replace(/\/$/, ''), controller.router);
                    resolve();
                })

            })
        }else{
            log.warn('没有路由目录,直接跳过初始化');
        }
        resolve();
    }) 
}