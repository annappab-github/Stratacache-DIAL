<template>
  <!-- <div class="loader" v-if="loading">
    <h5
      style="
        text-align: center;
        margin-top: 25%;
        font-size: 50px;
        margin-left: -7%;
        color: white;
      "
    >
      Please wait we are disconnecting
    </h5>
  </div> -->
  <div class="explore">
    <div class="bgimg">
      <div class="explore-inner">
        <div class="">
          <div class="homeBtns text-white">
            <div class="">
              <HomeButtons
                :title="btn6"
                imageName="scan.png"
                @click="goToNextPage('/scan', false)"
              />
            </div>
            <div class="">
              <HomeButtons
                :title="btn2"
                imageName="explore.png"
                @click="goToNextPage('/explore', false)"
              />
            </div>
            <div class="">
              <HomeButtons
                :title="btn1"
                imageName="boardinfo.png"
                @click="goToNextPage('/scanboardingpass', false)"
              />
            </div>
          </div>
        </div>
        <div>
          <div style="videoCallingFrame">
            <!-- <iframe
              id="myIframe"
              :src="url"
              allow="camera;microphone"
              height="1080"
              width="1920"
              style="margin-left: 420px"
            >
            </iframe> -->

          </div>
          <!-- <div class="disconnect-Btn text-center dis">
            <button
              v-if="isDisable == true"
              :disabled="isDisable"
              @click="disconnect"
              class="test adImg"
              style="opacity: 0.6"
            ></button>
            <button
              v-else
              :disabled="isDisable"
              @click="disconnect"
              class="test adImg"
            ></button>
            <label style="font-weight: bold">DISCONNECT</label>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <div class="tu-model" id="tu-model">
    <div class="timeout-notification">
      <div class="t-body">
        <p class="t-title" id="t-time">
          {{ confirmMessage }}
        </p>
        <p class="tu-disc">
          {{ wantToContinue }}
        </p>
        <div class="t-btns d-flex justify-content-center">
          <button class="t-btn t-btn-stay" @click="stayOnPage(true)">
            {{ yes }}
          </button>
          <button class="t-btn t-btn-home" @click="stayOnPage(false)">
            {{ no }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import HorizontalBar from '@/components/Home/HorizontalBar.vue'
// import TalktousButtons from '@/components/TalktousButtons.vue'
import HomeButtons from "../components/HomeButtons.vue";
import ConstLangText from "@/utils/Language";
import PlaylistScalaVariables from "@/utils/PlaylistScalaVariables";
const ConstText = ConstLangText.readConstValues();
import Constants from "@/utils/Constants.js";
import axios, { Axios } from "axios";
// var createGuest = require('cross-domain-storage/guest');
// var bazStorage = createGuest('https://10.10.2.7:3000/');
export default {
  components: {
    // HorizontalBar,
    // TalktousButtons
    HomeButtons,
  },
  data() {
    return {
      isDisable: true,
      phoneActiveurl: require("../assets/talktous.png"),
      homeImg: require("@/assets/home.png"),
      btn1: ConstText.homeBtnText1,
      btn2: ConstText.homeBtnText2,
      btn6: ConstText.homeBtnText6,
      url: "",
      reason: "",
      wantToContinue: ConstText.wantToContinue,
      confirmMessage: ConstText.talkToUsPageLeaveMessage,
      yes: ConstText.yes,
      no: ConstText.no,
      tempLanguage: "",
      nextPageName: "",
      quitBtn: ConstText.quitBtn,
      callDetails: {
        socketID: "",
        userType: "",
        userName: "delhi-test",
        // kioskID:'1'
        // roomId: "",
      },
      // a: "",
      userDetails: "",
      loading: false,
      socketDetails: "",
      interval: null,
    };
  },
  created() {
    // this.interval = setInterval(() => {
    //   this.getData();
    // }, 5000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    async disconnect() {
      this.loading = true;
      let apiCallURL = Constants.videoCallUrl().split(":3000")[0];
      await axios(apiCallURL+":5000/getusercalldetails", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }).then((response) => {
        let data = response.data;
        let sortedData = data.sort(function (a, b) {
          return b.id - a.id;
        });

        let index = 1;
        this.userDetails = sortedData[index];
        this.callDetails.socketID = this.userDetails.socketid;
        this.callDetails.userType = this.userDetails.usertype;
      });

      await axios
        .post(apiCallURL+":5000/usercleanup", this.callDetails)
        .then((res) => {
          if (res.status == 200) {
            setTimeout(() => {
              this.$router.push("/talktousfeed");
            }, 200);
          }
        });

    },
    stayOnPage(val) {
      var modal = document.getElementById("tu-model");
      if (val) {
        this.goToNextPage(this.nextPageName, true);
      } else {
        this.nextPageName = "";
        modal.style.display = "none";
      }
    },

    goToNextPage(val, isApproved) {
      // var modal = document.getElementById("tu-model");
      // if (isApproved) {
      //   PlaylistScalaVariables.exploreSetScalaVariables(val);
      //   modal.style.display = "none";
        this.$router.push(val);
      // } else {
      //   this.nextPageName = val;
      //   modal.style.display = "block";
      // }
    },
    getKioskLocationById(id) {
      if (id == 114) return "precheckin";
      else if (id == 115) return "domesticterminal";
      else return "invalidkioskid";
    },
    // getData() {
    //   let currentPage = window.location.href;
    //   let splitURL = currentPage.split("#");

    //   console.log("url", currentPage);
    //   console.log("url", splitURL[1]);
    //   if (!currentPage.includes("talktous")) {
    //     console.log("true");
    //     clearInterval(this.interval);
    //   }
    //   const URL = "https://10.10.2.7:5000/getusercalldetails";
    //   axios(URL, {
    //     method: "GET",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   }).then((response) => {
    //     console.log(response.data);
    //     let data = response.data;
    //     console.log(data.id);
    //     let sortedData = data.sort(function (a, b) {
    //       return b.id - a.id;
    //     });
    //     console.log("sorted", sortedData);

    //     let index = 0;
    //       console.log("final", index);
    //       this.userDetails = sortedData[index];
    //       console.log("data", this.userDetails);
    //       this.callDetails.socketID = this.userDetails.socketid;
    //       this.callDetails.userType = this.userDetails.usertype;
    //       setTimeout(() => {
    //         this.isDisable = false;
    //       }, 10000);
    //   });
    // },
  },
  mounted() {
    this.$emit('activateVideoCall');
    //  try {
    //   window.ScalaSetVariable("Channel.activateVideoCall", true);
    //   window.ScalaSetVariable("Channel.videocallDefaultPage", false);
    // } catch (error) {}
    // let reloadcnt = 0;
    // $("#myIframe").on("load", function () {
    //   console.log("frame has (re)loaded ");
    //   reloadcnt = reloadcnt + 1;
    //   console.log("reloadcnt !!!", reloadcnt);
    // });
    // let talkInterval = "";
    // talkInterval = setInterval(() => {
    //   if (reloadcnt >= 2) {
    //     console.log("insdide ===== !!!" + reloadcnt);
    //     // window.location.href = "/#/talktousfeed";
    //     clearInterval(talkInterval);
    //     reloadcnt = 0;
    //     this.goToNextPage("/talktousfeed", true);
    //   }
    // }, 500);
    Constants.isScanQr = false;
    // this.reason = this.$route.params.reason;
    // console.log("value", this.reason);
    // this.url = 'http://localhost:3000/main/delhi-test/' + reason;
    // var kioskName = this.getKioskLocationById(Constants.kioskid);
    // this.url =
    //   Constants.videoCallUrl() +
    //   "/" +
    //   kioskName +
    //   "/" +
    //   this.reason.replace(/ /g, "");
    // console.log("this.url==>", this.url);
    // var modal = document.getElementById("tu-model");
    // window.onclick = function (event) {
    //   if (event.target == modal) {
    //     modal.style.display = "none";
    //   }
    // };

    this.tempLanguage = "";
    try {
      let selected_language = localStorage.getItem("language");
      if (selected_language == null || selected_language == undefined) {
        this.tempLanguage = "en";
      } else if (selected_language == "hn") {
        this.tempLanguage = "hn";
      } else {
        this.tempLanguage = "en";
      }
    } catch (error) {}
    if (this.tempLanguage == "hn") {
      $(`#t-time`).addClass("t-title1");
    }
    // this.getData();
    // setTimeout(() => {
    //   this.isDisable = false;
    // }, 3000);   
  },
};
</script>
<style scoped>
/*.explore-inner{
  position: absolute;
  top: 130px;
  height: 910px;
}*/
.bgimg {
  background-repeat: no-repeat;
  background-image: url("../assets/Background.png");
  height: 1080px;
  width: 1920px;
  position: absolute;
  bottom: 0px;
}
/* .main-container {
    margin: 500px 100px 0;
} */

.explore {
  position: absolute;
  height: 945px;
}
.explore-inner {
  position: absolute;
  top: 111px;
  height: 969px;
  width: 1920px;
}
.img {
  width: 355px;
  height: 355px;
  margin: 0px 730px 0;
}
h1 {
  font-size: 45px;
  font-weight: 700;
  margin-left: 510px;
  /* text-align: center; */
}
/* p {
  font-size: 25px;
  margin-left: 800px;
  margin-top: 10px;
} */
iframe {
  /* background-color: slateblue;
    height: 969px;
    width: 1588px;
    margin-right: 330px;
    position: absolute; */
  /* background-color: #224192; */
  background-image: url("../assets/Background.png");
  height: 1080px;
  width: 1632px;
  margin-right: 330px;
  position: absolute;
}
.row {
  margin: 0px;
}
.homeBtns {
  width: 330px;
  height: 969px;
  position: absolute;
  text-align: center;
  margin: 0px 0px 0px 0px;
}
.disconnect-Btn {
  /* position: absolute;
  top: 800px;
  left: 1100px;
  cursor: pointer; */
  position: absolute;
  /* top: 835px; */
  top: 820px;
  left: 1100px;
  cursor: pointer;
  color: #fff;
}
.disconnect-Btn label {
  top: 100px;
  left: 0px;
  position: absolute;
}
.homeBtns div {
  margin: 95px 0px 0px 0px;
}
.videoCallingFrame {
  margin-left: 330px;
}

/* Prompt Notification */
.tu-model {
  display: none;
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.timeout-notification {
  position: absolute;
  top: 378px;
  left: 517px;
  width: 887px;
  height: 323px;
  background-color: rgb(230, 230, 230);
  border: 1px solid rgb(175, 173, 173);
  border-radius: 8px;
  box-shadow: rgba(97, 97, 97, 0.35) 0px 5px 15px;
}
.t-title {
  margin: 50px 0 20px;
  font-size: 32px;
  text-align: center;
  font-family: "Cervino-BoldNeue";
  letter-spacing: 1px;
}
.t-title1 {
  margin: 75px 0 20px;
  font-size: 36px;
  text-align: center;
  font-family: "Cervino-BoldNeue";
  letter-spacing: 1px;
  font-weight: bolder;
}
.tu-disc {
  font-family: "Cervino-RegularNeue";
  font-size: 32px;
  text-align: center;
}
.t-btns {
  margin-top: 40px;
}
.t-btn {
  outline: none;
  margin: 0;
  text-decoration: none;
  background-image: url("../assets/submit.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: #ffffff;
  font-family: "Cervino-BoldNeue";
  letter-spacing: 1px;
  font-size: 25px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 153, 204, 0.3);
  width: 135px;
  height: 47px;
}
.t-btn-stay {
  margin-right: 30px;
}

.quitBtn button {
  font-size: 25px;
  outline: none;
  text-decoration: none;
  margin-top: 30px;
  width: 135px;
  height: 47px;
  background-image: url("../assets/quit.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  color: #fff;
  font-family: "Cervino-BoldNeue";
  letter-spacing: 0px;
  cursor: pointer;
}
.loader {
  /* position: absolute;
  top: 0px;
  right: 0px;
  width: 110%;
  height: 110%;
  /* top: 9%;
  right: 19.5%;
  width: 64%;
  height: 83%;
  background-color: #1d1df2;
  background-image: none !important;
  background-size: 50px;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 10000000;
  opacity: 0.4;
  filter: alpha(opacity=40); */

  position: absolute;
  top: 28px;
  right: -151px;
  width: 90%;
  height: 105%;
  /* background-color: #5757e8; */
  /* background-image: none !important; */
  background-image: url("../assets/Background.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 10000000;
  opacity: 1;
  z-index: 1;
}

.test {
  background-image: url("../assets/Disconnect.png");
  width: 92px;
  height: 93px;
  background-color: transparent;
  border: none;
}
</style>
