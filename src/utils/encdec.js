const CryptoJS = require('crypto-js');

function encrypt(plaintext, secretKey) {
    const encryptedText = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
    return encryptedText;
}

function decrypt(encryptedText, secretKey) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
}

module.exports = { encrypt, decrypt };