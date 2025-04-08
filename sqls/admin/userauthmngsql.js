class UserAuthMngSql {
    constructor() {
      this.queries = {
        createPermission: {
          query: 'INSERT INTO tb_permissions (userid, menucd, menunm, menuaccess) VALUES (?, ?, ?, ?)',
          params: ['userid', 'menucd', 'menunm', 'menuaccess']
        },
        listPermissions: {
          query: 'SELECT * FROM tb_permissions WHERE 1=1', // Dynamic query base
          params: [] // Params will be dynamically added
        },
        updatePermission: {
          query: 'UPDATE tb_permissions SET menucd = ?, menunm = ?, menuaccess = ?, lastupdatedt = CURRENT_TIMESTAMP WHERE id = ?',
          params: ['menucd', 'menunm', 'menuaccess', 'id']
        },
        deletePermission: {
          query: 'DELETE FROM tb_permissions WHERE id = ?',
          params: ['id']
        }
      };
    }
  
    getCreatePermissionQuery() {
      return this.queries.createPermission;
    }
  
    getListPermissionsQuery() {
      return this.queries.listPermissions;
    }
  
    getUpdatePermissionQuery() {
      return this.queries.updatePermission;
    }
  
    getDeletePermissionQuery() {
      return this.queries.deletePermission;
    }
  }
  
  module.exports = new UserAuthMngSql();