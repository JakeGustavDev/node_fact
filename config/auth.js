require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.info.token;

        const verified = jwt.verify(token, secret);
        if (verified) {
            next();
        } else {
            // Access Denied
            req.flash('error', 'No autorizado');
            return res.redirect('/');
        }
    } catch (error) {
        // Access Denied
        req.flash('error', 'No autorizado');
        return res.redirect('/');
    }
};

const authAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.info.token;

        const verified = jwt.verify(token, secret);
        if (verified && verified.level == "admin") {
            next();
        } else {
            // Access Denied
            req.flash('error', 'No autorizado');
            return res.redirect('/');
        }
    } catch (error) {
        // Access Denied
        req.flash('error', 'No autorizado');
        return res.redirect('/');
    }
};

module.exports = { auth, authAdmin };