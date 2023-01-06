<template>
<div class="explore">
  <div class="bgimg">
      <div class="explore-inner">
            <div class="sosText text-center text-white">
                <label>{{sosBtn}}</label>
            </div>
            <div class="d-flex  justify-content-center sosBtns text-white">
              <div v-for="(sosbtns,index) in sosButtons" :key="index">
                  <SosButtons :title="`${sosbtns.title}`" :imageName="`${sosbtns.imageName}`"  @click="updatePopup(index)"  />
                  <div v-if="this.showModel== index && index != 0" :class="{ popupBox: popup == index }"></div>
                  <div v-if="this.showModel== index && index != 0" class="notification">{{alertText}}</div>
                  <div class="alert-holder">
                    <div v-if="this.showModel== index" :class="{ alertBg: popup == index }">
                      <div v-if="this.showModel== index" class="notification2">{{sosbtns.callEmergency}}  <span class="mt-1">{{sosbtns.callnumber}}</span>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <div class="text-center quitBtn">
              <button   @click="this.$router.push('/')" type="" value="">{{quitBtn}}</button>
            </div>
      </div> 
  </div>
</div>
</template>

<script>
import SosButtons from '../components/SosButtons.vue'
import ConstLangText from '@/utils/Language'
const ConstText = ConstLangText.readConstValues();
import Constants from '@/utils/Constants.js'

export default {
  name: 'sos',
  components: {
    SosButtons
  },
  data () {
    return {
      popup: '',
      showModel: 'null',
      sosButtons: [
        { title: ConstText.sosBtn1, imageName: 'medicalservices.png' , callEmergency: ConstText. callEmergency1, callnumber: ConstText.callnumber1},
        { title: ConstText.sosBtn2, imageName: 'Firefighting.png', callEmergency: ConstText. callEmergency2, callnumber: ConstText.callnumber2},
        { title: ConstText.sosBtn3, imageName: 'securityassistance.png', callEmergency: ConstText. callEmergency3, callnumber:ConstText.callnumber3}
      ],
      sosBtn: ConstText.sosBtn,
      quitBtn: ConstText.quitBtn,
      alertText: ConstText. alertText,
      callEmergency1:  ConstText. callEmergency1,
      callEmergency2:  ConstText. callEmergency2,
      callEmergency3:  ConstText. callEmergency3,
    }
  },
  mounted(){
    Constants.isScanQr = false
  },
  methods: {
    updatePopup (val) {
      window.ScalaSetVariable("serviceType", val)
      window.ScalaSetVariable("triggerAlert", Math.round(+new Date()/1000).toString())
      this.popup = val
      this.showModel = val
    }
  }
}
</script>

<style scoped>
.sosBtns{
  margin-top: 151px;
  text-align: center;
}
.notification{
  width: 120px;
  position: relative;
  margin-top: -500px;
  text-align: center;
  left: -20px;
  font-family: 'Cervino-RegularNeue';
  letter-spacing: 1.25px;
  font-size: 25px;
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
.retail{
  top: 500px;
  width: 100%;
  height: 500px;
}
/*.explore-inner{
  position: absolute;
  top: 170px;
  left: 50%;
  transform: translate(-50%, 0);
}*/
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
  height: 944px;
}
.explore-inner{
  position: absolute;
  width: 1920px;
  top: 111px;
  height: 969px;
  left: 50%;
  transform: translate(-50%, 0);
}
.sosText{
    font-size: 55px;
    margin-top: 145px;
    font-family: 'Cervino-BoldNeue';
    letter-spacing: 2.75px;
}
span{
   font-size: 36px;
   font-family: 'Cervino-BoldNeue';
   letter-spacing: 2.75px;
}
 .quitBtn button{
  font-size: 25px;
  outline: none;
  text-decoration: none;
  margin-top: 290px;
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
}
.popupBox {
  background-image: url('../assets/alertbox.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  top: -350px;
  left: -50px;
  width: 178px;
  height: 176px;
  z-index: 0;
  color: #fff;
  text-align: center;
}
.alertBg {
  background-color: red;
  position: absolute;
  top: 670px;
  left: 50%;
  transform: translate(-50%);
  z-index: 0;
  color: #fff;
  display: inline;
  text-align: center;
}
</style>
