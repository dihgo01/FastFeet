const jwt = require('jsonwebtoken')  ;
const { promisify } = require('util');
const authConfig = require('../config/authConfig') ;

module.exports = async (req, res, next) => {

        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({ error:'Token not provided'})  
        }
    const [, token] = authHeader.split(' ');

    try{
        const decoded = await promisify(jwt.verify)(token, authConfig.key);
        req.userId = decoded.id;
        
        return next();
    } catch (err){
        return res.status(401).json({ error:' Token invalid '})
    }
        
}
/** 
module.exports = async (req, res ,next) => {
    const authToken = req.headers.authorization;
 
    if(!authToken) {
        return res.status(401).json({error: "Token not provided"});
    }

    const [, token] = authToken.split(' ');

    try {
        const decoded = await promisify (jwt.verify)(token, authConfig.key);

        req.userId = decoded.id;

        console.log(decoded)

        return next()
    } catch (err) {
        console.error(err);
        return res.status(401).json({error: "Token invalid"});
    }   
}; */