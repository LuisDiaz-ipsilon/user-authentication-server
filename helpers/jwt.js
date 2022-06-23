const jwt = require('jsonwebtoken');

const generateJWT = (id, usname) => {

    const payload = { id, usname };

    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: '1h'
        }, (error, token) => {
            if (error) {
                console.log(error);
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}