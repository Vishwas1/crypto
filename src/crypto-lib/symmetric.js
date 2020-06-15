
/**
 * 
 * npmjs.com/package/aes-js // symmetric key crypto
 * import { blake2b } from 'blakejs' // hash
 * import nacl from 'tweetnacl' // public key crypto
    // 
    Keys:
        - 128 bits 
        - 192 bits 
        - 256 bits


    common modes of operation
        - CBC (recommended)
        - CFB 
        - CTR
        - ECB
        - OFB
 */


const  aesjs = require('aes-js')
const  shajs = require('sha.js')
const  { blake2b } = require('blakejs')

const CTR = aesjs.ModeOfOperation.ctr
/**
 * Calculate 256bits Blake2b hash of `input`
 * @rtype (input: String) => hash: String
 * @param {String|Buffer} input - Data to hash
 * @return {Buffer} Hash
 */
function blakeHash (input) {
    return Buffer.from(blake2b(input, null, 32)) // 256 bits
  }

/**
 * Calculate SHA256 hash of `input`
 * @rtype (input: String) => hash: String
 * @param {String} input - Data to hash
 * @return {String} Hash
 */
function sha256hash (input) {
    return shajs('sha256').update(input).digest()
  }
  
function sha256hashStr(input){
  return aesjs.utils.hex.fromBytes(sha256hash(input));
}

/**
 * Encrypt given data using `password`
 * @rtype (password: String, binaryData: Buffer) => Uint8Array
 * @param {String} password - Password to encrypt with
 * @param {String} message - Data to encrypt
 * @return {String} Encrypted data
 */
function encryptData (password, message) {
    const binaryData = aesjs.utils.utf8.toBytes(message)
    const hashedPasswordBytes = sha256hash(password)
    const aesCtr = new CTR(hashedPasswordBytes)
    const encryptedBytes = aesCtr.encrypt(binaryData)
    return aesjs.utils.hex.fromBytes(encryptedBytes)
  }

/**
 * Decrypt given data using `password`
 * @rtype (password: String, encrypted: String) => Uint8Array
 * @param {String} password - Password to decrypt with
 * @param {String} encrypted - Data to decrypt
 * @return {String} Decrypted data
 */
function decryptData (password, encrypted) {
    const encryptedBytes = aesjs.utils.hex.toBytes(encrypted);
    const hashedPasswordBytes = sha256hash(password)
    const aesCTR = new CTR(hashedPasswordBytes)
    const decryptedBytes = aesCTR.decrypt(encryptedBytes)
    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }


module.exports = {
  sha256hashStr,
  encryptData,
  decryptData,
  blakeHash
}

/*

const message = "Text may be any length you wish, no padding is required."
const secretKey = "PassWord1@"
const encryptedText = encryptData(secretKey, message)
const hash = sha256hashStr(message)
console.log(`Plain text = ${message}`);
console.log(`Secret Key = ${secretKey}`);
console.log('--------------------------------------------------------')
console.log(`HASH = ${hash}`)
console.log(`Encrypted text = ${encryptedText}`);
const actuallMessage = decryptData(secretKey, encryptedText)
console.log(`Plain text = ${actuallMessage}`)

*/
// https://github.com/aeternity/aepp-sdk-js/blob/f2088c405ff6071f6b809c279231a3dff40e6ffb/es/utils/crypto.js#L35
