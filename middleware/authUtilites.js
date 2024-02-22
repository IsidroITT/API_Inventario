const jwt = require(`jsonwebtoken`);

function generateToken(user){
    const payload = { userId: user.id, userName: user.name };
    const secretKey = 'key-service';
    const option = {expiresIn: '1h'};

    return jwt.sign(payload, secretKey, option);
}

function verifyToken(token) {
    const secretKey = 'key-service';
     try {
        const decide = jwt.verify(token, secretKey);
        return decide;
     } catch (error) {
         return  null;
     }
}

module.exports = {
    generateToken,
    verifyToken
}