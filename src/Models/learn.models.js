const oracledb = require('oracledb');

class LearnModel {
    async getLearn() {
        
    }
    async createLearn() {

    }
    async updateLearn() {

    }
    async deleteLearn() {

    }

    async getAllSubject(body) {
        const { user, password, service } = body;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute('SELECT * FROM subject_, dept where subject_.dept_id = dept.id');
        return result.rows;
    }
    async getSubject(body, id) {
        const { user, password, service } = body;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute('SELECT * FROM subject_, dept where id = :1 and subject_.dept_id = dept.id', [id]);
        return result.rows;
    }
    async createSubject() {
        const { user, password, service } = body;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute('SELECT * FROM subject_, dept where subject_.dept_id = dept.id');
        return result.rows;
    }
    async updateSubject() {

    }
    async deleteSubject() {

    }
}

module.exports = new LearnModel;