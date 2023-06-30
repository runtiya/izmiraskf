const environment = require('../environments/development');

function setImagePath(_url, _path, _fileName) {
  return _url + _path + _fileName;
}


exports.setImagePath = setImagePath;
