<template>
    <div class="explore">
       <div class="bgimg">
          <div class="">
          <div class="explore-inner">
           <div class= "dialText text-center text-white">
                <label>{{dialText}}</label>
            </div>
            <div class="d-flex my-5 py-2 justify-content-center talktoUsBtns  text-white">
              <div v-for="(sosbtns,index) in sosButtons" :key="index">
                  <TalktousButtons :title="`${sosbtns.title}`" :imageName="`${sosbtns.imageName}`"   @click="talkToUs(sosbtns.title)"  />
              </div>
              </div>
                 <div class="text-center quitBtn">
                  <button  @click="this.$router.push('/')" type="" value="">{{quitBtn}}</button>
              </div>
           </div>
          </div>
        </div>
    </div>
</template>

<script>
import TalktousButtons from '../components/TalktousButtons.vue'
import ConstLangText from '@/utils/Language'
const ConstText = ConstLangText.readConstValues();
import Constants from '@/utils/Constants.js'

export default {
  name: 'ServiceDesk',
  components: {
    TalktousButtons,
  },
  data () {
    return {
      popup: '',
      sosButtons: [
        { title: ConstText.dialBtn1, imageName: 'buggy.png' },
        { title: ConstText.dialBtn2, imageName: 'wheelchair.png' },
        { title: ConstText.dialBtn3, imageName: 'lostproperty.png' },
        { title: ConstText.dialBtn4, imageName: 'others.png' }

      ],
      dialText: ConstText.dialText,
      quitBtn: ConstText.quitBtn
    }
  },
  mounted() {
    Constants.isScanQr = false
  },
  methods: {
    talkToUs(data){
      let id = '1';
      let reason = data;
      console.log('')
      this.$router.push({
        name: 'talktous',
        params: {
          id,
          reason
        },
      });
      // this.$router.push()
    }
  },
}
</script>

<style scoped>
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
.row{
  margin: 50px 0px 0px 25px;
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
.talktoUsBtns{
  margin-top: 151px;
  text-align: center;
}
.dialText{
    font-size: 55px;
    margin-top: 140px;
    font-family: 'Cervino-BoldNeue';
    letter-spacing: 2.75px;
}

.quitBtn button{
  font-size: 25px;
  margin-top: 240px;
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
}

</style>
