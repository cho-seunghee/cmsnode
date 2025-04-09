const fs = require('fs');
const path = require('path');

const queries = JSON.parse(fs.readFileSync(path.join(__dirname, '../sql/filesSqls.json'), 'utf8'));

const parseQuery = (queryName, params) => {
  const query = queries[queryName];
  if (!query) throw new Error(`Query ${queryName} not found`);
  return { query, params };
};

module.exports = { parseQuery };