<template>
<div class="">
    <div class="">
        <div class="text-center mb-2 boardingBg">
            <label class="banner text-white">{{boarding}} </label>
        </div>
    </div>
    <div class="my-2 destination text-center">
        {{source}} - {{this.selectedData.DES}}
    </div>
    <div class="table-responsive mt-3">
        <table class="table table-striped">
            <tbody>
                <tr :class="(flightInfo.length-1==idx)?'':'emptyStrips'" v-for='(flight, idx) in flightInfo' :key='idx'>
                    <td class="pl-5 px-3 info info2" id="gateDetails">{{ flight.name }}</td>
                    <td class="info1 "  v-if="flight.name=='DATE' || flight.name=='दिनांक'">{{(this.FlightDate)}}</td>
                    <td class="info1" v-if="flight.name=='FLIGHT' || flight.name=='उड़ान'">{{this.selectedData.Airline}} {{this.selectedData.FLNO}}</td>
                    <!-- <td class="info1" v-if="flight.name=='BOARD TIME' || flight.name=='बोर्ड का समय'">-</td> -->
                    <td class="info1" v-if="flight.name=='DEPARTURE' || flight.name=='प्रस्थान'">{{this.PublicScheduledDateTime}}</td>
                    <td class="info1" v-if="flight.name=='GATE NO' || flight.name=='गेट नं'">{{this.selectedData.GATE}}</td>
                    <td class="info1" v-if="flight.name=='STATUS' || flight.name=='स्थिति'">{{this.selectedData.STATUS}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="scanPass">
       <div class="text-center text-white p-2"  @click="this.$router.push('/scanboardingpass')">{{getAnotherPass}}</div>
    </div>
</div>
</template>

<script>
import ConstLangText from '@/utils/Language'
import Methods from '../utils/Methods'
const ConstText = ConstLangText.readConstValues();

Date.prototype.toShortFormat = function() {
  let monthNames =["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP", "OCT","NOV","DEC"]
  let day = this.getDate()
  let monthIndex = this.getMonth()
  let monthName = monthNames[monthIndex]
  let year = this.getFullYear()
  return `${day}-${monthName}-${year}`
}
export default {
  name: 'boardinginfo',
  props: {
    title: String, 
  },
  data () {
    return {
      getAnotherPass: ConstText.getAnotherPass,
      boarding: ConstText.boarding,
      getFlightID: '',
      source: 'DEL',
      xmlData: [],
      selectedData: [],
      FlightDate: '',
      flightInfo: [
        { name: ConstText.date, id: '31-DEC-2021' },
        { name: ConstText.flight, id: 'INDIGO-6E-1130' },
        // { name: ConstText.boardtime, id: '7:45' },
        { name: ConstText.departure, id: '08:00' },
        { name: ConstText.gateno, id: '62' },
        { name: ConstText.status, id: 'ON-TIME' }
      ],
      PublicScheduledDateTime: ''
    }
  },
  mounted() {
   
    this.getFlightID = this.$route.params.flightno  //getting flight num from url
    this.searchFlights();
    
  },
  methods: {
    searchFlights() {
      let flightFullData = this.$route.params.flightFullData  //getting flight num from url
      if (flightFullData != "") {
        const flightData = JSON.parse(flightFullData)
        // console.log(flightData);
        this.selectedData = flightData
        this.selectedData.STATUS = flightData.STATUS.toUpperCase()
        let today = new Date();
        if(flightData.FlightDate != '') {
          let flFullDate = flightData.FlightDate;
          let flYear = flFullDate.substring(0, 4), flMonth = flFullDate.substring(4, 6), flDate = flFullDate.substring(6, 8)
          today.setFullYear(flYear)
          today.setMonth(parseInt(flMonth)-1, parseInt(flDate))
        }
        this.FlightDate = today.toShortFormat()
        if(flightData.PublicScheduledDateTime != '') {
          let PublicScheduledDateTime = flightData.PublicScheduledDateTime
          let flHour = PublicScheduledDateTime.substring(8, 10), flMin = PublicScheduledDateTime.substring(10, 12), flSec = PublicScheduledDateTime.substring(12, 14)
          today.setUTCHours(parseInt(flHour), parseInt(flMin), parseInt(flSec))
          
          var formatedVal = Methods.time24hourformat(today)
          this.PublicScheduledDateTime = formatedVal.time
        }        
      }       
    }    
  },
}
</script>

<style scoped>
.banner{
  position: absolute;
  top: 94px;
  width: 641px;
  height: 150px;
  font-family: 'Amplitude-Bold';
   letter-spacing: 1.12px;
  left: 5px;
  font-size: 56px;
}
.table-striped > tbody > tr:nth-child(1n) > td, .table-striped > tbody > tr:nth-child(1n) > th {
   background-image: url('../assets/tablebg.png');
   background-repeat: no-repeat;
   background-size: cover;
   background-position: center;
   width: 692px;
   height: 59px;
}
.table td{
  padding: 5px;
}
.destination{
    font-size: 45px;
    color: #fff;
    font-family: 'Cervino-ExtraBoldNeue';
    letter-spacing: 0.77px;
    text-align: center;
}
.scanPass{
  font-size: 35px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 1.05px;
  background-image: url('../assets/rectangle.png');
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  width: 692px;
  height: 72px;
  bottom: 75px;
}
.info{
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0px;
  font-size: 28px;
}
.info1{
  font-family: 'Cervino-ExtraBoldNeue';
  letter-spacing: 0px;
  font-size: 28px;
}
.info2 {
   font-family: 'Cervino-ExtraBoldNeue';
  letter-spacing: 0px;
  font-size: 28px;
  font-weight: bolder;
}
.boardinfo{
    width: 692px;
    bottom: 0px;
    font-size: 25px;
}
.emptyStrips{
  border-bottom: 45px solid rgba(255, 255, 255, 0);
}
.boardingBg{
  background-image: url('../assets/boardingbanner.png');
  background-repeat: no-repeat;
  background-position: center;
  height: 145px;
  width: 653px;
  margin: 70px 0px 0px 15px;
}
</style>
