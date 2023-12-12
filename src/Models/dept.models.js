const oracledb = require('oracledb');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;
const service = 'unipdb';

class DeptModel {
    async getAllDept(headers, body) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`SELECT DISTINCT  c.id, c.name, c.student_number, c.semester, c.is_active, u.name t_name, s.name s_name \
        FROM lab_class c, lab_teach t, lab_user u, lab_subject s, lab_learn l \
        where c.id = t.class_id and t.user_id = u.id and l.class_id = c.id and l.subject_id = s.id `);
        connection.close();
        return result.rows;
    }
    async getDept(headers, body, id) {
        
    }
    async createDept(headers, body) {

    }
    async updateDept(headers, body, id) {

    }
    async deleteDept(headers, body) {

    }
    
}

module.exports = new DeptModel;