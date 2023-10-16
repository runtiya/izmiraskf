const environment = require('../environments/development');

function setFilePath(_url, _fileCategory, _fileName) {
  const folder = getFolder(_fileCategory);
  return `${_url}${folder}${_fileName}`;
}

function getFolder(_fileCategory) {
  var _folder;

  const fileCategoryList = {
    'BELGELER': () => {
      _folder = "files/documents/";
    },
    'TALIMATLAR': () => {
      _folder = "files/instructions/";
    },
    'LISANSFORMLARI': () => {
      _folder = "files/license-forms/";
    },
    'AMATORLIGSTATULERI': () => {
      _folder = "files/statuses/";
    },
    'AKTARMADOSYALARI': () => {
      _folder = "files/template-files/";
    }
  };

  if (_fileCategory in fileCategoryList) {
    fileCategoryList[_fileCategory]();
  } else {
    _folder = "files/";
  }

  return _folder;
}


exports.setFilePath = setFilePath;
