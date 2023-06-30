const environment = require('../environments/development');

function setFilePath(_url, _category, _fileName) {
  const folder = getFolder(_category);
  return _url + folder + _fileName;
}

function getFolder(_category) {
  var _folder;

  const categoryList = {
    'BELGELER': () => {
      _folder = "/files/documents/";
    },
    'TALIMATLAR': () => {
      _folder = "/files/instructions/";
    },
    'LISANSFORMLARI': () => {
      _folder = "/files/license-forms/";
    },
    'AMATORLIGSTATULERI': () => {
      _folder = "/files/statuses/";
    },
    'AKTARMADOSYALARI': () => {
      _folder = "/files/template-files/";
    }
  };

  if (_category in categoryList) {
    categoryList[_category]();
  } else {
    _folder = "/files/";
  }

  return _folder;
}


exports.setFilePath = setFilePath;
