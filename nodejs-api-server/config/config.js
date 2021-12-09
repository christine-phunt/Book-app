/**
 * Store your configuration data here, segmented by environment.
 *
 * REMEMBER!!
 * Don't store any passwords or secrets in plaintext.
 * Instead, set them on the system as environment variables,
 * and read those variables here.
 */

/* Set a default NODE_ENV if one isn't set */
require('dotenv').config({path: '.env'});

let NODE_ENV = process.env.NODE_ENV || "development";

const config = {
    "development": {
        "port": process.env.PORT,
        "x-powered-by": "nodejs-api-pattern",
        "db": {
                host: process.env.PGHOST,
                name: process.env.PGDATABASE,
                username: process.env.PGUSER,
                password: process.env.PGPASSWORD
              }
    }
};


/***
 * Export out the configuration data only for the environemnt specified by NODE_ENV.
 */
module.exports = config[NODE_ENV];