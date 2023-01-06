<template>
        <div class="overlay" @click="closeDesc">
          <!--<div class="brandsimg col-md-1" v-for="(items, index) in retailBrands" :key="index" >
            <img  @click="loadMap(items)" :src="require(`../assets/${items.icon}`)" alt="icons">
          </div> -->
           <div class="findway text-center" id="findWay" @click="openMap(description)">
            <label class="find find1"  for="">{{findway}}</label> 
          </div>
          </div>
</template>


<script>
import ConstLangText from '@/utils/Language'
const ConstText = ConstLangText.readConstValues();
export default {
  name: 'Amenities',
  props: ['retailBrands','description'],
  data () {
    return {
      findway: ConstText.findway,
      tempLanguage: ''
    }
  },
  mounted () {
            
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
        // console.log('tempLanguage', this.tempLanguage)
        if(this.tempLanguage =='hn'){
           $(`.findway`).addClass("find1");
        } else {
           $(`.findway`).removeClass("find");
        }
   

  },
  methods: {
    closeDesc(){
      this.$emit('closeDesc', false)
    },
    openMap(description){
      this.$emit('openFindWay', description)
    }
  }
}
  </script>

  <style scoped>

.findway{
    position: absolute;
    cursor: pointer;
    top: 640px;
    left: 50%;
    transform: translate(-50%);
    background-image: url('../assets/findway.png');
    width: 367px;
    height: 68px;
}
.findway .find{
  position: absolute;
  font-family: 'Cervino-RegularNeue';
  letter-spacing: 1.75px;
  left: 20%;
  font-size: 50px;
  color: #fff;
  font-weight: bolder;
}
.findway .find1{
  position: absolute;
  font-family: 'Cervino-RegularNeue';
  letter-spacing: 1.75px;
  left: 15%;
  top: 4px;
  font-size: 40px;
  color: #fff;
  font-weight: bolder;
}
.overlay{
    position: absolute;
    top: 25px;
    height: 715px;
    width: 1517px;
    z-index: 9;
    box-shadow:inset 0 0 0 2000px rgba(0, 0, 0, 0.637);
    background-size:cover;
}
</style>