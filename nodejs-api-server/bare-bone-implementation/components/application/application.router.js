/**
 * This is the Application (general utility) router.
 */

const express = require('express');
const bodyParser = require('body-parser');

module.exports = function ApplicationRouter(applicationController) {

    const router = express.Router();

    /* Parse HTTP request bodies as JSON */
    router.use(bodyParser.json());

    /* Log the request and send it to the next middleware function */
    router.use((req, res, next) => {
        console.info(`api-server received ${req.method} ${req.url}`);
        next();
    });

    router.use((req, res, next) => {
        applicationController.getXPoweredByHeader()
            .then(
                (number) => {
                    // Bind the api version to the request
                    res.header('x-powered-by', number)
                    // Pass the request to the next router
                    next();
                },
                (issue) => {
                    // Probably want to change this later so we don't leak stuff out while in production
                    res.setStatus(500).send(issue.message);
                }
            );
    });

    return router;
};
