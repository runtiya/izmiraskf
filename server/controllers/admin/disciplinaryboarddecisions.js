const connection = require('../../functions/database').connectDatabase();

function getDisciplinaryBoardDecisions(req, res, next) {
    var disciplinaryBoardDecisionList;
    var message;
    const fileId = req.params.fileid;
    const caseNo = req.params.caseno;

    connection.query(
        "select * from view_disciplinaryboarddecisions where fileid = ? and caseno = ?",
        [
            fileId,
            caseNo
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


exports.getDisciplinaryBoardDecisions = getDisciplinaryBoardDecisions;