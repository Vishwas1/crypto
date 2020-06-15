<style scoped>
.floatLeft{
    float: left;
}
</style>

<template>
<div class="row">
    <form action="#" class="col-md-8">
        <div class="form-group">
            <label class="floatLeft">Data:</label>
            <textarea  class="form-control" @change="gotosubpage()" v-model="plaintext" rows="8" cols="50"></textarea>
        </div>
        <div class="form-group">
            <label class="floatLeft">Hash:</label>
            <input type="text" class="form-control" v-model="hashtext"  disabled>
        </div>
    </form>
</div>
</template>


<script>

import symmetric from '../crypto-lib/symmetric'

export default {
    name: 'HashPage',
    data(){
      return {
        plaintext: "",
      };
    },
    methods: {
      calculateHash: function(){
          return symmetric.sha256hashStr(this.plaintext)
      }
    },
    computed:{
        hashtext: function(){
            return this.calculateHash()
        },
    },
  }
</script>