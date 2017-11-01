## This is the restore-db pattern

This pattern restores a database with some seed data.

MongoDB is used as an example, but this can be adapted to any datastore like MySQL or Postgres.

## Quickstart

1. Build the images with: `docker-compose build`
2. Run the containers with: `docker-compose up -d`
3. Check the logs to see that the restore completed with: `docker-compose logs -f restore-db`
4. Verify that the database has been restored with: `docker-compose exec mongodb mongo todos-dev --eval "printjson(db.items.find().toArray())"`.
```
MongoDB shell version: 3.0.15
connecting to: todos-dev
[
	{
		"_id" : ObjectId("59fa364a09dfa3fce7205f0b"),
		"name" : "item-1"
	},
	{
		"_id" : ObjectId("59fa364c09dfa3fce7205f0c"),
		"name" : "item-2"
	},
	{
		"_id" : ObjectId("59fa364e09dfa3fce7205f0d"),
		"name" : "item-3"
	},
	{
		"_id" : ObjectId("59fa364f09dfa3fce7205f0e"),
		"name" : "item-4"
	},
	{
		"_id" : ObjectId("59fa365109dfa3fce7205f0f"),
		"name" : "item-5"
	}
]
```

## Description

This requires that an existing database restore be created and available, or else what are you going to restore, right?

This example uses mongodb. The restoration files live in `restore-db/dump/`, created by the program [`mongodump`](https://docs.mongodb.com/manual/reference/program/mongodump/#synopsis). They get restored to the database using the program [`mongorestore`](https://docs.mongodb.com/manual/reference/program/mongorestore/#synopsis) from inside of [`restore-db/startup.sh` line 14](./restore-db/startup.sh).