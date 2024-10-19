# Express server with MySQL in Amazon RDS

This is a simple Express server that connects to a MySQL database in Amazon RDS, using the `mysql2` package.

Note: This does not take security into consideration. At all.

## Setup

1. Create `.env` file based on `.env.example`

## AmazonRDS

1. Create database instance [Create database](https://eu-north-1.console.aws.amazon.com/rds/home?region=eu-north-1#launch-dbinstance:)
   1. Standard create
   2. MySQL
   3. Free tier
   4. Credentials management: self managed
      - Username: `my-username`
      - Password: `my-secret-password`
   5. Public access: Yes
   6. **Database authentication**: Password authentication
   7. Additional configuration:
      - Initial database name: `journal`
      - Username: `admin`
      - Password: `my-secret-password`
2. Wait for database to be ready
3. Go to security group
   - Allow all by setting `0.0.0.0/0` inbound and outbound
4. Fill out `.env` file based on database details
   - `MYSQL_HOST=database-1.example.eu-north-1.rds.amazonaws.com`
   - `MYSQL_USER=my-username`
   - `MYSQL_PASSWORD=my-secret-password`
   - `MYSQL_DATABASE=journal`

## SQL

1. Create database if you didn't do it in Amazon RDS setup.
   - `CREATE DATABASE journal;`
   - Note: I used MySQL Workbench to do this.
2. Create tables.

Note: See `./sql/queries.sql`
