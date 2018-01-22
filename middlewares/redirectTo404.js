"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
exports.redirectTo404 = (req, res, next) => {
    console.log(`redirect to 404`);
    res.sendFile("assets/404.html", config_1.options, function (err) {
        if (err) {
            next(err);
        }
        else {
            console.log('Sent: 404.html');
        }
    });
};
//# sourceMappingURL=redirectTo404.js.map