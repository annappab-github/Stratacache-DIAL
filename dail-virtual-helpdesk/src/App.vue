<template>
  <div id="appMain">
    <div v-if="isVideoCallOn" id="videocall-container">
      <img src="./assets/Disconnect.png" alt="" @click="disconnect('user')">
      <h5 @click="disconnect('user')">DISCONNECT</h5>
    </div>
    <video-call v-if="isVideoCallOn" @disconnect="disconnect" ref="videoCallVue"/>
    <Navbar :title="$route.name" />
    <router-view @activateVideoCall="activateVideoCall" ></router-view>
    <div class="t-model" id="t-model">
      <div class="timeout-notification">
        <div class="timer-container">
          <p class="timer-time">
            {{redirectInSec}}
            </p>
          <p class="timer-sec-text">
            {{redirectInSec < 2 ? 'SECOND':'SECONDS'}}
          </p>
        </div>
        <div class="t-body">
          <p class="t-title" id="t-time">
            {{timeout}}
          </p>
          <p class="t-disc">
            {{wantToContinue}}
          </p>
          <div class="t-btns d-flex justify-content-center">
            <button class="t-btn t-btn-stay" @click="stayOnPage(true)" >{{yes}}</button>
            <!-- <button class="t-btn t-btn-home" @click="stayOnPage(false)" >{{no}}</button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="call-initiated-message" id="call-initiated-message">
      <h1>Call initiated</h1>
    </div>
    <talktous-feedback id="talktous-feedback" @close-feedback-page="closeFeedbackPage" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import VideoCall from './components/VideoCall.vue';
import TalktousFeedback from './components/TalktousFeedback.vue'
import { computed } from 'vue'
import Constants from '@/utils/Constants'
import ConstLangText from '@/utils/Language'
const ConstText = ConstLangText.readConstValues();

const redirectNotInSec = 15;
var time_tracker = new Date(), timeOutInMinForAllPages = Constants.timeOutInMinForAllPages(), timeOutInMinForTalktoUs = Constants.timeOutInMinForTalktoUs();
export default {
  name: 'App',
  components: {
    Navbar,
    VideoCall,
    TalktousFeedback
  },
  provide() {
    return {
      // explicitly provide a computed property
      isVideoCallActive: computed(() => this.isVideoCallOn)
    }
  },
  data() {
    return {
      showTimeOutNotification: false,
      redirectInSec: 10,
      wantToContinue: ConstText.wantToContinue,
      timeout: ConstText.timeout,
      yes: ConstText.yes,
      no: ConstText.no,
      tempLanguage: '',
      isVideoCallOn: false,
      feedbackPopUp: false 
    }
  },
  mounted() {
    try {
      window.oncontextmenu = function () {
        return false;
      }
    } catch (error) {
    }

    var modal = document.getElementById("t-model");
    let showTimeOutNotification = false

    const mainPage = document.getElementById("appMain");
    mainPage.addEventListener("pointerdown", myPointerDown, false);
    mainPage.addEventListener("pointerup", myPointerUp, false);

    let actionNoticed = false
    function myPointerDown (evt) {
      if (!showTimeOutNotification) {
        time_tracker = new Date()
        actionNoticed = true
      }
    }
    function myPointerUp (evt) {
      if (!showTimeOutNotification) {
        time_tracker = new Date()
        actionNoticed = true
      }
    }

    function getTimeDifferenceInSeconds() {
      return ((new Date().getTime()) - (new Date(time_tracker).getTime())) / (1000)
    }
    let timeDiffInSecOld = 0
    setInterval(() =>{
      if (this.$route.name != '' || this.feedbackPopUp || this.isVideoCallOn) {
        let timeDiffInSec = Math.round(getTimeDifferenceInSeconds())
        // console.log(timeDiffInSec);
        if (actionNoticed) {
          actionNoticed = false
          this.showTimeOutNotification = false
        } else if(!this.showTimeOutNotification){
          let differenceInMin = (timeDiffInSec/60)
          // let timeOutInMin = (this.$route.name == 'talktous'? timeOutInMinForTalktoUs: timeOutInMinForAllPages)
          let timeOutInMin = (this.isVideoCallOn ? timeOutInMinForTalktoUs: timeOutInMinForAllPages)
          if (timeOutInMin <= differenceInMin) {            
            modal.style.display = "block";
            this.showTimeOutNotification = true
            this.redirectInSec = redirectNotInSec
          }
        }
        if (this.showTimeOutNotification) {
          if(timeDiffInSecOld != timeDiffInSec && this.redirectInSec >= 0) {
            timeDiffInSecOld = timeDiffInSec
            --this.redirectInSec
          } else if(this.redirectInSec <= 0) {
            this.setTimeoutValues()
            this.gotoHomePage()
          }
        }
        showTimeOutNotification = this.showTimeOutNotification
      } else {
        this.setTimeoutValues()
      }
    }, 250)

    window.onclick = function(event) {
      if (event.target == modal) {
        // modal.style.display = "none";
      }
    }


    this.tempLanguage = ''
    try {
      let selected_language = localStorage.getItem("language")
      if (selected_language == null || selected_language == undefined){
        this.tempLanguage = "en"
      } else if (selected_language == 'hn'){
        this.tempLanguage = "hn"
      } else{
        this.tempLanguage = "en"
      }
    } catch (error) {

    }
    if(this.tempLanguage =='hn'){
      $(`#t-time`).addClass("t-title1");
    }
  },
  methods: {
    activateVideoCall() {
      if(!this.isVideoCallOn) {
        $("#call-initiated-message").fadeIn('slow', () => {
          this.isVideoCallOn = true
        });
        setTimeout(()=> {
          $('#call-initiated-message').fadeOut('slow');
        }, 4000);
        try {
          window.ScalaSetVariable("Channel.videocallDefaultPage", false);
        } catch (error) {}
      }
    },
    async disconnect(type) {
      if(this.isVideoCallOn) {
        if (type == 'user') {
          let res = this.$refs.videoCallVue.cleanUpCall();
          if (res) {
            this.removeVideocallEnablePlaylist();
          }
        } else {
          this.removeVideocallEnablePlaylist();
        }        
      }
    },
    removeVideocallEnablePlaylist() {
      this.isVideoCallOn = false
      setTimeout(() => {
        $("#talktous-feedback").fadeIn('slow');
        this.feedbackPopUp = true;
        // this.$router.push("/talktousfeed");
      }, 200);
      try {
        window.ScalaSetVariable("Channel.videocallDefaultPage", true);
      } catch (error) {}
    },
    closeFeedbackPage() {
       $("#talktous-feedback").fadeOut('slow')
       this.feedbackPopUp = false;
    },
    stayOnPage(res) {
      this.setTimeoutValues()
      if (!res) {
        this.gotoHomePage()
      }
    },
    setTimeoutValues() {
      var modal = document.getElementById("t-model");
      modal.style.display = "none";
      this.showTimeOutNotification = false
      time_tracker = new Date()
      this.redirectInSec = redirectNotInSec
    },
    gotoHomePage() {
      this.isVideoCallOn = false;
      this.closeFeedbackPage();
      try {
        window.ScalaSetVariable("Channel.videocallDefaultPage", true);
      } catch (error) {}
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: "Cervino-BoldNeue";
  src: local("Cervino-BoldNeue"),
   url(./fonts/Cervino/Cervino-BoldNeue.ttf) format("truetype");
}
@font-face {
  font-family: "Cervino-BlackNeue";
  src: local("Cervino-BlackNeue"),
   url(./fonts/Cervino/Cervino-BlackNeue.ttf) format("truetype");
}
@font-face {
  font-family: "Cervino-RegularNeue";
  src: local("Cervino-RegularNeue"),
   url(./fonts/Cervino/Cervino-RegularNeue.ttf) format("truetype");
}
@font-face {
  font-family: "Amplitude-Regular";
  src: local("Amplitude-Regular"),
   url(./fonts/Amplitude/Amplitude-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Amplitude-Bold";
  src: local("Amplitude-Bold"),
   url(./fonts/Amplitude/Amplitude-Bold.ttf) format("truetype");
}
@font-face {
  font-family: "Cervino-ExtraBoldNeue";
  src: local("Cervino-ExtraBoldNeue"),
   url(./fonts/Cervino/Cervino-ExtraBoldNeue.ttf) format("truetype");
}
@font-face {
  font-family: "Cervino-LightNeue";
  src: local("Cervino-LightNeue"),
   url(./fonts/Cervino/Cervino-LightNeue.ttf) format("truetype");
}
@font-face {
  font-family: "Montserrat-Medium";
  src: local("Montserrat-Medium"),
   url(./fonts/Montserrat/Montserrat-Medium.ttf) format("truetype");
}
.explore{
  position: relative;
  height: 910px;
}
.explore-inner{
  position: absolute;
  top: 0px;
}
body{
  padding: 0px;
  margin: 0px;
  /* width: 1920px; */
  width: 3840px;
}
#app, #appMain {
  padding: 0;
  margin: 0px;
  width: 3840px;
  /* width: 1920px; */
  height: 1080px;
  /* height: 2160px; */
  font-weight: bold;
  background: transparent;
}
#talktous-feedback {
  display: none;
}
.call-initiated-message {
  display: none;
  position: fixed; /* Stay in place */
  z-index: 102; /* Sit on top */
  left: 660px;
  top: 0px;
  width: 600px; /* Full width */
  height: 110px; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(32, 119, 44); /* Black w/ opacity */
  border: 4px solid rgb(235, 235, 235);
  border-radius: 20px;
}
.call-initiated-message h1 {
  color: #fff;
  font-size: 50px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 1px;
  text-align: center;
  margin-top: 20px;
}
.t-model {
  /* display: none; Hidden by default */
  display: none;
  position: fixed; /* Stay in place */
  z-index: 101; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 1920px; /* Full width */
  height: 1080px; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.timeout-notification {
  position: absolute;
  top: 420px;
  left: 517px;
  width: 887px;
  height: 323px;
  background-color: rgb(230, 230, 230);
  border: 1px solid rgb(175, 173, 173);
  border-radius: 8px;
  box-shadow: rgba(97, 97, 97, 0.35) 0px 5px 15px;
}
.timer-container {
  width: 240px;
  height: 240px;
  background-color: rgb(31, 30, 30);
  position: absolute;
  border-radius: 50%;
  top: -190px;
  left: 323px;
  box-shadow: 0px 3px 20px #AAFFF4;
  border: 0.1em solid #AAFFF4;
}
.timer-time {
  color: #AAFFF4;
  font-size: 150px;
  font-family: 'Cervino-BoldNeue';
  text-align: center;
  line-height: 130px;
  margin-top: 30px;
  letter-spacing: 3px;
  text-shadow: 0px 2px 5px #AAFFF4;
}
.timer-sec-text {
  color: #D2FDAD;
  font-size: 26px;
  font-family: 'Cervino-RegularNeue';
  text-align: center;
  letter-spacing: 1.5px;
}
.t-title {
  margin: 75px 0 20px;
  font-size: 32px;
  text-align: center;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 1px;
}
.t-title1{
  margin: 75px 0 20px;
  font-size: 36px;
  text-align: center;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 1px;
  font-weight: bolder;
}
.t-disc {
  font-family: 'Cervino-RegularNeue';
  font-size: 32px;
  text-align: center;
}
.t-btns {
  margin-top: 30px;
}
.t-btn {
  outline: none;
  margin: 0;
  text-decoration: none;
  background-image: url('./assets/submit.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: #ffffff;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 1px;
  font-size: 25px;
  border: none;
  /* border: 1px solid #4bb1d3; */
  border-radius: 10px;  
  box-shadow: 0px 4px 10px rgba(0, 153, 204, 0.3);
  width: 135px;
  height: 47px;
}
.t-btn-stay {
  margin-right:30px;
}

#videocall-container {
  position: absolute;
  left: 760px;
  z-index: 101;
  color: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 10px 0 5px 0;
  background: rgba(90, 89, 89, 0.4);
  border-radius: 0 0 10px 10px;
}
#videocall-container img {
  width: 52px;
  height: 52px;
}

</style>