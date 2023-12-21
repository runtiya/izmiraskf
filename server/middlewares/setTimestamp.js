const errorService = require('../services/error-service');
const tzoffset = (new Date()).getTimezoneOffset() * 60000;

module.exports = (req, res, next) => {
  try {

    // Creating Mode
    if (req.method == 'POST') {
      if (req.body.requestData ?? false) {
        const parsedRequest = JSON.parse(req.body.requestData);
        parsedRequest.createdAt = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace(/[^0-9:-]/g, ' ');
        parsedRequest.createdBy = req.userData.userId;
        req.body.requestData = JSON.stringify(parsedRequest);
      } else {
        req.body.createdAt = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace(/[^0-9:-]/g, ' ');
        req.body.createdBy = req.userData.userId;
      }

    // Updating Mode
    } else if(req.method == 'PUT') {
      if (req.body.requestData ?? false) {
        console.log(1)
        const parsedRequest = JSON.parse(req.body.requestData);
        parsedRequest.updatedAt = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace(/[^0-9:-]/g, ' ');
        parsedRequest.updatedBy = req.userData.userId;

        req.body.requestData = JSON.stringify(parsedRequest);


      } else {
        req.body.updatedAt = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace(/[^0-9:-]/g, ' ');
        req.body.updatedBy = req.userData.userId;
      }
    }

  } catch (error) {
    console.log(error)

    errorService.handleError(
      errorService.errors.SERVICE_ERROR_SETTIMESTAMP.code,
      errorService.errors.SERVICE_ERROR_SETTIMESTAMP.message,
      error
    );

  } finally {
      return next();
  }
};
