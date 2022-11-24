const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => { 
    return new Promise((resolve, reject) => {
        const payload = {uid, name};
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Unable to genetate JWT');
            }

            resolve(token);
        });
    });
}

module.exports = {
    generateJWT
}