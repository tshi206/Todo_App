import {Express} from "express-serve-static-core";
import * as bodyParser from "body-parser";

let urlencodedParser = bodyParser.urlencoded({extended: false});

let dummyDB = [{item: "get milk"}, {item: "walk dog"}, {item: "kick some coding ass"}];

// handles requests and responses
export let todoHandler = (app : Express) => {

    app.get("/todo", (req, res) => {
        app.render("todo", {todos: dummyDB}, (err, html) => {
            if (err) throw err;
            else res.end(html);
        })
    });

    app.post("/todo", urlencodedParser, (req, res) => {
        console.log(`item to be added: ${req.body.item}`);
        dummyDB.push(req.body);
        console.log(dummyDB);
        res.json(dummyDB)
    });

    app.delete("/todo/:item", (req, res) => {
        console.log(`item to be deleted: ${req.params.item}`);
        dummyDB = dummyDB.filter(obj => {
            console.log("-"+obj.item.replace(/ /g, "-")+"-");
            return "-"+obj.item.replace(/ /g, "-")+"-" !== req.params.item
        });
        console.log(dummyDB);
        res.json(dummyDB)
    })

};