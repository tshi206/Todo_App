import {options} from "./config";

export let getFavicon = (req, res, next) => {
    console.log(`sending favicon`);
    if (req.url.includes("favicon")){
        res.sendFile("assets/favicon.ico", options, function (err) {
            if (err) {
                next(err);
            } else {
                console.log('Sent: favicon.ico');
            }
        });
    }else next()
};