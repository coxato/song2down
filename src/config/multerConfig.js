const { join } = require('path');
const multer = require('multer');

// multer
const options = multer.diskStorage({
    destination: join(__dirname, '/../../songs'),

    filename: function(req, file, cb) {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage: options });


module.exports = upload;