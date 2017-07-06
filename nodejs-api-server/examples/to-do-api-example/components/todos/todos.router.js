/**
 * This is the Todos router.
 */

const express = require('express');
const bodyParser = require('body-parser');

module.exports = function TodoRouter(todosController) {

    const router = express.Router();

    /* Parse HTTP request bodies as JSON */
    router.use(bodyParser.json());

    /**
     * Get all of the To Do objects
     */
    router.get('/', (req, res, next) => {
        todosController.getTodos()
            .then((todos) => {
                res.status(200).send(todos);
            })
            .catch(next)
    });

    /**
     * Create a To Do object
     */
    router.post('/', (req, res, next) => {
        todosController.createTodo(req.body.title)
            .then((todo) => {
                res.status(201).send(todo);
            })
            .catch(next)
    });

    /**
     * Update a To Do object. This does PUT updates, not PATCH updates, so the whole entity is re-written, not select fields.
     */
    router.put('/:id', (req, res, next) => {
        todosController.updateTodo(req.params.id, req.body)
            .then((updatedRecord) => {
                res.status(200).send(updatedRecord);
            })
            .catch(next);
    });

    return router;
};
