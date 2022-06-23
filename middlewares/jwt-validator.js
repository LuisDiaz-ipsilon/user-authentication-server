const { request } = require('express');
const { response } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidate = (req = request, res = response, next) => {

    const token = req.header('apikey');

    if (!token) {
        return res.status(401).json({
            status: "error",
            message: "Reporte error al administrador. error (9992) token.",
            ok: false
        });
    }

    try {

        const {usname, id} = jwt.verify(token, process.env.TOKEN_SECRET);
        req.id = id;
        req.usname = usname;

    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Reporte error al administrador. error (9993) token no valido.",
            ok: false
        });
    }

    next();
}

module.exports = {
    jwtValidate
}