import * as express from "express";
import {todoHandler} from "./controllers/todoController";
import {unhandledRequestLogger} from "./middlewares/unhandledRequestLogger";
import {redirectTo404} from "./middlewares/redirectTo404";
import * as path from "path";
import {getFavicon} from "./middlewares/getFavicon";

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
todoHandler(app); // the first

// Middleware declarations:
// static files
app.use(express.static(path.join(__dirname, "public"))); // the second

// customized middleware
app.use(getFavicon); // the third
app.use(unhandledRequestLogger); // the fourth
app.use(redirectTo404); // and so on

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