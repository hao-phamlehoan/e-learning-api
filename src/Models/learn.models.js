const oracledb = require('oracledb');
oracledb.autoCommit = true;

class LearnModel {
    async getLearn() {
        
    }
    async createLearn() {

    }
    async updateLearn() {

    }
    async deleteLearn() {

    }

    async getAllSubject(headers) {
        const { user, password, service } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute('SELECT * FROM lab_subject, lab_dept where lab_subject.dept_id = lab_dept.id and lab_subject.deleted = 0');
        connection.close();
        return result.rows;
    }
    async getSubject(headers, id) {
        const { user, password, service } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute('SELECT * FROM lab_subject, lab_dept where lab_subject.id = :1 and lab_subject.dept_id = lab_dept.id and lab_subject.deleted = 0', [id]);
        connection.close();
        return result.rows;
    }
    async createSubject(headers, body) {
        const { user, password, service } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);

        const result = await connection.execute('INSERT INTO lab_subject (name,code,dept_id,deleted) VALUES (:1,:2,:3,:4)',
            [body.name, body.code, body.dept_id, 0]);
        connection.close();
        return result.rows;
    }
    async updateSubject(headers, id, body) {
        console.log(typeof id)
        const { user, password, service } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute('UPDATE lab_subject SET name = :1, code = :2, dept_id = :3 WHERE id = :4',
            [body.name, body.code, body.dept_id, id]);
        connection.close();
        return result.rows;
    }
    async deleteSubject(headers, id) {
        const { user, password, service } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute('UPDATE lab_subject SET deleted = 1 WHERE id = :1', [id]);
        connection.close();
        return result.rows;
    }
}

module.exports = new LearnModel;