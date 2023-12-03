const oracledb = require('oracledb');
oracledb.autoCommit = true;

class UserModel {
    async getUser(headers) {
        const { user, password, service } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute('SELECT * FROM lab_user');
        connection.close();
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
