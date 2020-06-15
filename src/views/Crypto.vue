<style scoped>
.addmargin {
    margin-top: 10px;
    margin-bottom: 10px;
}

.vue-logo-back {
    background-color: black;
}

.logo{
	width: 144px;
}

.fullbody{
  width: 100%;
}
</style>

<template>

<div class="home">
    <!-- <div class="vue-logo-back">
        <img src="../assets/logo.png" width="100px" height="100px">
    </div> -->
    <div class="page-header">

    </div>
    <div class="col-md-8 centeralign">
      <mdb-container>
          <mdb-row class="mt-12">
            <mdb-card class="text-center fullbody">
              <mdb-card-header>
                <mdb-tab default class="card-header-tabs">
                  <mdb-tab-item :active="active==0" @click.native.prevent="active=0">Introduction</mdb-tab-item>
                  <mdb-tab-item :active="active==1" @click.native.prevent="active=1">Hashing</mdb-tab-item>
                  <mdb-tab-item :active="active==1" @click.native.prevent="active=0">Symmetric Key Cryptography</mdb-tab-item>
                  <mdb-tab-item :active="active==1" @click.native.prevent="active=1">Asymmetric Key Cryptography</mdb-tab-item>
                </mdb-tab>
              </mdb-card-header>
              <mdb-card-body>
                <mdb-tab-content>
                  <mdb-tab-pane class="fade" key="show1" v-if="active==0">
                    <mdb-card-title>Special title treatment</mdb-card-title>
                    <mdb-card-text>With supporting text below as a natural lead-in to additional content.</mdb-card-text>
                    <mdb-btn color="primary">go somewhere</mdb-btn>
                  </mdb-tab-pane>
                  <mdb-tab-pane class="fade" key="show2" v-if="active==1">
                    <mdb-card-title>Special title treatment</mdb-card-title>
                    <mdb-card-text>With supporting text below as a natural lead-in to additional content.</mdb-card-text>
                    <mdb-btn color="primary">go somewhere</mdb-btn>
                  </mdb-tab-pane>
                  <mdb-tab-pane class="fade" key="show3" v-if="active==2">
                    <mdb-card-title>Special title treatment</mdb-card-title>
                    <mdb-card-text>With supporting text below as a natural lead-in to additional content.</mdb-card-text>
                    <mdb-btn color="primary">go somewhere</mdb-btn>
                  </mdb-tab-pane>
                </mdb-tab-content>
              </mdb-card-body>
            </mdb-card>
          </mdb-row>
        </mdb-container>

        <!-- <div class="card centeralign addmargin" style="width: 18rem;" v-for="customer in customerlist" :key="customer.id">
            <div class="card-body" v-on:click="setSelectedCustomer(customer.name)">
                <h5 class="card-title">{{customer.name}}</h5>
                <p class="card-text">{{customer.email}}</p>
                <p class="card-text">{{customer.phone}}</p>

                <a class="btn btn-primary" v-on:click="goToDetailsPage(customer.id)"><span style="color:white">Click for more details</span></a>
            </div>
        </div> -->
    </div>
    <Display v-if="selectedCustomer!=''" :selectedCustomer="selectedCustomer" />
</div>

</template>

<script>

// @ is an alias to /src
// import Display from '@/components/Display.vue'
// import axios from 'axios'
import { mdbContainer,  mdbRow, mdbCol, mdbBtn, mdbCard, mdbCardTitle, mdbCardText, mdbCardFooter, mdbCardBody, mdbCardHeader, mdbListGroup, mdbListGroupItem, mdbNavItem, mdbCardGroup, mdbIcon, mdbFooter, mdbTab, mdbTabItem, mdbTabContent, mdbTabPane } from 'mdbvue';

  export default {
    name: 'PanelPage',
    components: {
      mdbContainer,
      mdbRow,
      mdbCol,
      mdbBtn,
      mdbCard,
      mdbCardTitle,
      mdbCardText,
      mdbCardFooter,
      mdbCardBody,
      mdbCardHeader,
      mdbListGroup,
      mdbListGroupItem,
      mdbNavItem,
      mdbCardGroup,
      mdbIcon,
      mdbFooter,
      mdbTab,
      mdbTabItem,
      mdbTabContent,
      mdbTabPane
    },
    data(){
      return {
        active: 0
      };
    }
  }

// export default {
//     name: 'customers',
//     mounted() {
//         axios({
//             method: "GET",
//             "url": "assets/samplejson/customerlist.json"
//         }).then(response => {
//             this.customerlist = response.data;
//         }, error => {
//             // eslint-disable-next-line
//             console.error(error);
//         });
//     },
//     data() {
//         return {
//             customerlist: [],
//             selectedCustomer: ""
//         }
//     },
//     components: {
//         Display
//     },
//     methods: {
//         setSelectedCustomer: function(name) {
//             this.selectedCustomer = name;
//         },
//         goToDetailsPage: function(id) {
//             this.$router.push("/customerdetails/"+id);
//         }
//     }
// }

</script>
