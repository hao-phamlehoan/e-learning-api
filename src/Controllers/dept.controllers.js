const deptModel = require('../Models/dept.models');

class DeptController {
    async getAllDept(req, res) {
        try {
            const rows = await deptModel.getAllDept(req.headers);
            res.status(200).json({
                result: 'success',
                data: rows
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: 'fail',
                data: null
            })
        }
    }
    async createDept(req, res) {
        try {
            const rows = await deptModel.createDept(req.headers, req.body);
            res.status(200).json({
                result: 'success',
                data: rows
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: 'fail',
                data: null
            })
        }
    }
    async updateDept(req, res) {
        const id = req.params.id;
        console.log(id)
        console.log(req.body)
        try {
            const rows = await deptModel.updateDept(req.headers, id, req.body);
            res.status(200).json({
                result: 'success',
                data: rows
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: 'fail',
                data: null
            })
        }
    }
    async deleteDept(req, res) {
        const id = req.params.id;
        try {
            const rows = await deptModel.deleteDept(req.headers, id, req.body);
            res.status(200).json({
                result: 'success',
                data: rows
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: 'fail',
                data: null
            })
        }
    }

}
module.exports = new DeptController;