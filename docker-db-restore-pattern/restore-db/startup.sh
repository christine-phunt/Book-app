#!/bin/bash

# This will loop until $DB_HOST:$DB_PORT is accepting connections.
# This ensures that we do not attempt a database restore until AFTER the database is ready.

while ! nc -z $DB_HOST $DB_PORT;
do
    echo "Database $DB_HOST:$DB_PORT is not accepting connection yet...retrying in 5 seconds."
    sleep 5;
done

echo "Database $DB_HOST:$DB_PORT is accepting connection, starting restoration."

mongorestore --host $DB_HOST --dir /restore-db/dump;

echo "Done."