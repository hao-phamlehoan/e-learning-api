const oracledb = require('oracledb');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;
const service = 'unipdb';

class ClassModel {
    async getAllClass(headers) {
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
    async getClassActive(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`SELECT DISTINCT  c.id, c.name, c.student_number, c.semester, c.is_active, u.name t_name, s.name s_name \
        FROM lab_class c, lab_teach t, lab_user u, lab_subject s, lab_learn l \
        where c.id = t.class_id and t.user_id = u.id and l.class_id = c.id and l.subject_id = s.id and c.id = :1 and is_active = 'TRUE'`, [id]);
        connection.close();
        return result.rows;
    }
    async getClass(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute('SELECT DISTINCT  c.id, c.name, c.student_number, c.semester, c.is_active, u.name t_name, s.name s_name \
        FROM lab_class c, lab_teach t, lab_user u, lab_subject s, lab_learn l \
        where c.id = t.class_id and t.user_id = u.id and l.class_id = c.id and l.subject_id = s.id and c.id = :1', [id]);
        connection.close();
        return result.rows;
    }
    async getClassStudent(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute('SELECT DISTINCT u.* \
        FROM lab_learn t, lab_user u \
        where t.class_id = :1 and t.user_id = u.id', [id]);
        connection.close();
        return result.rows;
    }
    async getClassByStudent(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`SELECT DISTINCT  c.id, c.name, c.student_number, c.semester, c.is_active, u.name t_name, s.name s_name \
        FROM lab_class c, lab_teach t, lab_user u, lab_subject s, lab_learn l \
        where c.id = t.class_id and t.user_id = u.id and l.class_id = c.id and l.subject_id = s.id and u.id = :1  and c.is_active = 'TRUE'`, [id]);
        connection.close();
        return result.rows;
    }
    async getClassByTeacher(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`SELECT DISTINCT  c.id, c.name, c.student_number, c.semester, c.is_active, u.name t_name, s.name s_name \
        FROM lab_class c, lab_teach t, lab_user u, lab_subject s, lab_learn l \
        where c.id = t.class_id and t.user_id = u.id and l.class_id = c.id and l.subject_id = s.id and u.id = :1  and c.is_active = 'TRUE'`, [id]);
        connection.close();
        return result.rows;
    }
    async createClass() {

    }
    async updateClass() {

    }
    async deleteClass() {

    }


    // Notification
    async getNotifiByStudent(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`SELECT DISTINCT N.* FROM LAB_NOTIFICATION N join LAB_LEARN L ON N.class_id = L.class_id
        WHERE L.user_id = :1`, [id]);
        connection.close();
        return result.rows;
    }
    async getNotifiByTeacher(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`SELECT DISTINCT N.* FROM LAB_NOTIFICATION N 
        WHERE N.user_id = :1`, [id]);
        connection.close();
        return result.rows;
    }
    async getNotifi(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`SELECT DISTINCT N.* FROM LAB_NOTIFICATION N 
        WHERE N.id = :1`, [id]);
        connection.close();
        return result.rows;
    }
    async createNotifi(headers, body) {
        const { user, password } = headers;

        const {user_id ,class_id, mess_header, mess_body} = body;
        const day = new Date();
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`INSERT INTO LAB_NOTIFICATION (user_id ,class_id, mess_header, mess_body, send_date)
            VALUES (:1, :2, :3, :4, :5)`, [user_id ,class_id, mess_header, mess_body, day]);
        connection.close();
        return result.rows;
    }

    // Document
    async getDocument(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute('SELECT DISTINCT * FROM LAB_DOCUMENT n WHERE n.id = :1', [id]);
        connection.close();
        return result.rows;
    }
    async getDocumentByTeacher(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute('SELECT DISTINCT * FROM LAB_DOCUMENT n WHERE n.user_id = :1', [id]);
        connection.close();
        return result.rows;
    }
    async getDocumentByClass(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute('SELECT DISTINCT * FROM LAB_DOCUMENT n WHERE n.class_id = :1', [id]);
        connection.close();
        return result.rows;
    }
    async createDocumnet(headers, body) {
        const { user, password } = headers;

        const {user_id,class_id, title, url} = body;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`INSERT INTO LAB_DOCUMENT (user_id,class_id, title, url)
            VALUES (:1, :2, :3, :4)`, [user_id,class_id, title, url]);
        connection.close();
        return result.rows;
    }
}

module.exports = new ClassModel;