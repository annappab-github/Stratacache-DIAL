<template>
    <div class="">
      <figure>
        <div class="btn-bg">
          <img class="" :src="require(`@/assets/${imageName}`)">
        </div>
        <figcaption class="figcaption text">{{title}}</figcaption>
      </figure>
    </div>
</template>

<script>
export default {
  name: 'HomeButtons',
  props: [
    'title',
    'btnId',
    'imageName',
  ],
}
</script>

<style scoped>
div {
  margin: -18px 30px 20px 30px;
}
.btn-bg {
  height: 144px;
  width: 177px;
  margin-left: 45px;
}
.figcaption{
  font-size: 20px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 1px;
   margin-left: 20px;
}
</style>
