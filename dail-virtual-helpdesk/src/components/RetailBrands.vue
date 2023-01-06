<template>
        <div class="">
            
            <div class="row brands">
              <div class="brandsimg" v-for="(items, index) in retailBrands" :key="index" >
                <img  @click="retailDetail(items, index)" v-if="items.icon!='TextLogoBg.png'" :src="require(`../assets/${items.icon}`)" alt="icons">

                <div class="text-holder" v-if="items.icon=='TextLogoBg.png'" @click="retailDetail(items, index)">
                  <label :class="items.hotspotdisplayname.name.length>7 && items.hotspotdisplayname.name.length<11 && !(/\s/.test(items.hotspotdisplayname.name))? 'inner-text innerText-size' : items.hotspotdisplayname.name.length>10 && items.hotspotdisplayname.name.length<18 && !(/\s/.test(items.hotspotdisplayname.name)) ? 'inner-text small-text': items.hotspotdisplayname.name.length>17 && (/\s/.test(items.hotspotdisplayname.name))? 'inner-text extra-small-text': items.hotspotdisplayname.name.length>10 && (/\s/.test(items.hotspotdisplayname.name)) ? 'inner-text middle-text': 'inner-text' ">{{items.hotspotdisplayname.name.toUpperCase()}}</label>
                </div>
              </div>
            </div>

        </div>
</template>

<script>
export default {
  name: 'Amenities',
  props: ['retailBrands', 'depArr'],
  data () {
    return {
    }
  },
  mounted(){
      // console.log('retailBrands',this.retailBrands);
  },
  methods: {
    retailDetail(items, index ) {
      this.$emit('retailDetail', items);
    },
  }
}
</script>
<style scoped>
.text-holder{
  background-image: url("../assets/TextLogoBg.png");
  background-size: cover;
  background-repeat: no-repeat;
  width: 127px;
  height: 109px;
}
.inner-text{
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  margin: 0;
  font-family: "Montserrat-Medium";
  color: black;
  font-size: 23px;
  max-width: 127px;
  text-align: center;
}
.innerText-size{
  font-size: 18px;
}
.small-text{
  font-size: 15px;
}
.middle-text{
  font-size: 19px;
}
.extra-small-text{
  font-size: 13px;
}
.brandsimg img{
  background-image: url("../assets/brandsBg.png");
  background-size: cover;
  background-repeat: no-repeat;
  width: 127px;
  height: 109px;
}
.col-md-1 {
  flex-grow: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
.row {
  width: 1518px;
  margin-left: 0px;
  margin-right: 0px;
}
.brands {
   margin-left: 120px;
   height: 219px;
   width: 1320px;
}

</style>
