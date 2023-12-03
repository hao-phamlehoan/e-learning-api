const userModel = require('../Models/user.models');

class UserControllers {
    async getUser(req, res) {
        try {
            const users = await userModel.getUser(req.headers);
            res.status(200).json({
                result: 'success',
                data: users
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: 'fail',
                data: null
            })
        }
    }

    createUser(req, res) {

    }

    updateUser(req, res) {

    }

    deleteUser(req, res) {

    }
}

module.exports = new UserControllers;
