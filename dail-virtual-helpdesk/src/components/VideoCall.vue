<template>
  <div class="main-container">
    <iframe v-if="trigger_video_call" id="myIframe" :src="url" allow="camera;microphone" height="1080" width="1920" ></iframe>
  </div>
</template>

<script>
import $ from 'jquery';
import Constants from '../utils/Constants';
import axios, { Axios } from "axios";

export default {
  name: 'VideoCall',
  data() {
    return {
      url: Constants.getVideoCallUrl(),
      trigger_video_call: true,
      reloadcnt: 0,
      callDetails: {
        socketID: "",
        userType: "",
        userName: "delhi-test",
        // kioskID:'1'
        // roomId: "",
      }
    }
  },
  watch: {
    reloadcnt(newval, oldval) {
      if(newval >= 2) {
        this.trigger_video_call = false;
        this.reloadcnt = 0;
        this.$emit("disconnect", 'operator');
        try {
          window.ScalaSetVariable("Channel.videocallDefaultPage", true); 
          window.ScalaSetVariable("Channel.activateVideoCall", false);
        } catch (error) {}
      }
    }
  },
  mounted() {
    // console.log("Video Call URL =====>", Constants.getVideoCallUrl());
    let _this = this;
    $("#myIframe").on("load", function () {
      _this.reloadcnt ++;
    });
  },
  methods: {
    async cleanUpCall() {
      let apiCallURL = this.url.split(":3000")[0];
      // console.log('url', apiCallURL);
      await axios(apiCallURL+":5000/getusercalldetails", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }).then((response) => {
        // console.log(response.data);
        let data = response.data;
        // console.log(data.id);
        let sortedData = data.sort(function (a, b) {
          return b.id - a.id;
        });

        let index = 1;
        this.userDetails = sortedData[index];
        this.callDetails.socketID = this.userDetails.socketid;
        this.callDetails.userType = this.userDetails.usertype;
      });
      await axios.post(apiCallURL+":5000/usercleanup", this.callDetails);
      return 1;       
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main-container {
    position: absolute;
    /* top: 1080px; */
    left: 1920px;
    width: 1920px;
    height: 1080px;
    z-index: 101;
    background-image: url('../assets/Background.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
