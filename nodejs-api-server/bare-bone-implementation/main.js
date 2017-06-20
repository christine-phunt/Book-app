/**
 * This is the entrypoint to the application programmer interface.
 */

/**
 * Catch and log uncaught exceptions as soon as they happen, log them, then exit with error code 1.
 * Do this before loading anything else.
 */
process.on('uncaughtException', (exception) => {
    console.error(`An uncaughtException happened:\n${exception}`);
    process.exit(1);
});

const express = require('express');
const os = require('os');

const config = require('./config/config.js');
console.log(`api-server: loaded configuration:\n${JSON.stringify(config, null, 4)}`);

/**
 * Instanitate an ExpressJS webserver.
 * Later on, this should probably be turned into a "core" module that we import into here and inject into the "components".
 */
const app = express();

// Wrap this in a promise
const listen = (expressApp, port) => {
    return new Promise((resolve, reject) => {
        expressApp.listen(port, () => {
            console.log(`api-server: listening on ${os.hostname()}:${port}`)
            resolve();
        });
    });
}

/**
 * Initialize the express application along with anything else that needs initialization before starting the webserver
 */
Promise.all([
    listen(app, config.port),
])
/**
 * All initializer results are passed through, but in this bare bones example we don't have any
 */
.then(() => {
    /**
     * Import the components. Each component is an instance of an ExpressJS router.
     * Here the application (general utility) component is loaded.
     */
    const applicationComponent = require('./components/application')(config);

    /**
     * Bind the components to the express application
     */
    app.use(applicationComponent);

    /**
     * For the bare-bones-implementation this only has an application router, so we send the response back here.
     * For expanded implementations, you'd probably pass the req/res onto another set of middlewares, but here we send the response back to the requestor
     * */
    app.use((req, res, next) => {
        res.send();
    });

    /**
     * This is the error handling middleware.
     */
    app.use((error, req, res, next) => {
        console.error(`api-server: ${error}`);
        res.status(500)
        res.send();
    });

})
.catch((reason) => {
    // Log the error to the console
    console.error(`api-server: ${reason}`);

    // Exit the program
    process.exit(1);
});
