/**
 * Import all of the applcation components and return an intialized application component, which is an instance of the expressjs router
 *
 * We inject dependencies into enclosing pieces.
 * Model -injected-into-> Controller -injected-into-> Router
 */
module.exports = (config) => {

    const ApplicationModel = require('./application.model.js');
    const ApplicationController = require('./application.controller.js');
    const ApplicationRouter = require('./application.router.js');

    /* Instantiate the models */
    const applicationModel = new ApplicationModel(config);

    /* Instantiate the controllers */
    const applicationController = new ApplicationController(applicationModel);

    /* Instantiate the routers */
    const applicationRouter = new ApplicationRouter(applicationController);

    return applicationRouter;
}
