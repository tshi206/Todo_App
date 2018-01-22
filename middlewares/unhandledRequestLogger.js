"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unhandledRequestLogger = (req, res, next) => {
    console.log("\nlogging>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log("Unhandled URL: route not specified");
    console.log(`Request IP: ${req.ip}`);
    console.log(`Request hostname: ${req.hostname}`);
    console.log(`Request URL: ${req.url}`);
    console.log(`Request body: ${req.body}`);
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
    next();
};
//# sourceMappingURL=unhandledRequestLogger.js.map