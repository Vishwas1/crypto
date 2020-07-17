#!/usr/bin/env node

const { encrypt, decrypt }  = require('./aes')

const [ mode, filepath, password ] = process.argv.slice(2);

if (mode === 'encrypt') {
    encrypt({ filepath, password });
}if (mode === 'decrypt') {
    decrypt({ filepath, password });
}
