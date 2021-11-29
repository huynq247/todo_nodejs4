var errorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
    let error = {...err}
    console.log(err.name);
    
    if(err.name === "CastError"){
        let message = 'Không tồn tại dữ liệu';
        error = new errorResponse(404,message);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "SERVER ERROR"
    })
}

module.exports = errorHandler;