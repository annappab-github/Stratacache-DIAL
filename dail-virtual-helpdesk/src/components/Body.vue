<template>
<div class="explore">
  <div class="bgimg">
  <div class="explore-inner">
    <div class="row m-0">
      <div class="col p-0">
          <VirtualDesk/>
      </div>
      <div class="col p-0">
        <div class="text-dark text-center font-weight-bold title" style="background-color:  #9EBED3">
          <label class="align-self-center m-0">UPCOMING FLIGHTS</label>
        </div>
        <flight-list></flight-list>
      </div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
import FlightList from './home/FlightList'
import VirtualDesk from './home/VirtualDesk'

export default {
  components: {
    FlightList,
    VirtualDesk
  },
  name: 'Body'
}
</script>

<style scoped>
.bgimg{
  background-image: url('../assets/Background.png');
  background-position: center;
  height: 1080px;
  bottom: 0px;
  width: 1920px;
  position: absolute;
}
.row{
  width: 1920px;
}
.col{
  height: 910px;
}
.title{
  height: 50px;
}
.explore{
  position: absolute;
  height: 910px;
}
.explore-inner{
  position: absolute;
  top: 146px;
  height: 935px;
}

</style>
