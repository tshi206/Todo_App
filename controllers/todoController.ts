import {Express} from "express-serve-static-core";

// handles requests and responses
export let todoHandler = (app : Express) => {

    app.get("/todo", (req, res) => {
        app.render("todo", (err, html) => {
            if (err) throw err;
            else res.end(html);
        })
    });

    app.post("/todo", (req, res) => {

    });

    app.delete("/todo", (req, res) => {

    })

};