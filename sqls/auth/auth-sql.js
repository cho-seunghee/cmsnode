class AuthQueries {
  constructor() {
    this.queries = {
      login: {
        query: 'SELECT * FROM tb_userinfo WHERE userid = ? AND pwd = ?'
      },
      userCheck: {
        query: 'SELECT * FROM tb_userinfo WHERE userid = ?'
      }
    };
  }

  getLoginQuery() {
    return this.queries.login;
  }

  getUserCheckQuery() {
    return this.queries.userCheck;
  }
}

module.exports = new AuthQueries();