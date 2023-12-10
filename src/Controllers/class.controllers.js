const classModel = require('../Models/class.models');

class classController {
    async getAllClass(req, res) {
        try {
            const rows = await classModel.getAllClass(req.headers);
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
    async getClassActive(req, res) {
        const id = req.params.id;
        try {
            const rows = await classModel.getClassActive(req.headers, id);
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
    async getClass(req, res) {
        const id = req.params.id;
        try {
            const rows = await classModel.getClass(req.headers, id);
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
    async getClassStudent(req, res) {
        const id = req.params.id;
        try {
            const rows = await classModel.getClassStudent(req.headers, id);
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
    async getClassByTeacher(req, res) {
        const id = req.params.id;
        try {
            const rows = await classModel.getClassByTeacher(req.headers, id);
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
    async createClass(req, res) {

    }
    async updateClass(req, res) {

    }
    async deleteClass(req, res) {

    }

    // Notificattion
    async getNotifiByStudent(req, res) {
        const id = req.params.id;
        try {
            const rows = await classModel.getNotifiByStudent(req.headers, id);
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
    async getNotifiByTeacher(req, res) {
        const id = req.params.id;
        try {
            const rows = await classModel.getNotifiByTeacher(req.headers, id);
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
    async getNotifi(req, res) {
        const id = req.params.id;
        try {
            const rows = await classModel.getNotifi(req.headers, id);
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
    async createNotifi(req, res) {
        try {
            const rows = await classModel.createNotifi(req.headers, req.body);
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

    // Document
    async getDocumentByTeacher(req, res) {
        const id = req.params.id;
        try {
            const rows = await classModel.getDocumentByTeacher(req.headers, id);
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
    async getDocument(req, res) {
        const id = req.params.id;
        try {
            const rows = await classModel.getDocument(req.headers, id);
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
    async getDocumentByClass(req, res) {
        const id = req.params.id;
        try {
            const rows = await classModel.getDocumentByClass(req.headers, id);
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
    async createDocumnet(req, res) {
        try {
            const rows = await classModel.createDocumnet(req.headers, req.body);
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
module.exports = new classController;