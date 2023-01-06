<template>
<div class="feedbackBg">
    <div class="text-white pl-5 pt-1 qtns">
       <p>{{question.qtn}}</p>
    </div>
    <div class="row ml-5" >
        <div class="col-2 ml-5 mt-2" v-for="(opt, index) in question.opts" :key="index">
            <input class="form-check-input ml-2" @click="submitFeedback(opt.storeValue)" type="radio" :name="name" :id="`${name}${index}`" :value="opt.storeValue" >
            <label class="form-check-label text-white ml-3" :for="`${name}${index}`">{{opt.diplayText}}</label>
        </div>
    </div>
</div>

</template>

<script>
import ConstLangText from '@/utils/Language'
const ConstText = ConstLangText.readConstValues();
import ConstData from '@/utils/Constants';

export default {
  name: 'FeedbackQuestion',
  props: ['question', 'name', 'feedbackReplay'],
  data () {
    return {
      feedbackForm: {
        formName: "feedbackForm",
        userSelectedQuestion: '',
        userSelectedAnswer: '',
        Abrrevation: '',
      }
    }
  },
  methods: {
    submitFeedback(opt) {
      this.feedbackForm.userSelectedQuestion = this.question.qtn
      this.feedbackForm.Abrrevation = this.question.Abrre
      this.feedbackForm.userSelectedAnswer = opt
      this.feedbackReplay(this.feedbackForm)
      // console.log(this.question.qtn)
    }
  }
}
</script>

<style scoped>
.qtns{
    background-image: url('../../assets/qtnbackground.png');
    width: 1120px;
    height: 43px;
    margin-top: 42px;
    color: #fff;
}
.qtns p{
    font-family: 'Cervino-BoldNeue';
    letter-spacing: 0.72px;
    font-size: 24px;
}
input[type="radio"] {
height: 18px; 
width: 18px;
}
p {
  font-family: 'Cervino-RegularNeue';
  letter-spacing: 0.54px;
  font-size: 18px;
}
.radioBtns{
  margin-left: 50px;
}
</style>
