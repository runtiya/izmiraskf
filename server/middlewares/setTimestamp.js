
module.exports = (req, res, next) => {
  try {
    // Creating Mode
    if (req.method == 'POST') {
      console.log('İNSERTED');
      if (req.body.requestData ?? false) {
        const parsedRequest = JSON.parse(req.body.requestData);
        parsedRequest.createdAt = new Date().toISOString().slice(0, 19);
        parsedRequest.createdBy = req.userData.userId;
        req.body.requestData = JSON.stringify(parsedRequest);
      } else {
        req.body.createdAt = new Date().toISOString().slice(0, 19);
        req.body.createdBy = req.userData.userId;
      }

    // Updating Mode
    } else if(req.method == 'PUT') {
      console.log('UPDATED');
      if (req.body.requestData ?? false) {
        console.log('requestData ile geldik');
        const parsedRequest = JSON.parse(req.body.requestData);
        parsedRequest.updatedAt = new Date().toISOString().slice(0, 19);
        parsedRequest.updatedBy = req.userData.userId;
        req.body.requestData = JSON.stringify(parsedRequest);
        console.log(req.body.requestData);
        console.log('-----------------------------');


      } else {
        console.log('sadece body ile geldik');
        req.body.updatedAt = new Date().toISOString().slice(0, 19);
        req.body.updatedBy = req.userData.userId;
        console.log(req.body);
        console.log('-----------------------------');
      }
    }
  } catch (error) {
    console.log(error)
  } finally {
    return next();
  }
};
