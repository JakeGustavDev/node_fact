require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.info.token;
  
        const verified = jwt.verify(token, secret);
        if(verified){
            next();
        }else{
            // Access Denied
            return res.send('Unauthorized');
        }
    } catch (error) {
        // Access Denied
        return res.send('Unauthorized');
    }
};

module.exports = auth;