<style scoped>
.blog {
  text-align: left;
  padding: 10px;
  height: 500px;
  overflow-y: auto;
}
</style>
<template>
  <div class="blog">
    <!-- <h2 id="features">Features</h2> -->
    <ul>
      <li>
        <a
          href="https://github.com/Vishwas1/crypto/blob/master/docs/README.md" target="_blank"
        >Basic concept of cryptography</a>
        <ul>
          <li>Hashing</li>
          <li>Symmetric Key Cryptography</li>
          <li>Asymmetric Key Cryptography</li>
          <li>Digital Signature</li>
        </ul>
      </li>
      <li>
        Uses following libraries
        <ul>
          <li>
            Hashing
            <ul>
              <li>
                <a href="https://www.npmjs.com/package/blakejs" target="_blank">Blakejs</a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/sha.js" target="_blank">SHA js</a>
              </li>
            </ul>
          </li>
          <li>
            Symmetric Key Cryptography
            <ul>
              <li>
                <a href="https://www.npmjs.com/package/aes-js" target="_blank">Aes-js</a> with CTR mode
              </li>
            </ul>
          </li>
          <li>
            Asymmetric Key Cryptography
            <ul>
              <li>
                <a href="https://www.npmjs.com/package/tweetnacl" target="_blank">TweetNacl</a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/ed2curve" target="_blank">Ed2Curve</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
              <a href="https://github.com/Vishwas1/crypto" target="_blank">Source Code</a>
    </li>
    </ul>
  </div>
</template>
