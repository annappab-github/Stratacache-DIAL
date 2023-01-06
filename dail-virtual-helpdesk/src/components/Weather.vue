<template>
  <div class="weather ">
    <!-- <a class="weatherwidget-io currentWeather"  href="https://forecast7.com/en/28d6677d23/delhi/" data-label_1="NEW DELHI"  data-font="Arial Narrow" data-mode="Current" data-theme="original" data-basecolor="" >DELHI</a> -->
    <p class="location">NEW DELHI</p>
    <div class="d-flex justify-content-between">
      <img v-if="iconloaded" class="wt-icon" :src="require(`../assets/weathericons/${weatherIconName}`)" alt="">
      <div class="temp-container">
        <p class="temprature">{{temprature}}<sup>o</sup> C</p>
        <p :class="(weatherName.length > 10 ? 'wt-text wt-text-reduse-size' : 'wt-text')">{{weatherName}}</p>
      </div>
    </div>
  </div>
</template>

<script> 
import axios from "axios";
import Constants from '../utils/Constants'
import xml2js from "xml2js";

export default {
  name: 'Weather',
  data () {
    return {
      temprature: '',
      weatherName: '',
      weatherIconName: '',
      iconloaded: false
    }
  },
  mounted () {
    this.readWeather()
    setInterval(function () {
      // this.getWeather()

      this.readWeather()
    }.bind(this), (1000 * 60))


  },
  methods: {
    readWeather() {
      axios.get(Constants.weatherXMLUrl()).then((response) => {
        this.filterWeatherData(response.data).then((data) => {
          this.temprature = data.temprature
          this.weatherName = data.currentweather
          this.weatherIconName = data.icon
          this.iconloaded = true
        });
      });
    },
    filterWeatherData(data) {
      return new Promise((resolve) => {
        let currentReport = { temprature: '', currentweather: '', icon: '' }

        let tempraturetest = data.match(/TEMPRATURE(\s)*:(\s)*(\d)*/gi);
        let currentweathertext = data.match(/CURRENT(\s)*WEATHER(\s)*:(\s)*([A-Za-z])*/gi);

        let temprature = (tempraturetest.length > 0 ? tempraturetest[0].split(":"): []).map(element => element.trim());
        let currentweather = (currentweathertext.length > 0 ? currentweathertext[0].split(":"): []).map(element => element.trim());

        currentReport.temprature = (temprature.length > 0 ? temprature[1] : "-")
        currentReport.currentweather = (currentweather.length > 0 ? this.checkactualname(currentweather[1])[0] : "ATMOSPHERE")
        currentReport.icon = (currentweather.length > 0 ? this.checkactualname(currentweather[1])[1] : "Atmosphere.png")

        resolve(currentReport);
      });
    },

    checkactualname(bse) {
      let weatherName = ''
      let weatherIconName = ''

      if (bse == "FG") {
        weatherName = "FOG"
        weatherIconName = 'Fog.png'
      } else if (bse == "MIFG") {
        weatherName = "SHALLOW FOG"
        weatherIconName = 'Fog.png'
      } else if (bse == "FU") {
        weatherName = "SMOKE"
        weatherIconName = 'Smoke.png'
      } else if (bse == "HZ") {
        weatherName = "HAZE"
        weatherIconName = 'Haze.png'
      } else if (bse == "BR") {
        weatherName = "MIST"
        weatherIconName = 'Mist.png'
      } else if (bse == "TSRA") {
        weatherName = "THUNDER STORM WITH RAIN"
        weatherIconName = 'Thunderstorm.png'
      } else if (bse == "DZ") {
        weatherName = "DRIZZLE"
        weatherIconName = 'Drizzle.png'
      } else if (bse == "RA") {
        weatherName = "RAIN"
        weatherIconName = 'Rain.png'
      } else if (bse == "DU") {
        weatherName = "DUST"
        weatherIconName = 'Dust.png'
      } else {
        weatherName = 'ATMOSPHERE'
        weatherIconName = 'Atmosphere.png'
      }

      return [weatherName, weatherIconName]
    },

    getWeather () {
      (function (d, s, id) {
        var js
        var fjs = d.getElementsByTagName(s)[0]
        if (!d.getElementById(id)) {
          js = d.createElement(s)
          js.id = id
          js.src = 'https://weatherwidget.io/js/widget.min.js'
          fjs.parentNode.insertBefore(js, fjs)
        }
      }(document, 'script', 'weatherwidget-io-js'))
    }
  }
}
</script>

<style>
.weather{
  width: 224px;
  height: 91px;
  margin-top: -30px;
  color: #FFF;
  font-family: 'Cervino-RegularNeue';
}
.weather a {
  margin-top: -12px;
  width: 224px;
}

.location {
  font-size: 18px;
  line-height: 16px;
  margin: 0;
  padding: 0;
  text-align: center;
  letter-spacing: 1.75px;
}
.wt-icon {
  width: 150px;
  height: 150px;
  margin: 0;
  margin-top: -35px;
  margin-left: -20px;
}
.temp-container {
  width: 80px;
  margin-left: -10px;
  margin-right: 20px
}
.temprature {
  font-size: 35px;
  font-family: 'Cervino-BoldNeue';
  line-height: 35px;
  margin:0;
  padding:0;
  margin-top: 13px;
}
.wt-text {
  font-size: 12px;
  text-align: center;
  line-height: 12px;
  margin: 7px -20px 0;
  padding:0;
  letter-spacing: 2.75px;
}

.wt-text-reduse-size {
  font-size: 10px;
  margin-top: 2px;
}

</style>
