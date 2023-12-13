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
    const result =
      await connection.execute(`SELECT * FROM sysadm.lab_dept`);
    connection.close();
    return result.rows;
  }
  async createDept(headers, body) {
    const { user, password } = headers;
    const { location, name, manager_id } = body;
    const userDbConfig = {
      connectString: `localhost:1521/${service}`,
      user: user,
      password: password,
    };
    const connection = await oracledb.getConnection(userDbConfig);
    const result = await connection.execute(
      `INSERT INTO sysadm.lab_dept (location,name,manager_id) VALUES (:1,:2,:3)`,
      [location, name, manager_id]
    );
    connection.close();
    return result.rows;
  }
  async updateDept(headers, id, body) {
    const { user, password } = headers;
    const { location, name, manager_id } = body;
    console.log(location, name, manager_id)
    const userDbConfig = {
      connectString: `localhost:1521/${service}`,
      user: user,
      password: password,
    };
    const connection = await oracledb.getConnection(userDbConfig);
    const result = await connection.execute(
        `UPDATE sysadm.lab_dept SET location = :1, name = :2, manager_id = :3 WHERE id = :4`,
        [location, name, manager_id, id]
    );
    connection.close();
    return result.rows;
  }
  async deleteDept(headers, id, body) {
    const { user, password } = headers;
    const userDbConfig = {
      connectString: `localhost:1521/${service}`,
      user: user,
      password: password,
    };
    const connection = await oracledb.getConnection(userDbConfig);
    const result = await connection.execute(
      `DELETE sysadm.lab_dept WHERE id = :1`,
      [id]
    );
    connection.close();
    return result.rows;
  }
}

module.exports = new DeptModel();
