<template>
    <div class="">
    <table class="table bg-white" id="myTable">
      <thead class="text-white" style="background-color: #33A3DC">
        <tr class="cat">
          <th class="text-center p-2" colspan="2">{{cat}}</th>
        </tr>
      </thead>
      <tr  v-for="(items, index) in categories" :key="index" class="category"  @click="loadMap(index, items)">
        <td style="width: 16.66%" class="pl-3"><img :src="require(`../../assets/${items.categoryicon}`)"></td>
        <td class="pl-4 pt-2">{{items.diplayName}}</td>
      </tr>
    </table>

      <!-- <div style="padding:20px" class="overlay" v-if="popup && this.fullMap == true">
        <h2 class="successMsg">PLEASE SELECT DEPARTURE</h2>
      </div> -->
  </div>
</template>
<script>
import ConstLangText from '@/utils/Language'
import Methods from '@/utils/Methods.js'
import PlaylistScalaVariables from '@/utils/PlaylistScalaVariables'
const ConstText = ConstLangText.readConstValues()

export default {
  name: 'Category',
  props: ['categoryData', 'gates', 'aminitiesData', 'retailData', 'categories', 'zonenames','popUpOverlay', 'category', 'fullMap', 'headingText'],
  data () {
    return {
      showKeyboard: false,
      icon: '',
      checkreset: false,
      cat: ConstText.cat,
      sucessMessage: ConstText.sucessMessage,
      tempLanguage: '',
      popup: false,
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
  },
  methods: {
    enterClicked () {
      this.showKeyboard = true
      // console.log('true')
    },
    onKeyPress (button) {
      // console.log('button', button)
    },
    onInputChange (input) {
      // console.log('input')
      this.input = input.target.value
    },
    reColor(){
      $(`#dialMap .cls-10,#Domestic .cls-400`).css({ fill: "#ffefc2" });
      $(`#dialMap .cls-12, #dialMap .cls-21,#Domestic .cls-401`).css({ fill: "#a9e0f9" });
      $(`#dialMap .cls-51, #dialMap .cls-52,#Domestic .cls-402`).css({ fill: "#faa71b" });
      $(`#dialMap .cls-11,#Domestic .cls-405`).css({ fill: "#817369" });
      $(`#dialMap .cls-112`).css({ fill: "#817369" });
      $(`#dialMap .cls-57, #dialMap .cls-80,#Domestic .cls-404`).css({ fill: "#3ec2cf" });


      // $(`#dialMap #Drinking_fountain rect,#dialMap #First_Aid-2 rect,#dialMap #Smoking-area rect,#dialMap #Prayer_room-2 rect,#dialMap #Elevator-3 rect,#dialMap #ForExch rect,#dialMap #ATM_S rect,#dialMap #Information_1 rect,#dialMap .sitting,#dialMap .playArea`).css({ fill: "#fff" }).removeClass("blink");

      $(`#dialMap .restroom,#Domestic .restroom,#dialMap .parentsroom,#Domestic .parentsroom`).css({ fill: "#4d90cd" }).removeClass("blink");
      // $(`#dialMap #First_Aid-2 polygon`).css({ fill: "#ed1c24" });

      $(`#dialMap .restroom, #Domestic .restroom, #dialMap .waterspout, #dialMap .parentsroom, #Domestic .parentsroom, #dialMap #First_Aid-2 rect, #Domestic #First_Aid-2 rect,#dialMap #Smoking-area rect, #Domestic #Smoking-area rect,#dialMap #Prayer_room-2 rect, #Domestic #Prayer_room-2 rect,#dialMap #Elevator-3 rect, #Domestic #Elevator-3 rect,#dialMap #Drinking_fountain rect, #Domestic #Drinking_fountain rect,#dialMap #ForExch rect, #Domestic #ForExch rect,#dialMap #ATM_S rect,#dialMap #Information_1 rect,#dialMap .sitting,#dialMap .playArea`).removeClass("blink");
      $(`#dialMap #First_Aid-2 polygon, #Domestic #First_Aid-2 polygon`).css({ fill: "#ed1c24" });
      $(`#dialMap .sitting`).css({ fill: "#878787" });
      $(`#dialMap #First_Aid-2 rect, #Domestic #First_Aid-2 rect, #dialMap #Smoking-area rect, #Domestic #Smoking-area rect,#dialMap #Prayer_room-2 rect, #Domestic #Prayer_room-2 rect,#dialMap #Elevator-3 rect, #Domestic #Elevator-3 rect,#dialMap #Drinking_fountain rect, #Domestic #Drinking_fountain rect,#dialMap #ForExch rect, #Domestic #ForExch rect,#dialMap #ATM_S rect,#dialMap #Information_1 rect`).css({ fill: "#fff" });

      $(`#dialMap .cls-72, #dialMap .cls-74, #dialMap .cls-73, #dialMap .cls-70`).css({ fill: "#1c407d" });
      $(`#dialMap .cls-108, #dialMap .cls-75`).css({ fill: "url(#linear-gradient)" });
      $(`#Domestic .cls-403`).css({ fill: "url(#linear-gradient-3)" });
    },
    loadMap (val, item) {
      if (this.headingText != "AMENITIES" || this.headingText != item.categoryname) {
        if(this.fullMap){
          // this.popup = true
          //   this.popUpOverlay(true);
          // console.log('cate', val,item)
        } else {
          this.$emit('resetColor',true);
          $(`#dialMap .aminities-highlight`).remove();
          try {
            document.getElementsByTagName("polyline")[0].remove();
          } catch (error) {
            
          }
          this.categoryData(val, item.categoryname)
          var val2 = item.categoryname.toUpperCase()
          var val3 = item.categoryicon
          this.icon = val3
          this.checkreset = false
  
          if (val2 === 'RETAIL BRANDS' || val2 === 'F & B BRANDS') {
            var catId = item.categoryid
            this.reColor();
            if(val2 === 'RETAIL BRANDS'){
              if(this.tempLanguage == 'hn'){
                this.retailData(catId,'परचून ब्रांडों');
              }
              else{
                this.retailData(catId,val2);
              }
            } else {
              if(this.tempLanguage == 'hn'){
                  this.retailData(catId,'खाद्य और पेय ब्रांडो')
              }
              else{
                this.retailData(catId,val2);
              }
            }
  
            if (val2 === "RETAIL BRANDS") {
              PlaylistScalaVariables.exploreRetailSetScalaVariables();
            } else if (val2 === "F & B BRANDS") {
              PlaylistScalaVariables.exploreFandBSetScalaVariables();
              // this.popup = false
            } 
          } else if (val2 === 'GATES') {
            // this.popup = false
            this.reColor();
            if(this.tempLanguage=='hn'){
              this.gates('द्वार');
            } else{
              this.gates(val2);
            }
            PlaylistScalaVariables.exploreSetScalaVariables('/explore');
          } else if (val2 === 'AMENITIES'){
            // this.popup = false
            if(this.tempLanguage=='hn'){
              this.aminitiesData('सुविधाएं');
            } else {
              this.aminitiesData(val2);
            }
            PlaylistScalaVariables.exploreSetScalaVariables('/explore');
          }
        }        
      } else if (this.headingText === 'AMENITIES'){
            // this.popup = false
            if(this.tempLanguage=='hn'){
              this.aminitiesData('सुविधाएं');
            } else {
              this.aminitiesData(this.headingText);
            }
            PlaylistScalaVariables.exploreSetScalaVariables('/explore');
          }
    }
  },
}
</script>

<style scoped>
.table {
  border: none;
  border-bottom: 1px solid #9c9994;
 
}
.table td {
  padding: 3px;
  width: 398px;
  height: 59px;
}


#myInput {
  background-image: url('/css/searchicon.png');
  /*background-position: 10px 10px;*/
  background-repeat: no-repeat;
  width: 100%;
  font-size: 16px;
  padding: 10px 20px 12px 40px;
  border: 6px solid #34ebdb;
}

.hidecategory{
  pointer-events: none;
}
.cat{
  font-size: 30px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 1.5px;
  width: 398px;
  height: 54px;
}
.category{
  font-size: 28px;
  font-family: 'Cervino-ExtraBoldNeue';
  letter-spacing: 0px;
  width: 398px;
  height: 59px;
}
.successMsg{
   padding-left: 130px;
   padding-top: 8px;
   background-color: #fff;
   top: 200px;
   left: 50%;
   transform: translate(-50%);
   position: absolute;
   width: 580px;
   height: 50px;
   font-size: 30px;
   font-family: 'Cervino-BoldNeue';
   letter-spacing: 1.5px;
}
.overlay {
  position: fixed;
  display: block;
  height: 715px;
  width: 1518px;
  margin-top: -290px;
  margin-left: -1518px;
  background-color: rgba(0,0,0,0.5);
}
.internationalText{
  font-size: 28px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0px;
  position: absolute;
  background-image: url('../../assets/textBg.png');
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  width: 338px;
  height: 56px;
  margin-left: -950px;
  padding: 5px;
  top: 400px;
  z-index: -1;
  border: none;
}
.domesticText{
  font-size: 28px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0px;
  position: absolute;
  background-image: url('../../assets/textBg.png');
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  width: 338px;
  height: 56px;
  padding: 5px;
  margin-left: -950px;
  top: 300px;
  z-index: -1;
  border: none;
}
</style>
