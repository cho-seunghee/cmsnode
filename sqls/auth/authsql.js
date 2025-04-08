class AuthQueries {
  constructor() {
    this.queries = {
      login: {
        query: 'SELECT * FROM tb_userinfo WHERE userid = ? AND pwd = ?',
        params: ['userid', 'password']
      },
      userCheck: {
        query: 'SELECT * FROM tb_userinfo WHERE userid = ?',
        params: ['decoded.userid']
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