const oracledb = require('oracledb');

class UserModel {
    async getUser(body) {
        const { user, password, service } = body;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute('SELECT * FROM user_');
        return result.rows;
    }

    createUser() {

    }

    updateUser() {

    }

    deleteUser() {

    }
}

module.exports = new UserModel;
