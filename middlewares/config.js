"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// specify the configuration for sendFile()
exports.options = {
    root: __dirname.substring(0, __dirname.length - "middlewares".length) + 'public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};
//# sourceMappingURL=config.js.map