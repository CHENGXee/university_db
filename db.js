const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '921106',
  database: 'university_db',
  connectionLimit: 5
});

module.exports = pool;