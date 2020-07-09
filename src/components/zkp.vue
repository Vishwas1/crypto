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
.note{
  border: 1px solid #80808030;
  color: #808080bf;
  background: #ffff001f;
}
</style>
<template>
  <div class="asymmetric">
    <div class="col-md-12">
      <div>
        <b-card no-body>
          <b-tabs card vertical nav-wrapper-class="w-30">
            <b-tab title="Introduction">
              <b-card-text>
                <div class="row">
                  <form action="#" class="col-md-12">
                    <div class="form-group">
                      <h4>Zero Knowledge Proof of Age</h4>
                      <hr>
                      <p>
                        In cryptography, a zero-knowledge proof or zero-knowledge protocol is a method by which one party (the prover) can prove to another party (the verifier) that they know a value x, without conveying any information apart from the fact that they know the value x. The essence of zero-knowledge proofs is that it is trivial to prove that one possesses knowledge of certain information by simply revealing it; the challenge is to prove such possession without revealing the information itself or any additional information. (Source: <a href="https://en.wikipedia.org/wiki/Zero-knowledge_proof">Wikipedia</a>)
                      </p>
                      <p>
                        In this demo I (the holder) want to proof to someone (the verifier) that his age is above certain number (say 18+). To do that
                        I will ask my issuer to issue me a certificate (which will contain the challenge and the proof) - the zero knowledge proof - so that I can produce that to the verifier.
                        The verifier then can verify the the proof submitted by my without having to know my real age.
                      </p>
                      <hr>
                      <p>
                        We used the concept of <a href="https://en.wikipedia.org/wiki/Hash_chain">hash chaining</a> for implementation. The implementation is inspired from <a href="https://www.stratumn.com/thinking/zero-knowledge-proof-of-age-using-hash-chains/" target="_blank">this</a> and <a href="https://labs.imaginea.com/zero-knowledge-proof-of-age/" target="_blank">this</a> blog posts.
                      </p>
                    </div>
                  </form>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab title="Generate Proof">
              <b-card-text>
                <div class="row note">
                  <form action="#" class="col-md-12">
                    <p>
                      Here, the user(or the holder) will ask trusted issuer to generate the proving kit, which contains <b>proof</b> and <b>challenge</b> by providing his actual age and the age to prove. Notice the proof (or claim) does not reveals any of his information except the fact that he is above certain age.
                      <br>
                      <i>
                      proof = HASH^(1 + actualAge)(randomeed); <br>
                      challenge = HASH^(1 + actualAge - ageToProve)(random-seed);
                      </i>
                    </p>
                  </form>
                </div>
                <div class="row">
                  <form action="#" class="col-md-4">
                    <div class="form-group">
                      <label class="floatLeft">Actual age:</label>
                      <input type="number" style="width:100%" v-model="actualAge"/>
                    </div>
                    <div class="form-group">
                      <label class="floatLeft">Age to prove:</label>
                      <input type="number" style="width:100%" v-model="ageToProve"/>
                    </div>
                    <div class="form-group floatLeft">
                      <button
                        type="button"
                        data-toggle="modal"
                        @click="operation('generateProof')"
                        class="btn btn-primary"
                      >Generate Proof</button>
                    </div>
                  </form>
                  <form action="#" class="col-md-8">
                    <div class="form-group">
                      <label class="floatLeft">Proving Kit:</label>
                      <textarea class="form-control" v-model="proof" rows="8" cols="50"></textarea>
                    </div>
                  </form>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab title="Verify Proof">
              <b-card-text>
                <div class="row note">
                  <form action="#" class="col-md-12">
                    <p>
                      Once receieved the proving kit, the verifier can verify the claim. 
                      <br>
                      <i>
                      1. verification = hash^(ageToProve)(challenge) <br>
                      2. Check if the verification == proof;
                      </i>
                    </p>
                  </form>
                </div>
                <div class="row">
                  <form action="#" class="col-md-12">
                    <div class="row">
                      <div class="form-group col-md-6">
                        <label class="floatLeft">Proving Kit:</label>
                        <textarea class="form-control" v-model="proof" rows="8" cols="50"></textarea>
                      </div>
                      <div class="form-group col-md-6">
                        <label class="floatLeft">Age to prove:</label>
                        <input type="number" style="width:100%" v-model="ageToProve"/>
                      </div>
                    </div>
                    <div class="row">
                      <div class="form-group col-md-6">
                        <button
                          type="button"
                          data-toggle="modal"
                          @click="operation('verifyProof')"
                          class="btn btn-primary floatLeft"
                        >Verify Proof</button>
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
const zkp = require('../crypto-lib/zkp')
export default {
  name: "ZKPPage",
  components: {},
  data() {
    return {
      actualAge: 38,
      ageToProve: 18,
      proof: ""
    };
  },
  created() {},
  methods: {
    operation: function(op) {
      try {
        let res = "";
        switch (op) {
          case "generateProof":
            if (this.actualAge != "" && this.ageToProve != "") {
              res = zkp.generateProof(this.actualAge, this.ageToProve);
              this.proof = JSON.stringify(res);
            } else {
              alert("Error: Actual age or Age to prove can not be empty");
            }
            break;
          case "verifyProof":
            if (this.proof != {} || this.ageToProve != "") {
              res = zkp.verifyProof(
                this.ageToProve,
                JSON.parse(this.proof)
              );
              alert(res)
            } else {
              alert("Error: Proving kit or Age to prove is empty");
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
