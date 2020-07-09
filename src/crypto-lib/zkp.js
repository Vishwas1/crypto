// Zero knowledge proof of age
// Using concept of hash chaining
// Ref: https://www.stratumn.com/thinking/zero-knowledge-proof-of-age-using-hash-chains/

const { sha256hashStr }  =  require('./symmetric')
const asymm = require('./asymmetric') 


const getIteratedHash = (number, data) => {
    if(number <= 0) return data
    return getIteratedHash(--number, sha256hashStr(data))
}

const generateProof = (actualAge, ageToProof) => {
    if(!actualAge || !ageToProof) throw new Error(`Invalid actual age = ${actualAge} or age to proof = ${ageToProof}`)
    actualAge = parseInt(actualAge);
    ageToProof = parseInt(ageToProof);
    const randomString = "random_" + asymm.generateKeyPair().publicKey;
    return {
        proof: getIteratedHash(1+ actualAge, randomString),
        challange: getIteratedHash(1+ actualAge - ageToProof, randomString),
    }
}

const verifyProof = (ageToProof, provingKit) => {
    const { challange, proof } = provingKit;
    if(!challange || !proof) throw new Error('Invalid proving kit');
    if(challange.indexOf('random_') >= 0) return false
    const temp_proof = getIteratedHash(ageToProof, challange)
    if(temp_proof === proof) return true
    return false
}

module.exports = {
    generateProof,
    verifyProof
}