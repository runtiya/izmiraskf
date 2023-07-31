const queries = require('../../queries/admin/disciplinaryboardfiles');
const connection = require('../../functions/database').
connectDatabase();

function getDisciplinaryBoardFiles(req, res, next) {
  try {
    var disciplinaryBoardFileList;
    var message;
    const seasonId = req.params.seasonid;
    const caseType = req.params.casetype;

    connection.query(
      queries.getDisciplinaryBoardFiles,
      [seasonId, caseType],
      (error, result) => {
        if (!error) {
          disciplinaryBoardFileList = result;
        } else {
          disciplinaryBoardFileList = [];
          message = error.sqlMessage;
        }

        res.status(200).json({
          disciplinaryBoardFileList: disciplinaryBoardFileList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function createDisciplinaryBoardFile(req, res, next) {
  try {
    const disciplinaryBoardFileInfo = req.body;
    var message;
    var disciplinaryBoardFileId;

    connection.query(
      queries.createDisciplinaryBoardFile,
      [
        disciplinaryBoardFileInfo.createdAt,
        disciplinaryBoardFileInfo.createdBy,
        disciplinaryBoardFileInfo.updatedAt,
        disciplinaryBoardFileInfo.updatedBy,
        disciplinaryBoardFileInfo.seasonId,
        disciplinaryBoardFileInfo.caseNo,
        disciplinaryBoardFileInfo.caseDate,
        disciplinaryBoardFileInfo.caseType,
        disciplinaryBoardFileInfo.title,
        disciplinaryBoardFileInfo.participants,
        disciplinaryBoardFileInfo.explanation,
      ],
      (error, result) => {
        if (!error) {
          disciplinaryBoardFileId = result.insertId;
        } else {
          message = error.sqlMessage;
        }

        res.status(200).json({
          disciplinaryBoardFileId: disciplinaryBoardFileId,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function updateDisciplinaryBoardFile(req, res, next) {
  try {
    const disciplinaryBoardFileInfo = req.body;
    var disciplinaryBoardFileId = req.params.id;
    var message;

    connection.query(
      queries.updateDisciplinaryBoardFile,
      [
        disciplinaryBoardFileInfo.createdAt,
        disciplinaryBoardFileInfo.createdBy,
        disciplinaryBoardFileInfo.updatedAt,
        disciplinaryBoardFileInfo.updatedBy,
        disciplinaryBoardFileInfo.seasonId,
        disciplinaryBoardFileInfo.caseNo,
        disciplinaryBoardFileInfo.caseDate,
        disciplinaryBoardFileInfo.caseType,
        disciplinaryBoardFileInfo.title,
        disciplinaryBoardFileInfo.participants,
        disciplinaryBoardFileInfo.explanation,
        disciplinaryBoardFileId || disciplinaryBoardFileInfo.id,
      ],
      (error, result) => {
        if (!error) {
        } else {
          message = error.sqlMessage;
        }

        res.status(200).json({
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function deleteDisciplinaryBoardFile(req, res, next) {
  try {
    var disciplinaryBoardFileId = req.params.id;
    var message;

    connection.query(
      queries.deleteDisciplinaryBoardFile,
      [disciplinaryBoardFileId],
      (error, result) => {
        if (!error) {
        } else {
          message = error.sqlMessage;
        }

        res.status(200).json({
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getDisciplinaryBoardFiles = getDisciplinaryBoardFiles;
exports.createDisciplinaryBoardFile = createDisciplinaryBoardFile;
exports.updateDisciplinaryBoardFile = updateDisciplinaryBoardFile;
exports.deleteDisciplinaryBoardFile = deleteDisciplinaryBoardFile;
