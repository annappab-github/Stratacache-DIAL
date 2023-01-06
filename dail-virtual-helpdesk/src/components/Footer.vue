<template>
 <!--   <div class=" p-2 text-white destInfo align-middle text-center">
            APPROXIMATED 15 MINUTES TO REACH GATE 36 FROM YOUR ORIGIN
    </div>-->
    <div class="">
      <div class="quitBtn">
        <button @click="this.$router.push('/')" type="" value="">{{quitBtn}}</button>
      </div>
      <div class="scanDirection">
        <label class="labelText"> {{scanDirection}}</label>
      </div>
        <div class="">
        <img class="imgs" :src="require('../assets/Scanthedirection.png')" >
        </div>
        <!-- <img class="scanImg mr-2" @click="this.$router.push('/scan')" :src="require('../assets/mobilepass.png')" > -->
        <div class="qr-container">
          <qrcode-vue class="qr-image" :value="qrPathValue" size="135" />
          <!-- <qrcode-vue class="qr-image" value="bannappa@stratacache.com" size="135" /> -->
        </div>
    </div>    
</template>
<script>
import ConstLangText from '@/utils/Language'
const ConstText = ConstLangText.readConstValues();
import QrcodeVue from 'qrcode.vue'

export default {
  components: {
    QrcodeVue
  },
  props: ["qrPathValue"],
  data() {
    return({
      quitBtn: ConstText.quitBtn,
      scanDirection: ConstText.scanDirection,
    })
  }
}
</script>
<style scoped>
.imgs{
  position: absolute;
  width: 170px;
  height: 155px;
  top: 800px;
  left: 1560px
}

.destInfo{
  font-size: 30px;
  background-image: url('../assets/approximatedbg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 1px;
}

.scanDirection{
  position: absolute;
  color: #fff;
  left: 1320px;
  top: 840px;
}
.labelText{
  width: 272px;
  font-family: 'Amplitude-Regular';
  letter-spacing: 0px;
  font-size: 26px;
}

.qr-container {
  background-image: url('../assets/mobilepass.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  width: 163px;
  height: 161px;
  top: 780px;
  left: 1650px;
  margin: 0;
  padding: 0;
}

.qr-image{
  margin: 13px 15px;
  padding: 8px;
  background-color: #fff;
  border-radius: 2px;
}

.quitBtn button{
  font-size: 25px;
  outline: none;
  text-decoration: none;
  width: 135px;
  height: 47px;
  top: 850px;
  left: 50%;
  transform: translate(-50%, 0);
  background-image: url('../assets/quit.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  border-radius: 10px;
  color: #fff;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0px;
  cursor: pointer;
}
</style>
