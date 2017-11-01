# Base this image off of the office mongo 3.0 image
FROM mongo:3.0

# Install netcat, which is a network utilitiy tool.
# We will use this to check if the database is accepting connections before we try to connect to it.
RUN apt-get update && apt-get install -y netcat

# Copy the startup.sh, which holds our restoration script
COPY . /restore-db

# Execute the restore when this container starts
CMD /restore-db/startup.sh
