/**
 * This is the Books controller.
 */

module.exports = function(booksModel) {

    /**
     * Async method that returns a promise with the result or rejects with a message.
     */
    const getBooks = () => {
        return booksModel.getBooks();
    };

    const createBook = (book) => {
        

        return booksModel.createBook(book);
    }

    const updateBook = (id, changes) => {
        return booksModel.updateBook(id, changes);
    }

    return {
        createBook: createBook,
        getBooks: getBooks,
        updateBook: updateBook
    };
};
