const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    const cbFunctions = {
      '/admin/teams': () => {
        cb(error, "server/images/teams");
      },
      '/admin/stadiums': () => {
        cb(error, "server/images/stadiums");
      },
      '/admin/news': () => {
        cb(error, "server/images/news");
      },
      '/admin/izmiraskf/staff': () => {
        cb(error, "server/images/staff");
      },
      '/admin/tffiltemsilciligi/staff': () => {
        cb(error, "server/images/staff");
      },
      '/admin/users': () => {
        cb(error, "server/images/users");
      },
      '/admin/external-links': () => {
        cb(error, "server/images/icons");
      }
    };

    const baseUrl = req.baseUrl;
    if (baseUrl in cbFunctions) {
      cbFunctions[baseUrl]();
    } else {
      cb(error, "server/images");
    }

  },
  filename: (req, file, cb) => {
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileName = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    //const ext = MIME_TYPE_MAP[file.mimetype];
    //cb(null, fileName + "-" + Date.now() + "." + ext);
    cb(null, Date.now() + "-" + fileName);
  }
});

module.exports = multer({ storage: storage, limits: {fieldSize: 5 * 1024 * 1024} }).single("image");
