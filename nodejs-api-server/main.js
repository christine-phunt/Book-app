/**
 * This is the entrypoint to the API.
 */

const os = require('os');

const express = require('express');

const databaseConnection = require('./databaseConnection.js');

const ApplicationService = require('./services/application.service.js');
const ApplicationController = require('./controllers/application.controller.js');
const ApplicationRouter = require('./routers/application.router.js');

const TodosService = require('./services/todos.service.js');
const TodosController = require('./controllers/todos.controller.js');
const TodosRouter = require('./routers/todos.router.js');

const config = require('./config/config.js');

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
     * Instantiate the services, controllers, and routers
     * Here the Application (general utility) and the ToDos Routers, Controllers, and Services are loaded
     */
    
    const applicationService = new ApplicationService(config);
    const applicationController = new ApplicationController(applicationService);
    const applicationRouter = new ApplicationRouter(applicationController);

    const todosService = new TodosService(config, initializedEntities[1]);
    const todosController = new TodosController(todosService);
    const todosRouter = new TodosRouter(todosController);

    /**
     * Bind all of the components to the express application.
     *
     * Bind the application component with no mountpoint, so the application component executes for each HTTP request.
     * Bind the todos component with the /todos, so the todos component executes for each HTTP request that goes to /todos.
     */

    app.use(applicationRouter);
    app.use('/todo', todosRouter);

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
    console.error(reason);

    // Exit the program
    process.exit(1);
});
