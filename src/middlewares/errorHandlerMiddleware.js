const { getErrorMessage } = require('../utils/errorHelpers');

exports.errorHandler = (error, req, res) => {
    res.render('404', { error: getErrorMessage(error) })
}