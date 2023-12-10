const userModel = require('../Models/user.models');

class UserControllers {
    async getUser(req, res) {
        try {
            const rows = await userModel.getUser(req.headers, req.params.id);
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

    async createUser(req, res) {
        try {
            const rows = await userModel.createUser(req.headers, req.body);
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

    async updateUser(req, res) {
        try {
            const rows = await userModel.updateUser(req.headers, req.body, req.params.id);
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

    deleteUser(req, res) {

    }
}

module.exports = new UserControllers;
