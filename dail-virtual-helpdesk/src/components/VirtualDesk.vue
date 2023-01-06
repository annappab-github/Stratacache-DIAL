<template>
 <div class="virtualdesk">
  <div class="">
        <div class="text-white  pt-3">
          <label v-if = "tempLanguage == 'en'" class="virtual">{{this.virtualText}}</label>
          <label v-if = "tempLanguage == 'hn'" class="virtual1">{{this.virtualText}}</label>
          <hr>
        </div>
        <div class="boardingBg">
            <label v-if = "tempLanguage == 'en'" class="banner"> {{namste}} </label>
            <label v-if = "tempLanguage == 'hn'" class="banner1"> {{namste}} </label>
        </div>
  </div>

  <div class="row my-4 py-2 text-center homeBtns">
   <div class="col-12 d-flex justify-content-center mt-0">
     <HomeButtons :title="btn1" class="home-buttons" imageName="boardinfo.png" @click="goToNextPage('/scanboardingpass')"  />
    <!-- </div>
     <div class="col-4"> -->
      <HomeButtons :title="btn2" class="home-buttons" imageName="explore.png" @click="goToNextPage('/explore')" />
    <!-- </div>
    <div class="col-4"> -->
      <HomeButtons :title="btn3" class="home-buttons" imageName="talktous.png" @click="$emit('activateVideoCall')" />
      <!-- <HomeButtons :title="btn3" class="home-buttons" imageName="talktous.png" @click="goToNextPage('/talktous/3/OTHERS')" /> -->
    </div>
    <div class="col-12 d-flex justify-content-center mt-5">
      <HomeButtons :title="btn4" class="home-buttons" imageName="SOS.png" @click="goToNextPage('/sos')" />
    <!-- </div>
    <div class="col-4"> -->
      <HomeButtons :title="btn5" class="home-buttons" imageName="feedback.png" @click="goToNextPage('/feedbackscanner')" />
    <!-- </div>
    <div class="col-4"> -->
      <HomeButtons :title="btn6" class="home-buttons" imageName="scan.png"  @click="goToNextPage('/scan')" />
    </div>
  </div>
</div>
</template>

<script>
import HomeButtons from '../components/HomeButtons.vue'
import ConstLangText from '@/utils/Language'
import PlaylistScalaVariables from '@/utils/PlaylistScalaVariables'
const ConstText = ConstLangText.readConstValues();

export default {
  name: 'VirtualDesk',
  components: {
    HomeButtons
  },
  data() {
    return {
      btn1: ConstText.homeBtnText1,
      btn2: ConstText.homeBtnText2,
      btn3: ConstText.homeBtnText3,
      btn4: ConstText.homeBtnText4,
      btn5: ConstText.homeBtnText5,
      btn6: ConstText.homeBtnText6,
      virtualText: ConstText.virtualText,
      namste: ConstText.namste,
      tempLanguage: ''
    }
  },
  methods: {
    goToNextPage (val) {
      PlaylistScalaVariables.exploreSetScalaVariables(val);
      this.$router.push(val)
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
  }
}
</script>
<style scoped>
.home-buttons{
  width: 290px;
}
.banner{
  position: absolute;
  color: #fff;
  top: 195px;
  width: 641px;
  height: 150px;
  left: 360px;
  font-size: 60px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 2.4px;
}
.banner1{
  position: absolute;
  color: #fff;
  top: 195px;
  width: 641px;
  height: 150px;
  left: 480px;
  font-size: 60px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 2.4px;
}
hr {
  position: absolute;
  border: none;
  height: 2px;
  background: #fff;
  width: 768px;
  left: 154px;
  margin-top: -12px;
  }
.virtual{
  font-size: 85px;
  font-family: 'Cervino-BlackNeue';
  letter-spacing: 2.4px;
  margin-left: 190px;
}
.virtual1{
  font-size: 85px;
  font-family: 'Cervino-BlackNeue';
  letter-spacing: 2.4px;
  margin-left: 230px;
}
.virtualdesk{
  position: absolute;
  width: 1064px;
  height: 910px;
  color: #fff;
  margin-right: 0px;
  margin-top: -20px;
}
.boardingBg{
  background-image: url('../assets/banner.png');
  background-repeat: no-repeat;
  height: 160px;
  width: 826px;
  margin-left: 125px;
  margin-top: 25px;
  font-family: 'Cervino-BlackNeue';
  letter-spacing: 2.4px;
   font-size: 35px;
}

.homeBtns{
  margin : 0px 0px 0px 0px;
}
.col-4{
  margin: 0px;
  padding: 0px;
  margin: 0px 0px 40px 0px;
}
.row{
  padding: 0px;
  margin: 0px 0px 0px 0px;
}
</style>
