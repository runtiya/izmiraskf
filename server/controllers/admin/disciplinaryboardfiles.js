const connection = require('../../functions/database').connectDatabase();

function getDisciplinaryBoardFiles(req, res, next) {
    var disciplinaryBoardFileList;
    var message;
    const seasonId = req.params.seasonid;

    connection.query(
        "select * from view_admin_disciplinaryboardfiles where seasonid = ?",
        [
            seasonId
        ],
        (error, result) => {
            if (!error) {
                disciplinaryBoardFileList = result;
            } else {
                disciplinaryBoardFileList = [];
                message = error.sqlMessage;
            }

            res.status(200).json({
                error: !!error,
                message: message || 'Disciplinary Board Files fetched successfully!',
                disciplinaryBoardFileList: disciplinaryBoardFileList
            });
        }
    );
}

function createDisciplinaryBoardFile(req, res, next) {
    const disciplinaryBoardFileInfo = req.body;
    var message;
    var disciplinaryBoardFileId;

    connection.query(
        "insert into disciplinaryboardfiles(createdat, createdby, updatedat, updatedby, seasonid, caseno, casedate, title, participants, explanation) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            disciplinaryBoardFileInfo.createdAt,
            disciplinaryBoardFileInfo.createdBy,
            disciplinaryBoardFileInfo.updatedAt,
            disciplinaryBoardFileInfo.updatedBy,
            disciplinaryBoardFileInfo.seasonId,
            disciplinaryBoardFileInfo.caseNo,
            disciplinaryBoardFileInfo.caseDate,
            disciplinaryBoardFileInfo.title,
            disciplinaryBoardFileInfo.participants.toString(),
            disciplinaryBoardFileInfo.explanation
        ],
        (error, result) => {
            if (!error) {
                disciplinaryBoardFileId = result.insertId;
            } else {
                message = error.sqlMessage;
            }

            res.status(200).json({
                error: !!error,
                message: message || 'Disciplinary Board File added successfully!',
                disciplinaryBoardFileId: disciplinaryBoardFileId
            });
        }
    );
}

function updateDisciplinaryBoardFile(req, res, next) {
    const disciplinaryBoardFileInfo = req.body;
    var message;

    connection.query(
        "update disciplinaryboardfiles set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, seasonid = ?, caseno = ?, casedate = ?, title = ?, participants = ?, explanation = ? where id = ?",
        [
            disciplinaryBoardFileInfo.createdAt,
            disciplinaryBoardFileInfo.createdBy,
            disciplinaryBoardFileInfo.updatedAt,
            disciplinaryBoardFileInfo.updatedBy,
            disciplinaryBoardFileInfo.seasonId,
            disciplinaryBoardFileInfo.caseNo,
            disciplinaryBoardFileInfo.caseDate,
            disciplinaryBoardFileInfo.title,
            disciplinaryBoardFileInfo.participants.toString(),
            disciplinaryBoardFileInfo.explanation,
            disciplinaryBoardFileInfo.id
        ],
        (error, result) => {
            if (!error) {

            } else {
                message = error.sqlMessage;
            }

            res.status(200).json({
                error: !!error,
                message: message || 'Disciplinary Board File updated successfully!'
            });
        }
    );
}

function deleteDisciplinaryBoardFile(req, res, next) {
    var disciplinaryBoardFileId = req.params.id;
    var message;

    connection.query(
        "delete from disciplinaryboardfiles where id = ?",
        [
            disciplinaryBoardFileId
        ],
        (error, result) => {
            if (!error) {

            } else {
                message = error.sqlMessage;
            }

            res.status(200).json({
                error: !!error,
                message: message || 'Disciplinary Board File delete successfully!'
            });
        }
    );
}

exports.getDisciplinaryBoardFiles = getDisciplinaryBoardFiles;
exports.createDisciplinaryBoardFile = createDisciplinaryBoardFile;
exports.updateDisciplinaryBoardFile = updateDisciplinaryBoardFile;
exports.deleteDisciplinaryBoardFile = deleteDisciplinaryBoardFile;
