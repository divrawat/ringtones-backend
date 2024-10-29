var validationResult = require('express-validator').validationResult;

function runvalidation(req, res, next) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array()[0].msg });
    }
    next();
}

module.exports = {
    runvalidation: runvalidation
};
