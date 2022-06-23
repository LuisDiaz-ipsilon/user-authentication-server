const { response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

//do create new user
const newUser = async (req, res = response) => {


    const { usname, id, pass } = req.body;
    console.log(usname, id, pass);

    try {

        //validacion de id existente
        let us = await User.findOne({ id });
        if (us) {
            return res.status(406).json({
                status: "error",
                message: "Registro existente",
                ok: false
            });
        }

        //crear usuario 
        us = new User(req.body);

        //encriptamos el password
        const salt = bcrypt.genSaltSync(10);
        us.pass = bcrypt.hashSync(pass, salt);

        //JsonWebToken
        const token = await generateJWT(us.id, usname);

        await us.save();

        return res.status(201).json({
            status: "success",
            message: "New user created",
            ok: true,
            id: id,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Reporte error al administrador.",
            ok: false
        });
    }

}

//Loggin user
const logUs = async (req, res = response) => {

    const { id, pass } = req.body;
    console.log(id, pass);

    try {

        const us = await User.findOne({ id });

        if (!us) {
            return res.status(400).json({
                status: "error",
                message: "Asegurese de ingresar datos correctos.",
                ok: false
            });
        }

        //ahora verificaremos el password
        const passValidated = bcrypt.compareSync(pass, us.pass);

        if (!passValidated) {
            return res.status(400).json({
                status: "error",
                message: "Contraseña incorrecta.",
                ok: false
            });
        }

        const token = await generateJWT(us.id, us.usname);

        return res.json({
            status: "success",
            message: "log in success",
            ok: true,
            id: id,
            token
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: "error",
            message: "Reporte error al administrador.",
            ok: false
        });

    }

}

//validate jwtoken
const renew = async (req, res = response) => {

    const { id, usname } = req;

    const token = await generateJWT(id, usname);

    return res.json({
        status: "success",
        message: "renew jwtoken",
        ok: true,
        usname: usname,
        id: id,
        token
    });
}

module.exports = {
    newUser,
    logUs,
    renew
}