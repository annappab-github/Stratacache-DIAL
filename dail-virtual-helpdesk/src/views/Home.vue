<template>
<div class="explore">
  <div class="bgimg">
    <div class="explore-inner">
      <div class="row m-0">
        <div class=" p-0">
          <VirtualDesk @activateVideoCall="$emit('activateVideoCall')"/>
        </div>
        <!-- <div class="airportImg p-0">
          <img src="../assets/image.png" alt="icons">
        </div> -->
        <div class="languageBtn text-white text-center py-1 btns ml-5">
          <div  @click="changeLanguagePromptIfVideoCallActive"  src="../assets/submit.png" alt="">{{btn}}</div>
        </div>
        <div>
          <label v-if = "this.tempLanguage == 'en'" class="languageText"> {{this.langText}} </label>
          <label v-if = "this.tempLanguage == 'hn'" class="languageText1" > {{this.langText}} </label>
        </div>
      </div>
    </div> 
  </div>
</div>
<div class="tu-model" id="tu-model">
    <div class="timeout-notification">
      <div class="t-body">
        <p class="t-title" id="t-time">
          {{ confirmMessage }}
        </p>
        <p class="tu-disc">
          {{ wantToContinue }}
        </p>
        <div class="t-btns d-flex justify-content-center">
          <button class="t-btn t-btn-stay" @click="changeLanguage">
            {{ yes }}
          </button>
          <button class="t-btn t-btn-home" @click="continueVideoCall">
            {{ no }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VirtualDesk from '../components/VirtualDesk'
// import Language from "@/utils/Language"
import ConstLangText from '@/utils/Language'
import PlaylistScalaVariables from '@/utils/PlaylistScalaVariables'
const ConstText = ConstLangText.readConstValues();
import Constants from '@/utils/Constants.js'
// const json = Language.readJson()

export default {
  name: 'Body',
  components: {
    VirtualDesk
  },
  inject: ['isVideoCallActive'],
  data () {
    return {
      selected_language: '' ,
      tempLanguage: '',
      btn: ConstText.langBtn,
      langText: ConstText.langText,
      wantToContinue: ConstText.wantToContinue,
      confirmMessage: ConstText.talkToUsPageLeaveMessage,
      yes: ConstText.yes,
      no: ConstText.no,
      checkVideoCall: this.isVideoCallActive
    }
  },
  mounted() {
    Constants.isScanQr = false
    this.selected_language = localStorage.getItem("language")
    PlaylistScalaVariables.homeSetScalaVariables();
    // console.log('selected_language', this.selected_language)
    
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
  },
  methods: {
    changeLanguagePromptIfVideoCallActive() {
      if(this.checkVideoCall) {
        $('#tu-model').fadeIn('slow');
      } else {
        this.changeLanguage();
      }
    },
    continueVideoCall() {
      $('#tu-model').fadeOut('slow');
    },
    changeLanguage() {
      let selected_language = localStorage.getItem("language")
      try {
        window.ScalaSetVariable("Channel.videocallDefaultPage", true);
      } catch (error) {}
      let val = (selected_language == null ? 'hn': selected_language != 'hn' ? 'hn' : 'en')
      if (val == 'hn' && selected_language != 'hn') {
        localStorage.setItem("language", val);
        location.reload()
      } else if((selected_language != null || selected_language != undefined) && selected_language != 'en' && val == 'en') {
        localStorage.setItem("language", val);
        location.reload()
      }
    }
  }
}
  </script>

<style scoped>
.languageText {
  color: #fff;
  position: absolute;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0px;
  text-align: center;
  font-size: 28px;
  top: 866px;
  left: 367px;
}
.languageText1{
    color: #fff;
  position: absolute;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0px;
  text-align: center;
  font-size: 28px;
  top: 866px;
  left: 440px;
}
.bgimg{
  background-image: url('../assets/Background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 1080px;
  bottom: 0px;
  /* width: 1920px; */
  width: 1073px;
  position: absolute;
}

.row{
  width: 1920px;
}
.col{
  height: 910px;
}
.title{
  height: 50px;
}
.explore{
  position: absolute;
  height: 945px;
}
.explore-inner{
  position: absolute;
  top: 136px;
  height: 944px;
  width: 1920px;
}

.airportImg img{
  position: absolute;
  top: -30px;
  width: 847px;
  height: 975px;
  left: 1073px;
}
.languageBtn{
  background-image: url('../assets/submit.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  border-radius: 10px;
  font-size: 25px;
  top: 864px;
  left: 550px;
  width: 135px;
  height: 47px;
  cursor: pointer;
}

/* Prompt Notification */
.tu-model {
  display: none;
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  left: 0;
  top: 0;
  width: 1920px; /* Full width */
  height: 1080px; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.timeout-notification {
  position: absolute;
  top: 378px;
  left: 517px;
  width: 887px;
  height: 323px;
  background-color: rgb(230, 230, 230);
  border: 1px solid rgb(175, 173, 173);
  border-radius: 8px;
  box-shadow: rgba(97, 97, 97, 0.35) 0px 5px 15px;
}
.t-title {
  margin: 50px 0 20px;
  font-size: 32px;
  text-align: center;
  font-family: "Cervino-BoldNeue";
  letter-spacing: 1px;
}
.t-title1 {
  margin: 75px 0 20px;
  font-size: 36px;
  text-align: center;
  font-family: "Cervino-BoldNeue";
  letter-spacing: 1px;
  font-weight: bolder;
}
.tu-disc {
  font-family: "Cervino-RegularNeue";
  font-size: 32px;
  text-align: center;
}
.t-btns {
  margin-top: 40px;
}
.t-btn {
  outline: none;
  margin: 0;
  text-decoration: none;
  background-image: url("../assets/submit.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: #ffffff;
  font-family: "Cervino-BoldNeue";
  letter-spacing: 1px;
  font-size: 25px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 153, 204, 0.3);
  width: 135px;
  height: 47px;
}
.t-btn-stay {
  margin-right: 30px;
}

.quitBtn button {
  font-size: 25px;
  outline: none;
  text-decoration: none;
  margin-top: 30px;
  width: 135px;
  height: 47px;
  background-image: url("../assets/quit.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  color: #fff;
  font-family: "Cervino-BoldNeue";
  letter-spacing: 0px;
  cursor: pointer;
}
</style>
