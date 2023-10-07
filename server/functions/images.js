const environment = require('../environments/development');

function setImagePath(_path, _fileName) {
  return _path + _fileName;
}


exports.setImagePath = setImagePath;
