<template>
<div class="explore">
<div class="overlay" @click="closeDesc"></div>
    <div class="">
        <div class="explore-inner ">
            <div class="row">
                <div class="col-md-12  py-5" >
                <div class="search-input" >
                    <input type="search" id="search" class="form-control rounded p-4" placeholder="SEARCH" @click="enterClicked(id)" :value="input" aria-label="Search" autocomplete="off"/>
                    <div class="search-cont mr-4">
                    <img src="../assets/searchwhite.png" class="pt-2 pl-3" >
                    </div>
                    <!--<div class="ml-5 pl-5" style="width:202px; height: 100px;">
                        <img src="../assets/home.png" style="width:90px; height: 80px;" @click="loadExplorePage('/explore')" alt="">
                    </div>-->
                </div>
                <ul class="search-list" v-if="showSearchList">
                    <li v-for="(list, i) in tempList" :key='i' @click="showPath(list)">{{list.searchparam}}</li>
                    <p class="search-not-found" v-if="tempList.length == 0">Search Not Found</p>
                </ul>
                </div>
            </div>
            <div class="keyboard-cont"  v-if="showKeyboard">
                <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input"  :hideKeyBoard="hideKeyBoard"/>
            </div>
          </div>
    </div>
</div>    
</template>

<script>
import SimpleKeyboard from '../components/SimpleKeyboard.vue'
import $ from 'jquery'
import ConstMethods from '@/utils/Methods'
import PlaylistScalaVariables from '@/utils/PlaylistScalaVariables'

export default {
  name: 'search',
  props: ['zoneName'],
  components: {
    SimpleKeyboard
  },
  data () {
      return {
          input: "",
          inputid: "",
          showModel: false,
          showKeyboard: true,
          search_input: "",
          searchList: [],
          tempList: [],
          showSearchList: false,
      }
  },
  mounted(){
      this.searchList = ConstMethods.searchableList(this.zoneName)
      this.tempList = this.searchList.slice()
    // PlaylistScalaVariables.exploreSearchSetScalaVariables()
  },
  methods: {
    loadExplorePage(val) {
      PlaylistScalaVariables.exploreSetScalaVariables(val);
      this.$router.push(val);
    },
    enterClicked(id) {
      this.showKeyboard = true;
      var inputValue = $(`#${id}`).val()
      this.showKeyBordFunc(id, inputValue);
    },
    showKeyBordFunc(id, value) {
      this.showKeyboard = true;
      this.input = value;
      this.inputid = id;
    },
      onKeyPress(button) {
      // console.log("button", button);
    },
     closeDesc(){
      this.$emit('closeOverlay', false)
    },
    onChange(input) {
      this.input = input;
      this.search_input = this.input
      if(input.length > 0)
        this.listMachingItems(input)
      else
        this.showSearchList = false
      $(`#${this.id}`).val(input);
    },
    listMachingItems(input) {
      this.showSearchList = true
      let filter = input.toUpperCase();
      let tempList = this.searchList.filter((entity, index) => {
        if(entity.searchparam.toUpperCase().indexOf(filter) > -1)
          return true
        return false
      })
      this.tempList = tempList
    },
     showPath (description) {
      this.$emit('openFindWay', description)
    },
    openMap(description){
      this.$emit('openFindWay', description)
    },
  
    onInputChange(input) {
     this.input = input.target.value
    },
     hideKeyBoard() {
      this.showKeyboard = false;
    },
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  display: block;
  height: 940px;
  width: 1518px;
  top: 135px;
  left: 0px;
  background-color: rgba(0,0,0,0.5);
  z-index: 29;
}
/* Bootstrap 4 text input with search icon */
.explore{
  position: absolute;
  height: 945px;
}
.explore-inner{
  position: absolute;
  top: 111px;
  height: 969px;
  width: 1920px;
}
.search-not-found {
  text-align: center;
  margin-top: 100px;
  color: rgb(166, 162, 162);
}
/*.bgimg{
  background-image: url('../assets/Background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  bottom: 0px;
  height: 1080px;
  width: 1920px;
}*/

.form-control {
  font-size: 40px;
  font-weight: 600;
  letter-spacing: 4px;
}
.keyboard-cont {
  position: absolute;
  width: 1600px;
  /* bottom: 0; */
  top: -120px;
  left: 230px;
  z-index: 29;
}
.search-input {
  display: flex; 
  left: 230px;
  position: absolute;
  top: 130px;
  z-index: 29;
}
input {
  width: 1000px; 
  height: 80px;
  
}
.search-cont {
  border: 1px solid rgba(0, 0, 0, 0.15);
  left: 0px; 
  background-color: #d9d9d9; 
  height: 80px; 
  width: 100px;
  z-index: 29;
  border-radius: 0 0.25em 0.25em 0;
}
.search-list {
  width: 1100px;
  left: 230px;
  position: absolute;
  top: 212px;
  list-style-type: none;
  background-color: rgba(78, 77, 76, 0.8);
  font-size: 30px;
  color: #FFF;
  height: 330px;
  overflow-y: auto;
  z-index: 30;
}
*::-webkit-scrollbar {
  width: 18px;
}

*::-webkit-scrollbar-thumb {
  background-color: #1c407d;
  border-radius: 20px;
  border: 4px solid #fff;
}

.search-list li {
  padding: 10px 0;
  margin-right: 40px;
  z-index: 0;
  border-bottom: 1px solid rgb(245, 245, 245);
}
.row{
  width: 1920px;
  margin: 0px;
}
</style>