<template>
    <div class="">
      <figure>
        <div class="homeBtns" >
          <img :src="require(`@/assets/${imageName}`)">
        </div>
        <figcaption class="figcaption mt-3">{{title}}</figcaption>
      </figure>
    </div>
</template>

<script>
export default {
  name: 'HomeButtons',
  props: [
    'title',
    'navPage',
    'imageName'
  ],
}
</script>

<style scoped>
.homeBtns {
  margin: 0px 0px 10px 0px;
}
img {
  height: 144px;
  width: 177px;
  margin: 0px 0px 0px 0px;
}
.figcaption{
  font-size: 20px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 0px;
}
.figure {
  margin: 0px;
}
</style>
