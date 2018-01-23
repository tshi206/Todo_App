"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
exports.getFavicon = (req, res, next) => {
    console.log(`sending favicon`);
    if (req.url.includes("favicon")) {
        res.sendFile("assets/favicon.ico", config_1.options, function (err) {
            if (err) {
                next(err);
            }
            else {
                console.log('Sent: favicon.ico');
            }
        });
    }
    else
        next();
};
//# sourceMappingURL=getFavicon.js.map