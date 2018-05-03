const pg = require('pg');

const pgClient = new pg.Client({
  host: 'localhost',
  user: 'postgres',
  database: 'twitter',
});

pgClient.connect();

module.exports = pgClient;