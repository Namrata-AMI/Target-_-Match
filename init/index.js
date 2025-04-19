const jwt = require("jsonwebtoken");

const generateToken = (user) =>{
    return jwt.sign(
        { id : user.id , username : user.username},
        "3499d367a2104e1e097a1da4b64ab48467e57b9a03fbfb09fd6117eadfea186e",
        {expiresIn : '1h'},
    )
};


module.exports = generateToken;