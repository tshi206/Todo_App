"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// handles requests and responses
exports.todoHandler = (app) => {
    app.get("/todo", (req, res) => {
        app.render("todo", (err, html) => {
            if (err)
                throw err;
            else
                res.end(html);
        });
    });
    app.post("/todo", (req, res) => {
    });
    app.delete("/todo", (req, res) => {
    });
};
//# sourceMappingURL=todoController.js.map