"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const todoController_1 = require("./controllers/todoController");
const unhandledRequestLogger_1 = require("./middlewares/unhandledRequestLogger");
const redirectTo404_1 = require("./middlewares/redirectTo404");
const path = require("path");
const getFavicon_1 = require("./middlewares/getFavicon");
let app = express();
// set up template engine
app.set("view engine", "ejs");
// to specify customized path to views (templates) use the following:
// (if not specified, default directory is 'views' under the project root)
//      app.set("views", **__any_path_goes_here__(must_be_absolute)__**)
// The order in which your route handlers and other middleware functions
// are declared is the order which they will be executed.
// Route handlers:
// connect to controller (route handlers)
todoController_1.todoHandler(app); // the first
// Middleware declarations:
// static files
app.use(express.static(path.join(__dirname, "public"))); // the second
// customized middleware
app.use(getFavicon_1.getFavicon); // the third
app.use(unhandledRequestLogger_1.unhandledRequestLogger); // the fourth
app.use(redirectTo404_1.redirectTo404); // and so on
// example --- adding global variables in Response using middleware:
/*
app.use((req, res, next) => {
    // add a new global property called 'errors' in the Response.locals object
    // and set it to null
    res.locals.errors = null;
    next()
});
*/
// listen to port
app.listen(3000, "127.0.0.1", () => console.log("now listening to port 3000 on localhost"));
//# sourceMappingURL=app.js.map