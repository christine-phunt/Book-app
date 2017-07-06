/**
 * This is the entrypoint to the API.
 */

const express = require('express');
const os = require('os');
const databaseConnection = require('./databaseConnection.js');

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
};

/**
 * Initialize the express application along with anything else that needs initialization before starting the webserver.
 * This is the startup of API server itself.
 *
 * We instantiate a database connection, and turn on the server.
 * Following that
 */
Promise.all([
    listen(app, config.port),

    /**
     * Replace the following with your MySQL/MongoDB/Redis/Whatever-db connection
     */
    databaseConnection()
])
/**
 * All initialized entities, such as the express app, and the  are passed through, such as the database
 */
.then((initializedEntities) => {
    /**
     * Import the components. Each component is an instance of an ExpressJS router.
     * Here the application (general utility) component, and the ToDos component are loaded.
     */
    const applicationComponent = require('./components/application')(config);
    const todosComponent = require('./components/todos')(config, initializedEntities[1]);

    /**
     * Bind all of the components to the express application.
     *
     * Bind the application component with no mountpoint, so the application component executes for each HTTP request.
     * Bind the todos component with the /todos, so the todos component executes for each HTTP request that goes to /todos.
     */

    app.use(applicationComponent);
    app.use('/todo', todosComponent);

    /**
     * If the middleware above this hasn't sent back a response, then there was no matching endpoint. We send back an HTTP 404.
     */
    app.use((req, res, next) => {
        res.status(404);
        res.send();
    });

    /**
     * This is the error handling middleware, all errors that are passed to middleware are processed here.
     */
    app.use((error, req, res, next) => {
        console.error(`api-server: ${error}`);
        res.status(500);
        res.send();
    });

})
.catch((reason) => {
    // Log the error to the console
    console.error(`api-server: ${reason}`);

    // Exit the program
    process.exit(1);
});
