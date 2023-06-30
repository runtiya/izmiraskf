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
      '/admin/takimlar': () => {
        cb(error, "server/images/teams");
      },
      '/admin/sahalar': () => {
        cb(error, "server/images/stadiums");
      },
      '/admin/haberler': () => {
        cb(error, "server/images/news");
      },
      '/admin/izmiraskf/yonetim-kurulu': () => {
        cb(error, "server/images/staff");
      },
      '/admin/tffiltemsilciligi/yonetim-kurulu': () => {
        cb(error, "server/images/staff");
      },
      '/admin/disbaglantilar': () => {
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
