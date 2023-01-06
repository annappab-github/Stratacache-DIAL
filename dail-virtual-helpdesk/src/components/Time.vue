<template>
  <div class="flex-column time">
    <!-- <div id="time">{{time}}<span id="ampm">{{ ' ' + this.ampm}}</span></div> -->
    <div id="time">{{time}}</div>
    <div id="day">{{day}}</div>
  </div>
</template>

<script>
import Methods from '../utils/Methods'
export default {
  name: 'Time',
  mounted () {
    this.getTime()
    setInterval(function () {
      this.getTime()
    }.bind(this), 1000)
  },
  data () {
    return{
      time: '',
      day: '',
      ampm: ''
    }
  },
  methods: {
    getTime() {
      var d = new Date()
      // var formatedVal = Methods.time12hourformat(d)
      // this.ampm = formatedVal.ampm
      var formatedVal = Methods.time24hourformat(d)
      this.time = formatedVal.time
      this.day = formatedVal.day
    }
  }
}

</script>
<style scoped>
.time {
  font-size: 35px;
  padding: 0;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0.75px;
  line-height: 48px;
}

#ampm{
  font-size: 12px;
  padding-left: 0px;
  line-height: 4px;
  font-family: 'Cervino-RegularNeue';
  letter-spacing: 2.75px;
}
#day {
  font-size: 12px;
  text-align: center;
  line-height: 12px;
  font-family: 'Cervino-RegularNeue';
  letter-spacing: 2.75px;
}
</style>
