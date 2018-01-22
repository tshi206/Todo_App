import * as express from "express";
import {todoHandler} from "./controllers/todoController";
import {unhandledRequestLogger} from "./middlewares/unhandledRequestLogger";
import {redirectTo404} from "./middlewares/redirectTo404";

let app = express();

// set up template engine
app.set("view engine", "ejs");

// The order in which your route handlers and other middleware functions
// are declared is the order which they will be executed.

// Route handlers:
// connect to controller (route handlers)
todoHandler(app); // the first

// Middleware declarations:
// static files
app.use(express.static("./public")); // the second

// customized middleware
app.use(unhandledRequestLogger); // the third
app.use(redirectTo404); // and so on

// listen to port
app.listen(3000, "127.0.0.1", () => console.log("now listening to port 3000 on localhost"));