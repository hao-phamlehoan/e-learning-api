const learnModel = require('../Models/learn.models');

class LearnController {
    async getLearn(req, res) {
        
    }
    async createLearn(req, res) {

    }
    async updateLearn(req, res) {

    }
    async deleteLearn(req, res) {

    }

    async getAllSubject(req, res) {
        try {
            const subs = await learnModel.getAllSubject(req.body);
            res.status(200).json({
                result: 'success',
                data: subs
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: 'fail',
                data: null
            })
        }

    }
    async getSubject(req, res) {
        const id = req.param.id;
        try {
            const subs = await learnModel.getSubject(req.body, id);
            res.status(200).json({
                result: 'success',
                data: subs
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: 'fail',
                data: null
            })
        }
    }
    async createSubject(req, res) {
        try {
            const subs = await learnModel.createSubject(req.body);
            res.status(200).json({
                result: 'success',
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: 'fail',
            })
        }
    }
    async updateSubject(req, res) {
        const id = req.param.id;
        try {
            const subs = await learnModel.updateSubject(req.body, id);
            res.status(200).json({
                result: 'success',
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: 'fail',
            })
        }
    }
    async deleteSubject(req, res) {
        
    }
}
module.exports = new LearnController;