require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.info.token;

        const verified = jwt.verify(token, secret);
        if (verified) {
            if(verified.active){
                next();
            }else{
                // Access Denied
                req.flash('error', 'Usuario no activo');
                return res.clearCookie("info").redirect('/');
            }
        } else {
            // Access Denied
            req.flash('error', 'No autorizado');
            return res.clearCookie("info").redirect('/');
        }
    } catch (error) {
        // Access Denied
        req.flash('error', 'No autorizado');
        return res.clearCookie("info").redirect('/');
    }
};

const authAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.info.token;

        const verified = jwt.verify(token, secret);
        if (verified && verified.level == "admin") {
            if(verified.active){
                next();
            }else{
                // Access Denied
                req.flash('error', 'Usuario no activo');
                return res.clearCookie("info").redirect('/');
            }
        } else {
            // Access Denied
            req.flash('error', 'No autorizado');
            return res.clearCookie("info").redirect('/');
        }
    } catch (error) {
        // Access Denied
        req.flash('error', 'No autorizado');
        return res.clearCookie("info").redirect('/');
    }
};

module.exports = { auth, authAdmin };