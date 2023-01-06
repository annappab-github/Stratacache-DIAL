<template>
    <div class="explore">
      <div class="bgimg">
          <div class="explore-inner">
              <div class="scanQR-Text text-center ">
                 <label>{{scanQR}}</label>
              </div>
              <div class=" text-center ">
                <img  class="scanner" :src="QRImgPath">
              </div>
              <div class="text-center quitBtn">
                <button class="" @click="this.$router.push('/')" type="" value="">{{quitBtn}}</button>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import ConstLangText from '@/utils/Language'
const ConstText = ConstLangText.readConstValues();
import Constants from '@/utils/Constants.js'

export default {
  name: 'Explore',
  components: {
  },
  data(){
    return {
      scanQR: ConstText.scanQR,
      quitBtn: ConstText.quitBtn,
      QRImgPath: ''
    }
  },
  mounted() {
    Constants.isScanQr = false
    try {
      this.QRImgPath = window.ScalaGetVariable("scanQRImgABSPath")
    } catch (error) {
      this.QRImgPath = require(`../assets/Shop_n_Dine.png`)
    }
  }
}
</script>

<style scoped>
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
  left: 50%;
  transform: translate(-50%, 0);
}

.scanQR-Text{
  font-size: 48px;
  color: #fff;
  margin-top: 178px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 2.4px;
}

.scanner {
  background-color: #fff;
  text-align: center;
  margin-top: 64px;
  width: 430px;
  height: 430px;
}

 .quitBtn button{
  font-size: 25px;
  outline: none;
  text-decoration: none;
  margin-top: 113px;
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
</style>
