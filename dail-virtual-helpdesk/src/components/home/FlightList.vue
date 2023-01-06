<template>
<div class="flightlist">
<table class="table table-striped">
    <thead class="text-white" style="background-color: #809BCE">
    <tr>
        <th scope="col">DESTINATION</th>
        <th scope="col">AIRLINE</th>
        <th scope="col">FLIGHT</th>
        <th scope="col">GATE</th>
        <th scope="col">TIME</th>
        <th scope="col">STATUS</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for='item in flights' :key='item.flight'>
        <th scope="row">{{ item.dest }}</th>
        <td>{{ item.airline }}</td>
        <td>{{ item.flight }}</td>
        <td>{{ item.gate }}</td>
        <td>{{ item.time }}</td>
        <td>{{ item.statusstr }}</td>
    </tr>
    </tbody>
</table>
</div>
</template>
<script>
export default {
  name: 'FlightList',
  data () {
    return {
      flights: [
        { dest: 'MUM', airline: 'Go Air', flight: '6e-1130', gate: 'A-7', time: '7:45', statusstr: 'Boarding' },
        { dest: 'BlR', airline: 'Spice', flight: '6e-1130', gate: 'A-7', time: '7:45', statusstr: 'Boarding' },
        { dest: 'MAA', airline: 'Go Air', flight: '6e-1130', gate: 'A-7', time: '7:45', statusstr: 'Boarding' },
        { dest: 'BlR', airline: 'Go Air', flight: '6e-1130', gate: 'A-7', time: '7:45', statusstr: 'Boarding' },
        { dest: 'MAA', airline: 'Go Air', flight: '6e-1130', gate: 'A-7', time: '7:45', statusstr: 'Boarding' },
        { dest: 'BlR', airline: 'Go Air', flight: '6e-1130', gate: 'A-7', time: '7:45', statusstr: 'Boarding' },
        { dest: 'MAA', airline: 'Go Air', flight: '6e-1130', gate: 'A-7', time: '7:45', statusstr: 'Boarding' },
        { dest: 'BlR', airline: 'Go Air', flight: '6e-1130', gate: 'A-7', time: '7:45', statusstr: 'Boarding' },
        { dest: 'MAA', airline: 'Go Air', flight: '6e-1130', gate: 'A-7', time: '7:45', statusstr: 'Boarding' },
        { dest: 'BlR', airline: 'Go Air', flight: '6e-1130', gate: 'A-7', time: '7:45', statusstr: 'Boarding' },
        { dest: 'MAA', airline: 'Go Air', flight: '6e-1130', gate: 'A-7', time: '7:45', statusstr: 'Boarding' },
        { dest: 'BlR', airline: 'Go Air', flight: '6e-1130', gate: 'A-7', time: '7:45', statusstr: 'Boarding' },
        { dest: 'BlR', airline: 'Go Air', flight: '6e-1130', gate: 'A-7', time: '7:45', statusstr: 'Boarding' },
        { dest: 'MAA', airline: 'Go Air', flight: '6e-1130', gate: 'A-7', time: '7:45', statusstr: 'Boarding' },
        { dest: 'BlR', airline: 'Go Air', flight: '6e-1130', gate: 'A-7', time: '7:45', statusstr: 'Boarding' },
        { dest: 'MAA', airline: 'Go Air', flight: '6e-1130', gate: 'A-7', time: '7:45', statusstr: 'Boarding' }
      ]
    }
  }
}
</script>
<style scoped>
.table-striped > tbody > tr:nth-child(2n) > td, .table-striped > tbody > tr:nth-child(2n) > th {
   background-color:  #9EBED3;
}
.flightlist{
  width: 960px;
  height: 860px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.flightlist::-webkit-scrollbar {
display: none;
}
</style>
