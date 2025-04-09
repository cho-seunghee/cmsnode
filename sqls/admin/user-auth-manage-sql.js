class UserAuthManageSql {
  constructor() {
    this.queries = {
      createPermission: {
        query: 'INSERT INTO tb_permissions (userid, menucd, menunm, menuaccess) VALUES (?, ?, ?, ?)'
      },
      listPermissions: {
        query: 'SELECT * FROM tb_permissions WHERE 1=1'
      },
      updatePermission: {
        query: 'UPDATE tb_permissions SET menucd = ?, menunm = ?, menuaccess = ?, lastupdatedt = CURRENT_TIMESTAMP WHERE id = ?'
      },
      deletePermission: {
        query: 'DELETE FROM tb_permissions WHERE id = ?'
      },
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

module.exports = new UserAuthManageSql();