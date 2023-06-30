const connection = require('../../functions/database.js').connectDatabase();
const imagesFunction = require('../../functions/images');

function getAboutContent(req, res, next) {
  var aboutContent;
  var message;
  connection.query(
    "select * from view_admin_aboutitff", (error, result) => {
      if (!error) {
        aboutContent = result[0];
      }
      else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'About Content fetched successfully!',
        aboutContent: aboutContent
      });
    });
}

function updateAboutContent(req, res, next) {
  const aboutContent = JSON.parse(req.body.aboutContent);
  var message;

  if (!!req.file) {
    const url = req.protocol + "://" + req.get("host");
    const imagePath = imagesFunction.setImagePath(url, "/images/", req.file.filename);
    aboutContent.imagePath = imagePath;
  } else {
    if (!aboutContent.imagePath) {
      aboutContent.imagePath = null;
    }
  }

  connection.query(
    "update aboutitff set updatedat = ?, updatedby = ?, imagepath = ?, abouttext = ?, address = ?, phonenumber = ?, faxnumber = ?, email = ?, longitude = ?, latitude = ?",
    [
      aboutContent.updatedAt,
      aboutContent.updatedBy,
      aboutContent.imagePath,
      aboutContent.aboutText,
      aboutContent.address,
      aboutContent.phoneNumber,
      aboutContent.faxNumber,
      aboutContent.email,
      aboutContent.longitude,
      aboutContent.latitude
    ],
    (error, result) => {
      if (!error) {

      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'About Content updated successfully!'
      });
  });

}

exports.getAboutContent = getAboutContent;
exports.updateAboutContent = updateAboutContent;
