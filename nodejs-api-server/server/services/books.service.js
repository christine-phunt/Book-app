/**
 * This is the todos service.
 * This guy is responsible for all of the business logic related to a To Do entity.
 *
 *
 * @param config is the config object
 * @param database is a database representation
 */

 const Book = require('../models/books');

 module.exports = function(config, database) {

    /**
     * Get all the ToDo records from the database
     */
    //  exports.getAll = async (req, res, next) => {

    let getBooks = async () => {
            const ALL = await Book.findAll();
            return Promise.resolve(ALL);
    };

    /**
     * Create a ToDo record in the database
     *
     * @param title the name of the ToDo item
     */
    let createBook = async (book) => {
        
        console.log(book);
        const oneBook = await Book.create({  
            title: book['Title'],
            author: book['Author'],
            country: book['Country'],
            year: book['Year'],
            iSBN: book['ISBN'],
            price: book['Price']
         });
        return Promise.resolve(oneBook);

    };

    /**
     * Update a ToDo record in the database
     *
     * @param key the key for the ToDo entity to update
     * @param updatedBook The updated record to put in the database
     */
    let updateBook = async (key, updatedBook) => {
        
        const oneBook = await Book.update
        ({ 
            title: updatedBook['Title'],
            author: updatedBook['Author'],
            country: updatedBook['Country'],
            year: updatedBook['Year'],
            iSBN: updatedBook['ISBN'],
            price: updatedBook['Price']
        }, {
            where: {
              id: key
            }
          });
        
       
        return Promise.resolve(oneBook);
    };

    return {
        createBook: createBook,
        getBooks: getBooks,
        updateBook: updateBook,
    };
};