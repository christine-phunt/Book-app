/**
 * We instantaite an in-memory database connection here.
 * Most projects will have a database connection, and it should be separately testable.
 *
 * In reality, it's a promise that resolves to an array, but conceptually
 * this is a database connection that has just been opened, which we pass into our components.
 * This is wrapped in a promise to represent getting a connection asynchronously.
 */

const connectToDatabase = () => {
    let database = function () {
        this.records = [];
        this.keyCounter = 0;
    };
    // Insert a record and return it
    // These methods return promises so that they mimic asynchronous behavior
    database.prototype.insert = function (record) {
        // Assign the index as a candidate key. This is not a fully transactional database, just a representation fo what one might be.
        record.key = this.keyCounter++;
        this.records.push(record);
        return Promise.resolve(record);
    };
    // Update a record by its key and return it
    database.prototype.update = function (key, updatedRecord) {
        // Remove the old record
        this.records = this.records.filter((record) => record.key != key);
        // Insert the updated one
        updatedRecord.key = key;
        this.records.push(updatedRecord);
        return Promise.resolve(updatedRecord);
    };
    // Find a record by its key and return it
    database.prototype.find = function (key) {
        return Promise.resolve(this.records.find((record) => record.key === key));
    };
    // Find all records and return them
    database.prototype.findAll = function () {
        return Promise.resolve(this.records);
    };
    // Delete a record by its key
    database.prototype.deleteRecord = function (key) {
        let deletion = this.records.find((record) => record.key === key);
        this.records = this.records.filter((record) => record.key != key);
        return Promise.resolve(deletion);
    };
    // Return a promise that resolves the database
    // We do this so that we mimic getting a database connection asynchronously
    return new Promise((resolve, reject) => {
        resolve(new database());
    });
};

module.exports = connectToDatabase;
