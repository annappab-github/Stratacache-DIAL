<template>
  <div id="simpleKeyboard-custom" :class="keyboardClass"></div>
  <div id="mdiv" @click="hideKeyBoard" v-if="hideCrossBar">
    <div class="mdiv">
      <div class="md"></div>
    </div>
  </div>
</template>

<script>
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'
import Constants from '../utils/Constants'
import $ from 'jquery'
export default {
  name: 'SimpleKeyboard',
  props: {
    hideKeyBoard: String,
    keyboardClass: {
      default: 'simple-keyboard',
      type: String
    },
    input: {
      type: String
    },
    isNumeric:{
      type: Boolean
    },
    inputVal: String
  },
  data: () => ({
    keyboard: null,
    hideCrossBar: true,
    tempInput: ""
  }),
  mounted () {
    // console.log("isNumeric==>", this.isNumeric)
    if(this.$route.path == "/explore") {
        this.hideCrossBar = false
       } else {
        this.hideCrossBar = true
    }
    if(this.isNumeric) {
      this.keyboard = new Keyboard(this.keyboardClass, {
        onChange: this.onChange,
        onKeyPress: this.onKeyPress,
        theme: "hg-theme-default hg-layout-default myTheme",
        maxLength: 15,
        layout: {
          default: [
              "1 2 3 +",
              "4 5 6 (",
              "7 8 9 )",
              "* 0 -",
              "{bksp}"
          ]
        },
        buttonTheme: [{
            class: "myCustomClass",
            buttons: "1 2 3 4 5 6 7 8 9 0 * #"
          },
          {
             class: "bg-theme",
             buttons: "1 2 3 4 5 6 7 8 9 0 * #"
          }
        ]
      })
    } else {
      this.keyboard = new Keyboard(this.keyboardClass, {
        onChange: this.onChange,
        onKeyPress: this.onKeyPress
      })
    }

    // this.onchange(this.inputVal)
    this.keyboard.setInput(this.inputVal)
    
  },
  methods: {
    
    async onChange (input) {
      // console.log('input', input)
      if( $(event).length > 0 && ! $(event.target).hasClass("hg-activeButton") )
      {
        this.tempInput = input;
        this.$emit('onChange', input); 
      }else {
        this.keyboard.setInput(this.tempInput);
        this.$emit('onChange', this.tempInput) 
        console.log("else");
      }           
      
      try {
        var elem = document.getElementById("simpleKeyboard-custom");
          elem.onclick.apply(elem);
      } catch (error) {
        console.error();
      }

      await this.sleep(1000);
    },
    async onKeyPress (button) {
      // console.log("Button Clicked", button)
      this.$emit('onKeyPress', button)
      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === '{shift}' || button === '{lock}') this.handleShift()
      try {
        var elem = document.getElementById("simpleKeyboard-custom");
          elem.onclick.apply(elem);
      } catch (error) {
        console.error();
      }
      await this.sleep(1000)
    },
    handleShift () {
      const currentLayout = this.keyboard.options.layoutName
      const shiftToggle = currentLayout === 'default' ? 'shift' : 'default'
      this.keyboard.setOptions({
        layoutName: shiftToggle
      })
    },
    sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }
  },
  watch: {
    input (input) {
      // console.log("watch ", input)
      this.keyboard.setInput(input)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hg-theme-default{
   background-color: #1c407d;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
    overflow: hidden;
    padding: 5px;
    touch-action: manipulation;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: inherit;
    width: 1118px;
    left: 2px;
    top: 708px;
}
.hg-theme-default .hg-button {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #b5b5b5;
    border-radius: 10px;
    box-shadow: 0 0 3px -1px rgba(0, 0, 0, .3);
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 60px;
    justify-content: center;
    padding: 5px;
    font-size: 28px;
}
  .hg-theme-default.hg-layout-numeric .hg-button {
    align-items: center;
    display: flex;
    height: 60px;
    justify-content: center;
    width: 33.3%
  }
  
.myTheme {
  width: 1120px;
  color: #000;
  left: 0px;
  padding: 8px 270px 5px;
} 

  div.hg-button.hg-standerdBtn {
    height: 100px !important;
    background: #000
  }
  #mdiv {
  width: 100px;
  height: 65px;
  top: 644px;
  left: 1020px;
  position: absolute;
  background-color: red;
   cursor: pointer;
}

.mdiv {
  height: 45px;
  width: 5px;
  margin-left: 48px;
  margin-top: 10px;
  background-color: #fff;
  transform: rotate(45deg);
  Z-index: 1;
}

.md {
  height: 45px;
  width: 5px;
  background-color: #fff;
  transform: rotate(90deg);
  Z-index: 2;
}
</style>
