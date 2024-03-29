const { response } = require("express");
const { validationResult } = require("express-validator");


const validate = (req, res  = response, next ) => {
    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        return res.status(400).json({
            status: "Bad Request",
            message: "Alguno(s) datos no fueron ingresados correctemante",
            errors : errors.mapped()
        });
    }

    next();
}

module.exports = {
    validate
}