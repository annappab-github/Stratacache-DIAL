<template>
  <div :class="keyboardClass"></div>
  <div id="mdiv"   @click="hideKeyBoard" v-if="hideCrossBar">
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
    }
  },
  data: () => ({
    keyboard: null,
    hideCrossBar: true
  }),
  mounted () {
    if(this.$route.path == "/explore") {
        this.hideCrossBar = false
       } else {
        this.hideCrossBar = true
    }
    this.keyboard = new Keyboard(this.keyboardClass, {
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      maxLength: 13,
      layout: {
        default: [
            "1 2 3",
            "4 5 6",
            "7 8 9",
            "* 0 # 9 ( ) -",
            "+ {bksp}"
        ]

      },
    })
  },
  methods: {
    onChange (input) {
      this.$emit('onChange', input)
    },
    onKeyPress (button) {
      this.$emit('onKeyPress', button)
      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === '{shift}' || button === '{lock}') this.handleShift()
    },
    handleShift () {
      const currentLayout = this.keyboard.options.layoutName
      const shiftToggle = currentLayout === 'default' ? 'shift' : 'default'
      this.keyboard.setOptions({
        layoutName: shiftToggle
      })
    }
  },
  watch: {
    input (input) {
      this.keyboard.setInput(input)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
