const GenerateAccessToken = () => {
    const ACCESS_TOKEN_SECRET = require("crypto")
        .randomBytes(64)
        .toString("hex");

    return ACCESS_TOKEN_SECRET;
};

module.exports = GenerateAccessToken;
