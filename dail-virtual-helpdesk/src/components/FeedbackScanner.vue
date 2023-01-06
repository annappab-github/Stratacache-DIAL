<template>
  <div class="explore">
    <div class="bgimg">
        <div class="explore-inner">
          <div class="scanQR-Text text-white">
            <p>
              {{scanPass}}
            </p>
          </div>
          <div class="text-center">
            <div class="scanner"></div>
          </div>
          <div >
            <div class="downArrow"></div>
          </div>
      </div>
          <div class="quitBtn text-center">
            <button @click="this.$router.push('/')" type="" value="">{{quitBtn}}</button>
          </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import xml2js from "xml2js";
import Methods from '../utils/Methods'
import formSubmit from '@/utils/formSubmit.js'
import ConstLangText from '@/utils/Language'
const ConstText = ConstLangText.readConstValues();
import Constants from '../utils/Constants'
import ConstData from '@/utils/Constants';

export default {
  name: 'FeedbackScanner',
  props: [],
  components: {
 
  },
  data () {
    return {
      quitBtn: ConstText.quitBtn,
      scanPass: ConstText.scanPass ,
      afterTrimBoardingDetails: "",
      getBoardingFlightNo: "",
      getFlightIn: "",
      xmlItems: [],
      afterTrimpnrno: ""
    }
  },
  mounted() {
    if(this.$route.path == "/feedbackscanner") {
      Constants.isScanQr = true
    } else {
      Constants.isScanQr = false
    }
    // let flightno = 'aa100'
    // let pnrno = 'KEHP8Q'
    // setTimeout(()=> {
    //     this.$router.push({ name: "FEEDBACK", params: { flightno,  pnrno } });
    // },3000)
     axios.get(Constants.flightXmL()).then((response) => {
      this.parseXML(response.data).then((data) => {
        // console.log(data);
        this.xmlItems = data;
      });
    });
    
    /* Getting Boarding Details */
    let bordingPassDetails = "";
    let firstRead = 0;
    document.addEventListener("keydown", function (e) {
      const textInput = e.key || String.fromCharCode(e.keyCode);

      if (firstRead === 0) {
        firstRead = new Date().getTime();
      }

      if (textInput !== "Shift" && textInput !== "Enter") {
        bordingPassDetails += textInput;
      }
    }, false);

    setInterval(() => {
      try {
        var now = new Date().getTime();
  
        if (firstRead > 0 && now - firstRead > 1050) {
          if (Constants.isScanQr) {
            let pnrnoArr = bordingPassDetails.split(" ")
            const results = pnrnoArr.filter(element => {
                return element !== '';
              });
            this.afterTrimpnrno = results[1]
            this.afterTrimBoardingDetails = bordingPassDetails.slice(36, 43);
            // console.log(this.afterTrimBoardingDetails);
            firstRead = 0;
            if (this.afterTrimBoardingDetails.length > 0) {
              for (var i = 0; i < this.xmlItems.length; i++) {
                let xmlFlightNumber = `${this.xmlItems[i].Airline} ${this.xmlItems[i].FLNO}`              
                // if (this.afterTrimBoardingDetails.toLowerCase() == this.xmlItems[i].FLNO.toLowerCase()) {
                if (this.afterTrimBoardingDetails.toLowerCase() == xmlFlightNumber.toLowerCase()) {
                  let flightFullData = JSON.stringify(this.xmlItems[i])
                  var flightno = this.afterTrimBoardingDetails;
                  var pnrno = this.afterTrimpnrno;
                  var flightIn = this.xmlItems[i].FLTI;
                  var gateNum = this.xmlItems[i].GATE
                  // console.log(flightFullData);
                  this.$router.push({ name: "FEEDBACK", params: { flightno, pnrno } });
                } else {
                  // bordingPassDetails = '';
  
                  // return;
                }
              }
            }
          }
          bordingPassDetails = "";
          this.afterTrimBoardingDetails=''
        }        
      } catch (error) {
        
      }
    }, 100);

  },

  methods: {
 parseXML(data) {
      return new Promise((resolve) => {
        var k = "";
        var arr = [];
        var parser = new xml2js.Parser({
          trim: true,
          explicitArray: true,
        });
        parser.parseString(data, function (err, result) {
          var obj = result.FLIGHTDATA;
          for (k in obj.FLIGHT) {
            var item = obj.FLIGHT[k];
            try {
              let DepartureOrArrival = item.DepartureOrArrival[0]
              arr.push({
                ArrivalDepartureTime: item.PublicScheduledDateTime[0],
                DepartureOrArrival,
                FlightDate: item.FlightDate[0],
                Airline: item.Airline[0],
                FLNO: Methods.padLeadingZeros(item.FlightNumber[0], 4),
                DES: item.DepartureAirport[0],
                FLTI: item.InternationalStatus[0],
                GATE: item.PublicGateNumber[0],
                STATUS: Methods.flightStatus(item.FlightStatus[0]),
                PublicScheduledDateTime: item.PublicScheduledDateTime[0]
              });
            } catch (error) {
              // console.error(error);
            }
          }
          resolve(arr);
        });
      });
    },
    }
  }
</script>

<style scoped>
.downArrow{
  position: absolute;
  font-size: 150px;
  width: 86px;
  height: 61px;
  top: 700px;
  left: 50%;
  transform: translate(-50%, 0);
  background: url('../assets/downarrow.gif');
}
.scanQR-Text {
  font-size: 48px;
  margin: 120px 0px 0px;
  /* font-weight: bold; */
  font-family: 'Cervino-BoldNeue';
}
.scanQR-Text p {
  text-align: center;
  letter-spacing: 2.4px;
}
.scanner {
  position: relative;
  top: 25px;
  /* width: 447px; */
  height: 306px;
  margin: 0px;
  z-index: 0;
  color: #fff;
  text-align: center;
}
.scanner  {
  background-color: #fff;
   background: url('../assets/Bar-code-animation.gif') 0 0;
  font-size: 50px;
  top: 350px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  width: 447px;
  padding: 40px;
  /* height: 306px; */
}

.row{
  margin-left: 0px;
}
.feedqtn{
 margin-top: 50px;
 }
.quitBtn button{
  position: absolute;
  left: 890px;
  top: 965px;
  font-size: 25px;
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
.homeNavbar{
  z-index: 26;
  height: 170px;
  width: 1920px;
}
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
}
</style>
