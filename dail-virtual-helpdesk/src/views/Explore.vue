<template>
<div class="loader" v-if="loading[0]">
  <img src="@/assets/loading.gif" alt="">
</div>

<div class="explore">
  <div class="bgimg">
    <div class="explore-inner">
          <div class="mapBg">
          </div>
            <div class="">
               <div class="homeBtn col-1">
                  <img  @click="reset()" src="../assets/home.png" alt="">
                </div>
                <div class="searchbtn col-1" id="search" @click="searchForBrands(this.zoneName)" >
                  <img class="searchIcon" src="../assets/searchbtn.png" alt="">
                </div>
                                    
                 <!-- <div style="padding:20px" id="popupoverlay" class="overlay1" v-if="popup && this.fullMap == true">
                     <h2 class="successMsg">{{selectDept}}</h2>
                  </div>-->
                   <div style="padding:20px" id="popupoverlay" class="pinchZoomPopup" v-if="pinchZoomPopup == true ">
                     <h2 class="successMsg">All Maps have Pinch and Zoom</h2>
                  </div>
                  
                <div class="navigationImg" v-if="showNavigationImg">
                  <img src="../assets/navigation.png" alt="">
                </div>
                <div class="mapSection">
               
                  <div class="headingText" v-if="showHeading" >{{headingText}}</div>
                  <div class="FloorText" v-if="showHeading && (svgMapName=='domesticFoodCourt.svg' || svgMapName=='internationalFoodCourt.svg')" >
                    <label class="floorNumber">1</label>
                      <label class="floorDesc">LEVEL</label>
                  </div>
                  <div class="map-holder" id="svgContainer zoomContainer">
                    
                    <ExploreMaps v-if="svgMapToggle" :mapName="svgMapName" svgid="svgId" :zoneName="zoneName"    :mapHighlight="mapHighlight" :isFromAmenities="isFromAmenities" ref="expmap" :viewBoxArr="viewBoxArr" :loading="loading" >
                    </ExploreMaps>
                       
                  </div>
                  <div class="gates" id="gateNum" v-if="gatesInfo && zoneName=='DOMESTIC DEPARTURE'">
                    <p class="title">{{headingText}}</p>
                    <p class="gates-v" @click="gateData(1)" >27-36</p>
                    <p class="gates-h" @click="gateData(2)" >37-62</p>
                  </div>
                  <div class="gates" id="gateNum" v-if="gatesInfo && zoneName=='INTERNATIONAL DEPARTURE'">
                    <p class="title">{{headingText}}</p>
                    <p class="gates-v" @click="gateData(3)" >1-14</p>
                    <p class="gates-h" @click="gateData(4)" >15-26</p>
                  </div>

                  <div  v-if="gatesTimeDetails" >
                    <div>
                     <img  class="flight" src="../assets/flight.png" alt="">
                     <label class="timePannerText">{{timePlanner}}</label>
                    </div>
                    <div class="timeText">{{walkingTime}}</div>
                    <div class="gateTimes">
                      <label class=" pt-2"> {{within}} {{this.gateTimeInfo}} {{mins}}</label>
                    </div>
                  </div>
                </div>
                 
               <div v-if="zoneName=='INTERNATIONAL DEPARTURE' && hideMap==true" @click="loadDepartureMap(this.zones[0],true)" class="internationalText" >{{domesticZoneText}}</div>
               <div class="" v-if="name=='none' && hideMap==true && kioskid == 114">
                  <img class="downarrow" src="../assets/downarrow.png" alt="">
                  <div class="switchDept">{{switchDept}}</div>
               </div>
               <div v-if="zoneName=='DOMESTIC DEPARTURE' && hideMap==true && kioskid == 114" @click="loadDepartureMap(this.zones[1],true)" class="internationalText" >{{internationalZoonText}}</div>
                <div class="quitBtn">
                  <button  @click="this.$router.push('/')" type="" value="">{{quitBtn}}</button>
                </div>
            </div>
          <div class="categories">

            <Categories :categoryData='categoryData' :gates="gates" :popUpOverlay="popUpOverlay" :aminitiesData='aminitiesData' :retailData='retailData' :categories='categories' :zonenames='zonenames' :category='category'  :search="search" :resetColor="resetColor" :headingText="headingText" ref="categoriesRef"/>
          </div>
          <div class="Displayad">
            <div class="adImg"></div>
            </div>
              <div class="bottom-display-main bottom-display" id="bottom-disp">
                  <Amenities v-if="show=='amenities'" @firstFloorAmenities="firstFloorAmenities($event)"  :zoneName="zoneName"   @openFindWay="openFindWay($event)"  @svgOnClickHighlightBrand="svgOnClickHighlightBrand" :horizontalIcons="horizontalIcons"  :popUpOverlay="popUpOverlay" :catChanged="catChanged" ref="amenitiesRef" @amenitiesViewBox="amenitiesViewBox($event)" :resetColor="resetColor"/>
              </div>
              <Findway @closeDesc="closeDesc($event)" @openFindWay="openFindWay($event)" :description = "descriptionData"   v-if="this.findWay"></Findway>

              <!-- <div class="aminities-retails" id="aminity-retail"> -->
                  <div class="retails" id="retail-brands" v-if="this.show!='brandDetail'">
                    <RetailBrands @retailDetail="retailDetail($event)" v-if="show=='retail'" :retailBrands="retailBrands" :brands="brands"/>
                  </div>
                  <div class="retails" v-if="this.show=='brandDetail'">
                    <!-- This is for the directions to the brands -->
                    <!-- <div class="">
                      <div class="brands-direction" v-for="(brandDir,index) in brandDirection" :key="index">
                        <label class="direction-holder" for="brands-direction">{{brandDir}}</label>
                      </div>
                    </div> -->
                    
                    <img class="line" src="@/assets/line.svg" alt="">
                    <div class="qr-code">
                      <label class="qr-text mt-5 pt-2" for="qr-code">{{scanDirection}}</label>
                      <img class="imgs"  :src="require('../assets/Scanthedirection.png')" >
                      <div class="qr-container">
                        <qrcode-vue class="qr-image" :value="qrPathValue" size="135" />
                      </div>
                    </div>
                  </div>
              <!-- </div>     -->
            <div v-if="showArrows" class="left-bg" @click="previousBrands">
              <img :src="require(`@/assets/${leftArrow}`)" >
            </div>
             <div v-if="showArrows" class="right-bg" @click="nextBrands">
              <img :src="require(`@/assets/${rightArrow}`)" >
            </div>
           
    </div>
     <Search v-if="search" :zoneName="zoneName" @closeOverlay="closeOverlay($event)" @openFindWay="openFindWay($event)"  :categoryData="categoryData"></Search>
  </div>
</div>

</template>

<script>
import Amenities from '../components/Amenities.vue'
import RetailBrands from '../components/RetailBrands.vue'
import Categories from '../components/map/Categories.vue'
import SimpleKeyboard from '../components/SimpleKeyboard.vue'
import Search from'../components/Search.vue'
import Findway from '../components/Findway.vue'
import Language from "@/utils/Language"
import ExploreMaps from "../components/ExploreMaps.vue"
import ConstLangText from '@/utils/Language'
import $ from 'jquery'
import Methods from '@/utils/Methods'
import Constants from '@/utils/Constants'
import PlaylistScalaVariables from '@/utils/PlaylistScalaVariables'
import QrcodeVue from 'qrcode.vue'
const ConstText = ConstLangText.readConstValues()

const json = Language.readJson()
let clearTimeOutArr = ''

export default {
  name: 'Explore',
  components: {
    Amenities,
    RetailBrands,
    Categories,
    SimpleKeyboard,
    ExploreMaps,
    Findway,
    QrcodeVue,
    Search
  },
  emits: ["closeDesc","openFindWay"],
  props: ['', ''],
  data () {
    return {
      loading: [true],
      pinchZoomPopup: false, 
      // domesticZoneText: 'DOMESTIC DEPARTURE',
      selectDept: ConstText.selectDept,
      domesticZoneText: ConstText.domesticZoneText,
      internationalZoonText: ConstText.internationalZoonText,
      scanDirection: ConstText.scanDirection,
      formSubmitMsg: false,
      showHeading: false,
      search: false,
      headingText: '',
      svgMapName: '',
      showNavigationImg: false,
      zones: [],
      svgMapToggle: false,
      showKeyboard: false,
      horizontalIcons: [],
      categories: [],
      retailBrands: [],
      input: '',
      inputid: '',
      popup: false,
      cData: 'none',
      name: 'none',
      mapname: '',
      zonenames: '',
      category: true,
      hideMap: true,
      internationalzone: [],
      parks: [],
      show: 'amenities',
      categoryMaps: '',
      zoneId: '',
      quitBtn: ConstText.quitBtn,
      timePlanner: ConstText.timePlanner,
      walkingTime: ConstText.walkingTime,
      switchDept: ConstText.switchDept,
      within: ConstText.within,
      mins: ConstText.mins,
      svgMapCategory1: false,
      svgMapCategory2: false,
      svgCategoryMapName1: '',
      svgCategoryMapName2: '',
      gatesInfo: false,
      activeGatesId: 0,
      leftArrow: 'left_arrow.png',
      rightArrow: 'right_arrow.png',
      timerbox: 'timerBg.png',
      gatesTimeDetails: false,
      gateTimeInfo: '',
      viewBrandsIndex: 0,
      brands: [],
      showArrows: false,
      categoryCheck: [],
      tempLanguage: '',
      zoneName: '',
      kioskid: Constants.kioskid,
      kioskxpos: 0,
      kioskypos: 0,
      hotspotxpos: 0,
      hotspotypos: 0,
      kioskxposMain: 940,
      kioskyposMain: 740,
      fullMap: false,
      findWay: false,
      kioskPos: false,
      hotspotPos: false,
      drawLine: false,
      pathPoints: '',
      pathPointsDotted: ['', '', '', ''],
      lineDraw: '',
      descriptionData: [],
      formSubmitMsg: false,
      brandDirection: [],
      qrPathValue: "",
      foodCourt: false,
      isFromAmenities: false,
      resetColor: false,
      viewBoxArr: [],
      catChanged: [false],
      currentAminity: []
    }
  },
   mounted () {
     
      Constants.isScanQr = false
      let category = json.category
      let horizantalArr = []
      let vertArr = []
      for(let i in category) {
			let tempVal = category[i].categoryname.split('-')
			if(tempVal[tempVal.length -1] != 'B') {
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
        if(category[i].categoryname == 'RETAIL BRANDS')
          category[i].diplayName = 'RETAIL BRANDS'
        if(category[i].categoryname == 'F & B BRANDS')
          category[i].diplayName = 'F & B BRANDS'
        if(category[i].categoryname == 'GATES')
          category[i].diplayName = 'GATES'
        if(category[i].categoryname == 'AMENITIES')
          category[i].diplayName = 'AMENITIES'
          
        if (this.tempLanguage == 'hn') {
          if(category[i].categoryname == 'RETAIL BRANDS')
            category[i].diplayName = 'परचून ब्रांडों'
          if(category[i].categoryname == 'F & B BRANDS')
            category[i].diplayName = 'खाद्य और पेय ब्रांडो'
          if(category[i].categoryname == 'GATES')
            category[i].diplayName = 'द्वार'
          if(category[i].categoryname == 'AMENITIES')
            category[i].diplayName = 'सुविधाएं'
        }
				vertArr.push(category[i])
    
      } else 
				horizantalArr.push(category[i])
		}
    this.horizontalIcons = horizantalArr
    this.categories = vertArr
    this.categoryCheck.push('RETAIL BRANDS')
    this.categoryCheck.push('F & B BRANDS')
    this.categoryCheck.push('GATES')
    this.categoryCheck.push('AMENITIES')
    let zones = []
    zones.push({"zoneid": json.park[0].zone[0].zoneid, "zonename": json.park[0].zone[0].zonename})
    zones.push({"zoneid": json.park[0].zone[1].zoneid, "zonename": json.park[0].zone[1].zonename})
    this.zones = zones
    if(Constants.kioskid !=114){
      this.zoneId = json.park[0].zone[0].zoneid;
      this.zoneName = 'DOMESTIC DEPARTURE'
      this.fullMap = false;
      this.svgMapName = json.park[0].zone[0].building[0].floor[0].mapname.dom
      this.loadDepartureMap(this.zones[0],true);
     } 
     else {
      // this.svgMapName = json.park[0].mapname
      this.zoneId = json.park[0].zone[0].zoneid;
      this.zoneName = 'DOMESTIC DEPARTURE'
      this.fullMap = false;
      this.svgMapName = json.park[0].zone[0].building[0].floor[0].mapname.pri
      this.loadDepartureMap(this.zones[0],true);
      this.pinchZoomPopup = true;
      setTimeout(()=>{
         this.pinchZoomPopup = false;
      }, 3000)
      this.svgMapToggle = true
     }

    
    var kioskData = Methods.getKioskPossision();
    this.kioskid = kioskData.kioskid
    this.kioskxpos = (kioskData.kioskxpos - 75)
    this.kioskypos = (kioskData.kioskypos - 75)
        
      clearTimeOutArr = setTimeout(() => { 
        this.formSubmitMsg = true
        }, 1000 * 2)
        this.formSubmitMsg = false
  },

  methods: {
      
    amenitiesViewBox(val){
      //This is used to position the map on click of amenities.
      // console.log('-----here-----',val);
      this.$refs.expmap.mapViewBox(val);
    },
    mapHighlight(){
      if((this.svgMapName == 'internationalFoodCourt.svg' || this.svgMapName == 'domesticFoodCourt.svg') ) {
        // this.resetColor = false
      }
      // else {
      //   this.resetColor = true
      // }
      if(!this.resetColor){
        this.$refs.amenitiesRef.mapStyle();
      }
      this.isFromAmenities = false
    },
  
    firstFloorAmenities(val){
      this.gatesInfo=false;
      this.gatesTimeDetails = false;
      this.showHeading=true;
      this.hideMap = false;
      if(this.tempLanguage == 'hn'){
        this.headingText='सुविधाएं';
      } else {
        this.headingText='AMENITIES';

      }
      if(val == 'internationalFoodCourt.svg'){
        if(this.svgMapName!='internationalFoodCourt.svg'){
          this.isFromAmenities = true;
          this.svgMapName = val;
          this.viewBoxArr = [];
          this.svgMapToggle = false
          clearTimeOutArr = setTimeout(()=>{ this.svgMapToggle = true },200)
        }
      } else if(val == 'domesticFoodCourt.svg') {
        if(this.svgMapName!='domesticFoodCourt.svg'){
          this.isFromAmenities = true;
          this.viewBoxArr = [];
          this.svgMapName = val;
          this.svgMapToggle = false
          clearTimeOutArr = setTimeout(()=>{ this.svgMapToggle = true },200)
        }
      } else {
        if(this.svgMapName=='domesticFoodCourt.svg' ){
          this.isFromAmenities = true;
          this.viewBoxArr = [];
          this.svgMapToggle = false
          this.loadDepartureMap(this.zones[0],false);
        } else if(this.svgMapName=='internationalFoodCourt.svg' ){
          this.isFromAmenities = true;
          this.viewBoxArr = [];
          this.loadDepartureMap(this.zones[1],false);
        }
      }
    },
    popUpOverlay(val){
      // this.popup = val;
      // console.log('popup', val)
      //  var element = document.getElementById("bottom-disp");
      //   element.classList.remove("bottom-display");
    },
    searchForBrands(zoneName) {
      this.search = true
      $('.map-holder').css({'z-index':'0'});
      if(this.fullMap){
        // this.popup = true
      } else {
        if(this.svgMapName=='domesticFoodCourt.svg' ){
          this.loadDepartureMap(this.zones[0],false);
          this.viewBoxArr = [];
        } else if(this.svgMapName=='internationalFoodCourt.svg' ){
          this.loadDepartureMap(this.zones[1],false);
          this.viewBoxArr = [];
        }
        
        this.showArrows = false;
          
        $(`#gateNum`).addClass("gatesOverlay");
        var element = document.getElementById("search");
        element.classList.add("searchbtnOverlay");
        var element = document.getElementById("bottom-disp");
        element.classList.remove("bottom-display");
        // var element = document.getElementById("aminity-retail");
        // element.classList.remove("aminities-retails");
      }
    },
    retailDetail(data){
      this.findWay=true
      this.descriptionData = data
    },
    openFindWay(hotspotData){
      this.$refs.categoriesRef.reColor();
      this.show = 'brandDetail';
      this.showArrows = false;
      this.gatesInfo = false;
      this.hideMap = false
      var kioskFloorNumber = Methods.getKioskFloorNo();
      var hotspotFloorNumber = Methods.getHotspotFloorNo(hotspotData.hotspotid);
    
      if(Constants.kioskid==114 && hotspotData.catId != 122){
        if(this.zoneName == 'DOMESTIC DEPARTURE'){
          this.$refs.expmap.mapViewBox([560.4896373213941, 356.7826995786487, 624.983961725042, 298.82282981628674])
        }
        else if(this.zoneName == 'INTERNATIONAL DEPARTURE'){
          this.$refs.expmap.mapViewBox([376.1529913714697, 332.3268451097184, 698.5820638492881, 334.0122018526059])
        }
      } else {
        this.$refs.expmap.mapViewBox([283.48963732139407, 322.7826995786487, 624.983961725042, 298.82282981628674])
      }
    
      if(hotspotData.catId == 110) {
        if(this.tempLanguage == 'hn'){
          $(`.aminities-highlight`).remove();
          $(`#dialMap .aminities-highlight`).remove();
          this.headingText = 'परचून ब्रांडों'
          this.gatesTimeDetails = false
        }
        else{
          $(`.aminities-highlight`).remove();
          $(`#dialMap .aminities-highlight`).remove();
          this.headingText = 'RETAIL BRANDS'
          this.show = 'brandDetail';
          this.showArrows = false;
          this.gatesTimeDetails = false
        }
          this.showHeading = true
          this.gatesTimeDetails = false
         
      }
      else if(hotspotData.catId == 120 ) {
        if(this.tempLanguage == 'hn'){
          $(`.aminities-highlight`).remove();
          $(`#dialMap .aminities-highlight`).remove();
          this.headingText = 'खाद्य और पेय ब्रांडो'
          this.gatesTimeDetails = false
        }
        else{
          $(`.aminities-highlight`).remove();
          $(`#dialMap .aminities-highlight`).remove();
          this.headingText = 'F & B BRANDS'
          this.show = 'brandDetail';
          this.showArrows = false;
          this.gatesTimeDetails = false
        }
          this.showHeading = true
          this.gatesTimeDetails = false
      }
      else if(hotspotData.catId == 122 ) {
       if(this.tempLanguage == 'hn'){
          $(`.aminities-highlight`).remove();
          $(`#dialMap .aminities-highlight`).remove();
          this.headingText = 'द्वार'
          this.showHeading = true
          this.showArrows = false;
          this.gatesInfo = true;
          this.gatesTimeDetails = true
          this.hideMap = false
          this.gateTimeInfo = hotspotData.description
        }
        else{
          $(`.aminities-highlight`).remove();
          $(`#dialMap .aminities-highlight`).remove();
          this.headingText = 'GATES'
          this.showArrows = false;
          this.gatesInfo = true;
          this.showHeading = true
          this.gatesTimeDetails = true
          this.hideMap = false
          this.gateTimeInfo = hotspotData.description
        }
        this.showHeading = false
        if(Constants.kioskid==114){
        if(this.zoneName == 'DOMESTIC DEPARTURE'){
          //  this.$refs.expmap.mapViewBox([560.4896373213941, 356.7826995786487, 624.983961725042, 298.82282981628674])
         this.$refs.expmap.mapViewBox([0,0,1646,787]);
        }
        else if(this.zoneName == 'INTERNATIONAL DEPARTURE'){
            // this.$refs.expmap.mapViewBox([376.1529913714697, 332.3268451097184, 698.5820638492881, 334.0122018526059])
          this.$refs.expmap.mapViewBox([0,0,1646,787]);
        }
      } else {
        
        // this.$refs.expmap.mapViewBox([283.48963732139407, 322.7826995786487, 624.983961725042, 298.82282981628674])
        this.$refs.expmap.mapViewBox([-239.53205625000004,-31.330737499999998,1481.8012125,708.4918312499999]);
      }
      }
      this.search = false
      this.brandDirection = hotspotData.hotspotdisplayname.description;
     
      clearTimeOutArr = setTimeout(() => {
          this.drawLine =  false         
      }, 10);
      var element = document.getElementById("search");
        element.classList.remove("searchbtnOverlay");
      var element = document.getElementById("bottom-disp");
        element.classList.remove("bottom-display");
      this.hotspotPos = false
      try {
        document.getElementsByTagName("polyline")[0].remove();
      } catch (error) {        
      }

      if(kioskFloorNumber == hotspotFloorNumber ) {
          hotspotData.path.forEach(element => {
              if(element.kioskid == Constants.kioskid){
                this.pathPoints = element.pathpoints 
                if(Constants.kioskid == 114){
                      document.getElementsByTagName("svg")[0].innerHTML += `<polyline class="path" points="${element.pathpoints}" style="" /> `;
                       setTimeout(()=>{
                        this.drawpathForAminities();
                      })
                } else {
                  document.getElementsByTagName("svg")[0].innerHTML += `<polyline class="path3" points="${element.pathpoints}" style="" /> <use xlink:href="#kiosk-img"/>`;
                   setTimeout(()=>{
                        this.drawpathForAminities();
                      })
                }
              }
                  
          });
          
      } else {
        var transitPathPoints =  Methods.getTransitPathPoints(kioskFloorNumber, hotspotFloorNumber, hotspotData.hotspotid, this.zoneName);
        this.pathPoints = transitPathPoints.map1points.path.pathpoints 
        let pathPoints = transitPathPoints.map1points.path.pathpoints 
                
          if(Constants.kioskid == 114){
            if((this.headingText == "AMENITIES") || (this.headingText=='सुविधाएं')){
              this.amenitiesFirstFloorPathDraw(hotspotData)
               setTimeout(()=>{
                        this.drawpathForAminities();
                      })
            } else {
              document.getElementsByTagName("svg")[0].innerHTML += `<polyline class="path" points="${pathPoints}" style="" /> `;
               setTimeout(()=>{
                        this.drawpathForAminities();
                      })
            }
           
          } else {
            if((this.headingText == "AMENITIES") || (this.headingText=='सुविधाएं')){
              this.amenitiesFirstFloorPathDraw(hotspotData)
               setTimeout(()=>{
                 this.drawpathForAminities();
               })
            } else {
             document.getElementsByTagName("svg")[0].innerHTML += `<polyline class="path2" points="${pathPoints}" style="" /> <use xlink:href="#kiosk-img"/>`;
              setTimeout(()=>{
                this.drawpathForAminities();
              })
            }
          }
        
        if(Constants.kioskid==114){
          clearTimeOutArr = setTimeout(()=>{
            this.svgMapName = transitPathPoints.map2points.mapname.dom
            this.svgMapToggle = false
            try {
              document.getElementsByTagName("polyline")[0].remove();
            } catch (error) {        
            }
            clearTimeOutArr = setTimeout(() => { 
              this.svgMapToggle = true
              pathPoints = transitPathPoints.map2points.path.pathpoints
              clearTimeOutArr = setTimeout(()=>{
                if((this.headingText == 'AMENITIES') || (this.headingText=='सुविधाएं')) {
                    const svgImage = document.getElementsByTagName("svg")[0];
                    let htmlVal = ''
                    this.currentAminity.forEach(element => {
                      if(this.zoneName=='DOMESTIC DEPARTURE'){
                          $(`#dialMap .sitting`).css({ fill: "#15BCB7" }).addClass("animateline");
                        htmlVal += `<g class="aminities-highlight"  id="${element.hotspotid}"> <use transform="translate(${element.hotspotxpos[0].x1} ${element.hotspotypos[0].y1})" xlink:href="#higlightAminity"/><image width="25" height="25" x="${element.hotspotxpos[0].x1 -12}" y="${element.hotspotypos[0].y1 -12}"> </g>`
                      }  
                      else {
                        if(element.hotspotname == 'SITTING AREA'){
                           $(`#dialMap .sitting`).css({ fill: "#15BCB7" }).addClass("animateline");
                           $(`#dialMap .playArea`).css({ fill: "#f8d381" });
                        } else if(element.hotspotname == 'PRAYER AREA') {
                            $(`#dialMap .playArea`).css({ fill: "#15BCB7" }).addClass("animateline");
                            $(`#dialMap .sitting`).css({ fill: "#f8d381" });
                        }
                        htmlVal += `<g class="aminities-highlight"  id="${element.hotspotid}"> <use transform="translate(${element.hotspotxpos[0].x1} ${element.hotspotypos[0].y1})" xlink:href="#higlightAminity"/><image width="25" height="25" x="${element.hotspotxpos[0].x1 -12}" y="${element.hotspotypos[0].y1 - 12}"> </g>`
                     
                      }
                });
                  svgImage.innerHTML += htmlVal
                  document.getElementsByTagName("svg")[0].innerHTML += `<polyline class="path path-first-floor" points="${pathPoints}" style="" />`;
                   setTimeout(()=>{
                        this.drawpathForAminities();
                      })
                } else {
                  document.getElementsByTagName("svg")[0].innerHTML += `<polyline class="path path-first-floor" points="${pathPoints}" style="" />`;
                   setTimeout(()=>{
                        this.drawpathForAminities();
                      })
                }
              },200)
            },50)
          },4100)
                      
        } else {
          clearTimeOutArr = setTimeout(()=>{
            this.svgMapName = transitPathPoints.map2points.mapname.dom
            this.svgMapToggle = false
            try {
              document.getElementsByTagName("polyline")[0].remove();
            } catch (error) {        
            }
            clearTimeOutArr = setTimeout(() => { 
              this.svgMapToggle = true
              pathPoints = transitPathPoints.map2points.path.pathpoints
              clearTimeOutArr = setTimeout(()=>{
                  if((this.headingText == 'AMENITIES') || (this.headingText=='सुविधाएं')) {
                    const svgImage = document.getElementsByTagName("svg")[0];
                    let htmlVal = ''
                    this.currentAminity.forEach(element => {
                      if(this.zoneName=='DOMESTIC DEPARTURE'){
                          $(`#dialMap .sitting`).css({ fill: "#15BCB7" }).addClass("animateline");
                        htmlVal += `<g class="aminities-highlight"  id="${element.hotspotid}"> <use transform="translate(${element.hotspotxpos[0].x1} ${element.hotspotypos[0].y1})" xlink:href="#higlightAminity"/><image width="25" height="25" x="${element.hotspotxpos[0].x1 -12}" y="${element.hotspotypos[0].y1 - 12}"> </g>`
                      }  
                      else {
                        htmlVal += `<g class="aminities-highlight"  id="${element.hotspotid}"> <use transform="translate(${element.hotspotxpos[0].x1} ${element.hotspotypos[0].y1})" xlink:href="#higlightAminity"/><image width="25" height="25" x="${element.hotspotxpos[0].x1 -12}" y="${element.hotspotypos[0].y1 - 12}"> </g>`
                      }
                  });
                    svgImage.innerHTML += htmlVal
                    document.getElementsByTagName("svg")[0].innerHTML += `<polyline class="path path-first-floor" points="${pathPoints}" style="" />`;
                    setTimeout(()=>{
                        this.drawpathForAminities();
                      })
                   
                } else {
                    document.getElementsByTagName("svg")[0].innerHTML += `<polyline class="path path-first-floor" points="${pathPoints}" style="" />`;
                    setTimeout(()=>{
                        this.drawpathForAminities();
                      })
                }
              },200)
            },50)
          },2800)
        }
        
      }

      let dtype = (this.zoneName == 'DOMESTIC DEPARTURE' ? 'dm' : 'in');
      let params = `kid=${Constants.kioskid}&hid=${hotspotData.hotspotid}&d=${dtype}`
      let url = encodeURI(`${Constants.mapMobileUrl()}?${params}`)
      this.qrPathValue = url
      
    },
    amenitiesFirstFloorPathDraw(hotspotData){
      var kioskFloorNumber = Methods.getKioskFloorNo();
      var hotspotFloorNumber = Methods.getHotspotFloorNo(hotspotData.hotspotid);
       this.formSubmitMsg = false
        this.fullMap = false;
        var element = document.getElementById("search");
          element.classList.remove("searchbtnOverlay");
        this.category = false
        this.hideMap = false
        this.showHeading = true
        
            var transitPathPoints =  Methods.getTransitPathPoints(kioskFloorNumber, hotspotFloorNumber, hotspotData.hotspotid,this.zoneName);
            this.pathPoints = transitPathPoints.map1points.path.pathpoints 
            let pathPoints = transitPathPoints.map1points.path.pathpoints 
          if(Constants.kioskid == 114) {
              if(this.zoneName == "DOMESTIC DEPARTURE") {
                this.svgMapName = json.park[0].zone[0].building[0].floor[0].mapname.pri
                    this.svgMapToggle = false
                clearTimeOutArr = setTimeout(()=>{
                    try {
                      document.getElementsByTagName("polyline")[0].remove();
                    } catch (error) {        
                    }
                    clearTimeOutArr = setTimeout(() => { 
                      this.svgMapToggle = true
                      pathPoints = transitPathPoints.map1points.path.pathpoints
                      clearTimeOutArr = setTimeout(()=>{
                        this.$refs.expmap.mapViewBox([560.4896373213941, 356.7826995786487, 624.983961725042, 298.82282981628674])
                        document.getElementsByTagName("svg")[0].innerHTML += `<polyline class="path1 " points="${pathPoints}" style="" />`;
                      },35)
                    },25)
                  },5)
               } else {
                 this.svgMapName = transitPathPoints.map1points.mapname.dom
                      this.svgMapToggle = false
                 clearTimeOutArr = setTimeout(()=>{
                      try {
                        document.getElementsByTagName("polyline")[0].remove();
                      } catch (error) {        
                      }
                      clearTimeOutArr = setTimeout(() => { 
                        this.svgMapToggle = true
                        pathPoints = transitPathPoints.map1points.path.pathpoints
                        clearTimeOutArr = setTimeout(()=>{
                          this.$refs.expmap.mapViewBox([376.1529913714697, 332.3268451097184, 698.5820638492881, 334.01220185260059])
                          document.getElementsByTagName("svg")[0].innerHTML += `<polyline class="path" points="${pathPoints}" style="" />`;
                        },35)
                      },25)
                    },5)
            }
          } else {
            this.svgMapName = json.park[0].zone[0].building[0].floor[0].mapname.dom
            clearTimeOutArr = setTimeout(()=>{
                this.svgMapToggle = false
                try {
                  document.getElementsByTagName("polyline")[0].remove();
                } catch (error) {        
                }
                clearTimeOutArr = setTimeout(() => { 
                  this.svgMapToggle = true
                  pathPoints = transitPathPoints.map1points.path.pathpoints
                  clearTimeOutArr = setTimeout(()=>{
                    this.$refs.expmap.mapViewBox([283.48963732139407, 322.786995786487, 624.983961725042, 298.82282981628674])
                    document.getElementsByTagName("svg")[0].innerHTML += `<polyline class="path" points="${pathPoints}" style="" />`;
                  },50)
                },50)
              },50)
          }
        this.svgMapToggle = false
        clearTimeOutArr = setTimeout(()=>{ this.svgMapToggle = true },200)
    },
    closeDesc(val){
        this.findWay = val
    },
    closeOverlay(val){
        this.findWay = val
        this.search = false
        this.hideMap = true
        if(this.search == false && (this.headingText == 'RETAIL BRANDS' || this.headingText == 'F & B BRANDS' || this.headingText == 'परचून ब्रांडों' || this.headingText == 'खाद्य और पेय ब्रांडो')) {
            var element = document.getElementById("search");
            element.classList.remove("searchbtnOverlay");
            if(this.show == 'brandDetail'){
            } else {
              this.show = 'retail';
              this.showArrows = true;
            }
        } else if (this.search == false) {
        var element = document.getElementById("search");
          element.classList.remove("searchbtnOverlay");
          $(`#gateNum`).removeClass("gatesOverlay");
        this.show='amenities';
        }
    },
    loadDepartureMap (zone,initialLoad) {
        this.formSubmitMsg = false
        this.fullMap = true;

        // if(this.fullMap == false){
        //      this.popup = false
        //    this.popUpOverlay(false);
        // } 
        var element = document.getElementById("search");
          element.classList.remove("searchbtnOverlay");
        // var element = document.getElementById("retail-brands");
        //   element.classList.remove("retails");
        
        //  this.search = false
        this.zoneName = zone.zonename;
        let zoneid = zone.zoneid
        this.zoneId = zoneid
        this.category = false
        this.showHeading = true
        
        if(zoneid == 472) {
          if(initialLoad){
            this.headingText = this.domesticZoneText
          }
          if(Constants.kioskid == 114) {
            this.svgMapName = json.park[0].zone[0].building[0].floor[0].mapname.pri
          } else {
            this.svgMapName = json.park[0].zone[0].building[0].floor[0].mapname.dom
          }
        } else {
          if(initialLoad){
            this.headingText = this.internationalZoonText
          }
          if(Constants.kioskid == 114) {
            this.svgMapName = json.park[0].zone[1].building[0].floor[0].mapname.pri
          } else {
            this.svgMapName = json.park[0].zone[1].building[0].floor[0].mapname.dom
          }
        }
        this.svgMapToggle = false

        clearTimeOutArr = setTimeout(()=>{ this.svgMapToggle = true },200)
    },
    gateData(id) {
      this.activeGatesId = id
      let besabledBgUrl = require('../assets/gateBtnBgDesabled.png')
      let activeBgUrl = require('../assets/gateBtnBgActive.png')
      let bgUrl1 = (id == 1 || id == 3 ? activeBgUrl : besabledBgUrl) 
      let bgUrl2 = (id == 2 || id == 4 ? activeBgUrl : besabledBgUrl)
      $('.gates-v').css('background-image', 'url(' + bgUrl1 + ')')
      $('.gates-h').css('background-image', 'url(' + bgUrl2 + ')');
      if(Constants.kioskid == 114){
        if(id==1){
          this.$refs.expmap.mapViewBox([395.1710593637822, -8.349720066931217, 794.7159370677989, 379.9765750135829])
        } else if(id == 2){
          this.$refs.expmap.mapViewBox([147.51492324502496, 396.04713648051535, 715.4380553706793, 342.0715368023842])
        } else if(id == 3){
          this.$refs.expmap.mapViewBox([746.5689805586671, 419.85789001821223, 645.6828449720381, 308.7195619641517])
        } else if(id == 4){
          this.$refs.expmap.mapViewBox([265.4008397166093, 24.970133898534314, 901.7435704719588, 431.14956862784385])
        }
      } else {
        if(id==1){
          this.$refs.expmap.mapViewBox([194.03957464726165, -11.2981102189261, 794.7159370677989, 379.9765750135829])
        } else if(id == 2){
          this.$refs.expmap.mapViewBox([-43.87405488229512, 358.487209761624, 715.4380553706793, 342.0715368023842])
        }
      }
      
    },
    gates(title) {
      clearTimeout(clearTimeOutArr)
      this.catChanged[0] = true
        this.gatesTimeDetails = false;

      $(`.aminities-highlight`).remove();
      if(this.svgMapName=='domesticFoodCourt.svg' ){
            this.loadDepartureMap(this.zones[0],false);
            this.viewBoxArr = [];
      } else if(this.svgMapName=='internationalFoodCourt.svg' ){
            this.loadDepartureMap(this.zones[1],false);
            this.viewBoxArr = [];
      }
      if(this.tempLanguage=='hn'){
        this.headingText = title
      }
      else{
        this.headingText = title
      }
      if (!this.gatesInfo) {
        this.show = 'amenities'
        this.showHeading = false
        this.search = false
        this.gatesInfo = true
        this.showArrows = false
        $(`#gateNum`).addClass("gates");
        var element = document.getElementById("search");
        element.classList.remove("searchbtnOverlay");
      } else {
        this.show = 'amenities'
      }
    },
    aminitiesData (title) {
        this.show = 'amenities'
         this.hideMap = false
          try {
              document.getElementsByTagName("polyline")[0].remove();
            } catch (error) {        
            }
        $(`.aminities-highlight`).remove();
      clearTimeout(clearTimeOutArr)
      this.catChanged[0] = true
      if(this.svgMapName=='domesticFoodCourt.svg' ){
            this.loadDepartureMap(this.zones[0],false);
            this.viewBoxArr = [];
      } else if(this.svgMapName=='internationalFoodCourt.svg' ){
            this.loadDepartureMap(this.zones[1],false);
            this.viewBoxArr = [];
      }
       if(this.tempLanguage=='hn'){
        this.headingText = title
      }
      else{
        this.headingText = title
      }
      this.search = false
      var element = document.getElementById("search");
      element.classList.remove("searchbtnOverlay");
      var element = document.getElementById("bottom-disp");
      element.classList.add("bottom-display");
      this.showHeading = true
      this.gatesInfo = false
      this.showArrows = false
      this.formSubmitMsg = false
      this.gatesTimeDetails = false

    },
    retailData (catid, title)  {
      clearTimeout(clearTimeOutArr)
      $('.map-holder').css({'z-index':'4'});
      $(`.aminities-highlight`).remove();
      this.formSubmitMsg = false
      this.viewBoxArr = [];
      this.search = false
        this.gatesTimeDetails = false
        this.hideMap = false
      var element = document.getElementById("search");
      element.classList.remove("searchbtnOverlay");
      var element = document.getElementById("bottom-disp");
      element.classList.add("bottom-display");
      this.show = 'retail'
      if(catid > 0) {
        this.loadBrands(catid, title)
        if(Constants.kioskid == 114){
          if(this.zoneName == 'DOMESTIC DEPARTURE'){
            if(this.svgMapName=='domesticFoodCourt.svg' ){
              this.viewBoxArr = [779.5334222930896, 368.03004391645584, 196.47793587558408, 93.94175913370871]
              this.loadDepartureMap(this.zones[0],false);
              this.viewBoxArr = [];
            }
            this.$refs.expmap.mapViewBox([779.5334222930896, 368.03004391645584, 196.47793587558408, 93.94175913370871])
          }
          else if(this.zoneName == 'INTERNATIONAL DEPARTURE'){
            if(this.svgMapName=='internationalFoodCourt.svg'){
              this.viewBoxArr = [540.2783579076574, 368.13968060701995, 249.19164513417329, 119.14570153134528]
              this.loadDepartureMap(this.zones[1],false);
              this.viewBoxArr = [];
            } else {
            this.$refs.expmap.mapViewBox([540.2783579076574, 368.13968060701995, 249.19164513417329, 119.14570153134528])
            }
          }
        } else {
          if(this.svgMapName=='domesticFoodCourt.svg' ){
            this.viewBoxArr = [557.1966178346274, 326.5379646863482, 211.00218218189477, 100.88621954869447]
            
            this.loadDepartureMap(this.zones[0],false);
            this.viewBoxArr = [];
          }
          this.$refs.expmap.mapViewBox([557.1966178346274, 326.5379646863482, 211.00218218189477, 100.88621954869447])
        }
        
      }

    },
    loadBrands(catid, title) {
      this.formSubmitMsg = false
      this.gatesInfo = false
      this.showArrows = true
      this.headingText = title
      this.showHeading = true
        this.gatesTimeDetails = false
      this.svgMapCategory1 = true
      let zoneid = this.zoneId
      let park = json.park[0].zone
      let depArr = []
      for(let i=0; i<park.length; i++){
        if(park[i].zoneid == zoneid) {
          let floor = park[i].building[0].floor
          for(let j=0; j<floor.length; j++){
              let hotspotlist = floor[j].hotspotlist
            for(let k=0; k<hotspotlist.length; k++){
              if(catid == floor[j].hotspotlist[k].categoryid) {
                if (depArr.length > 0) {
                  let checkFlag = true
                  let isPreCheckIn = (Constants.kioskid == 114 ? true : false)
                  for(let l=0; l<depArr.length; l++) {
                    // console.log(isPreCheckIn, floor[j].hotspotlist[k].isprecheckin);
                    // console.log(depArr[l].hotspotname, floor[j].hotspotlist[k].hotspotname);
                    if(depArr[l].hotspotname == floor[j].hotspotlist[k].hotspotname && isPreCheckIn) {
                      // console.log(depArr[l].hotspotname, '<=====>', floor[j].hotspotlist[k].hotspotname);
                      checkFlag=false
                      break;                   
                    }
                  }
                  // console.log('floor[j].hotspotlist[k]',floor[j].hotspotlist[k],j,k);
                  if (checkFlag) {
                    if(Constants.kioskid == 115){
                      if(!(floor[j].hotspotlist[k].path.length<2 && floor[j].hotspotlist[k].transithotspot=='no')){
                        depArr.push({"hotspotid":floor[j].hotspotlist[k].hotspotid, "hotspotname": floor[j].hotspotlist[k].hotspotname,"icon": floor[j].hotspotlist[k].hotspoticon, "description": floor[j].hotspotlist[k].hotspotdescription,"svggroupid":  floor[j].hotspotlist[k].svggroupid, "hotspotdisplayname": floor[j].hotspotlist[k].hotspotdisplayname, "hotspotxpos": floor[j].hotspotlist[k].hotspotxpos, "hotspotypos": floor[j].hotspotlist[k].hotspotypos, "path": floor[j].hotspotlist[k].path, "transithotspot": floor[j].hotspotlist[k].transithotspot})
                      }
                    } else{
                      depArr.push({"hotspotid":floor[j].hotspotlist[k].hotspotid, "hotspotname": floor[j].hotspotlist[k].hotspotname,"icon": floor[j].hotspotlist[k].hotspoticon, "description": floor[j].hotspotlist[k].hotspotdescription,"svggroupid":  floor[j].hotspotlist[k].svggroupid, "hotspotdisplayname": floor[j].hotspotlist[k].hotspotdisplayname, "hotspotxpos": floor[j].hotspotlist[k].hotspotxpos, "hotspotypos": floor[j].hotspotlist[k].hotspotypos, "path": floor[j].hotspotlist[k].path, "transithotspot": floor[j].hotspotlist[k].transithotspot})
                    }
                  }
                } else {
                  if(Constants.kioskid == 115){
                    if(!(floor[j].hotspotlist[k].path.length<2 && floor[j].hotspotlist[k].transithotspot=='no')){
                      depArr.push({"hotspotid":floor[j].hotspotlist[k].hotspotid, "hotspotname": floor[j].hotspotlist[k].hotspotname,"icon": floor[j].hotspotlist[k].hotspoticon, "description": floor[j].hotspotlist[k].hotspotdescription,"svggroupid":  floor[j].hotspotlist[k].svggroupid, "hotspotdisplayname": floor[j].hotspotlist[k].hotspotdisplayname, "hotspotxpos": floor[j].hotspotlist[k].hotspotxpos, "hotspotypos": floor[j].hotspotlist[k].hotspotypos, "path": floor[j].hotspotlist[k].path, "transithotspot": floor[j].hotspotlist[k].transithotspot})
                    } 
                  } else {
                    depArr.push({"hotspotid":floor[j].hotspotlist[k].hotspotid, "hotspotname": floor[j].hotspotlist[k].hotspotname,"icon": floor[j].hotspotlist[k].hotspoticon, "description": floor[j].hotspotlist[k].hotspotdescription,"svggroupid":  floor[j].hotspotlist[k].svggroupid, "hotspotdisplayname": floor[j].hotspotlist[k].hotspotdisplayname, "hotspotxpos": floor[j].hotspotlist[k].hotspotxpos, "hotspotypos": floor[j].hotspotlist[k].hotspotypos, "path": floor[j].hotspotlist[k].path, "transithotspot": floor[j].hotspotlist[k].transithotspot})
                  }
                }
              }
            }
          }
        }
      }
     this.brands = depArr
      if(depArr.length <= 20) {
          this.retailBrands = depArr
          this.viewBrandsIndex = depArr.length
          this.leftArrow = 'Dim_Left.png'
          this.rightArrow = 'Dim_Right.png'
      } else {
          let tempArr = []
          for (let i = 0; i < 20; i++) {
              tempArr.push(depArr[i])
          }
          this.leftArrow = 'Dim_Left.png'
          this.retailBrands = tempArr
          this.viewBrandsIndex = 20
      }
    },
    previousBrands() {
      if(this.viewBrandsIndex > 20) {
          let brandIndex = this.viewBrandsIndex
          let dn = (brandIndex % 20)
          let n = (dn == 0 ? 20 : dn )
          let tempArr = []
          for (let i = (brandIndex-(n+20)); i < (brandIndex - (n)); i++) {
              tempArr.push(this.brands[i])
          }
          this.retailBrands = tempArr
          this.viewBrandsIndex = (brandIndex - n)
          if(n <= 20) {
              this.leftArrow = 'Dim_Left.png'
          }   
          if(this.brands.length > 20) {
              this.rightArrow = 'right_arrow.png'
          } 
      } 
      
    },
    nextBrands() {
      if(this.brands.length > (this.viewBrandsIndex)) {
        let brandIndex = this.viewBrandsIndex
        let tempArr = []
        let n = (this.brands.length > (brandIndex + 20) ? (brandIndex + 20) : this.brands.length)
        for (let i = brandIndex; i < n; i++) {
          tempArr.push(this.brands[i])
        }
        this.retailBrands = tempArr
        this.viewBrandsIndex = n
            this.leftArrow = 'left_arrow.png'
        if(n == this.brands.length) {
          this.rightArrow = 'Dim_Right.png'
        }
      }
    },
    
    categoryData (val, val2) {
      this.cData = val
      this.name = val2
      this.formSubmitMsg = false
    },
    reset() {
      if(!this.fullMap && this.kioskid==114){
        console.log('fullMap', this.fullMap)
        PlaylistScalaVariables.exploreResetScalaVariables();
        this.zoneName = '';
        this.$refs.categoriesRef.reColor();
        this.show='amenities';
        this.showArrows = false;
        this.gatesTimeDetails = false;
        this.popup = false;
        this.search = false;
        this.gatesInfo = false;
        this.showHeading= false;
        var element = document.getElementById("search");
          element.classList.remove("searchbtnOverlay");
        var element = document.getElementById("search");
          element.classList.add("searchbtn");
        this.zoneId = json.park[0].zone[0].zoneid;
        this.zoneName = 'DOMESTIC DEPARTURE'
        this.fullMap = false
        this.svgMapName = json.park[0].zone[0].building[0].floor[0].mapname.pri
        this.loadDepartureMap(this.zones[0],true);
        this.pinchZoomPopup = false;
        this.svgMapToggle = false
        clearTimeOutArr = setTimeout(()=>{ 
          this.svgMapToggle = true
        },200)
      } else  {
        this.$router.push('/');
       
      }
      
    },
    showKeyBordFunc () {
      this.showKeyboard = true
    },
    hideKeyBoard () {
      this.showKeyboard = false
    },
    svgOnClickHighlightBrand(currentAminity){
      this.currentAminity = currentAminity
      this.drawpathForAminities()
      
    },
    drawpathForAminities(){
      $(".aminities-highlight").on('click tap touchstart', (event) => {
        var id = $(event.currentTarget).attr('id');
        var result =  this.currentAminity.filter(element => { 
          if(element.hotspotid == id) {
            return true
          }
        })
        this.$refs.expmap.clearPointers();
        this.openFindWay(result[0])
      })
    }
  }
}
</script>

<style scoped>
.loader {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 1920px;
  height: 1080px;
  background-color: rgba(223, 223, 223, 0.7);
  z-index: 30;
}
.loader img {
  position: absolute;
  width: 200px;
  top: 350px;
  left: 620px
}
.successMsg{
   padding-left: 100px;
   position: absolute;
   padding-top: 10px;
   background-color: #fff;
   top: 280px;
   left: 470px;
   width: 580px;
   height: 60px;
   font-size: 30px;
   font-family: 'Cervino-BoldNeue';
   letter-spacing: 1.5px;
   z-index: 23;
}
.overlay1 {
  position: fixed;
  display: block;
  height: 715px;
  width: 1518px;
  margin-top: 25px;
  margin-left: 0px;
  background-color: rgba(0,0,0,0.5);
  z-index: 23;
}
.pinchZoomPopup {
  position: fixed;
  display: block;
  height: 715px;
  width: 1518px;
  margin-top: 25px;
  margin-left: 0px;
  background-color: rgba(0,0,0,0.5);
  z-index: 23;
}
.map-holder{
    position: absolute;
    top: 25px;
    height: 715px;
    width: 1518px;
    z-index: 0;
    overflow: hidden
}
#zoomContainer{
    top: -2px;
    left: -2px; 
    height: 752px;
    width: 1518px;
    z-index: 0;
    overflow: hidden;
}
.bottom-display{
    position: relative;
    height: 230px;
    width: 100%;
    z-index: 2;
}
.domestic-international{
  position: absolute;
  width: 100%; 
  height: 680px;
  left: 0px;
  top: 140px;
}
.svg-map {
  position: absolute;
  top: -50px;
  left: 25px;
  height: 786px;
  /* width: 1500px; 
  height: 843px; */
  /* pointer-events:none;
  cursor: default; */
  /* -webkit-transform: perspective(1920px) rotateX(50deg);
  transform: perspective(1920px) rotateX(50deg); */
}
.zoomed-in-domestic{
    height: 1740px;
    top: -705px;
    left: -1232px;
}
.zoomed-in-international{
    height: 1740px;
    top: -705px;
    left:  -484px;
}
.svg-map1 {
  position: absolute;
  top: 50px;
  width: 1300px; 
  height: 800px;
  pointer-events:none;
  cursor: default;
}
.svg-map1.threeD{
    width: 1000px; 
    height: 600px;
    top: 50px;
    position: absolute;
    animation: pers1 1s;
    animation-fill-mode: forwards;
}
@keyframes pers1 {
    from {top: 400px;}
    to { height: 800px; width: 1200px; left: 100px; top: -150px; animation-play-state: paused;}
}

/* .svg-map1.threeD{
    width: 1000px; 
    height: 600px;
    top: 50px;
    position: absolute;
    animation: pers1 1s;
    animation-fill-mode: forwards;
}
@keyframes pers1 {
    from {top: 400px;}
    to {height: 800px; width: 1500px; left: 0px; top: 50px; transform: translate(-270px,-275px); animation-play-state: paused;}
} */

.svg-map2 {
  position: absolute;
  top: 50px;
  width: 1300px; 
  height: 800px;
  pointer-events:none;
  cursor: default;
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
  bottom: 0px;
  height: 1080px;
  width: 1920px;
}

.categories{
  width: 398px;
  position: absolute;
  margin-left: 1518px;
  top: -2px;
  z-index: 9;
}
.Displayad{
  position: absolute;
  margin-left: 1518px;
  margin-top: 332px;
}
.mapSection {
  position: absolute;
}
.adImg{
  width: 400px;
  height: 636px;
  border: 6px solid #fff;
}
.mapBg{
  background-image: url('../assets/mapBg.png');
  height: 715px;
  position: absolute;
  width: 1518px;
  margin-top: 25px;
}
.aminities-retails{
  position: relative;
  top: -228px;
  width: 1540px;
  height: 220px;
  z-index: 1;
}
.aminities-retails{
  position: relative;
  top: -228px;
  width: 1540px;
  height: 220px;
  z-index: 1;
}
.amenities{
  width: 1540px;
  height: 190px;
  margin-top: 800px;
  z-index: 24;
}
.retails{
  width: 1520px;
  height: 220px;
  position: absolute;
  top: 742px;
  z-index: 0;
}
.brands-direction{
  font-family: 'Amplitude-Regular';
  font-size: 26px;
  color: white;
  position: relative;
  left: 56px;
  width: 456px;
}
.qr-code{
  position: absolute;
  left: 829px;
  top: 19px;
}
.qr-container {
  background-image: url('../assets/mobilepass.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  width: 163px;
  height: 161px;
  top: 5px;
  left: 475px;
  margin: 0;
  padding: 0;
}

.qr-image{
  margin: 13px 15px;
  padding: 8px;
  background-color: #fff;
  border-radius: 2px;
}
.imgs{
  position: absolute;
  top: 90px;
  left: 342px;
  transform: translate(0,-50%);
}
.qr-text{
  font-family: 'Amplitude-Regular';
  font-size: 26px;
  color: white;
  width: 376px;
}
.line{
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 20px;
  width: 5px;
  height: 185px;
}
.direction-holder{
  margin-top: 20px;
  margin-bottom: 0px;
}
.quitBtn button{
  font-size: 25px;
  outline: none;
  text-decoration: none;
  width: 135px;
  height: 47px;
  top: 690px;
  left: 1370px;
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
  z-index: 24;
}
.searchIcon {
  position: absolute;  
  left: 15px;
  top: 10px;
  width: 45px;
  height: 52px;
}
.navigationImg{
  margin-top: 440px;
  margin-left: -20px;
  position: absolute;
  z-index: 1;
}
.row{
  margin: 0px 0px;
}
.homeBtn{
  position: absolute;
  margin-top: 55px;
  margin-left: 1382px;
  width: 75px;
  height: 73px;
    z-index: 9;
}
.searchbtn {
  width: 76px;
  height: 74px;
  background-image: url("../assets/search.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  margin-top: 140px;
  margin-left: 1396px;
  z-index: 7;
}
.searchbtnOverlay{
  width: 76px;
  height: 74px;
  background-image: url("../assets/search.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  margin-top: 140px;
  margin-left: 1396px;
  z-index: 0;
}
.domesticMap {
  width: 650px;
  height: 650px;
  position: relative;
  margin-left: 400px;
  margin-top: -50px;
  z-index: 20;
}
.domesticMap1 img{
  width: 670px;
  height: 400px;
  margin-left: 160px;
  margin-top: 60px;
}
.domesticMap2 img{
  width: 670px;
  height: 400px;
  position: absolute;
  margin-left: 700px;
  margin-top: 60px;
}
.downarrow{
  position: absolute;
  width: 36px;
  height: 32px;
  margin-left: 1264px;
  padding: 5px;
  top: 32px;
}
.switchDept{
  font-size: 28px;
  color: #fff;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0px;
  position: absolute;
  width: 338px;
  height: 56px;
  margin-left: 1044px;
  padding: 5px;
  top: 22px;
}
.internationalText{
  font-size: 28px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0px;
  position: absolute;
  background-image: url('../assets/textBg.png');
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  width: 338px;
  height: 56px;
  margin-left: 1044px;
  padding: 5px;
  top: 72px;
}
.domesticText{
  font-size: 28px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0px;
  position: absolute;
  background-image: url('../assets/textBg.png');
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  width: 400px;
  height: 60px;
  padding: 5px;
  margin-left: 56px;
  top: 72px;
}
.headingText{
   font-size: 28px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0px;
  position: absolute;
  background-image: url('../assets/textBg.png');
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  width: 400px;
  height: 60px;
  padding: 5px;
  margin-left: 56px;
  top: 72px;
  z-index: 20;
}
.FloorText{
  font-size: 28px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0px;
  position: absolute;
  background-image: url('../assets/gateBtnBgDesabled.png');
  background-repeat: no-repeat;
  background-position: center;
  width: 168px;
  height: 60px;
  left: 446px;
  top: 72px;
  z-index: 25;
}
.floorNumber{
  width: 50px;
  height: 56px;
  line-height: 56px;
  /* vertical-align: 50%; */
  /* position: relative; */
  /* top: 50%; */
  /* transform: translate(0,-50%); */
  background: #183669;
  text-align: center;
  color: white;  
  margin: 0;
}
.floorDesc{
  width: 110px;
  height: 56px;
  line-height: 56px;
  margin: 0;
  text-align: center;
}
.gates {
  width: 150px;
  position: absolute;
  margin-left: 50px;
  top: 56px;
  font-size: 35px;
  z-index: 10;
  color: #000;
  font-family: 'Cervino-BoldNeue';
  text-align: center;
  z-index: 10;
}
.gatesOverlay {
  width: 150px;
  position: absolute;
  margin-left: 50px;
  top: 56px;
  font-size: 35px;
  z-index: 0;
  color: #000;
  font-family: 'Cervino-BoldNeue';
  text-align: center;
}
.gates .title {
  background-image: url('../assets/gateTitleBg.png');
  background-repeat: no-repeat;
  background-position: center;
  height: 57px;
  margin-bottom: 6px;
}
.gates .gates-v {
  background-image: url('../assets/gateBtnBgDesabled.png');
  background-repeat: no-repeat;
  background-position: center;
  height: 57px;
  margin-bottom: 6px;
}
.gates .gates-h {
  background-image: url('../assets/gateBtnBgDesabled.png');
  background-repeat: no-repeat;
  background-position: center;
  height: 57px;
  margin-bottom: 0px;
}
.loadMap{
  margin-left: 220px;
  width: 1000px;
  height: 500px;
}
.label1{
  font-size: 25px;
  color: #fff;
  width: 25%;
  padding: 10px;
  font-weight: bold;
  background-color: #f2ba1f;
  margin-left: 120px;
  margin-top: 60px;
}
.international{
  position: absolute;
  width: 600px; 
  height: 600px;
}
.internationalOne {
 position: absolute;
  top: 50px;
  width: 1500px; 
  height: 800px;
  /* left: -180px; */
}
.domesticOne {
  position: absolute;
  top: 0px;
  width: 1300px; 
  height: 800px;
  left: 250px;
}
.domestic {
  position: absolute;
  top: 140px;
  width: 600px; 
  height: 600px;
  left: 800px;
}

.left-bg {
    height: 56px;
    width: 56px;
    top: 830px;
    left: 30px;
    position: absolute;
    z-index: 22;
}
.right-bg {
    height: 56px;
    width: 56px;
    top: 830px;
    left: 1440px;
    position: absolute;
    z-index: 22;
}
.flight{
    height: 56px;
    width: 60px;
    top: 46px;
    left: 1040px;
    position: absolute;
    z-index: 12;
}
.timePannerText{
    height: 56px;
    width: 200px;
    top: 40px;
    left: 1116px;
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
    top: 190px;
    left: 1040px;
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
    top: 110px;
    left: 1040px;
    position: absolute;
    font-size: 24px;
    color: #f2be1f;
    font-family: 'Cervino-BoldNeue';
}
/* .btn {
  width: 50px;
  height: 50px;
  background: #FFF;
  border: 1px solid #005bac;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  color: #005bac;
  padding: 15px 10px 5px;
  text-align: center;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
	transition: all 0.3s ease;
  z-index: 10;
}
.btn:hover {
  background: #eef;
}
*/

</style>
