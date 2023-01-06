<template>
  <div>
    <div class="explore" if="refinedFlights">
      <div class="bgimg">
        <div class="explore-inner">
              <div class="flightNo">
                <div v-if="showModel"  class="popupBox">
                  <label class="notification">{{enterFlightNo}}</label>
                    <!--<div id="mdiv"   @click="hideAlert">
                      <div class="mdiv">
                        <div class="md"></div>
                      </div>
                    </div>-->
                </div>
                <div v-if="showModel2"  class="popupBox">
                  <label class="notification">{{notFound}}</label>
                   <!-- <div id="mdiv"   @click="hideAlert">
                      <div class="mdiv">
                        <div class="md"></div>
                      </div>
                    </div>-->
                </div>
              </div>
            <div class="flight-info">
              <label  v-if = "tempLanguage == 'en'" class="label1" for="number">{{flightno}} </label>
              <label  v-if = "tempLanguage == 'hn'" class="flight-number" for="number">{{flightno}} </label>
              <input
                type="text"
                id="number"
                name="number"
                value=""
                @click="enterClicked('number')"
                autocomplete="off"
              />
              <div class="submitBtn">
                  <button class=""  @click="searchFlights()" type="button" value="">
                    {{submitBtn}}
                  </button>
              </div>
            </div>
            <div class="label2">
              <label class="">{{or}}</label>
            </div>
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
          <div class="quitBtn text-center">
            <button @click="this.$router.push('/')" type="" value="">{{quitBtn}}</button>
          </div>
        </div>
        <div class="keyboard">
          <SimpleKeyboard
            v-if="showKeyboard"
            @onChange="onChange"
            @onKeyPress="onKeyPress"
            :input="input"
            :hideKeyBoard="hideKeyBoard"
            :inputVal="inputVal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleKeyboard from "../components/SimpleKeyboard.vue";
import $ from "jquery";
import axios from "axios";
import xml2js from "xml2js";
import ConstLangText from '@/utils/Language'
import Constants from '../utils/Constants'
import Methods from '../utils/Methods'
const ConstText = ConstLangText.readConstValues();

export default {
  name: "ScanBoardingPass",
  // props: ["isScanQr"],
  data() {
    return {
      input: "", 
      inputid: "",
      showModel: false,
      showModel2: false,
      showKeyboard: false,
      xmlItems: [],
      afterTrimBoardingDetails: "",
      getBoardingFlightNo: "",
      getFlightIn: "",
      submitBtn: ConstText.submitBtn,
      flightno: ConstText.flightno,
      quitBtn: ConstText.quitBtn,
      scanPass: ConstText.scanPass ,
      enterFlightNo: ConstText.enterFlightNo,
      notFound: ConstText.notFound,
      or: ConstText.or,
      tempLanguage: '',
      inputVal: ''      
    };
  },
  mounted() {
    // this.isScanQr = true
    if(this.$route.path == "/scanboardingpass") {
      Constants.isScanQr = true
    } else {
      Constants.isScanQr = false
    }
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

        // M1GARG/GOPALRAJSWAROOP KEHP8Q DELPNQSG 8938 167Y029B0076 147>1181 O2167BSG 0000000000000297750000000000 0                          
        // M1PANDIT/SAURABH MR   EPUKGFQ BLRDEL9W 0816 208Y024B0167 100
        // M1DESAI/RADHA         EICTNOM BLRBOM9W 0450 209Y017F0136 300
        // M1KATKAM/ROHAN        EQPBYKE BLRIXE9W 2401 205Y003D0046 100
        // M1DE SOUZA/EDWIN ANTHOE5JOPWL LHRDELAI 0112 166Y018E0223 35D>5180 O2166BAI              2A09839061755980 AI                        N*50600000K09 
        // M1ALUGANTI/GAGANA DEEPE4IEGPV DELMAAAI 0537 167K027B0037 15E>5183OO2166BAI 00160832280012A09877046710490 AI                        N*50601023K0900   AVML 
        // M1ALUGANTI/SRIHARSHA  E4IEGPV DELMAAAI 0537 167K027F0029 15E>5180OO2166BAI 00160832170012A09877046710500 AI                        N*50601023K0900   AVML 
        // M1ALUGANTI/DHANVI DEEPE4IEGPV DELMAAAI 0537 167K027E0036 15E>5183OO2166BAI 00160832360012A09877046710480 AI                        N*50601023K0900   AVML
        // M1GARG/GOPALRAJSWAROOP KEHP8Q DELPNQSG 8938 167Y029B0076 147>1181 O2167BSG 0000000000000297750000000000 0   

  
        if (firstRead > 0 && now - firstRead > 1050) {
          if (Constants.isScanQr) {
            // console.log(bordingPassDetails);
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
                  var flightIn = this.xmlItems[i].FLTI;
                  var gateNum = this.xmlItems[i].GATE
                  // console.log(flightFullData);
                  this.$router.push({ name: "boardinginfo", params: { flightno, flightIn, gateNum, flightFullData} });
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

  },
  components: {
    SimpleKeyboard,
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
    searchFlights() {
      // console.log(this.input);
      if(this.input == ''){
          this.showModel = true;
      } 
      else {
        let nofight = true
        var result = this.input.trim().replace(' ', '').toUpperCase();
        result = result.slice(0, 2) + Methods.padLeadingZeros(result.slice(2, result.length), 4)
        for (var i = 0; i < this.xmlItems.length; i++) {
          let xmlFlightNumber = `${this.xmlItems[i].Airline}${this.xmlItems[i].FLNO}`
          var flightno = `${this.xmlItems[i].Airline} ${this.xmlItems[i].FLNO}`
          var flightIn = this.xmlItems[i].FLTI;
          var gateNum = this.xmlItems[i].GATE
          let flightFullData = JSON.stringify(this.xmlItems[i])
          if(Constants.kioskid == 114){
            if (xmlFlightNumber.toUpperCase() == result ) {
              this.$router.push({ name: "boardinginfo", params: { flightno, flightIn, gateNum, flightFullData } });
              nofight = false
              break;
            } 
          } else {
            if (xmlFlightNumber.toUpperCase() == result && this.xmlItems[i].FLTI == 'Domestic') {
              this.$router.push({ name: "boardinginfo", params: { flightno, flightIn, gateNum, flightFullData } });
              nofight = false
              break;
            }
          }
          
        }
        if(nofight) {
          this.showModel2 = true;
        }

      }      
    },
    enterClicked(id) {
      this.showKeyboard = true;
      this.showModel = false;
      this.showModel2 = false;
      var inputValue = $(`#${id}`).val();
      this.showKeyBordFunc(id, inputValue);
    },
    showKeyBordFunc(id, value) {
      this.showKeyboard = true;
      this.input = value;
      this.inputid = id;
      this.inputVal = value
    },
    onChange(input) {
      if( $(event).length > 0 && ! $(event.target).hasClass("hg-activeButton") )
      {
        this.input = input;
        $(`#${this.inputid}`).val(input);
      }
    },
    onKeyPress(button) {
      // console.log("button", button);
    },
    onInputChange(input) {
      this.input = input.target.value;
    },
    hideKeyBoard() {
      this.showKeyboard = false;
    },
    hideAlert() {
      this.showModel = false;
      this.showModel2 = false;
    }
  },
};
</script>

<style scoped>

 #mdiv {
  width: 40px;
  height: 40px;
  top: 2px;
  left: 560px;
  position: absolute;
  background-color: red;
  cursor: pointer;
}

.mdiv {
  height: 30px;
  width: 5px;
  margin-left: 20px;
  margin-top: 4px;
  background-color: #fff;
  transform: rotate(45deg);
  Z-index: 1;
  cursor: pointer;
}

.md {
  height: 30px;
  width: 5px;
  background-color: #fff;
  transform: rotate(90deg);
  Z-index: 2;
  cursor: pointer;
}

.popupBox {
 /* border-radius: 50px 50px 50px 50px;*/
  background: #34dbeb;
  position: absolute;
  top: -40px;
  width: 600px;
  height: 60px;
  z-index: 10;
  color: #fff;
  text-align: center;
}
.notification{
  font-size: 25px;
  margin-top: 8px;
}
.keyboard {
  position: absolute;
  top: 0px;
  left: 21%;
  transform: translate(-50%, 0);
}
.bgimg {
  background-image: url("../assets/Background.png");
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
  top: 136px;
  height: 944px;
  width: 1920px;
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

.quitBtn button{
  position: absolute;
  outline: none;
  text-decoration: none;
  font-size: 25px;
  width: 135px;
  height: 48px;
  top: 850px;
  left: 900px;
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
.submitBtn button{
  outline: none;
  text-decoration: none;
  background-image: url('../assets/submit.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  position: absolute;
  font-family: 'Cervino-RegularNeue';
  letter-spacing: 0.75px;
  font-size: 25px;
  color: #fff;
  left: 1260px;
  top: 62px;
  width: 135px;
  height: 47px;
}
.flightNo {
  width: 1920px;
  margin-top: 30px;
  left: 680px;
  position: absolute;
}
.label1 {
  font-size: 48px;
  color: #fff;
  font-family: 'Cervino-BoldNeue';
  text-align: center;
  letter-spacing: 2.4px;
  margin: 0px 0px 0px 520px;
}
.flight-number{
   font-size: 48px;
  color: #fff;
  font-family: 'Cervino-BoldNeue';
  text-align: center;
  letter-spacing: 2.4px;
  margin: 0px 0px 0px 480px;
}
.flight-info{
  margin-top: 52px;
  left: 50%;
}
.label2 {
  font-size: 35px;
  color: #fff;
  top: 160px;
  position: absolute;
  font-family: 'Cervino-RegularNeue';
  letter-spacing: 1.75px;
  left: 50%;
  transform: translate(-50%, 0);
}
input[type="text"] {
  width: 492px;
  height: 67px;
  left: 744px;
  font-size: 25px;
  position: absolute;
  background-color: #fff;
  -webkit-appearance: none;
  border: none;
  outline: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
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
</style>
