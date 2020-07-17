// Ref: https://medium.com/@brandonstilson/lets-encrypt-files-with-node-85037bea8c0e

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { IV, ALGORITHM, SALT, KEYLENGTH } = require('./config');

function get256BitKey(password) {
    return crypto.scryptSync(password, SALT, KEYLENGTH)
    // return crypto.createHash('sha256').update(password).digest();
}

function getFileInfo(filepath){
    const fileextention = path.extname(filepath)
    const filename = path.basename(filepath, fileextention)
    const filedir = path.dirname(filepath)
    return { fileextention,filename, filedir }
}

function encrypt({
    filepath,
    password
}) {
    const fileInfo = getFileInfo(filepath)
    const CIPHER_KEY = get256BitKey(password);
    const readStream = fs.createReadStream(filepath);
    const cipher = crypto.createCipheriv(ALGORITHM, CIPHER_KEY, IV);

    const encryptedFilePath = `${fileInfo.filedir}/${fileInfo.filename}${fileInfo.fileextention}.enc`
    const writeStream = fs.createWriteStream(encryptedFilePath);
    readStream
        .pipe(cipher)
        .pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('Encryption completed!')
        fs.unlinkSync(filepath)
        console.log('File Deleted!')
        
    })
}

function decrypt({
    filepath,
    password
}) {
    try{
        const fileInfo = getFileInfo(filepath)
        if(fileInfo.fileextention != '.enc') throw new Error('This is not an ecrypted file. Send the file with extention .enc')
        const CIPHER_KEY = get256BitKey(password);
        const encryptedReadStream = fs.createReadStream(filepath);
        const decipher = crypto.createDecipheriv(ALGORITHM, CIPHER_KEY, IV);
        const originalFilePath = `${fileInfo.filedir}/${fileInfo.filename}`
        console.log(originalFilePath)
        const writeStream = fs.createWriteStream(originalFilePath);
console.log(111111111111111)
        encryptedReadStream
            .pipe(decipher)
            .pipe(writeStream);

        writeStream.on('finish', () => {
            console.log('Decryption completed!')
            fs.unlinkSync(filepath)
            console.log('File Deleted!')
        })    

        writeStream.on('error', ()=> {
            console.log('stream erro')
        })

    }catch(e){
        
        fs.unlinkSync(originalFilePath)
        console.log('File Deleted!')
        throw e
    }
    
}


module.exports = {
    encrypt,
    decrypt
}

// encrypt({filepath: 'abc.txt', password: 'password'})
// decrypt({ filepath: './abc.txt.enc', password: 'password' })



