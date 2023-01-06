<template>
  <div class="explore">
    <div class="bgimg">
     <div class="explore-inner">
      <div class="d-flex">
            <div class=" pr-md-0 ">
              <Boardinginfo :title="'BOARDING'"/>
          </div>
          <div class="verticalLine"></div>
         
           <div class="homeBtn">
                <img  @click="this.$router.push('/')" src="../assets/home.png" alt="">
            </div>
          <div class="">
              <div class="boarding-map" id="svgmapContainer " v-if="this.flightIn== 'INTERNATIONAL'">
                    <Map @zoomReset="zoomReset($event)" v-if="this.flightIn== 'INTERNATIONAL'" :gateNum="gateNum" :mapName="`${internationalMap[0].mapname}`" :zoneName="'INTERNATIONAL DEPARTURE'"  svgid="svgId" :boardingMap="true" :kioskxpos="kioskxpos" :kioskypos="kioskypos" :drawLine="drawLine" :pathPoints="pathPoints" :viewBoxArr="viewBoxArr" :drawPathPoint="drawPathPoint" ref="expmap" />
              </div>    

               <div class="boarding-map-domestic" id="svgmapContainer " v-if="this.flightIn== 'DOMESTIC'">
                   <Map @zoomReset="zoomReset($event)" v-if="this.flightIn== 'DOMESTIC'" :gateNum="gateNum" :mapName="`${domesticMap[0].mapname}`" svgid="svgId" :zoneName="'DOMESTIC DEPARTURE'" :boardingMap="true" :kioskxpos="kioskxpos" :kioskypos="kioskypos" :drawLine="drawLine" :pathPoints="pathPoints" :drawPathPoint="drawPathPoint" :viewBoxArr="viewBoxArr"  ref="expmap"/>
                </div>
                <div class="gates">
              <!--
                <div class="domestic-gate" v-if="this.flightIn== 'DOMESTIC'">
                  <div class="gate-button mb-3" @click="gateZoom('27-36')">
                    <div class="selected-gate" v-if="this.selectedGate == '27-36' && this.select">
                      <label class="gate-text gate-text1">{{gate}}</label>
                      <label class="flight-number">27-36</label>
                    </div>
                    <div class="deselected-gate" v-else>
                      <label class="gate-text gate-text1">{{gate}}</label>
                      <label class="flight-number">27-36</label>
                    </div>
                  </div>
                  <div class="gate-button" @click="gateZoom('37-62')">
                    <div class="selected-gate" v-if="this.selectedGate == '37-62' && this.select">
                      <label class="gate-text gate-text1">{{gate}}</label>
                      <label class="flight-number">37-62</label>
                    </div>
                    <div class="deselected-gate" v-else>
                      <label class="gate-text gate-text1">{{gate}}</label>
                      <label class="flight-number">37-62</label>
                    </div>
                  </div>
                </div>

                <div class="domestic-gate" v-if="this.flightIn== 'INTERNATIONAL'">
                  <div class="gate-button mb-3" @click="gateZoom('15-26')">
                    <div class="selected-gate" v-if="this.selectedGate == '15-26' && this.select">
                      <label class="gate-text gate-text1">{{gate}}</label>
                      <label class="flight-number">15-26</label>
                    </div>
                    <div class="deselected-gate" v-else>
                      <label class="gate-text gate-text1">{{gate}}</label>
                      <label class="flight-number">15-26</label>
                    </div>
                  </div>
                  <div class="gate-button" @click="gateZoom('01-14')">
                    <div class="selected-gate" v-if="this.selectedGate == '01-14' && this.select">
                      <label class="gate-text gate-text1">{{gate}}</label>
                      <label class="flight-number">01-14</label>
                    </div>
                    <div class="deselected-gate" v-else>
                      <label class="gate-text gate-text1">{{gate}}</label>
                      <label class="flight-number">01-14</label>
                    </div>
                  </div>
                </div>
                -->
                  <div  v-if="gatesTimeDetails" >
                    <div>
                     <img  class="flight" src="../assets/flight.png" alt="">
                     <label class="timePannerText">{{timePlanner}}</label>
                    </div>
                    <div class="timeText">{{walkingTime}}</div>
                    <div class="gateTimes">
                      <label class=" pt-2">{{within}} {{this.gateTimeInfo}} {{mins}}</label>
                    </div>
                  </div>

          </div>
            <div class="">
              <Footer  :qrPathValue="qrPathValue" />
            </div>
          </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Boardinginfo from '../components/Boardinginfo.vue'
import Footer from '../components/Footer.vue'
import Language from "@/utils/Language"
import Map from "../components/Map.vue"
import Methods from '@/utils/Methods'
import Constants from '@/utils/Constants'
import ConstLangText from '@/utils/Language'
const ConstText = ConstLangText.readConstValues();

const json = Language.readJson()

export default {
  name: 'Explore',
  components: {
    Boardinginfo,
    Footer,
    Map
  },
  data () {
    return {
      gate: ConstText.gate,
      viewBoxArr: [],
      flightIn: '',
      domesticMap: [],
      internationalMap: [],
      international: false,
      domestic: false,
      pathPoints: '',
      pathPointsDotted: ['', '', '', ''] ,
      kioskPos: [false, false, false, false],
      hotspotPos: [false, false, false, false],
      drawLine: false,
      kioskxpos: 0,
      kioskypos: 0,
      hotspotxpos: 0,
      hotspotypos: 0,
      kioskid: 114,
      zoneid: 0,
      gates: [],
      lineDraw: '',
      gateNum: '',
      selectedGate: '',
      select: false,
      qrPathValue: "",
      tempLanguage: '',
      gatesTimeDetails: false,
      gateTimeInfo: '',
      within: ConstText.within,
      mins: ConstText.mins,
      timePlanner: ConstText.timePlanner,
      walkingTime: ConstText.walkingTime,
    }
  },
  mounted() {
    //  Constants.isScanQr = false
    this.viewBoxArr = [];
      this.flightIn = this.$route.params.flightIn.toUpperCase()
      this.gateNum = this.$route.params.gateNum
      let num = this.gateNum
      let gateVal = num.replace(/\D/g,'')
    
      // internationalmap loading
      if(this.flightIn=='INTERNATIONAL'){
        let floors = json.park[0].zone[1].building[0].floor
 
        let internationalMap = []  

        for(let i in floors) {
          var mapname = ''
          if(Constants.kioskid == 114){
            mapname = floors[i].mapname.pri
          } else {
            mapname = floors[i].mapname.dom
          }
            internationalMap.push({"floorid": floors[i].floorid, "mapid": floors[i].mapid, "mapname": mapname, "floorname": floors[i].floorname, "floornumber": floors[i].floornumber })
        }
        this.internationalMap = internationalMap
        

      }
      else{
        let floor = json.park[0].zone[0].building[0].floor
        let domesticMap = []
        for(let i in floor) {
          var mapname = ''
          if(Constants.kioskid == 114){
            mapname = floor[i].mapname.pri
          } else {
            mapname = floor[i].mapname.dom
          }
              domesticMap.push( {"floorid": floor[i].floorid, "mapid": floor[i].mapid, "mapname": mapname, "floorname": floor[i].floorname, "floornumber": floor[i].floornumber })
        }
        this.domesticMap = domesticMap 
      }

      //domesticmap loading
      


      //kioskposition
      let objVal = json.park[0].zone[0].building[0].floor
      let floorData = []
        for(let i=0; i<objVal.length; i++) {
          let kioskPos = objVal[i].kiosklist
          for(let j=0; j<kioskPos.length; j++){
            floorData.push({"kioskid": kioskPos[j].kioskid , "kioskxpos": kioskPos[j].kioskxpos, "kioskypos": kioskPos[j].kioskyspos})
          }
        }
      this.kioskxpos = floorData[0].kioskxpos
      this.kioskypos = floorData[0].kioskypos

  var gateCatId = Constants.gateCatId
  let park = json.park[0].zone
  if(this.flightIn == 'DOMESTIC'){
    this.zoneid = park[0].zoneid;
  }
  else if(this.flightIn == 'INTERNATIONAL'){
    this.zoneid = park[1].zoneid;
  }
  let depArr = []
      for(let i=0; i<park.length; i++){
        if(park[i].zoneid == this.zoneid) {
          let floor = park[i].building[0].floor
          for(let j=0; j<floor.length; j++){
              let hotspotlist = floor[j].hotspotlist
              for(let k=0; k<hotspotlist.length; k++){
            if(gateCatId == floor[j].hotspotlist[k].categoryid) {
              depArr.push({"hotspotid":floor[j].hotspotlist[k].hotspotid, "hotspotname": floor[j].hotspotlist[k].hotspotname,"icon": floor[j].hotspotlist[k].hotspoticon, "description": floor[j].hotspotlist[k].hotspotdescription,"svggroupid":  floor[j].hotspotlist[k].svggroupid, "hotspotdisplayname": floor[j].hotspotlist[k].hotspotdisplayname, "hotspotxpos": floor[j].hotspotlist[k].hotspotxpos, "hotspotypos": floor[j].hotspotlist[k].hotspotypos, "path": floor[j].hotspotlist[k].path})
              }
          }
        }
      }
      }
     this.gates = depArr
     this.getFloorData(this.gates)

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
           $(`.gate-button`).addClass("gate-text1");
        } else {
           $(`.gate-button`).removeClass("gate-text");
        }
  },
  methods: {
    reposition(viewBoxArr){
        this.$refs.expmap.mapViewBox(viewBoxArr);
    },
    zoomReset(val){
      this.select = val;
    },
    gateZoom(gateVal){
      this.select = true;
      if(gateVal == '27-36'){
        if(Constants.kioskid==114){
          this.$refs.expmap.mapViewBox([399.1911047709147, -3.5757162129775266, 919.8490134930673, 520.8065997259308])
        } else {
          this.$refs.expmap.mapViewBox([238.88342654825846,-21.4218771016494,855.8490134930673,520.8065997259308])
        }
        this.selectedGate = '27-36';
      }
      else if(gateVal == '37-62'){
        if(Constants.kioskid == 114){
          this.$refs.expmap.mapViewBox([95.43257747587279, 320.05822757891207, 931.5695786585671, 445.4102420439198])
        } else {
          this.$refs.expmap.mapViewBox([-29.49039615693971,300.6736145418027,867.5695786585671,477.4102420439198])
        }
        this.selectedGate = '37-62';
      }
      else if(gateVal == '01-14'){
        this.$refs.expmap.mapViewBox([754.5832508074845, 414.62847013783113, 745.4813393360213, 422.0818806168696])
        this.selectedGate = '01-14';
      }
      else if(gateVal == '15-26'){
        this.$refs.expmap.mapViewBox([347.82993121329264, 37.00297241960615, 892.6298365405628, 505.3954542139732])
        this.selectedGate = '15-26';
      }

    },
    drawPathPoint(){
      document.getElementsByTagName("svg")[0].innerHTML += `<polyline class="path" points="${this.pathPoints}" style="" />`;
          
            if(Constants.kioskid == 114) {
              if(gateVal >= 1 && gateVal <= 14 && this.flightIn=='INTERNATIONAL'){
                viewBox = {x: 398.82993121329264, y: 217.00297241960615, w: 892.6298365405628, h: 505.3954542139732 }
              } else if(gateVal >= 15 && gateVal <= 26 && this.flightIn=='INTERNATIONAL'){
                viewBox = {x: 398.82993121329264, y: 90.00297241960615, w: 52.6298365405628, h: 605.3954542139732 }
              }
              else if(gateVal >= 27 && gateVal <= 36 && this.flightIn=='DOMESTIC'){
                viewBox = {x: 355.1911047709147, y: 45.5757162129775266, w: 982.8490134930673, h: 520.8065997259308}
              } else if(gateVal >= 37 && gateVal <= 62 && this.flightIn=='DOMESTIC'){
                viewBox = {x: 308.82993121329264, y: 180.00297241960615, w: 692.6298365405628, h: 505.3954542139732 }
              }
            } else {
              if(gateVal >= 27 && gateVal <= 36 && this.flightIn=='DOMESTIC'){
                viewBox = {x: 195.43257747587279, y: 10.05822757891207, w: 731.5695786585671, h: 445.4102420439198 }
              } else if(gateVal >= 37 && gateVal <= 62 && this.flightIn=='DOMESTIC'){
                viewBox = {x: 85.82993121329264, y: 187.00297241960615, w: 702.6298365405628, h: 505.3954542139732 }
              }
            }
      // if(Constants.kioskid==114){
      //   if(this.flightIn=='DOMESTIC'){
      //     // this.reposition([47.6922607421875,-53.84619140625,1646,787]);
      //   } else {
      //     // this.reposition([136.923095703125,-32.30767822265625,1646,787]);
      //   }
      // } else {
      //   this.reposition([-133.68598691406254,-23.023059277343748,1417.8012125,708.4918312499999]);
      // }
    },
     getFloorData(hotspotData) {
       console.log('hotspotData',hotspotData);
      let hotspotid = 0
       if(this.gateNum!=''){
        let gateNumbers = []
          for(let i=0; i<hotspotData.length; i++) {
            if(this.gateNum == hotspotData[i].hotspotname) {
              gateNumbers.push(hotspotData[i])
            }
          }
          // if(this.flightIn == 'DOMESTIC'){
          //   this.pathPoints = gateNumbers[0].path
          // }
          // else if(this.flightIn == 'INTERNATIONAL'){
          //   this.pathPoints = gateNumbers[0].path
          // }
          this.drawLine = true
          this.hotspotPos = false
        
          // let kioskfloorno = Methods.getKioskFloorNo()
          // if(kioskfloorno == 0 ) {
          try {
            document.getElementsByTagName("polyline")[0].remove();
          } catch (error) {
            
          }
          try {
            gateNumbers[0].path.forEach(element => {
              if(element.kioskid == Constants.kioskid)
                // this.pathPoints = element.pathpoints
                 
                  this.pathPoints = element.pathpoints;
                // setTimeout(()=> {
                //   document.getElementsByTagName("svg")[0].innerHTML += `<polyline class="path" points="${element.pathpoints}" style="" />`;
                // },500)
                // $("svg").append(`<polyline class="path" points="${element.pathpoints}" style="" />`)
  
            });            
            this.hotspotxpos = (gateNumbers[0].hotspotxpos - 30)
            this.hotspotypos = (gateNumbers[0].hotspotypos - 60)
            this.qrcodeValue = gateNumbers[0].hotspotname 
            hotspotid = gateNumbers[0].hotspotid
            this.gateTimeInfo = gateNumbers[0].description
            this.gatesTimeDetails = true
          } catch (error) {
            
          }

          this.kioskPos = true
          this.hotspotPos = true
          this.lineDraw = setTimeout(() => {
            this.drawLine = true
          }, 1100)

          // }
        }
        let dtype = (this.flightIn == 'DOMESTIC' ? 'dm' : 'in');
        let params = `kid=${Constants.kioskid}&hid=${hotspotid}&d=${dtype}`
        let url = encodeURI(`${Constants.mapMobileUrl()}?${params}`)
        // console.log(url);
        this.qrPathValue = url
      }
  }
}
</script>
<style scoped>

.gates{
  position: absolute;
  top: 84px;
  left: 776px;
  width: 212px;
}
.selected-gate{
  background-image: url('../assets/gateyellow.png');
}
.deselected-gate{
  background-image: url('../assets/gateblue.png');
}
.homeBtn{
  position: absolute;
  z-index: 5;
  left: 1799px;
  top: 40px;
}

.boarding-map{
  position: relative;
  height: 752px;
  width: 1228px;
  z-index: 0;
  background-image: url('../assets/mapBg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}
#zoompanContainer{
    top: -2px;
    left: -2px; 
    height: 752px;
    width: 1228px;
    z-index: 0;
    overflow: auto
}
.boarding-map-domestic{
  position: relative;
  left: 0px;
  top: 0px;
  height: 752px;
  width: 1228px;
  z-index: 0;
  background-image: url('../assets/mapBg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;

} 
.footer{
  position: absolute;
  height: 171px;
  width: 1228px;
  left: 500px;
  top: 500px;
 
}
.gate-text{
  font-family: 'Cervino-BoldNeue';
  position: relative;
  font-size: 24px;
  top: 2px;
  left: 11px;
  color: white;
}
.gate-text1{
 font-family: 'Cervino-BoldNeue';
  position: relative;
  font-size: 24px;
  top: 2px;
  left: 18px;
  color: white;
}
.flight-number{
  font-family: 'Cervino-BoldNeue';
  position: relative;
  font-size: 30px;
  top: 4px;
  left: 66px;
  color: black;
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
.bgimg{
  background-image: url('../assets/Background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  height: 1080px;
  width: 1920px;
  bottom: 0px;
}
.verticalLine{
    border-left: 3px dashed #809BCE;
    height: 969px;
}
.path {
    stroke-dasharray: 1600;
    /* stroke-dashoffset: 0; */
    animation: dash 20s linear infinite;
    animation-iteration-count: 1;
    fill:none;
    stroke:red;
    stroke-width: 2;
}

@keyframes dash {
  from {
    stroke-dashoffset: 1550;
  }
  to {
    stroke-dashoffset: 0;
  }
}
.gate-button{
  z-index: 3;
}
.flight{
    height: 56px;
    width: 60px;
    top: -30px;
    left: -45px;
    position: absolute;
    z-index: 12;
}
.timePannerText{
    height: 56px;
    width: 200px;
    top: -37px;
    left: 26px;
    position: absolute;
    font-size: 40px;
    text-align: center;
    color: #000;
    border-bottom: solid 4px #000000;
    display: inline;
    padding-bottom: 8px;
    font-family: 'Cervino-BoldNeue';
}
.gateTimes{
    height: 56px;
    width: 250px;
    top: 115px;
    left: -52px;
    position: absolute;
    background-image: url('../assets/timerBg.png');
    background-repeat: no-repeat;
    background-position: center;
    font-size: 28px;
    text-align: center;
    color: #000;
    font-family: 'Cervino-BoldNeue';
}
.timeText{
    width: 350px;
    top: 35px;
    left: -50px;
    position: absolute;
    font-size: 24px;
    color: #f2be1f;
    font-family: 'Cervino-BoldNeue';
}
</style>
