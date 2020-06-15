// Ref: https://github.com/aeternity/aepp-sdk-js/blob/f2088c405ff6071f6b809c279231a3dff40e6ffb/es/utils/crypto.js

const nacl = require('tweetnacl')
const bs58check = require('bs58check')
const { blake2b } = require('blakejs')
const ed2curve = require('ed2curve')
const signer = require('nacl-signature')
nacl.util  = require('tweetnacl-util')


function encodeBase58Check (input) {
    return bs58check.encode(Buffer.from(input))
  }

function decodeBase58Check (str) {
    return bs58check.decode(str)
  }

function generateKeyPair () {
    const keyPair = nacl.sign.keyPair()
    const publicBuffer = Buffer.from(keyPair.publicKey)
    const secretBuffer = Buffer.from(keyPair.secretKey)
    return {
        publicKey: encodeBase58Check(publicBuffer),
        secretKey: secretBuffer.toString('hex')
      }
  }

function encrypt(msg, publicKey) {
    const ephemeralKeyPair = nacl.box.keyPair()
    const pubKeyUInt8Array = decodeBase58Check(publicKey)
    const nonce = nacl.randomBytes(nacl.box.nonceLength)
  
    const encryptedMessage = nacl.box(
      Buffer.from(msg),
      nonce,
      ed2curve.convertPublicKey(pubKeyUInt8Array),
      ephemeralKeyPair.secretKey
    )
  
    return {
      ciphertext: Buffer.from(encryptedMessage).toString('hex'),
      ephemPubKey: Buffer.from(ephemeralKeyPair.publicKey).toString('hex'),
      nonce: Buffer.from(nonce).toString('hex'),
      version: 'x25519-xsalsa20-poly1305'
    }
  }


function decrypt(secretKey, encryptedData) {
    const receiverSecretKeyUint8Array = ed2curve.convertSecretKey(Buffer.from(secretKey, 'hex'))
    const nonce = Buffer.from(encryptedData.nonce, 'hex')
    const ciphertext = Buffer.from(encryptedData.ciphertext, 'hex')
    const ephemPubKey = Buffer.from(encryptedData.ephemPubKey, 'hex')
    const decrypted = nacl.box.open(
      ciphertext,
      nonce,
      ephemPubKey,
      receiverSecretKeyUint8Array
    )
    return decrypted ? nacl.util.encodeUTF8(decrypted) : decrypted
  }

function hash (input) {
    return Buffer.from(blake2b(input, null, 32)).toString('hex') // 256 bits
  }

function sign (data, privateKey) {
    return Buffer.from(nacl.sign.detached(Buffer.from(data), Buffer.from(privateKey, 'hex'))).toString('hex')
  }

function verify (message, signature, publicKey) {
    signature = Buffer.from(signature,'hex')
    publicKey = decodeBase58Check(publicKey)
    return signer.verify(message, signature, publicKey)
  }


// Key pair generation for Alice and Bob
const akeys = generateKeyPair()
console.log(akeys)
const bkeys = generateKeyPair()
console.log(bkeys)

// ALICE
/// Hashing
const message = "hello world!"
const digest = hash(message)
console.log(digest)
/// Encryption
const encryptedObj = encrypt(digest, bkeys.publicKey)
console.log(encryptedObj)
/// Signing 
const signedMessage = sign(encryptedObj.ciphertext, akeys.secretKey)
console.log(signedMessage)


// BOB
/// Verify
const verified = verify(encryptedObj.ciphertext, signedMessage, akeys.publicKey)
console.log(verified)
/// Decrypt
const decryptedObj = decrypt(bkeys.secretKey, encryptedObj)
console.log(decryptedObj)


