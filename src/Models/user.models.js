const oracledb = require('oracledb');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const service = 'unipdb';

class UserModel {
    async getUser(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute('SELECT DISTINCT * FROM lab_user where id = :1', [id]);
        connection.close();
        return result.rows;
    }

    async createUser(headers, body) {
        const { user, password } = headers;

        const {ssn,sex,email,birth,phone,name,address,avatar} = body;
        const day = new Date();
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`INSERT INTO LAB_USER (ssn,sex,email,birth,phone,name,address,avatar)
        VALUES (:1, :2, :3, :4, :5, :6, :7, :8)`, [ssn,sex,email,birth,phone,name,address,avatar]);
        connection.close();
        return result.rows;
    }

    async updateUser(headers, body, id) {
        const { user, password } = headers;

        const {ssn,sex,email,birth,phone,name,address,avatar} = body;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`UPDATE Lab_USER 
        SET ssn = :1, sex = :2, email = :3, birth =TO_DATE(:4, 'YYYY-MM-DD'), phone = :5, name = :6, address = :7, avatar = :8
        WHERE id = :9`, [ssn,sex,email,birth,phone,name,address,avatar, id]);
        connection.close();
        return result.rows;
    }

    deleteUser() {

    }
}

module.exports = new UserModel;
