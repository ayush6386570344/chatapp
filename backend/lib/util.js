const jwt = require("jsonwebtoken");
const generatetoken = (userId) => {
    const token = jwt.sign(
        {userId},
        process.env.JWT_SECRET
    );
    return token;
};
module.exports = generatetoken ;