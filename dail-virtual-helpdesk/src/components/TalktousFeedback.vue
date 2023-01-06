<template>
<div class="explore">
  <div class="bgimg">
    <div class="explore-inner">
          <div class="rating-Text text-center text-white" v-if="feedback">
            <label>{{rateUs}}</label>
          </div>
            <div class="" v-if="feedback">
              <div class="text-center header-stars">
                <img  id="m_id1" value="1" @click="updateMainReview(1)" :src="require(`../assets/greystar.png`)" alt="">
                <img  id="m_id2" value="2" @click="updateMainReview(2)" :src="require(`../assets/greystar.png`)" alt="">
                <img  id="m_id3" value="3" @click="updateMainReview(3)" :src="require(`../assets/greystar.png`)" alt="">
                <img  id="m_id4" value="4" @click="updateMainReview(4)" :src="require(`../assets/greystar.png`)" alt="">
                <img  id="m_id5" value="5" @click="updateMainReview(5)" :src="require(`../assets/greystar.png`)" alt="">
              </div>
            </div>
            <div class="text-center" v-if="submitMsg"> 
              <img class="feedThank" :src="require('../assets/feedbackthanks.png')" >
              <label class="success-msg ">{{thankYou}}</label>
            </div>
            <div class="submitBtn"  v-if="feedback">
              <div  id="btn-submit"  class="submitText" :src="require(`../assets/${btnimage}`)" alt="" @click="submitFeedback">{{submitBtn}}</div>
              <button @click="cancelFeedback" type="" value="">{{quitBtn}}</button>
            </div>
              
          <!--  <div :class="{'direction-scan': isAddClass}" v-if="feedback">
                <label class="scanText">{{scanForOffer}}</label>
                <img class="imgs"  :src="require('../assets/Scanthedirection.png')" >
                <img class="barcode" @click="this.$router.push('/scan')" :src="require('../assets/mobilepass.png')" >
              </div>-->
      </div>
  </div>
</div>
</template>


<script>
import formSubmit from '@/utils/formSubmit.js'
import ConstLangText from '@/utils/Language'
const ConstText = ConstLangText.readConstValues();

export default {
  data() {
    return{
      btnimage: 'submit.png',
      submitEnable: false,
      submitMsg: false,
      feedback: true,
      rateUs: ConstText.rateUs,
      thankYou: ConstText.thankYou,
      quitBtn: ConstText.quitBtn,
      scanForOffer: ConstText.scanForOffer,
      submitBtn: ConstText.submitBtn,
      isAddClass: true,
      rating: {
        formName: "ratingForm",
        ratingStar: ""
      }
    }
  },
  methods: {
    updateMainReview(icNo) {
      this.greyoutAllStars();
      for(let i = icNo; i > 0; i--) {
        let sr = document.getElementById(`m_id${i}`)
        sr.src = require(`../assets/goldstar.png`)
      }
      this.isAddClass = false;  
      this.btnimage = 'submit.png'
      this.submitEnable = true
      this.rating.ratingStar = JSON.stringify(icNo)
    },
    greyoutAllStars() {
      for(let j = 5; j > 0; j--) {
        let sr = document.getElementById(`m_id${j}`)
        sr.src = require(`../assets/greystar.png`)
      }
    },
    cancelFeedback() {
      this.greyoutAllStars();
      this.submitEnable = false
      this.$emit("closeFeedbackPage");
    },
    submitFeedback(){
      if(this.submitEnable) {
        this.greyoutAllStars();
        this.submitMsg = true
        this.submitEnable = false
        this.feedback = false
        // console.log('rating', this.rating.ratingStar )
        setTimeout(() => {
          setTimeout(() => {
            this.feedback = true
            this.submitMsg = false
            this.rating.ratingStar = ""
          }, 500);
          // this.$router.push('/')
          this.$emit("closeFeedbackPage");
        }, 1000 * 3)
        formSubmit.submitForm(this.rating)
      }
    }
  }
};
</script>

<style scoped>

.feedThank{
  width: 213px;
  height: 213px;
  position: absolute;
  margin-top: 60px;
  left: 50%;
  transform: translate(-50%, 0);
}
.explore{
  position: absolute;
  z-index: 99;
  top: -25px !important;
  height: 970px !important;
  background-color: rgba(0, 0, 0, 0.4);
}

.bgimg{
  background-image: url('../assets/Background.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: absolute;
  left: 460px;
  top: 150px;
  height: 500px;
  width: 1000px;
  border-radius: 20px;
  border: 2px solid rgb(11, 146, 155);
}
.rating-Text{
  font-size: 40px;
  margin-top: 50px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 2.75px;
}
.header-stars{
  font-size: 40px;
  margin-top: 60px;
  margin-left: -50px;
  color: #717171;
}
.header-stars img {
   margin-left: 56px;
}

.submitBtn {
  background-image: url('../assets/submit.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  width: 135px;
  height: 47px;
  border-radius: 8px;
  margin-left: 350px;
  top: 400px;
  cursor: pointer;
}
.submitText{
  font-family: 'Cervino-RegularNeue';
  letter-spacing: 0.75px;
  position: absolute;
  font-size: 25px;
  color: #fff;
  padding: 5px 0px 0px 36px;
}
.direction-scan{
  filter: blur(2px);
}

 button{
  font-size: 25px;
  left: 150px;
  position: absolute;
  width: 135px;
  height: 47px;
  background-image: url('../assets/quit.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  border-radius: 10px;
  color: #fff;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0px;
  cursor: pointer;
}
.scanText {
  position: absolute;
  margin-top: 376px;
  left: 1420px;
  width: 200px;
  color: #fff;
  font-family: 'Amplitude-Regular';
  letter-spacing: 0px;
  font-size: 26px;
}
.imgs{
  margin-top: 310px;
  position: absolute;
  width: 200px; 
  height: 180px;
  left: 1580px;
}
.barcode{
  margin-top: 340px;
  position: absolute;
  width: 150px; 
  height: 140px;
  left: 1700px;
}
.success-msg {
  font-size: 50px;
  color: #fff;
  position: absolute;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 2.75px;
  margin-top: 320px;
  left: 16%;
  /* transform: translate(-50%, 0); */
}
</style>