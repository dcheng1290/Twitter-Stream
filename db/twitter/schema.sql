DROP DATABASE if exists twitter;
CREATE DATABASE twitter;
\connect twitter;

DROP TABLE IF EXISTS tweets;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS sentiment;
DROP TABLE IF EXISTS states;

CREATE TABLE tweets (
  id INT PRIMARY KEY NOT NULL,
  user_id int,
  tweet_text VARCHAR(280),
  username VARCHAR(20),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  profileimage_url VARCHAR(100)
);

CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL,
  username VARCHAR(20),
  location VARCHAR(20),
  profile_url VARCHAR(100),
  profileimage_url VARCHAR(100),
  created_at DATE,
  updated_at TIMESTAMP,
);

CREATE TABLE sentiment (
  id INT PRIMARY KEY NOT NULL,
  rating INT,
  tweet_id INT,
  created_at TIMESTAMP
);

CREATE TABLE states (
  id INT PRIMARY KEY NOT NULL,
  user_id INT,
  tweet_id INT
);