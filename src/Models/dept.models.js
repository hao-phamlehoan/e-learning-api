const oracledb = require('oracledb');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;
const service = 'unipdb';

class DeptModel {
    async getDept() {
        
    }
    async createDept() {

    }
    async updateDept() {

    }
    async deleteDept() {

    }
    
}

module.exports = new DeptModel;