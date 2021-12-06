/**
 * This is the Books router.
 */

const express = require('express');
const bodyParser = require('body-parser');

module.exports = function BookRouter(booksController) {

    const router = express.Router();

    /* Parse HTTP request bodies as JSON */
    router.use(bodyParser.json());

    /**
     * Get all of the To Do objects
     */
    router.get('/', (req, res, next) => {
        booksController.getBooks()
            .then((books) => {
                res.status(200).send(books);
            })
            .catch(next)
    });

    /**
     * Create a To Do object
     */
    router.post('/', (req, res, next) => {
        booksController.createBook(req.body.title)
            .then((book) => {
                res.status(201).send(book);
            })
            .catch(next)
    });

    /**
     * Update a To Do object. This does PUT updates, not PATCH updates, so the whole entity is re-written, not select fields.
     */
    router.put('/:id', (req, res, next) => {
        booksController.updateBook(req.params.id, req.body)
            .then((updatedRecord) => {
                res.status(200).send(updatedRecord);
            })
            .catch(next);
    });

    return router;
};
