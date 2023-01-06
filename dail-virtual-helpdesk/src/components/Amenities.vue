<template>
    <!-- Footer -->
      <div >
        <div class="amenities-container">
           <div class="verticalLine">
            <img class="" src="../assets/verticalLine.png" alt="icons">
          </div>
          <div class="aminityBar row ">
          <div class=" aminities aminities1">
            {{aminity}}
          </div>

          <div class="row icons" v-if="kioskid==114">
            <div v-for="(items, index) in horizontalIcons" :key="index" >
              <div class="categoryBg px-3" v-if="zoneName=='DOMESTIC DEPARTURE' && items.categoryname != 'PRAYER AREA-B'" @click="amenitiesDetail(items)" >
                <img class=""  :src="require(`../assets/${items.categoryicon}`)" alt="icons">
              </div>
              <div class="categoryBg px-3" v-if="zoneName=='INTERNATIONAL DEPARTURE' && items.categoryname != 'PRAYER ROOM-B'" @click="amenitiesDetail(items)" >
                <img class=""  :src="require(`../assets/${items.categoryicon}`)" alt="icons">
              </div>
              <div class="categoryBg px-3" v-if="zoneName=='' " @click="amenitiesDetail(items)" >
                <img class=""  :src="require(`../assets/${items.categoryicon}`)" alt="icons">
              </div>
            </div>
            
          </div>

          <div class="row icons" v-else>
            <div v-for="(items, index) in horizontalIcons" :key="index" >
              <div class="categoryBg px-3" v-if="zoneName=='DOMESTIC DEPARTURE' && items.categoryname != 'INFORMATION-B' && items.categoryname != 'PRAYER AREA-B' && items.categoryname != 'ATM-B' && items.categoryname != 'BABY STROLLER-B'" @click="amenitiesDetail(items)" >
                <img class=""  :src="require(`../assets/${items.categoryicon}`)" alt="icons">
              </div>
            </div>
            
          </div>

        </div>
      </div>
    
    </div>
</template>
<script>
import Constants from '@/utils/Constants'
import ConstLangText from '@/utils/Language'
import { debounce } from 'lodash-es'
import $ from 'jquery'
import Language from "@/utils/Language"
import methods from '../utils/Methods.js';

const json = Language.readJson()
const ConstText = ConstLangText.readConstValues();
export default {
  name: 'Amenities',
  props: ["horizontalIcons", "fullMap", "popUpOverlay", "zoneName", 'catChanged'],
  data () {
    return {
      formSubmitMsg: true,
       popup: false,
       items: {categoryid: 0},
       kioskid: Constants.kioskid,
       aminity: ConstText.aminity,
       tempLanguage: '',
       zoneId: ''
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
        if(this.tempLanguage =='hn'){
           $(`.aminities`).addClass(".aminities1");
        } else {
           $(`.aminities`).removeClass(".aminities");
        }
   


  },
  methods:{   
    amenitiesDetail: function(items){
      if (items.categoryid != this.items.categoryid || this.catChanged[0] || this.fullMap) {
        // this.catChanged[0] = false
        // this.items = items
        // console.log('aminities')
        //  this.popup = false
        //    this.popUpOverlay(false);
        if(this.fullMap){
          // this.popup = true
          // this.popUpOverlay(true);
          $(`#search`).addClass("searchbtnOverlay");
        } else {
            this.catChanged[0] = true
            this.items = items
            // console.log('aminities')
            this.popup = false
              this.popUpOverlay(false);

           this.mapStyle(); 
            this.popup = false
           this.popUpOverlay(false);
          if(this.zoneName == 'DOMESTIC DEPARTURE'){
            if (items.categoryname == 'SITTING AREA-B'){
              this.$emit('firstFloorAmenities', 'domesticFoodCourt.svg')
            } else {
              this.$emit('firstFloorAmenities', 'random')
            }
          } else {
            this.popup = false
           this.popUpOverlay(false);
            if (items.categoryname == 'PRAYER AREA-B') {
              this.$emit('firstFloorAmenities', 'internationalFoodCourt.svg')
            } else if (items.categoryname == 'SITTING AREA-B'){
              this.$emit('firstFloorAmenities', 'internationalFoodCourt.svg')
            } else {
              this.$emit('firstFloorAmenities', 'random')
            }
          }
                
        }
      } 
    },
    mapStyle: debounce(function(){
        let zoneidx = (this.zoneName == 'DOMESTIC DEPARTURE'? 0 : 1)
        let catId = this.items.categoryid
        var currentAminity = methods.getAminitiesData(catId, zoneidx)


      var viewBoxArr = [];
      const svgImage = document.getElementsByTagName("svg")[0];
        $(`.aminities-highlight`).remove();
        let htmlVal = ''
          currentAminity.forEach(element => {
              if(Constants.kioskid==114){
                if(this.zoneName=='DOMESTIC DEPARTURE'){
                  if(this.items.categoryname == 'SITTING AREA-B') {
                    htmlVal += `<g class="aminities-highlight"  id="${element.hotspotid}"> <use transform="translate(${element.hotspotxpos[0].x1} ${element.hotspotypos[0].y1})" xlink:href="#higlightAminity"/><image width="36" height="36" x="${element.hotspotxpos[0].x1 - 18}" y="${element.hotspotypos[0].y1 - 18}"> </g>`
                  } else {
                    htmlVal += `<g class="aminities-highlight"  id="${element.hotspotid}"> <use transform="translate(${element.hotspotxpos[0].x1} ${element.hotspotypos[0].y1})" xlink:href="#higlightAminity"/><image width="6" height="6" x="${element.hotspotxpos[0].x1 - 3}" y="${element.hotspotypos[0].y1 - 3}"> </g>`
                  }
                }  
                else {
                  if(this.items.categoryname == 'PRAYER AREA-B' || this.items.categoryname == 'SITTING AREA-B') {
                    htmlVal += `<g class="aminities-highlight"  id="${element.hotspotid}"> <use transform="translate(${element.hotspotxpos[0].x1} ${element.hotspotypos[0].y1})" xlink:href="#higlightAminity"/><image width="36" height="36" x="${element.hotspotxpos[0].x1 - 18}" y="${element.hotspotypos[0].y1 - 18}"> </g>`
                  } else {
                    htmlVal += `<g class="aminities-highlight"  id="${element.hotspotid}"> <use transform="translate(${element.hotspotxpos[0].x1} ${element.hotspotypos[0].y1})" xlink:href="#higlightAminity"/><image width="6" height="6" x="${element.hotspotxpos[0].x1 - 3}" y="${element.hotspotypos[0].y1 - 3}"> </g>`
                  }
                }
              } 
              else {
                if(this.items.categoryname == 'SITTING AREA-B') {
                    htmlVal += `<g class="aminities-highlight"  id="${element.hotspotid}"> <use transform="translate(${element.hotspotxpos[0].x1} ${element.hotspotypos[0].y1})" xlink:href="#higlightAminity"/><image width="36" height="36" x="${element.hotspotxpos[0].x1 - 18}" y="${element.hotspotypos[0].y1 - 18}"> </g>`
                } else {
                  htmlVal += `<g class="aminities-highlight"  id="${element.hotspotid}"> <use transform="translate(${element.hotspotxpos[0].x2} ${element.hotspotypos[0].y2})" xlink:href="#higlightAminity"/><image width="6" height="6" x="${element.hotspotxpos[0].x2 - 6}" y="${element.hotspotypos[0].y2 - 6}"> </g>`
                }
              }
          });  

        if(this.items.categoryname == 'WASHROOMS-B'){
          if(Constants.kioskid==114){
            if(this.zoneName=='DOMESTIC DEPARTURE'){
              viewBoxArr = [720.3881738335771,365.6959664245878,478.2138682283996,228.6478215648544];
            } else {
              viewBoxArr = [375.09417061884983,379.5130528599353,456.5832373585387,218.30559404688336];
            }
          } else {
            viewBoxArr = [557.2689051237237,323.6580395212538,203.73592143115,97.41201103664332];
          }
          this.$emit('amenitiesViewBox', viewBoxArr);
        } else if(this.items.categoryname == 'CHILD CARE-B'){
          if(Constants.kioskid==114){
            if(this.zoneName=='DOMESTIC DEPARTURE'){
              viewBoxArr = [720.3881738335771,365.6959664245878,478.2138682283996,228.6478215648544];
            } else {
              viewBoxArr = [375.09417061884983,379.5130528599353,456.5832373585387,218.30559404688336];
            }
          } else {
            viewBoxArr = [557.2689051237237,323.6580395212538,203.73592143115,97.41201103664332];
          }
          this.$emit('amenitiesViewBox', viewBoxArr);
        } else if(this.items.categoryname == 'MEDICAL SERVICES-B'){
          if(Constants.kioskid==114){
            if(this.zoneName=='DOMESTIC DEPARTURE'){
              viewBoxArr = [720.3881738335771,365.6959664245878,478.2138682283996,228.6478215648544];
            } else {
              viewBoxArr = [375.09417061884983,379.5130528599353,456.5832373585387,218.30559404688336];
            }
          } else {
            viewBoxArr = [557.2689051237237,323.6580395212538,203.73592143115,97.41201103664332];
          }
          this.$emit('amenitiesViewBox', viewBoxArr);
        }else if(this.items.categoryname == 'ACCESSIBLE/ LEGENT/LADIES-B'){
          if(Constants.kioskid==114){
            if(this.zoneName=='DOMESTIC DEPARTURE'){
              viewBoxArr = [720.3881738335771,365.6959664245878,478.2138682283996,228.6478215648544];
            } else {
              viewBoxArr = [375.09417061884983,379.5130528599353,456.5832373585387,218.30559404688336];
            }
          } else {
            viewBoxArr = [557.2689051237237,323.6580395212538,203.73592143115,97.41201103664332];
          }
          this.$emit('amenitiesViewBox', viewBoxArr);
        } else if(this.items.categoryname == 'WATER FOUNTAIN-B') {
          if(Constants.kioskid==114){
            if(this.zoneName=='DOMESTIC DEPARTURE'){
              viewBoxArr = [720.3881738335771,365.6959664245878,478.2138682283996,228.6478215648544];
            } else {
              viewBoxArr = [375.09417061884983,379.5130528599353,456.5832373585387,218.30559404688336];
            }
          } else {
            viewBoxArr = [557.2689051237237,323.6580395212538,203.73592143115,97.41201103664332];
          }
          this.$emit('amenitiesViewBox', viewBoxArr);
        } else if(this.items.categoryname == 'FIRST AID-B'){
          if(Constants.kioskid==114){
            if(this.zoneName=='DOMESTIC DEPARTURE'){
              viewBoxArr = [720.3881738335771,365.6959664245878,478.2138682283996,228.6478215648544];
            } else{
              viewBoxArr = [424.36408203682277,450.44583500013493,318.84910341869283,152.45093826884036];
            }
          } else {
            viewBoxArr = [557.2689051237237,323.6580395212538,203.73592143115,97.41201103664332];
          }
          this.$emit('amenitiesViewBox', viewBoxArr);
        } else if(this.items.categoryname == 'SMOKING ROOM-B'){
          if(Constants.kioskid==114){
            if(this.zoneName=='DOMESTIC DEPARTURE'){
              viewBoxArr = [720.3881738335771,365.6959664245878,478.2138682283996,228.6478215648544];
            } else {
              viewBoxArr = [375.09417061884983,379.5130528599353,456.5832373585387,218.30559404688336];
            }
          } else {
            viewBoxArr = [557.2689051237237,323.6580395212538,203.73592143115,97.41201103664332];
          }
          this.$emit('amenitiesViewBox', viewBoxArr);
        } else if(this.items.categoryname == 'PRAYER ROOM-B'){
          if(Constants.kioskid==114){
            if(this.zoneName=='DOMESTIC DEPARTURE'){
              viewBoxArr = [720.3881738335771,365.6959664245878,478.2138682283996,228.6478215648544];
            } else {

            }
          } else {
            viewBoxArr = [557.2689051237237,323.6580395212538,203.73592143115,97.41201103664332];
          }
          this.$emit('amenitiesViewBox', viewBoxArr);
        } else if(this.items.categoryname == 'ELEVATOR-B'){
          $(`#dialMap .sitting`).css({ fill: "#878787" });
          if(Constants.kioskid==114){
            if(this.zoneName=='DOMESTIC DEPARTURE'){
              viewBoxArr = [720.3881738335771,365.6959664245878,478.2138682283996,228.6478215648544];
            } else {
              // viewBoxArr = [424.36408203682277,450.44583500013493,318.84910341869283,152.45093826884036];
              viewBoxArr = [375.09417061884983,379.5130528599353,456.5832373585387,218.30559404688336];
            }
          } else {
            viewBoxArr = [557.2689051237237,323.6580395212538,203.73592143115,97.41201103664332];
          }
          this.$emit('amenitiesViewBox', viewBoxArr);
        } else if(this.items.categoryname == 'MONEY EXCHANGE-B'){
          if(Constants.kioskid==114){
            if(this.zoneName=='DOMESTIC DEPARTURE'){
              viewBoxArr = [833.35316978094,452.1048185389667,301.394008173071,144.10515457606735];
            } else {
              viewBoxArr = [424.36408203682277,450.44583500013493,318.84910341869283,152.45093826884036];
            }
          } else {
            viewBoxArr = [557.2689051237237,323.6580395212538,203.73592143115,97.41201103664332];
          }
          this.$emit('amenitiesViewBox', viewBoxArr);
        } else if(this.items.categoryname == 'ATM-B'){
          if(Constants.kioskid==114){
            if(this.zoneName=='DOMESTIC DEPARTURE'){
              viewBoxArr = [833.35316978094,452.1048185389667,301.394008173071,144.10515457606735];
            } else {
              viewBoxArr = [424.36408203682277,450.44583500013493,318.84910341869283,152.45093826884036];
            }
            this.$emit('amenitiesViewBox', viewBoxArr);
          }
        } else if(this.items.categoryname == 'INFORMATION-B'){
          if(Constants.kioskid==114){
            if(this.zoneName=='DOMESTIC DEPARTURE'){
              viewBoxArr = [833.35316978094,452.1048185389667,301.394008173071,144.10515457606735];
            } else {
              // viewBoxArr = [424.36408203682277,450.44583500013493,318.84910341869283,152.45093826884036];
              viewBoxArr = [375.09417061884983,379.5130528599353,456.5832373585387,218.30559404688336];
            }
            this.$emit('amenitiesViewBox', viewBoxArr);
          }
        } else if(this.items.categoryname == 'BABY STROLLER-B'){
          if(Constants.kioskid==114){
            if(this.zoneName=='DOMESTIC DEPARTURE'){
              viewBoxArr = [833.35316978094,452.1048185389667,301.394008173071,144.10515457606735];
            } else {
              viewBoxArr = [424.36408203682277,450.44583500013493,318.84910341869283,152.45093826884036];
            }
            this.$emit('amenitiesViewBox', viewBoxArr);
          }
        } else if(this.items.categoryname == 'FIDS-B'){
          if(Constants.kioskid==114){
            if(this.zoneName=='DOMESTIC DEPARTURE'){
              viewBoxArr = [720.3881738335771,365.6959664245878,478.2138682283996,228.6478215648544];
            } else {
              viewBoxArr = [375.09417061884983,379.5130528599353,456.5832373585387,218.30559404688336];
            }
            this.$emit('amenitiesViewBox', viewBoxArr);
          } else {
            viewBoxArr = [557.2689051237237,323.6580395212538,203.73592143115,97.41201103664332];
          }
        } else if(this.items.categoryname == 'BUGGY-B'){
          if(Constants.kioskid==114){
            if(this.zoneName=='DOMESTIC DEPARTURE'){
              viewBoxArr = [720.3881738335771,365.6959664245878,478.2138682283996,228.6478215648544];
            } else {
              viewBoxArr = [375.09417061884983,379.5130528599353,456.5832373585387,218.30559404688336];
            }
            this.$emit('amenitiesViewBox', viewBoxArr);
          } else {
            viewBoxArr = [557.2689051237237,323.6580395212538,203.73592143115,97.41201103664332];
          }
          
        } else if(this.items.categoryname == 'SITTING AREA-B') {
          if(this.zoneName=='DOMESTIC DEPARTURE'){
             $(`#dialMap .sitting`).css({ fill: "#15BCB7" }).addClass("animateline");
              $(`#dialMap .playArea`).css({ fill: "#f8d381" });
        } else {
           $(`#dialMap .sitting`).css({ fill: "#15BCB7" }).addClass("animateline");
           $(`#dialMap .playArea`).css({ fill: "#f8d381" });
        }
        } else if(this.items.categoryname == 'PRAYER AREA-B') {
           $(`#dialMap .playArea`).css({ fill: "#15BCB7" }).addClass("animateline");
           $(`#dialMap .sitting`).css({ fill: "#f8d381" });
        } else {
          $(`#dialMap .restroom, #Domestic .restroom, #dialMap .waterspout, #dialMap .parentsroom, #Domestic .parentsroom, #dialMap #First_Aid-2 rect, #Domestic #First_Aid-2 rect,#dialMap #Smoking-area rect, #Domestic #Smoking-area rect,#dialMap #Prayer_room-2 rect, #Domestic #Prayer_room-2 rect,#dialMap #Elevator-3 rect, #Domestic #Elevator-3 rect,#dialMap #Drinking_fountain rect, #Domestic #Drinking_fountain rect,#dialMap #ForExch rect, #Domestic #ForExch rect,#dialMap #ATM_S rect,#dialMap #Information_1 rect,#dialMap .sitting,#dialMap .playArea`).removeClass("blink");
          $(`#dialMap #First_Aid-2 polygon, #Domestic #First_Aid-2 polygon`).css({ fill: "#ed1c24" });
          $(`#dialMap #First_Aid-2 rect, #Domestic #First_Aid-2 rect, #dialMap #Smoking-area rect, #Domestic #Smoking-area rect,#dialMap #Prayer_room-2 rect, #Domestic #Prayer_room-2 rect,#dialMap #Elevator-3 rect, #Domestic #Elevator-3 rect,#dialMap #Drinking_fountain rect, #Domestic #Drinking_fountain rect,#dialMap #ForExch rect, #Domestic #ForExch rect,#dialMap #ATM_S rect,#dialMap #Information_1 rect`).css({ fill: "#fff" });
        }
        if(this.items.categoryname != 'SITTING AREA-B' && this.items.categoryname != 'PRAYER AREA-B') 
          this.$emit('amenitiesViewBox', viewBoxArr);
        setTimeout(() => {
          this.$emit("svgOnClickHighlightBrand", currentAminity)
        }, 100)
        try {
          svgImage.innerHTML += htmlVal
        } catch (error) {}
    }, 100)
  },
}
</script>
<style scoped>

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
.amenities-container{
  position: relative;
  /* top: 20px; */
  z-index: 5;
}
.row{
  width: 1518px;
  margin-right: 0px; 
  margin-left: 0px;
}
.aminities{
  font-size: 32px;
  font-family: 'Cervino-ExtraBoldNeue';
  letter-spacing: 0px;
  color: #fff;
  width: 230px;
  height: 100px;
  margin-left: 42px;
  margin-top: 25px;
}
.aminities1{
  font-size: 34px;
  font-family: 'Cervino-ExtraBoldNeue';
  letter-spacing: 0px;
  color: #fff;
  width: 230px;
  height: 100px;
  margin-left: 50px;
  font-weight: bolder;
  position: relative;
  top: 50%;
  transform: translate(0,-50%);
}
.icons{
  margin-left: 220px;
  margin-top: -118px;
}
.aminityBar{
  background-image: url('../assets/aminitybackground.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 1518px;
  height: 200px;
  margin-top: 760px;
}
.categoryBg img{
  width: 91px;
  height: 83px;
  position: absolute;

}
.categoryBg {
  width: 110px;
  height: 90px;
  margin-left: 6px;
}
.verticalLine {
 margin-left: 210px;
 top: 50%;
 transform: translate(0,-50%);
 position: absolute;
}
.aminity-Text{
  font-size: 10px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0px;
  width: 50px;
  text-align: center;
  color: #000;
  margin-top: 56px;

}
.overlay {
  position: fixed;
  display: block;
  height: 715px;
  width: 1518px;
  margin-top: -818px;
  margin-left: 0px;
  background-color: rgba(0,0,0,0.5);
}
</style>
