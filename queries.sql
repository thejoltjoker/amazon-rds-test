-- Create database
CREATE DATABASE journal;

-- Create table
USE journal;

CREATE TABLE notes (
  id INT AUTO_INCREMENT,
  title VARCHAR(255),
  content VARCHAR(255),
  PRIMARY KEY (id)
);

