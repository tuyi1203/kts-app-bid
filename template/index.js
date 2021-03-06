const fs = require("fs");

switch (process.argv[2]) {
    case 'm':
        require('./modules')(process.argv[3], process.argv[4]);
        break;

    case 'a':
        require('./api')(process.argv[3], process.argv[4]);
        break;

    case 'p':
        require('./part')(process.argv[3], process.argv[4]);
        break;

    default:
        console.log('参数错误')
        break;
}