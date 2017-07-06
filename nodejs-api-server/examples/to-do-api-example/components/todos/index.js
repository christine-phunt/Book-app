/**
 * Import all of the todo components and return an intialized todo component, which is an instance of the expressjs router
 *
 * @param config is the config object
 * @param database the database representation
 */
module.exports = (config, database) => {

    const TodosModel = require('./todos.model.js');
    const TodosController = require('./todos.controller.js');
    const TodosRouter = require('./todos.router.js');

    /* Instantiate the services */
    const todosModel = new TodosModel(config, database);

    /* Instantiate the controllers */
    const todosController = new TodosController(todosModel);

    /* Instantiate the routers */
    const todosRouter = new TodosRouter(todosController);

    return todosRouter;
}
