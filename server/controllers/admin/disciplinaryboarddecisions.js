const connection = require('../../functions/database').connectDatabase();

function getDisciplinaryBoardDecisions(req, res, next) {
    var disciplinaryBoardDecisionList;
    var message;
    const disciplinaryBoardFileId = req.params.fileid;

    connection.query(
        "select * from view_admin_disciplinaryboarddecisions where disciplinaryBoardFileId = ?",
        [
            disciplinaryBoardFileId
        ],
        (error, result) => {
            if (!error) {
                disciplinaryBoardDecisionList = result;
            } else {
                disciplinaryBoardDecisionList = [];
                message = error.sqlMessage;
            }

            res.status(200).json({
                error: !!error,
                message: message ||'Disciplinary Board Decisions fetched successfully!',
                disciplinaryBoardDecisionList: disciplinaryBoardDecisionList
            });
        }
    );
}

function createDisciplinaryBoardDecision(req, res, next) {
    const disciplinaryBoardDecisionInfo = req.body;
    var message;
    var disciplinaryBoardDecisionId;

    connection.query(
        "insert into disciplinaryboarddecisions(createdat, createdby, updatedat, updatedby, fileid, leagueid, teamid, fullname, licenseno, belongingto, penaltype, duration, explanation) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            disciplinaryBoardDecisionInfo.createdAt,
            disciplinaryBoardDecisionInfo.createdBy,
            disciplinaryBoardDecisionInfo.updatedAt,
            disciplinaryBoardDecisionInfo.updatedBy,
            disciplinaryBoardDecisionInfo.disciplinaryBoardFileId,
            disciplinaryBoardDecisionInfo.leagueId,
            disciplinaryBoardDecisionInfo.teamId,
            disciplinaryBoardDecisionInfo.fullName,
            disciplinaryBoardDecisionInfo.licenseNo,
            disciplinaryBoardDecisionInfo.belongingTo,
            disciplinaryBoardDecisionInfo.penalType,
            disciplinaryBoardDecisionInfo.duration,
            disciplinaryBoardDecisionInfo.explanation
        ],
        (error, result) => {
            if (!error) {
                disciplinaryBoardDecisionId = result.insertId;
            } else {

                message = error.sqlMessage;
            }

            res.status(200).json({
                error: !!error,
                message: message || 'Disciplinary Board Decision added successfully!',
                disciplinaryBoardDecisionId: disciplinaryBoardDecisionId
            });
        }
    );
}

function updateDisciplinaryBoardDecision(req, res, next) {
    const disciplinaryBoardDecisionInfo = req.body;
    var message;

    connection.query(
        "update disciplinaryboarddecisions set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, fileid = ?, leagueid = ?, teamid = ?, fullname = ?, licenseno = ?, belongingto = ?, penaltype = ?, duration = ?, explanation = ? where id = ?",
        [
            disciplinaryBoardDecisionInfo.createdAt,
            disciplinaryBoardDecisionInfo.createdBy,
            disciplinaryBoardDecisionInfo.updatedAt,
            disciplinaryBoardDecisionInfo.updatedBy,
            disciplinaryBoardDecisionInfo.disciplinaryBoardFileId,
            disciplinaryBoardDecisionInfo.leagueId,
            disciplinaryBoardDecisionInfo.teamId,
            disciplinaryBoardDecisionInfo.fullName,
            disciplinaryBoardDecisionInfo.licenseNo,
            disciplinaryBoardDecisionInfo.belongingTo,
            disciplinaryBoardDecisionInfo.penalType,
            disciplinaryBoardDecisionInfo.duration,
            disciplinaryBoardDecisionInfo.explanation,
            disciplinaryBoardDecisionInfo.id
        ],
        (error, result) => {
            if (!error) {

            } else {
                message = error.sqlMessage;
            }

            res.status(200).json({
                error: !!error,
                message: message || 'Disciplinary Board Decision updated successfully!'
            });
        }
    );
}

function deleteDisciplinaryBoardDecision(req, res, next) {
    var disciplinaryBoardDecisionId = req.params.id;
    var message;

    connection.query(
        "delete from disciplinaryboarddecisions where id = ?",
        [
            disciplinaryBoardDecisionId
        ],
        (error, result) => {
            if (!error) {

            } else {
                message = error.sqlMessage;
            }

            res.status(200).json({
                error: !!error,
                message: message || 'Disciplinary Board Decision deleted successfully!'
            });
        }
    );
}

function clearDisciplinaryBoardDecisions(req, res, next) {
    var disciplinaryBoardFileId = req.params.fileid;
    var message;

    connection.query(
        "delete from disciplinaryboarddecisions where fileid = ?",
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
                message: message || 'Disciplinary Board Decision deleted successfully!'
            });
        }
    );
}

exports.getDisciplinaryBoardDecisions = getDisciplinaryBoardDecisions;
exports.createDisciplinaryBoardDecision = createDisciplinaryBoardDecision;
exports.updateDisciplinaryBoardDecision = updateDisciplinaryBoardDecision;
exports.deleteDisciplinaryBoardDecision = deleteDisciplinaryBoardDecision;
exports.clearDisciplinaryBoardDecisions = clearDisciplinaryBoardDecisions;
