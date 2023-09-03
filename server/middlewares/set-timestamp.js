
module.exports = (req, res, next) => {
  try {
    if (req.method == 'POST') {
      // create
    } else if(req.method == 'PUT') {
      // update
    }
    const teamInfo = JSON.parse(req.body.teamInfo);
    teamInfo.createdAt = new Date().toISOString().slice(0, 19);
    req.body.teamInfo = JSON.stringify(teamInfo);

  } catch (error) {
    console.log(error)
  } finally {
    return next();
  }
};
