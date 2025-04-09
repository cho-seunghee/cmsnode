const pool = require('../config/db');

async function execSql(queryObj, params) {
  if (!queryObj || typeof queryObj.query !== 'string') {
    throw new Error('Invalid query object: query must be a string');
  }

  const connection = await pool.getConnection();

  try {
    const [results] = await connection.query(queryObj.query, params);
    connection.release();
    return results;     
  } catch (error) {
    console.error('Query error:', error.message);
    connection.release();
    throw error;
  }
}

const execResultSql = async (queryObj, params) => {
  const connection = await pool.getConnection();

  try {
    const [results] = await connection.query(queryObj.query, params);
    connection.release(); // 풀에 반환
    return results; // { affectedRows, changedRows, ... } 반환
  } catch (error) {
    console.error('Result query error:', error.message);
    connection.release();
    throw error;
  }
};

module.exports = { execSql, execResultSql };