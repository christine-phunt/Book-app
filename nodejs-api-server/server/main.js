/**
 * This is the entrypoint to the API.
 */

const os = require('os');

const express = require('express');

// const databaseConnection = require('./databaseConnection.js');

const ApplicationService = require('./services/application.service.js');
const ApplicationController = require('./controllers/application.controller.js');
const ApplicationRouter = require('./routers/application.router.js');

const BooksService = require('./services/books.service.js');
const BooksController = require('./controllers/books.controller.js');
const BooksRouter = require('./routers/books.router.js');

const config = require('./config/config.js');
const port = config.port;
const env = require('dotenv').config({path: '../.env'});
// const keys = require("./keys.js");



const sequelize = require('./util/database');


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
    console.log('CONFIG', process.env.PORT), /*eaddrinuse ERROR when removed*/

    /**
     * Replace the following with your MySQL/MongoDB/Redis/Whatever-db connection
     */
    // connectToDatabase(),
    sequelize.sync({force: false}),
    sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    console.log('Connection has been established successfully.');
    console.log('Connection has been established successfully.');
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    console.error('Unable to connect to the database:', err);
    console.error('Unable to connect to the database:', err);
  }),

    listen(app, config.port)
    
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

    //    console.log('1111111111111111111111111',initializedEntities[1]);


    
    const booksService = new BooksService(config, initializedEntities[1]);
    const booksController = new BooksController(booksService);
    const booksRouter = new BooksRouter(booksController);

    /**
     * Bind all of the components to the express application.
     *
     * Bind the application component with no mountpoint, so the application component executes for each HTTP request.
     * Bind the books component with the /books, so the books component executes for each HTTP request that goes to /books.
     */

    app.use(applicationRouter);
    app.use('/book', booksRouter);

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
