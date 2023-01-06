<template>
    <div class="row">
      <figure>
        <div>
          <img @click="this.$router.push({path: '/talktous'})" class="btn-bg" :src="require(`@/assets/${imageName}`)">
        </div>
        <figcaption @click="submitBut" class="figcaption mr-2">{{title}}</figcaption>
      </figure>
    </div>
</template>

<script>
export default {
  name: 'TalktousButtons',
  props: [
    'title',
    'btnId',
    'imageName',
    'navPage'
  ],
  methods: {
    submitBut (val) {
      this.navPage()
    }
  }
}
</script>

<style scoped>
div {
   margin: 30px 45px 20px 20px;
}
.btn-bg {
  height: 144px;
  width: 177px;
  margin-left: 18px;
}
.figcaption{
  font-size: 20px;
  font-family: 'Cervino-BoldNeue';
  letter-spacing: 1px;
  margin-left: 4px;
}
</style>
