/**
 * This is the books service.
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
    let getBooks = () => {
        return database.findAll();
    };

    /**
     * Create a ToDo record in the database
     *
     * @param book the name of the ToDo item
     */
    let createBook = (book) => {
        return database.insert({
            
            "Title": book.title,
            "Author": book.author,
            "Country": book.country,
            "Year": book.year,
            "ISBN": book.isbn,
            "Price": book.price

        
        });
    };

    /**
     * Update a ToDo record in the database
     *
     * @param key the key for the ToDo entity to update
     * @param updatedBook The updated record to put in the database
     */
    let updateBook = (key, updatedBook) => {
        return database.update(key, updatedBook)
    };

    return {
        createBook: createBook,
        getBooks: getBooks,
        updateBook: updateBook,
    };
};
