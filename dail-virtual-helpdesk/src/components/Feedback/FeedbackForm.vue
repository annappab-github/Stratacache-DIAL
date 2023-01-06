<template>
<div class=" feedback-Form">
<div class="overlay" v-if="popup" @click="closeDesc"></div>
<div class=" text-white">
<div  id="form" >
    <!--  <div class="form-group row ">
         <div class="col-md-3 ml-4">
            <label for="name" class="col-form-label">{{name}}</label>
            <span for="star" class="pl-1 required">*</span>
         </div>
         <div class="col-md-8">
            <input type="text" @click="enterClicked('name')" value="" class="form-control form-control-lg" id="name" autocomplete="off" required>
            <div class="nameError-Msg" v-if="nameErrorMsg">PLEASE ENTER NAME</div>
         </div>
      </div>-->
      <!--<div class="form-group row">
         <div class="col-md-3 ml-4">
            <label for="email" class="col-form-label">{{email}}</label>
            <span for="star" class="pl-1 required">*</span>
         </div>
            <div class="col-sm-8">
               <input type="text" @click="enterClicked('email')" value="" class="form-control form-control-lg" id="email" autocomplete="off">
              <div class="nameError-Msg" v-if="mailErrorMsg">PLEASE ENTER A VALID EMAIL</div>
            </div>
      </div>
      <div class="form-group row">
         <div class="col-md-3 ml-4">
         <label for="telno" class="col-form-label">{{telno}}</label>
         </div>
            <div class="col-sm-8">
               <input type="" @click="enterClicked('telno')" value="" class="form-control form-control-lg" id="telno" autocomplete="off" >
               <div class="nameError-Msg" v-if="numberErrorMsg">CHARACTERS ARE NOT ALLOWED</div>
            </div>
      </div>-->
      <div class="form-group  row">
         <div class="col-md-3 ml-4">
            <label for="pnrno" class="col-form-label">{{pnrnum}}</label>
            <span for="star" class="pl-1 required">*</span>
         </div>
         <div class="col-sm-8">
            <input type="" :value="this.pnrno" class="form-control form-control-lg" id="pnrno" autocomplete="off" readonly>
         </div>
      </div>
     <!-- <div class="form-group row">
        <div class="col-md-3 ml-4">
         <label for="nationality" class="col-form-label">{{nationality}}</label>
         </div>
            <div class="col-sm-8">
               <input type="text" @click="enterClicked('nationality')" value="" class="form-control form-control-lg" id="nationality" autocomplete="off" >
            </div>
        </div>-->
      <div class="form-group row">
         <div class="col-md-3 ml-4">
            <label for="Date" class="col-form-label">{{date}}</label>
         </div>
         <div class="col-sm-8">
            <input  v-model="currentdate" class="form-control form-control-lg" id="date" readonly >
         </div>
      </div>
      <div class="form-group row">
         <div class="col-md-3 ml-4">
            <label for="time" class="col-form-label">{{time}}</label>
         </div>
         <div class="col-sm-8">
            <input v-model="currenttime" id="time" class="form-control form-control-lg" readonly >
         </div>
      </div>
      <div class="form-group  row">
         <div class="col-md-3 ml-4">
            <label for="flight" class="col-form-label">{{flightno}}</label>
            <span for="star" class="pl-1 required">*</span>
         </div>
         <div class="col-sm-8">
            <input type=""  :value="this.getFlightID" class="form-control form-control-lg" id="flight" autocomplete="off" readonly>
         </div>
      </div>
      <div class="form-group row">
         <div class="col-md-3 ml-4">
         <label for="comments" class=" col-form-label">{{comments}}</label>
         </div>
            <div class="col-sm-8">
               <textarea id="comments" @click="enterClicked('comments')" value="" style="resize: none;" rows="6" class="form-control" autocomplete="off" ></textarea>
            </div>
      </div>
       <div class="alert alert-success successMsg" role="alert" v-if="formSubmitMsg">
            {{sucessMessage}}
      </div>
      <div v-if="popup" class="alertBg">
         <form>
            <div class="popupHeadingText text-center mt-2">
               <div class="text-center">{{kindly}}</div>
            </div>
            <div class="form-group row mt-4">
               <div class="col-md-2 ml-1">
                  <label for="email" class="col-form-label">{{email}}</label>
               </div>
               <div class="col-sm-6">
                  <input type="text" @click="enterClicked('email')" value="" class="form-control form-control-lg" id="email" autocomplete="off">
                  <div class="nameError-Msg" v-if="mailErrorMsg">PLEASE ENTER A VALID EMAIL</div>
               </div>
            </div>
            <div class="form-group row">
               <div class="col-md-2 ml-1">
                  <label for="telno" class="col-form-label">{{telno}}</label>
               </div>
               <div class="col-sm-6">
                  <input type="tel" @click="enterClicked('telno')" value="" class="form-control form-control-lg" id="telno" autocomplete="off">
                  <div class="nameError-Msg" v-if="numberErrorMsg">PLEASE ENTER A VALID NUMBER</div>
               </div>
            </div>
            <div class="submitBtn1">
               <div @click="submitData()" class="text-center p-1"  value="Submit">{{submitBtn}}</div>
            </div>
         </form>
      </div>
      <div class="submitBtn">
         <div @click="validateData()" class="text-center p-1"  value="Submit">{{submitBtn}}</div>
      </div>
</div>
</div>
</div>
</template>

<script>
import $ from 'jquery'
import formSubmit from '@/utils/formSubmit.js'
import FeedbackQuestion from './FeedbackQuestion'
import ConstLangText from '@/utils/Language'
import VueSimpleAlert from "vue-simple-alert";
const ConstText = ConstLangText.readConstValues();
import Methods from '@/utils/Methods'

export default {
   name: 'FeedbackForm',
   components: {
      FeedbackQuestion
   },
   props: ['showKeyBord', 'Hide', 'submitFormData', 'input'],
   mounted () {
      this.getTime()
      this.currentDate()
      setInterval(function () {
         this.getTime()
         this.currentDate()
      }.bind(this), 1000)

         this.getFlightID = this.$route.params.flightno.toUpperCase();
         this.pnrno = this.$route.params.pnrno.toUpperCase();

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
   data () {
      return {
         tempLanguage: '',
         getFlightID: '',
         pnrno: '',
         name: ConstText.name,
         getFlightID: '',
         email: ConstText.email,
         telno: ConstText.telno,
         // nationality: ConstText.nationality,
         date: ConstText.date,
         time: ConstText.time,
         flightno: ConstText.flightno,
         pnrnum: ConstText.pnrnum,
         comments: ConstText.comments,
         submitBtn: ConstText.submitBtn,
         kindly: ConstText.kindly,
         showKeyboard: false,
         showNumKeyBoard: false,
         nameErrorMsg: false,
         numberErrorMsg: false,
         formSubmitMsg: false,
         mailErrorMsg: false,
         flightErrorMsg: false,
         popup: false,
         sucessMessage: ConstText.sucessMessage,
         currentdate: '',
         // input: '',
         currenttime: '',
         formData: {
            pnrno: $('#pnrno').val(),
            email: $('#email').val(),
            telno: $('#telno').val(),
            // nationality: $('#nationality').val(),
            date: this.currentdate,
            time: this.currenttime,
            flightno: $('#flight').val(),
            comments: $('#comments').val(),
         },
      }
   },
   methods: {
     validateData(input) {
      this.showKeyboard = false
      if(this.validateFeedbackAnswer()) {
         event.preventDefault();
         this.formData.flightno = $('#flight').val();
         this.formData.comments = $('#comments').val()
         if(this.formData.comments != "") {
            this.popup = true
            // this.$emit('popup', 'true')
         }
         else {
            var formSubmitData = {
               formName: "feedbackForm",
               pnrno: $('#pnrno').val(),
               email: "",
               telno: "",
               date: this.currentdate,
               time: this.currenttime,
               flightno: $('#flight').val(),
               comments: $('#comments').val()
            }
              this.mailErrorMsg = false
              this.formSubmitMsg = true
               setTimeout(() => { 
                  this.$router.push('/')
               }, 1000 * 2)
            // console.log("formSubmitData", formSubmitData)
            formSubmit.submitForm(formSubmitData)
            this.submitFormData(formSubmitData)
            
         }
     
      } else {
         if(this.tempLanguage == "en")
            VueSimpleAlert.alert("Kindly complete the questionnaire");
         else 
            VueSimpleAlert.alert("कृपया प्रश्नावली को पूरा करें");  
      }   
     },
   submitData(input){
      this.formData.email = $('#email').val();
      this.formData.telno = $('#telno').val();
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
         if ((this.formData.email==="" && this.formData.telno === "")) {
            this.numberErrorMsg = true
            this.mailErrorMsg = true
             
         }
         else if((this.formData.email==="" && this.formData.telno != "")){
            if(!this.formData.telno.match(phoneno))
               this.numberErrorMsg = true
            else {
               var formSubmitData = {
                  formName: "feedbackForm",
                  pnrno: $('#pnrno').val(),
                  email: "",
                  telno: $('#telno').val(),
                  date: this.currentdate,
                  time: this.currenttime,
                  flightno: $('#flight').val(),
                  comments: $('#comments').val()
               }
               this.formSubmitMsg = true
                  this.popup = false
                  setTimeout(() => { 
                     this.$router.push('/')
                  }, 1000 * 2)
               // console.log("formSubmitData", formSubmitData)
               formSubmit.submitForm(formSubmitData)
               this.submitFormData(formSubmitData)
            }  
         }
         else if((this.formData.email != "" && this.formData.telno === "")){
            if(!this.formData.email.match(filter))
               this.mailErrorMsg = true
            else {
               var formSubmitData = {
                  formName: "feedbackForm",
                  pnrno: $('#pnrno').val(),
                  email: $('#email').val(),
                  telno: "",
                  date: this.currentdate,
                  time: this.currenttime,
                  flightno: $('#flight').val(),
                  comments: $('#comments').val()
               }
               this.formSubmitMsg = true
                  this.popup = false
                  setTimeout(() => { 
                     this.$router.push('/')
                  }, 1000 * 2)
                  // console.log("formSubmitData", formSubmitData)
               formSubmit.submitForm(formSubmitData)
               this.submitFormData(formSubmitData)
            }   
         }
         else {
            if(!this.formData.email.match(filter))
               this.mailErrorMsg = true 
            else if(!this.formData.telno.match(phoneno))   
               this.numberErrorMsg = true
            else {
               var formSubmitData = {
                  formName: "feedbackForm",
                  pnrno: $('#pnrno').val(),
                  email: $('#email').val(),
                  telno: $('#telno').val(),
                  date: this.currentdate,
                  time: this.currenttime,
                  flightno: $('#flight').val(),
                  comments: $('#comments').val()
               }
               this.formSubmitMsg = true
                  this.popup = false
                  setTimeout(() => { 
                     this.$router.push('/')
                  }, 1000 * 2)
                  // console.log("formSubmitData", formSubmitData)
               formSubmit.submitForm(formSubmitData)
               this.submitFormData(formSubmitData)
            }   
            }   
     },
   validateFeedbackAnswer() {
        var questionIndex = ["0","1","2","3","4","5","6"];
        var counter = 0;
        for(var i in questionIndex) {
           if($('input[name='+i+']:checked').val() != undefined) {
              counter++;
           }
        }
        if(counter < 7) {
           return false;
        }
        return true;
     },
   closeDesc(){
      this.popup = false;
     },
   enterClicked (id) {
      this.showKeyboard = false
      this.numberErrorMsg = false
      this.mailErrorMsg = false
      var inputValue = $(`#${id}`).val()
      this.showKeyBord(id, inputValue)
    },
    onKeyPress (button) {
      // console.log('button', button)
    },
    onInputChange (input) {
      this.input = input.target.value
      //  console.log('button', this.input)
    },
   
   getTime () {
      var d = new Date()
      var formatedVal = Methods.time24hourformat(d)
      this.currenttime = formatedVal.time
    },
   currentDate () {
         Date.prototype.toShortFormat = function() {

         let monthNames =["01","02","03","04","05","06","07","08","09", "10","11","12"]
         let day = this.getDate()
         let monthIndex = this.getMonth(1)
         let monthName = monthNames[monthIndex]
         let year = this.getFullYear()
         return `${day}-${monthName}-${year}`
      }
      let today = new Date();
      this.currentdate = today.toShortFormat()
      }
   }
}
</script>

<style scoped>
 #mdiv1 {
  width: 40px;
  height: 40px;
  top: 0px;
  left: 660px;
  position: absolute;
  background-color: red;
  cursor: pointer;
  border-radius: 50px;
}

.mdiv1 {
  height: 25px;
  width: 5px;
  margin-left: 19px;
  margin-top: 8px;
  background-color: #fff;
  transform: rotate(45deg);
  Z-index: 1;
}

.md1 {
  height: 25px;
  width: 5px;
  background-color: #fff;
  transform: rotate(90deg);
  Z-index: 2;
}
.popupHeadingText{
   font-size: 30px;
}
.overlay {
  position: fixed;
  display: block;
  height: 1080px;
  width: 1920px;
  top: 0px;
  left: 0px;
  background-color: rgba(0,0,0,0.4);
  z-index: 10;
}
.alertBg {
  background-color: grey;
  position: absolute;
  top: 120px;
  width: 700px;
  height: 310px;
  left: 0%;
  transform: translate(-68%);
  z-index: 20;
  color: #fff;
  display: inline;
  text-align: center;
  border-radius: 20px;
}
.notification2{
  background-color: red;
  width: 500px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  font-family: 'Cervino-RegularNeue';
  letter-spacing: 1.25px;
  font-size: 30px;
}
.submitBtn {
  background-image: url('../../assets/submit.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  width: 135px;
  height: 47px;
  font-family: 'Cervino-RegularNeue';
  letter-spacing: 0.75px;
  border-radius: 8px;
  font-size: 25px;
  margin-left: 620px;
  top: 880px;
  cursor: pointer;
}
.submitBtn1 {
  background-image: url('../../assets/submit.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  width: 135px;
  height: 47px;
  font-family: 'Cervino-RegularNeue';
  letter-spacing: 0.75px;
  border-radius: 8px;
  font-size: 25px;
  left: 50%;
  transform: translate(-50%);
  top: 245px;
  cursor: pointer;
}
.nameError-Msg {
  font-size: 15px;
  color: red;
  position: absolute;
}
input[type= Number] {
  -webkit-appearance: none; 
  width: 540px;
}
input{
  -webkit-appearance: none; 
  width: 540px;
  height: 57px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0.75px;
  font-size: 25px;
}
textarea {
  -webkit-appearance: none; 
  width: 540px;
   font-family: 'Cervino-BoldNeue';
  letter-spacing: 0.75px;
  font-size: 25px;
}
.required{
   color: red;
   font-size: 38px
}
.col-md-3{
   padding: 0px;
}
.feedback-Form {
  left: 1120px;
  width: 800px;
  height: 971px;
  margin-top: 110px;
  background-image: url('../../assets/feedbackformbg.png');
  right: 1190px;
  position: absolute;
}
.row{
   margin: 25px 10px 30px 0px;
}
#form {
    position: absolute;
   margin-top: 15px;
}
.btns {
background-color: #38a7e8;
color: #fff;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
label{
  font-family: 'Cervino-RegularNeue';
  letter-spacing: 0.75px;
  font-size: 25px;
}
.successMsg{
   padding-left: 130px;
   top: 0px;
   left: -380px;
   position: absolute;
   width: 600px;
   font-size: 25px;
}
</style>
