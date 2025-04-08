async function execSql(db, queryObj, params) {
    if (!queryObj || !queryObj.query) {
      throw new Error('Invalid query object');
    }
    return await db.query(queryObj.query, params);
  }

module.exports = { execSql };