## Features

- Basic concept of cryptography
- Hashing
- Symmetric Cryptography
- Asymmetric Cryptography
- Digital Signature

## What is Cryptography?

> Science of hiding thing (or text) in such a way that only intended person can see it

- Why you want to hide?
    - So that the hidden text can be stored at insecure place
    - So that the hidden text can be transmitted via insecure network/channel
    - So that only authorized person can view it
- The text which is to be hide, called PlainText
- The hidden text is called CipherText

![img](public/images/cyrptography.png)

## Hashing

### Hash Function

- A function which transforms input data of arbitrary size (e.g. a text message) to a result of fixed size (e.g. 256 bits), which is called hash value (or hash code, message digest, or simply hash)
- The process of calculating the hash (or digest) value is called hashing
- Example of Hash algorithms: SHA-256, SHA3-256 etc.

![img](public/images/hash.png)

#### Properties

- One-Way (or Irreversible)
- Deterministic
- Collision resistant

![img](public/images/hash-prop.png)


## Encryption & Decryption

## Encryption

- Process in which original data is convert into random or meaningless
- Or, the process of hiding text

## Decryption

- Process in which encrypted data (or meaningless data) is convert back to original text.
- Or, the process of revealing original text.


## Symmetric Key Cryptography

- Encrypt and Decrypt data with the same key, secret key

![img](public/images/Screenshot-asymmetric.png)

## Asymmetric Key Cryptography

- Encrypt and Decrypt data using two different keys
    - Public Key: Used for encryption 
    - Private Key: Used for decryption

![img](public/images/Screenshot-symmetric.png)

## Digital Signature

- A digital signature is equivalent to handwritten signature.
    - Its a method to guarantees the integrity and authenticity of message which is sent
- Serves three purposes
    - Authentication: Provides receiver a reason to believe that message came from claimed sender.
    - Integrity: The message was not corrupted/altered in transit.
    - Non-repudiation: Once sent, the sender can not say that he did not send this message.
- DS method uses public key cryptography
- How it works
    - Sender can Signs the message using private key
    - Receiver Verifies  the message using sender’s public key

![img](public/images/ds.png)


## Refrences and thing to read

- https://www.youtube.com/watch?v=8NgVGnX4KOw
- https://www.youtube.com/watch?v=bBC-nXj3Ng4
- https://blog.coincodecap.com/different-types-of-crypto-wallets/
- https://cryptobook.nakov.com/cryptographic-hash-functions
- crypto-it.net/eng/theory/modes-of-block-ciphers.html





