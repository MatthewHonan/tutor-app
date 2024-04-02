# Use the official MySQL image from the Docker Hub
FROM mysql:8.0.26

# Set the environment variables (replace 'your_password' with your password)
ENV MYSQL_ROOT_PASSWORD=admin
ENV MYSQL_DATABASE=tutor_db

# When container will be up, we'll populate our custom database schema
ADD schema.sql /docker-entrypoint-initdb.d
