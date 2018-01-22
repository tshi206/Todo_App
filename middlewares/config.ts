// specify the configuration for sendFile()
export let options = {
    root: __dirname.substring(0, __dirname.length-"middlewares".length) + 'public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};