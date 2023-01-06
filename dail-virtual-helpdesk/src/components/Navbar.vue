<template>
<!-- Just an image -->

<div class="col-md-12 pl-0 pr-0 nav">
  <nav class="navbar p-0" id="navigation"  role="navigation">
      <div class="navbar-brand mx-5">
          <img src="../assets/airportlogo.png" width="546" height="102" alt="airport logo">
      </div>
      <div class="" v-if="tempLanguage=='en'">
        <div class="titleName"  v-if="title!='boardinginfo' && title!='talktous' && title !='SearchPage' && title!='talktousfeed'">{{title}}</div>
        <div class="titleName" v-if="title=='talktous'">TALK TO US</div>
        <div class="titleName" v-if="title=='talktousfeed'">TALK TO US</div>
        <div class="titleName" v-if="title=='boardinginfo'">BOARDING INFORMATION</div>
       </div>
      <div class="" v-if="tempLanguage=='hn'">
            <div class="titleName"  v-if="title!='boardinginfo' && this.$route.path == '/scanboardingpass'">बोर्डिंग सूचना</div>
            <div class="titleName"  v-if= "this.$route.path == '/scan'">क्यूआर स्कैन करें</div>
            <div class="titleName"  v-if= "this.$route.path == '/feedback'">प्रतिक्रिया</div>
            <div class="titleName"  v-if= "this.$route.path == '/sos'">आपातकालीन सहायता</div>
            <div class="titleName"  v-if= "this.$route.path == '/ServiceDesk'">ग्राहक देखभाल</div>
            <div class="titleName"  v-if= "this.$route.path == '/explore'">हवाई अड्डे का अन्वेषण करें</div>
            <div class="titleName" v-if="title=='talktous'">ग्राहक देखभाल</div>
            <div class="titleName" v-if="title=='talktousfeed'">ग्राहक देखभाल</div>
            <div class="titleName" v-if="title=='boardinginfo'">बोर्डिंग सूचना</div>
       </div>
      <div class="d-flex mr-4 align-items-center">
          <Weather class="weather pl-2 pt-2"/>
          <div class="vr"></div>
          <Time  class="text-white px-3"/>
    </div>
  </nav>
</div>
</template>

<script>
import Weather from '../components/Weather.vue'
import Time from '../components/Time.vue'
import ConstLangText from '@/utils/Language'
const ConstText = ConstLangText.readConstValues();

export default {
  name: 'Navbar',
  components: {
    Weather,
    Time
  },
  data(){
    return{
      tempLanguage: '',
      btn1: ConstText.homeBtnText1,
      btn2: ConstText.homeBtnText2,
      btn3: ConstText.homeBtnText3,
      btn4: ConstText.homeBtnText4,
      btn5: ConstText.homeBtnText5,
      btn6: ConstText.homeBtnText6,
    }
  },
  mounted() {
    
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
      //  console.log('tempLanguage', this.tempLanguage)
  },
  props: ['title']
}
</script>

<style scoped>
.weather {
 pointer-events:none;
 cursor: default; 
}
.vr{
 border-left: solid 3px #fff;
 height: 75px;
 padding-right: 10px;
}

#navigation, .navbar .navbar-default{
background-image: url('../assets/header.png');
background-position: center;
background-repeat: no-repeat;
background-size: cover;
height: 136px;
width: 1920px;
}
.nav{
  z-index: 100;
}
.titleName{
  color: #fff;
  font-size: 48px;
  position: absolute;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0px;
  left: 50%;
  transform: translate(-50%);
  top: 24px;
}
</style>
