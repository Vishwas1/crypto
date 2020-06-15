<style scoped>
.floatLeft {
  float: left;
}
.fullWidth {
  width: 100%;
}
.fullbody {
  width: 500px;
}
</style>
<template>
  <div class="asymmetric">
    <div class="col-md-12">
      <div>
        <b-card no-body>
          <b-tabs card vertical nav-wrapper-class="w-30">
            <b-tab title="Key Pair" active>
              <b-card-text>
                <div class="row">
                  <form action="#" class="col-md-12">
                    <div class="form-group floatLeft">
                      <button
                        type="button"
                        class="btn btn-primary"
                        @click="generatekp()"
                      >Generate Keypair</button>
                    </div>
                  </form>
                </div>
                <div class="row">
                  <form action="#" class="col-md-12">
                    <div class="form-group">
                      <table class="table table-bordered">
                        <tr>
                          <th>Public Key</th>
                          <td>
                            <input type="text" style="width:100%" v-model="publickey" disabled />
                          </td>
                        </tr>
                        <tr>
                          <th>Private Key</th>
                          <td>
                            <input type="text" style="width:100%" v-model="privatekey" disabled />
                          </td>
                        </tr>
                      </table>
                    </div>
                  </form>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab title="Encryption">
              <b-card-text>
                <div class="row">
                  <form action="#" class="col-md-6">
                    <div class="form-group">
                      <label class="floatLeft">Plain Text:</label>
                      <textarea class="form-control" v-model="plaintext" rows="8" cols="50"></textarea>
                    </div>
                    <div class="form-group">
                      <label class="floatLeft">Recipient's Public Key:</label>
                      <input type="text" v-model="recipientPublicKey" class="form-control" />
                    </div>
                    <div class="form-group floatLeft">
                      <button
                        type="button"
                        data-toggle="modal"
                        @click="operation('encrypt')"
                        class="btn btn-primary"
                      >Encrypt</button>
                    </div>
                  </form>
                  <form action="#" class="col-md-6">
                    <div class="form-group">
                      <label class="floatLeft">Cipher Text:</label>
                      <textarea class="form-control" v-model="cipherText" rows="8" cols="50"></textarea>
                    </div>
                  </form>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab title="Decryption">
              <b-card-text>
                <div class="row">
                  <form action="#" class="col-md-6">
                    <div class="form-group">
                      <label class="floatLeft">Cipher Text:</label>
                      <textarea class="form-control" v-model="cipherText" rows="8" cols="50"></textarea>
                    </div>
                    <div class="form-group">
                      <label class="floatLeft">Recipient's Private Key:</label>
                      <input type="text" v-model="recipientSecretKey" class="form-control" />
                    </div>
                    <div class="form-group floatLeft">
                      <button
                        type="button"
                        data-toggle="modal"
                        @click="operation('decrypt')"
                        class="btn btn-primary"
                      >Decrypt</button>
                    </div>
                  </form>
                  <form action="#" class="col-md-6">
                    <div class="form-group">
                      <label class="floatLeft">Plain Text:</label>
                      <textarea class="form-control" v-model="decryptPlaintext" rows="8" cols="50"></textarea>
                    </div>
                  </form>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab title="Sign">
              <b-card-text>
                <div class="row">
                  <form action="#" class="col-md-6">
                    <div class="form-group">
                      <label class="floatLeft">Plain Text:</label>
                      <textarea class="form-control" v-model="plaintext" rows="8" cols="50"></textarea>
                    </div>
                    <div class="form-group">
                      <label class="floatLeft">Sender's Private Key:</label>
                      <input type="text" v-model="senderPrivateKey" class="form-control" />
                    </div>
                    <div class="form-group floatLeft">
                      <button
                        type="button"
                        data-toggle="modal"
                        @click="dsOperation('sign')"
                        class="btn btn-primary"
                      >Sign</button>
                    </div>
                  </form>
                  <form action="#" class="col-md-6">
                    <div class="form-group">
                      <label class="floatLeft">Signed Message:</label>
                      <textarea class="form-control" v-model="signedMessage" rows="8" cols="50"></textarea>
                    </div>
                  </form>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab title="Verify">
              <b-card-text>
                <div class="row">
                  <form action="#" class="col-md-12">
                    <div class="row">
                      <div class="form-group col-md-6">
                        <label class="floatLeft">Signed Message:</label>
                        <textarea class="form-control" v-model="signedMessage" rows="8" cols="50"></textarea>
                      </div>
                      <div class="form-group col-md-6">
                        <label class="floatLeft">Plain Text:</label>
                        <textarea class="form-control" v-model="plaintext" rows="8" cols="50"></textarea>
                      </div>
                    </div>
                    <div class="row">
                      <div class="form-group col-md-6">
                        <label class="floatLeft">Sender's Public Key:</label>
                        <input type="text" v-model="senderPublicKey" class="form-control" />
                      </div>
                      <div class="form-group col-md-6">
                        <button
                          type="button"
                          data-toggle="modal"
                          @click="dsOperation('verify')"
                          class="btn btn-primary floatLeft"
                        >Verify</button>
                      </div>
                    </div>
                  </form>
                </div>
              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
const asymmetric = require("../crypto-lib/asymmetric");
export default {
  name: "AssymetricPage",
  components: {},
  data() {
    return {
      publickey: "",
      privatekey: "",
      plaintext: "This is your secret message!",
      recipientPublicKey: "",
      recipientSecretKey: "",
      cipherText: "",
      decryptPlaintext: "",
      senderPrivateKey: "",
      signedMessage: "",
      senderPublicKey: ""
    };
  },
  created() {},
  methods: {
    generatekp: function() {
      const keys = asymmetric.generateKeyPair();
      this.publickey = keys.publicKey;
      this.privatekey = keys.secretKey;
    },
    operation: function(op) {
      try {
        let res = "";
        switch (op) {
          case "encrypt":
            if (this.recipientPublicKey != "" && this.plaintext != "") {
              res = asymmetric.encrypt(this.plaintext, this.recipientPublicKey);
              this.cipherText = JSON.stringify(res);
            } else {
              alert("Error: Plaintext or recipeint's public key is empty");
            }
            break;
          case "decrypt":
            if (this.cipherText != {}) {
              res = asymmetric.decrypt(
                this.recipientSecretKey,
                JSON.parse(this.cipherText)
              );
              this.decryptPlaintext = JSON.stringify(res);
            } else {
              alert("Error: Ciphertext is empty");
            }
            break;
          default:
        }
      } catch (e) {
        alert(`Error : ${e.message}`);
      }
    },
    dsOperation: function(op) {
      try {
        let res = "";
        switch (op) {
          case "sign":
            if (this.senderPrivateKey != "" && this.plaintext != "") {
              res = asymmetric.sign(this.plaintext, this.senderPrivateKey);
              this.signedMessage = res;
            } else {
              alert("Error: Plaintext or recipeint's public key is empty");
            }
            break;
          case "verify":
            if (
              this.signedMessage != "" &&
              this.plaintext != "" &&
              this.senderPublicKey != ""
            ) {
              res = asymmetric.verify(
                this.plaintext,
                this.signedMessage,
                this.senderPublicKey
              );
              alert(res);
            } else {
              alert("Error: Ciphertext is empty");
            }
            break;
          default:
        }
      } catch (e) {
        alert(`Error : ${e.message}`);
      }
    }
  }
};
</script>
