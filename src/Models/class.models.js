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
        const result = await connection.execute(`SELECT DISTINCT  c.id, c.name, c.student_number, c.semester, c.is_active, t.user_id t_name, l.subject_id s_name
        FROM sysadm.lab_class c, sysadm.lab_teach t, sysadm.lab_learn l
        where c.id = t.class_id and l.class_id = c.id`);
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
        FROM sysadm.lab_class c, sysadm.lab_teach t, sysadm.lab_user u, sysadm.lab_subject s, sysadm.lab_learn l \
        where c.id = t.class_id and t.user_id = u.id and l.class_id = c.id and l.subject_id = s.id and c.id = :1`, [id]);
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
        FROM sysadm.lab_class c, sysadm.lab_teach t, sysadm.lab_user u, sysadm.lab_subject s, sysadm.lab_learn l \
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
        FROM sysadm.lab_learn t, sysadm.lab_user u \
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
        const result = await connection.execute(`SELECT DISTINCT  c.id, c.name, c.student_number, c.semester, c.is_active
        FROM sysadm.lab_class c, sysadm.lab_learn l
        where l.class_id = c.id and l.user_id = :1 `, [id]);
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
        FROM sysadm.lab_class c, sysadm.lab_teach t, sysadm.lab_user u, sysadm.lab_subject s, sysadm.lab_learn l \
        where c.id = t.class_id and t.user_id = u.id and l.class_id = c.id and l.subject_id = s.id and u.id = :1`, [id]);
        connection.close();
        return result.rows;
    }
    async activeScore(headers, body) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`update sysadm.lab_class set is_active = 'TRUE' where id = :1`, [body.id]);
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
        const result = await connection.execute(`SELECT DISTINCT N.* FROM sysadm.lab_NOTIFICATION N join sysadm.lab_LEARN L ON N.class_id = L.class_id
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
        const result = await connection.execute(`SELECT DISTINCT N.* FROM sysadm.lab_NOTIFICATION N 
        WHERE N.user_id = :1`, [id]);
        connection.close();
        return result.rows;
    }
    async getAllNotifi(headers, id) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`SELECT DISTINCT * FROM sysadm.lab_NOTIFICATION`, []);
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
        const result = await connection.execute(`SELECT DISTINCT N.* FROM sysadm.lab_NOTIFICATION N 
        WHERE N.id = :1`, [id]);
        connection.close();
        return result.rows;
    }
    async createNotifi(headers, body) {
        const { user, password } = headers;

        const {user_id ,class_id, mess_header, mess_body, security} = body;
        console.log(body)
        const day = new Date();
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`INSERT INTO sysadm.lab_NOTIFICATION 
        (user_id ,class_id, mess_header, mess_body, send_date, OLS_NOTI)
            VALUES (:1, :2, :3, :4, :5, char_to_label('ACCESS_NOTIFICATION', :6))`, [user_id ,class_id, mess_header, mess_body, day, security]);
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
        const result = await connection.execute('SELECT DISTINCT * FROM sysadm.lab_DOCUMENT n WHERE n.id = :1', [id]);
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
        const result = await connection.execute('SELECT DISTINCT * FROM sysadm.lab_DOCUMENT n WHERE n.user_id = :1', [id]);
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
        const result = await connection.execute('SELECT DISTINCT * FROM sysadm.lab_DOCUMENT n WHERE n.class_id = :1', [id]);
        connection.close();
        return result.rows;
    }
    async updateDocument(headers, id, body) {
        const { user, password } = headers;
        const userDbConfig = {
            connectString: `localhost:1521/${service}`,
            user: user,
            password: password,
        };
        const connection = await oracledb.getConnection(userDbConfig);
        const result = await connection.execute(`UPDATE sysadm.lab_document set title =:1, url =: 2
        where id = :3`, [body.title, body.url, id]);
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
        const result = await connection.execute(`INSERT INTO sysadm.lab_DOCUMENT (user_id,class_id, title, url)
            VALUES (:1, :2, :3, :4)`, [user_id,class_id, title, url]);
        connection.close();
        return result.rows;
    }
}

module.exports = new ClassModel;