/**
 * This is the Todos controller.
 */

module.exports = function(todosModel) {

    /**
     * Async method that returns a promise with the result or rejects with a message.
     */
    const getTodos = () => {
        return todosModel.getTodos();
    };

    const createTodo = (title) => {
        return todosModel.createTodo(title);
    }

    const updateTodo = (id, changes) => {
        return todosModel.updateTodo(id, changes);
    }

    return {
        createTodo: createTodo,
        getTodos: getTodos,
        updateTodo: updateTodo
    };
};
