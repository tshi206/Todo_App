import {options} from "./config";

export let redirectTo404 = (req, res, next) => {
    console.log(`redirect to 404`);
    res.sendFile("assets/404.html", options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent: 404.html');
        }
    });
};