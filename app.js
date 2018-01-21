"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const todoController_1 = require("./controllers/todoController");
let app = express();
// connect to controller
todoController_1.todoHandler(app);
// set up template engine
app.set("view engine", "ejs");
// static files
app.use(express.static("./public"));
// listen to port
app.listen(3000, "127.0.0.1", () => console.log("now listening to port 3000 on localhost"));
//# sourceMappingURL=app.js.map