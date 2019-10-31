/**
 * 日志记录
 */

const chalk = require('chalk');
const logTypeList = [
    {
        color: 'green',
        type: 'success',
        icon: '✔'
    },
    {
        color: 'red',
        type: 'error',
        icon: '✗'
    },
    {
        color: 'gray',
        type: 'info',
        icon: '!'
    }
]

logTypeList.forEach(function(logType) {
    exports[logType.type] = function() {
        let args = Array.prototype.slice.call(arguments, 0); // 将出入的参数变成数组
        if(logType.icon) args = [logType.icon].concat(args);
        global.console.log(chalk[logType.color].apply(global.console, args));
    };
});



