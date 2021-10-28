const File = require('../model/File');

class FileController {

    async store(req,res) {
        const { originalname: name, filename: path} = req.file;
        const file = await File.create({
            name,
            path,
        });

        return res.json(file);
    }
}

module.exports = new FileController();