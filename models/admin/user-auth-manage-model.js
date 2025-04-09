const userAuthManageSql = require('../../sqls/admin/user-auth-manage-sql');
const { execSql, execResultSql } = require('../../utils/sql-exec');

exports.createPermission = async (userid, menucd, menunm, menuaccess) => {
  const queryObj = userAuthManageSql.getCreatePermissionQuery();
  await execSql(queryObj, [userid, menucd, menunm, menuaccess]);
};

exports.listPermissions = async (filters = {}) => {
  const { userid, menucd, menunm } = filters;
  let queryObj = userAuthManageSql.getListPermissionsQuery();
  let query = queryObj.query;
  const params = [];

  if (userid) {
    query += ' AND userid = ?';
    params.push(userid);
  }
  if (menucd) {
    query += ' AND menucd = ?';
    params.push(menucd);
  }
  if (menunm) {
    query += ' AND menunm = ?';
    params.push(menunm);
  }

  const updatedQuery = { query, params };
  const rows = await execSql(updatedQuery, params);
  return rows;
};

exports.updatePermission = async (id, menucd, menunm, menuaccess) => {
  const queryObj = userAuthManageSql.getUpdatePermissionQuery();
  const result = await execResultSql(queryObj, [menucd, menunm, menuaccess, id]);
  return result.affectedRows > 0;
};

exports.deletePermission = async (id) => {
  const queryObj = userAuthManageSql.getDeletePermissionQuery();
  const result = await execResultSql(queryObj, [id]);
  return result.affectedRows > 0;
};