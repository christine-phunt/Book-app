/**
 * This is the todos service.
 * This guy is responsible for all of the business logic related to a To Do entity.
 *
 *
 * @param config is the config object
 * @param database is a database representation
 */

module.exports = function(config, database) {

    /**
     * Get all the ToDo records from the database
     */
    let getTodos = () => {
        return database.findAll();
    };

    /**
     * Create a ToDo record in the database
     *
     * @param title the name of the ToDo item
     */
    let createTodo = (title) => {
        return database.insert({ "title": title });
    };

    /**
     * Update a ToDo record in the database
     *
     * @param key the key for the ToDo entity to update
     * @param updatedTodo The updated record to put in the database
     */
    let updateTodo = (key, updatedTodo) => {
        return database.update(key, updatedTodo)
    };

    return {
        createTodo: createTodo,
        getTodos: getTodos,
        updateTodo: updateTodo,
    };
};
