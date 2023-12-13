const learnModel = require('../Models/learn.models');

class LearnController {
    async getLearn(req, res) {
        try {
            const rows = await learnModel.getLearn(req.headers, req.body);
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
    async getLearnByStudent(req, res) {
        try {
            const rows = await learnModel.getLearnByStudent(req.headers, req.params.id);
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
    async getLearnByClass(req, res) {
        try {
            const rows = await learnModel.getLearnByClass(req.headers, req.params.id);
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
    async createLearn(req, res) {

    }
    async updateLearn(req, res) {
        try {
            const rows = await learnModel.updateLearn(req.headers, req.body);
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
    async activeScore(req, res) {
        try {
            const rows = await learnModel.activeScore(req.headers, req.body);
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
    async deleteLearn(req, res) {

    }

    async getAllSubject(req, res) {
        try {
            const rows = await learnModel.getAllSubject(req.headers);
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
    async getSubject(req, res) {
        const id = req.params.id;
        try {
            const rows = await learnModel.getSubject(req.headers, id);
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
    async getSubjectByStudent(req, res) {
        const id = req.params.id;
        try {
            const rows = await learnModel.getSubjectByStudent(req.headers, id);
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
    async createSubject(req, res) {
        try {
            const rows = await learnModel.createSubject(req.headers, req.body);
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
    async updateSubject(req, res) {
        const id = req.params.id;
        try {
            const rows = await learnModel.updateSubject(req.headers, id, req.body);
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
    async deleteSubject(req, res) {
        const id = req.params.id;
        try {
            const rows = await learnModel.deleteSubject(req.headers, id);
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
module.exports = new LearnController;