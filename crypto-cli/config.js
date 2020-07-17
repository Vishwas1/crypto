const crypto = require('crypto');

const IV = crypto.randomBytes(16);
const ALGORITHM = 'aes-256-cbc';
const SALT = crypto.randomBytes(32);
const KEYLENGTH = 32;

module.exports = {
    IV,
    ALGORITHM,
    SALT,
    KEYLENGTH
}


