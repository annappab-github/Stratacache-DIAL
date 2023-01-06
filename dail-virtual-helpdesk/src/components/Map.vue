<template>
 
    <div class="boarding-map" id="svgmapContainer">
      <svg class="svg-map" :id="svgid" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1228 752"></svg>
      <div class="loaders"  v-if="load"></div> 
    </div>

   <!--<img class="btn-z zoom" src="@/assets/zoom-in.png" alt="" @click="zoomIn()" />
    <img class="btn-z zoom-out" src="@/assets/zoom-out.png" alt="" @click="zoomOut()" />-->
    <img class="btn-z zoom-reset" src="@/assets/zoom-reset.png" alt="" @click="zoomReset()" />
</template>
<script>
import $ from 'jquery'
import Methods from '@/utils/Methods.js'
import { zoomPan } from '../utils/SvgZoom'
import Constants from '@/utils/Constants'

var viewBox = {x: 0, y:0, w:1646, h:787}, movedViewBox = viewBox, myPointers = [], lastDif = -1, scale = 1, startPoint = {x: 0, y: 0}, endPoint = startPoint, isSinglePointer = true;
var svgSize = {
    w:1646,
    h:787
};

export default{
  props: ["mapName","svgid","zoneName", "fullMap","boardingMap","drawPathPoint", "mapHighlight", "isFromAmenities", "viewBoxArr", "gateNum"],
  data() {
    return{
      kioskxposMain: 745,
      kioskyposMain: 520,
      kioskxposInt: 555,
      kioskyposInt: 520,
      load: false,
    }
  },
  mounted(){
   
    var svgMapName = this.mapName;
    this.load = true;
    setTimeout(() => {
      let svgid = this.svgid;
      let zoneName = this.zoneName
      let fullMap = this.fullMap
      var boardingPathPoints = false;
      let viewBoxArr = this.viewBoxArr
      let num = this.gateNum
      let gateVal = num.replace(/\D/g,'')
      //  console.log('gateNum', num) 
      //  console.log('gateVal', gateVal) 
      $.ajax({
        url: require(`@/assets/map/${this.mapName}`) ,
        dataType: 'html',
        type: 'GET',
        success: function(data) 
        {  
          // $(`#${svgid}`).html(data)
          $(`#${svgid}`).replaceWith(data);
          const svgImage = document.getElementsByTagName("svg")[0];
          if (viewBoxArr.length > 0) {
            viewBox = {x: viewBoxArr[0], y:viewBoxArr[1], w:viewBoxArr[2], h:viewBoxArr[3]}
          } else {
            if(Constants.kioskid == 114){
              if(svgMapName == 'domesticFoodCourt.svg'){
                viewBox = {x: -140, y:-90, w:1296, h:787}
              } else if(svgMapName == 'internationalFoodCourt.svg'){
                viewBox = {x: 50, y:-0, w:1296, h:787}
              } else {
                viewBox = {x: 0, y:0, w:1646, h:787}
              }
            } else {
              if(svgMapName == 'domesticFoodCourt.svg'){
                viewBox = {x: -227.53205625000004, y:-133.3307375, w:1481.8012125, h:708.4918312499999}
              } else {
                viewBox = {x: -239.53205625000004, y:-31.330737499999998, w:1481.8012125, h:708.4918312499999}
              }
            }
          }    
          if(Constants.kioskid == 114) {
              if(gateVal >= 1 && gateVal <= 14 && zoneName=='INTERNATIONAL DEPARTURE'){
                viewBox = {x: 400.82993121329264, y: 195.00297241960615, w: 892.6298365405628, h: 505.3954542139732 }
              } else if(gateVal >= 15 && gateVal <= 26 && zoneName=='INTERNATIONAL DEPARTURE'){
                viewBox = {x: 398.82993121329264, y: 70.00297241960615, w: 892.6298365405628, h: 505.3954542139732 }
              }
              else if(gateVal >= 27 && gateVal <= 36 && zoneName=='DOMESTIC DEPARTURE'){
                viewBox = {x: 355.1911047709147, y: 45.5757162129775266, w: 982.8490134930673, h: 520.8065997259308}
              } else if(gateVal >= 37 && gateVal <= 62 && zoneName=='DOMESTIC DEPARTURE'){
                viewBox = {x: 245.82993121329264, y: 180.00297241960615, w: 692.6298365405628, h: 505.3954542139732 }
              }
            } else {
              if(gateVal >= 27 && gateVal <= 36 && zoneName=='DOMESTIC DEPARTURE'){
                viewBox = {x: 195.43257747587279, y: 10.05822757891207, w: 731.5695786585671, h: 445.4102420439198 }
              } else if(gateVal >= 37 && gateVal <= 62 && zoneName=='DOMESTIC DEPARTURE'){
                viewBox = {x: 85.82993121329264, y: 187.00297241960615, w: 702.6298365405628, h: 505.3954542139732 }
              }
            }
          
          
          movedViewBox = viewBox
          svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
          var kioskPosition = Methods.getKioskPossision(zoneName)
          // console.log('kioskPosition',kioskPosition);
          if(fullMap && (svgMapName != 'domesticFoodCourt.svg' && svgMapName != 'internationalFoodCourt.svg')){
            svgImage.innerHTML += `<image id="kiosk-img" class="blink2" x="737" y="549" width="50" height="50" href="${require('@/assets/locate.png')}" />`
          }
          else if(zoneName=='DOMESTIC DEPARTURE' && (svgMapName != 'domesticFoodCourt.svg' && svgMapName != 'internationalFoodCourt.svg')){
            svgImage.innerHTML += `<image id="kiosk-img" class="blink2" x="${kioskPosition.kioskxpos}" y="${kioskPosition.kioskypos}" width="50" height="50" href="${require('@/assets/locate.png')}" />`
          }
          else if(zoneName=='INTERNATIONAL DEPARTURE' && (svgMapName != 'domesticFoodCourt.svg' && svgMapName != 'internationalFoodCourt.svg')){
            svgImage.innerHTML += `<image id="kiosk-img" class="blink2" x="${kioskPosition.kioskxpos}" y="${kioskPosition.kioskypos}" width="50" height="50" href="${require('@/assets/locate.png')}" />`
          }
          boardingPathPoints = true;
        }
      });

      var pathinterval;
      pathinterval = setInterval(() => {
        if(boardingPathPoints){
          
          this.load = false;
          this.zoomPanning();
          zoomPan("svgmapContainer","zoompanContainer", true)
          boardingPathPoints = false;
          clearInterval(pathinterval);
          try {
            this.drawPathPoint();
            
          } catch (error) {
            
          }
          if(this.isFromAmenities){
            this.mapHighlight()
          }
        }
      }, 10)
    }, 10);
  },
  methods: {
    zoomPanning(){
      const svgImage = document.getElementsByTagName("svg")[0];
        ///// Pinch and Swipe start ////////////////
      svgImage.addEventListener('touchstart', function(e) {
        const touchobj = e.changedTouches[0]
        myPointers.push(touchobj);
        startPoint = {
          x: touchobj.pageX,
          y: touchobj.pageY
        };
        e.preventDefault()
      }, false)

      svgImage.addEventListener('touchend', function(evt) {
        // console.log(movedViewBox);
        var e = evt.changedTouches[0]
        for (var i = 0; i < myPointers.length; i++) {
          if (myPointers[i].identifier == e.identifier) {
            myPointers.splice(i, 1);
            try {
              startPoint = {
                x: myPointers[0].pageX,
                y: myPointers[0].pageY
              };
            } catch (error) {}
            break;
          }
        }
          
        if (myPointers.length < 2) {
          lastDif = -1;
        }

        if (myPointers.length == 0) {
          viewBox = movedViewBox
        }
        evt.preventDefault()
      }, false)

      svgImage.addEventListener('touchmove', function(evt) {
        evt.preventDefault() // prevent scrolling when inside DIV
        var touchobj = evt.changedTouches[0]
        if (myPointers.length == 1) {
          endPoint = {
            x: touchobj.pageX,
            y: touchobj.pageY
          };

          scale = 1646 / viewBox.w;
          let scaleRound = `${Math.round(scale*100)/100}`;

          var dx = (startPoint.x - endPoint.x) / (scaleRound/2);
          var dy = (startPoint.y - endPoint.y) / (scaleRound/2);
          let vb_x = viewBox.x + dx;
          let vb_y = viewBox.y + dy;

          let tempx = viewBox.x
          let tempy = viewBox.y
          
          if (vb_x >= -1500 && vb_x <= 1500) {
            tempx = vb_x
          }
          if (vb_y > -700 && vb_y < 700) {
            tempy = vb_y
          }
          movedViewBox = {
            x: tempx,
            y: tempy,
            w: viewBox.w, 
            h: viewBox.h
          };
          svgImage.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
        }

        if (myPointers.length == 2) {
          for (var i = 0; i < myPointers.length; i++) {
            if (touchobj.identifier == myPointers[i].identifier) {
                myPointers[i] = touchobj;
                break;
            }
          }

          // Detect pinch gesture.
          var w = viewBox.w;
          var h = viewBox.h;
          var mx = myPointers[0].clientX; //mouse x
          var my = myPointers[0].clientY;

          var curDif = Math.abs(myPointers[0].clientX - myPointers[1].clientX);
          if (lastDif > 0) {
            if (curDif > lastDif) {
              // console.log("ZOOM IN");
              var dw = w * Math.sign(100) * 0.02;
              var dh = h * Math.sign(100) * 0.02;
              var dx = dw * mx / svgSize.w;
              var dy = dh * my / svgSize.h;
              
              if (viewBox.w > 100) {
                let vb_x = (viewBox.x + dx <= 0 ? 0 : viewBox.x + dx )
                let vb_y = (viewBox.y + dy <= 0 ? 0 : viewBox.y + dy )

                let tempx = viewBox.x
                let tempy = viewBox.y
                
                if (vb_x >= -1500 && vb_x <= 1500) {
                  tempx = vb_x
                }
                if (vb_y > -700 && vb_y < 700) {
                  tempy = vb_y
                }
                
                viewBox = {
                  x: tempx,
                  y: tempy,
                  w: viewBox.w - dw,
                  h: viewBox.h - dh
                };
              }
            }
            if (curDif < lastDif) {
              // console.log("ZOOM OUT");
              var dw = w * Math.sign(-100) * 0.02;
              var dh = h * Math.sign(-100) * 0.02;
              var dx = dw * mx / svgSize.w;
              var dy = dh * my / svgSize.h;
              let vb_x = viewBox.x + dx
              let vb_y = viewBox.y + dy
              let vb_w = viewBox.w - dw
              let vb_h = viewBox.h - dh
              if(vb_w <= 1646 && vb_h <= 787) {
                let tempx = viewBox.x
                let tempy = viewBox.y                
                if (vb_x >= -1500 && vb_x <= 1500) {
                  tempx = vb_x
                }
                if (vb_y > -700 && vb_y < 700) {
                  tempy = vb_y
                }
                viewBox = {
                  x: tempx,
                  y: tempy,
                  w: vb_w,
                  h: vb_h
                };
              }
            }
            movedViewBox = viewBox
          }
          // console.log(viewBox);
          svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
          lastDif = curDif;
        }
      }, false)
        /////// Pinch and Swipe End ////////////////
    },
    zoomIn(){
      const svgImage = document.getElementsByTagName("svg")[0];
      if (viewBox.w > 150) {
        viewBox = {
          x: viewBox.x + 64,
          y: viewBox.y + 32,
          w: viewBox.w - 128,
          h: viewBox.h
        };
        movedViewBox = viewBox
        svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
      }
    },
    zoomOut(){
      const svgImage = document.getElementsByTagName("svg")[0];
      if (viewBox.w >= 1660) {
        viewBox = {
          x: 0,
          y: 0,
          w:1646,
          h:787
        };
      } else {
        viewBox = {
          x: viewBox.x + (-64),
          y: viewBox.y + (-32),
          w: viewBox.w - (-128),
          h: viewBox.h - (-64)
        };
      }
      movedViewBox = viewBox
      svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    },
    zoomReset() {
      var svgMapName=this.mapName
      let disabled = require('../assets/gateBtnBgDesabled.png');
      $('.gates-v').css('background-image', 'url(' + disabled + ')', 'important');
      $('.gates-h').css('background-image', 'url(' + disabled + ')', 'important');
      this.$emit('zoomReset', false);
      const svgImage = document.getElementsByTagName("svg")[0];
      if(Constants.kioskid == 114){
        if(this.zoneName=='DOMESTIC DEPARTURE'){
          viewBox = {x:47.6922607421875,y:-53.84619140625,w:1646,h:787};
        } else {
          viewBox = {x:136.923095703125,y:-32.30767822265625,w:1646,h:787};
        }
      } else {
        if(this.$route.name == 'boardinginfo'){
          viewBox = {x: -133.68598691406254, y:-23.023059277343748, w:1417.8012125, h:708.4918312499999}
        } else{
          viewBox = {x: -239.53205625000004, y:-31.330737499999998, w:1481.8012125, h:708.4918312499999}
        }
      }
      // console.log(viewBox);
      movedViewBox = viewBox
      svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    },
    mapViewBox(viewValues) {
      const svgImage = document.getElementsByTagName("svg")[0];
      viewBox = {
        x: viewValues[0],
        y: viewValues[1],
        w: viewValues[2],
        h: viewValues[3]
      };
      movedViewBox = viewBox
      svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    },
  }
}
</script>
<style >
.animateline {
  -webkit-animation: fadein 200ms linear alternate infinite;
  -moz-animation: fadein 200ms linear alternate infinite;
  animation: fadein 200ms linear alternate infinite;
}

@keyframes fadein {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
svg {
  touch-action: none;
  display: block;
}
#dialMap {
  /* padding-left: 15px; */
}
#Domestic {
  padding-left: 25px;
}

.boarding-map{
    position: relative;
    left: 0px;
    top: 0px;
    height: 752px;
    width: 1228px;
    z-index: 0;
}
.boarding-map svg{
    height: 752px;
    width: 1228px;
}
.btn-z {
  width: 75px;
  height: 75px;
  z-index: 10;
  left: 1108px;
  position: absolute;
}
/*.boarding-z{
  width: 75px;
  height: 75px;
  z-index: 10;
  left: 1799px;
  position: absolute;
}*/
.zoom {
  top: 200px;
}

.zoom-out {
  top: 286px;
}
.zoom-reset{
    top: 132px;
}
.path {
    stroke-dasharray: 1600;
    animation: dash 16s linear infinite;
    animation-iteration-count: 1;
    fill:none;
    stroke:red;
    stroke-width: 0.7;
    filter: drop-shadow(0 0 0.45px #e60000);
    stroke-linejoin: round;
}
.path1 {
    stroke-dasharray: 1600;
    animation: dash3 20s linear infinite;
    animation-iteration-count: 1;
    fill:none;
    stroke:red;
    stroke-width: 0.7;
    filter: drop-shadow(0 0 0.45px #e60000);
    stroke-linejoin: round;
}

@keyframes dash3 {
  from {
    stroke-dashoffset: 1160;
  }
  to {
    stroke-dashoffset: 0;
  }
}
.path-first-floor {
    stroke-width: 3;
    filter: drop-shadow(0 0 1.5px #e60000);
}

@keyframes dash {
  from {
    stroke-dashoffset: 1550;
  }
  to {
    stroke-dashoffset: 0;
  }
}
.path2 {
    stroke-dasharray: 1600;
    animation: dash2 60s linear infinite;
    animation-iteration-count: 1;
    fill:none;
    stroke:red;
    stroke-width: 0.7;
    filter: drop-shadow(0 0 0.45px #e60000);
    stroke-linejoin: round;
}

@keyframes dash2 {
  from {
    stroke-dashoffset: 1550;
  }
  to {
    stroke-dashoffset: 0;
  }
}
.path3 {
    stroke-dasharray: 1600;
    animation: dash3 20s linear infinite;
    animation-iteration-count: 1;
    fill:none;
    stroke:red;
    stroke-width: 0.7;
    filter: drop-shadow(0 0 0.45px #e60000);
    stroke-linejoin: round;
}

@keyframes dash3 {
  from {
    stroke-dashoffset: 1550;
  }
  to {
    stroke-dashoffset: 0;
  }
}
/*.boardingMapLoader {
  position: absolute;
  top: 4px;
  right: 0px;
  left: 20px;
  width: 82%;
  height: 100%;
  background-color: #dfdfdf;
  background-image: url("../assets/loading.gif");
  background-size: 200px;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 27;
  opacity: 0.4;
  filter: alpha(opacity=40);
}*/
.loaders {
  position: absolute;
  top: 4px;
  right: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #dfdfdf;
  background-image: url("../assets/loading.gif");
  background-size: 200px;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 27;
  opacity: 0.4;
  filter: alpha(opacity=40);
}
.blink {
  -webkit-animation: fadein 200ms linear alternate infinite;
  -moz-animation: fadein 200ms linear alternate infinite;
  animation: fadein 200ms linear alternate infinite;
}
@keyframes fadein {
  from {
      opacity: 0.5;
  }
  to {
      opacity: 1;
  }
}

.blink2 {
    -webkit-animation: fadein2 1500ms linear alternate infinite;
    -moz-animation: fadein2 1500ms linear alternate infinite;
    animation: fadein2 1500ms linear alternate infinite;
}
@keyframes fadein2 {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
                           

/* Aminities highlight Style */
.animated-circle {
  fill: none;
  stroke: rgba(0, 64, 255, 0.8);
  -webkit-animation: hideshow 1s linear alternate infinite;
  -moz-animation: hideshow 1s linear alternate infinite;
  animation: hideshow 1s linear alternate infinite;
}

.animated-circle1 {
  fill: none;
  stroke: rgba(0, 64, 255, 0.6);
  -webkit-animation: hideshow1 1s linear alternate infinite;
  -moz-animation: hideshow1 1s linear alternate infinite;
  animation: hideshow1 1s linear alternate infinite;
}

.animated-circle2 {
  fill: none;
  stroke: rgba(0, 64, 255, 0.4);
  -webkit-animation: hideshow2 1s linear alternate infinite;
  -moz-animation: hideshow2 1s linear alternate infinite;
  animation: hideshow2 1s linear alternate infinite;
}

@keyframes hideshow {
  from {
    stroke-width: 0;
    r: 2;
  }
  to {
    stroke-width: 1.5;
    r: 3;
  }
}

@keyframes hideshow1 {
  from {
    stroke-width: 0;
    r: 2;
  }
  to {
    stroke-width: 3;
    r: 4;
  }
}

@keyframes hideshow2 {
  from {
    stroke-width: 0;
    r: 2;
  }
  to {
    stroke-width: 4.5;
    r: 5;
  }
}

</style>
