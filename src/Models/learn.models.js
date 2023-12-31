const oracledb = require('oracledb');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;
const service = 'unipdb';

class LearnModel {
    async getLearn(headers, body) {
        const { user, password } = headers;
        const { class_id, subject_id, user_id } = body;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };

        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`SELECT DISTINCT * FROM sysadm.lab_learn  
        where class_id = :1 and subject_id = :2 and user_id = :3 and deleted = 1`, [class_id, subject_id, user_id]);
        connection.close();
        return result.rows;
    }
    async getLearnByStudent(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };

        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`SELECT DISTINCT l.*, c.is_active
        from sysadm.lab_learn l, sysadm.lab_class c
        where l.user_id = :1 and c.id = l.class_id`, [id]);
        connection.close();
        return result.rows;
    }
    async getLearnByClass(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };

        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`SELECT DISTINCT * from sysadm.lab_learn 
        where sysadm.lab_learn.class_id = :1 and sysadm.lab_learn.deleted = 1`, [id]);
        connection.close();
        return result.rows;
    }
    async createLearn() {

    }
    async updateLearn(headers, body) {
        const { user, password } = headers;
        console.log({user, password});
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const { final_score, midterm_score, assignment_score, quiz_score, class_id, subject_id, user_id } = body;
        console.log(body)
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`UPDATE sysadm.lab_LEARN 
        SET FINAL_SCORE = :1, MIDTERM_SCORE = :2,ASSIGNMENT_SCORE = :3, QUIZ_SCORE = :4
        Where class_id = :5 and subject_id = :6 and user_id = :7`, 
        [final_score, midterm_score, assignment_score, quiz_score, class_id, subject_id, user_id]);
        console.log(result);
        connection.close();
        return result.rows;
    }
    async deleteLearn(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`DELETE FROM sysadm.lab_learn where id = :1`, 
        [id]);
        connection.close();
        return result.rows;
    }

    async getAllSubject(headers) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`SELECT DISTINCT * FROM sysadm.lab_subject, sysadm.lab_dept 
        where sysadm.lab_subject.dept_id = sysadm.lab_dept.id and sysadm.lab_subject.deleted = 1`);
        connection.close();
        return result.rows;
    }
    async getSubject(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`SELECT DISTINCT * FROM sysadm.lab_subject, sysadm.lab_dept 
        where sysadm.lab_subject.id = :1 and sysadm.lab_subject.dept_id = sysadm.lab_dept.id and sysadm.lab_subject.deleted = 1`, [id]);
        connection.close();
        return result.rows;
    }
    async getSubjectByStudent(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`SELECT DISTINCT * 
        FROM sysadm.lab_subject s join sysadm.lab_learn l on s.id = l.subject_id
        where l.user_id = :1 and l.deleted = 1`, [id]);
        connection.close();
        return result.rows;
    }
    async createSubject(headers, body) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);

        const result = await connection.execute(`INSERT INTO sysadm.lab_subject (name,code,dept_id,deleted) VALUES (:1,:2,:3,:4)`,
            [body.name, body.code, body.dept_id, 0]);
        connection.close();
        return result.rows;
    }
    async updateSubject(headers, id, body) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`UPDATE sysadm.lab_subject SET name = :1, code = :2, dept_id = :3 
        WHERE id = :4`,
            [body.name, body.code, body.dept_id, id]);
        connection.close();
        return result.rows;
    }
    async deleteSubject(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute('UPDATE sysadm.lab_subject SET deleted = 0 WHERE id = :1', [id]);
        connection.close();
        return result.rows;
    }
}

module.exports = new LearnModel;