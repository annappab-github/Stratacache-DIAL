<template>
  <div class="explore">
    <div class="bgimg">
        <div class="explore-inner">
          <div class="row">
              <div class="feedqtn">
                  <div v-for="(qns, index) in feedbackquestion" :key="index">
                    <FeedbackQuestion :question="qns" :name="index" :feedbackReplay="feedbackReplay" @click="hideKeyBoard"/>
                  </div>
                 
              </div>
              <div class="col-4  text-center quitBtn">
              <button class="" @click="this.$router.push('/')" type="" value="">{{quitBtn}}</button>
            </div>
          </div>
      </div>
      <div class="">
            <FeedbackForm :showKeyBord="showKeyBordFunc" :submitFormData="formData" @popup= "popup($event)"/>
            
      </div>
      <div class="keyboard">
      <SimpleKeyboard v-if="showKeyboard" @onChange="onChange" @onKeyPress="onKeyPress" @onInputChange="onInputChange" :input="input" :hideKeyBoard="hideKeyBoard" :isNumeric="isNumeric" :inputVal="inputVal"/>
      <!--<NumericKeyBoard v-if="showNumKeyBoard" @onChange="onChange" @onKeyPress="onKeyPress" :input="input" :hideKeyBoard="hideKeyBoard"/> -->
      </div>
    </div>
  </div>
</template>

<script>
import FeedbackForm from '../components/Feedback/FeedbackForm.vue'
import FeedbackQuestion from '../components/Feedback/FeedbackQuestion.vue'
import SimpleKeyboard from '../components/SimpleKeyboard.vue'
import NumericKeyBoard from '../components/NumericKeyBoard.vue'
import $ from 'jquery'
import formSubmit from '@/utils/formSubmit.js'
import ConstLangText from '@/utils/Language'
const ConstText = ConstLangText.readConstValues();
import Constants from '../utils/Constants'
import ConstData from '@/utils/Constants';

export default {
  name: 'Home',
  props: [],
  components: {
    FeedbackForm,
    FeedbackQuestion,
    SimpleKeyboard,
    NumericKeyBoard
  },
  mounted() {
    ConstData.isScanQr = false
    Constants.hideCrossBar = false

  },
  data () {
    return {
      isNumeric: false,
      showKeyboard: false,
      showNumKeyBoard: false,
      input: '',
      inputid: '',
      isPopup: '',
      quitBtn: ConstText.quitBtn,
      inputVal: '',
      feedbackquestion: [
        {
          qtn: ConstText.feedbackqtn1,
          Abrre: ConstText.Abrre1,
          opts: [{storeValue: "VERY SATISFIED", diplayText: ConstText.opts1}, {storeValue: "SATISFIED", diplayText: ConstText.opts2}, {storeValue: "NEUTRAL", diplayText: ConstText.opts3}, {storeValue: "NOT SATISFIED", diplayText: ConstText.opts4}],
        },
        {
          qtn: ConstText.feedbackqtn2,
          Abrre: ConstText.Abrre2,
          opts: [{storeValue: "VERY SATISFIED", diplayText: ConstText.opts1}, {storeValue: "SATISFIED", diplayText: ConstText.opts2}, {storeValue: "NEUTRAL", diplayText: ConstText.opts3}, {storeValue: "NOT SATISFIED", diplayText: ConstText.opts4}],
        },
        {
          qtn: ConstText.feedbackqtn3,
          Abrre: ConstText.Abrre3,
         opts: [{storeValue: "VERY SATISFIED", diplayText: ConstText.opts1}, {storeValue: "SATISFIED", diplayText: ConstText.opts2}, {storeValue: "NEUTRAL", diplayText: ConstText.opts3}, {storeValue: "NOT SATISFIED", diplayText: ConstText.opts4}],
        },
        {
          qtn:ConstText.feedbackqtn4,
          Abrre: ConstText.Abrre4,
         opts: [{storeValue: "VERY SATISFIED", diplayText: ConstText.opts1}, {storeValue: "SATISFIED", diplayText: ConstText.opts2}, {storeValue: "NEUTRAL", diplayText: ConstText.opts3}, {storeValue: "NOT SATISFIED", diplayText: ConstText.opts4}],
        },
        {
          qtn: ConstText.feedbackqtn5,
          Abrre: ConstText.Abrre5,
         opts: [{storeValue: "VERY SATISFIED", diplayText: ConstText.opts1}, {storeValue: "SATISFIED", diplayText: ConstText.opts2}, {storeValue: "NEUTRAL", diplayText: ConstText.opts3}, {storeValue: "NOT SATISFIED", diplayText: ConstText.opts4}],
        },
        {
          qtn: ConstText.feedbackqtn6,
          Abrre: ConstText.Abrre6,
         opts: [{storeValue: "VERY SATISFIED", diplayText: ConstText.opts1}, {storeValue: "SATISFIED", diplayText: ConstText.opts2}, {storeValue: "NEUTRAL", diplayText: ConstText.opts3}, {storeValue: "NOT SATISFIED", diplayText: ConstText.opts4}],
        },
        {
          qtn: ConstText.feedbackqtn7,
          Abrre: ConstText.Abrre7,
         opts: [{storeValue: "VERY SATISFIED", diplayText: ConstText.opts1}, {storeValue: "SATISFIED", diplayText: ConstText.opts2}, {storeValue: "NEUTRAL", diplayText: ConstText.opts3}, {storeValue: "NOT SATISFIED", diplayText: ConstText.opts4}],
        }

      ],
      sendFeedbackAns: {userInfo: [], feedback: []}
    }
  },
 
  methods: {
    popup(val){
      this.isPopup = val
    },
    formData(data) {
      // this.sendFeedbackAns.userInfo[0] = data
      this.sendFeedbackAns.userInfo[0] = data
      formSubmit.submitForm(this.sendFeedbackAns)
   
    },
    feedbackReplay(data) {
      if(this.sendFeedbackAns.feedback.length > 0) {
        let flag = false
        for(var i in this.sendFeedbackAns.feedback) {
          if(this.sendFeedbackAns.feedback[i].userSelectedQuestion == data.userSelectedQuestion) {
            this.sendFeedbackAns.feedback[i].userSelectedAnswer = data.userSelectedAnswer
            flag = false
            break;
          } else {
            flag = true
          }
        }
        if(flag) {
          this.sendFeedbackAns.feedback.push(data)
        }
      } else {
        this.sendFeedbackAns.feedback.push(data)
      }
      // console.log(this.sendFeedbackAns)      
    },
    showKeyBordFunc (id, value) {
      this.inputid = id
      this.input = value
      this.showKeyboard = true  
      let isNumeric = this.isNumeric
      this.inputVal = value
      if(id == "telno") 
        this.isNumeric = true
      else 
        this.isNumeric = false
      
      if(isNumeric != this.isNumeric) {
        this.showKeyboard = false 
        setTimeout(() => {
          this.showKeyboard = true
        }, 10)
      }
    },
    onChange (input) {
      // console.log('input', input)
      this.input = input
      let formdata = $(`#${this.inputid}`).val(input)
    },
    hideKeyBoard () {
      this.showKeyboard = false
      // this.showNumKeyBoard = false
    }
  }
}
</script>

<style scoped>
.row{
  margin-left: 0px;
}
.feedqtn{
 margin-top: 50px;
 }
.keyboard{
  position: absolute;
  z-index: 20;
}

.quitBtn button{
  position: absolute;
  left: 460px;
  top: 895px;
  font-size: 25px;
  outline: none;
  text-decoration: none;
  width: 135px;
  height: 47px;
  background-image: url('../assets/quit.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  color: #fff;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0px;
  cursor: pointer;
  z-index: 20;
}
.homeNavbar{
  z-index: 26;
  height: 170px;
  width: 1920px;
}
.bgimg{
background-image: url('../assets/Background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 1080px;
  bottom: 0px;
  position: absolute;
  width: 1920px;
}
.explore{
  position: absolute;
  height: 945px;
}
.explore-inner{
  position: absolute;
  top: 111px;
  height: 969px;
  width: 1920px;
}
</style>
