"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
// connect to mongo DB
let connectedDB = mongoose.connect("mongodb://admin:admin@ds111598.mlab.com:11598/todo_app_db_63527794");
// create a schema - this is like a blueprint for our data
let todoSchema = new mongoose.Schema({
    item: String
});
// create a model (a.k.a collection) based on the above schema, and store it as a local TYPE
// if the collection name has not been explicitly specified as the third parameter, mongoose will generate the collection with a name INDUCED by the model name:
//      Induced collection name === <model_name> + 's' (all in lowercase)
//      Hence the induced collection name for model 'Todo' would be 'todos'
let Todo = mongoose.model("Todo", todoSchema);
// store an item in the collection (the following can be written as a single line)
/*
let itemOne = new Todo({item: "buy flowers"});
itemOne.save()
    .then(value => console.log("Object saved: " + value))
    .catch(reason => console.log("Rejected due to: " + reason));
*/
// note that save() can take an optional callback as a parameter like the following:
//    itemOne.save(err => {if (err) throw err; else console.log("item saved")})
// if a callback is given, it will NOT return a Promise<**value**>,
// instead, it will return an undefined. This is possibly due to the callback which
// throws away the returning Promise, as the return type of the callback is void.
// Hence calling then() on a save(cb => void) like so:
//    itemOne.save(err => {if (err) throw err; else console.log("item saved")})
//      .then(...)
// will throw an error: 'TypeError: Cannot read property 'then' of undefined'.
// REMEMBER: PROMISES ARE MONADIC. TYPES MUST BE LINED UP IN A PROMISE CHAIN.
// Anyway, you can always manually wrap the entire expression (itemOne.save(cb))
// inside a customized Promise. For more details see examples in 'node_tutorial'
// project.
//let dummyDB = [{item: "get milk"}, {item: "walk dog"}, {item: "kick some coding ass"}];
// handles requests and responses
exports.todoHandler = (app) => {
    // local helpers, get all items from db
    let findAllItems = () => {
        return new Promise((resolve, reject) => {
            // '{}' as condition will cause the db to retrieve all the documents (objects)
            // stored in the specific collection (Todo in this case)
            Todo.find({}, ((err, result) => {
                if (err)
                    reject(err);
                else
                    console.log("\nitems in db:");
                console.log(result);
                resolve(result);
            }));
        });
    };
    // local helpers, render "todo" view with given object array
    // renderTodo :: [{item: String}] -> Promise<Error || String>
    let renderTodo = (objs) => {
        return new Promise((resolve, reject) => {
            app.render("todo", { todos: objs }, (err, html) => {
                if (err)
                    reject(err);
                else
                    console.log("\nrendered html: \n" + html);
                resolve(html);
            });
        });
    };
    app.get("/todo", (req, res) => {
        // get data from mongodb and pass it to the view
        findAllItems().then(renderTodo)
            .then(renderedHtml => res.end(renderedHtml))
            .catch(err => { throw err; });
    });
    app.post("/todo", urlencodedParser, (req, res) => {
        // get data from the view and add it to mongodb
        console.log(`item to be added: ${req.body.item}`);
        new Todo(req.body).save().then(data => res.json(data))
            .catch(reason => console.log(reason));
        // the following is an alternative way of doing it:
        /*
        new Todo(req.body).save((err, product) => {
            if (err) throw err;
            res.json(product)
        })
        */
    });
    // updated: check for _id now instead of item
    app.delete("/todo/:id", (req, res) => {
        // delete the requested item from mongodb
        /*
        // old codes used to check the "item": "*text*" directly for deletion
        // now replaced by checking the data-id attribute instead of text
        console.log(`item to be deleted: ${req.params.item.replace(/-/g, " ").trim()}`);
        Todo.find({item: req.params.item.replace(/-/g, " ").trim()})
            .remove((err, data) => {
                if (err) throw err;
                res.json(data)
            });
        */
        console.log(`item to be deleted with id: ${req.params.id}`);
        Todo.find({ _id: req.params.id })
            .remove((err, data) => {
            if (err)
                throw err;
            res.json(data);
        });
        // the following is old code using dummyDB, keep it as a reference if needed
        /*
        dummyDB = dummyDB.filter(obj => {
            console.log("-"+obj.item.replace(/ /g, "-")+"-");
            return "-"+obj.item.replace(/ /g, "-")+"-" !== req.params.item
        });
        console.log(dummyDB);
        res.json(dummyDB)
        */
    });
};
//# sourceMappingURL=todoController.js.map