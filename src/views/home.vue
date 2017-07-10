<template>
  <div class="home">
      <div class="top-padding">

      </div>
      <div class="competitionInfo">
        <transition name='infoText'>
          <div v-if="infoText" class="infoText">
            欢迎参加比赛
            阿斯顿阿飞士大夫士大夫
            啊是否得到士大夫士大夫
          </div>
        </transition>
        <transition name='infoLogo'>
          <div v-if="infoLogo" class="infoLogo">

          </div>
        </transition>
      </div>
      <div class="selGrade">
        <div class="selected" @click="show">
          {{selected.text}}
        </div>
        <transition name="options">
          <div class="options" v-if="showOptions">
            <span v-for="item in options" @click="selGrade(item)"  v-bind:class="{ active: item.value == selected.value }">{{item.text}}</span>
          </div>
        </transition>

      </div>
      <div class="buttonContainer">
        <!-- <span @click="goexam(1)">开始答题</span> -->
        <span @click="goexam">开始答题</span>
        <!-- <span @click="goexam(2)">中年级</span> -->
        <!-- <span @click="goexam(3)">低年级</span> -->
      </div>
  </div>
</template>

<script>
import { bus } from '../bus.js'

export default {

  data() {
  	return {
      infoText:false,
      infoLogo:false,
      showOptions:false,
      options:[
        {text:'一年级',value:1},
        {text:'二年级',value:2},
        {text:'三年级',value:3},
        {text:'四年级',value:4},
        {text:'五年级',value:5},
        {text:'六年级',value:6},
        {text:'七年级',value:7},
        {text:'八年级',value:8},
        {text:'九年级',value:9}
      ],
      selected:{text:'请选择年级',value: 0}
  	}
  },
  methods: {
    goexam(){
      sessionStorage.setItem('u',1);//分享出去的链接并不是/home
      if(this.selected.value){
        this.$router.push({name:'doexam', params: { grade:this.selected.value}})
      }else{
        bus.$emit('tip', '请选择年级')
      }
    },
    show(){
      this.showOptions=true;
    },
    selGrade(item){
      this.selected=item;

      sessionStorage.setItem('grade',item.text);//存当前年级
      this.showOptions=false;
    }
  },
  computed:{

  },
  components:{

  },
  created:function () {
    setTimeout(function () {
      this.infoText=true;
      this.infoLogo=true;
    }.bind(this),500)
  }
}
</script>

<style lang='less' >
  .home{
    width: 100%;
    height: 100%;
    background-color: #E6E2E2;
    background: url('.././assets/images/doexam-bg.jpg') no-repeat ;
    background-size: 100% 100%;
    .selGrade{
      .selected{
        height: 40px;
        line-height: 40px;
        width: 30%;
        text-align: center;
        background: #bf7016;
        font-size: 20px;
        font-weight: 500;
        cursor: pointer;
        border-radius: 10px;
        margin: 0 auto;
        top:0;
        box-shadow: 0px 6px #653104;
        color: #653104;
        font-weight: 600;
        position: relative;
        /* so nobody selects the inside text on button */
        user-select: none;
        /* Smoothing out hover using css3 transitions, if not, the pressed button effect looks a bit hard */
        transition: all .1s ease;
        &:active{
          top:6px;
          box-shadow: 0px 0px #123456;
        }
      }
      .options{

        width: 242px;
        height: 242px;
        border-radius: 8px;
        position: fixed;
        left: 0;right: 0;top: 0;bottom: 0;
        margin: auto;
        z-index: 99;
        overflow: hidden;
        /*border: 1px solid gray;*/
        cursor: pointer;
        span{
          float: left;
          width: 80px;
          height: 80px;
          background-color: rgb(247, 243, 241);
          line-height: 80px;
          text-align: center;
          font-size: 18px;
          font-weight: 600;
          color: gray;
          &.active{
            background-color: #FF9800;
            color: #fff;
          }
          &:nth-child(1){border-right:1px solid gray;border-bottom:1px solid gray;}
          &:nth-child(2){border-right:1px solid gray;border-bottom:1px solid gray;}
          &:nth-child(3){border-bottom:1px solid gray;}
          &:nth-child(4){border-right:1px solid gray;border-bottom:1px solid gray;}
          &:nth-child(5){border-right:1px solid gray;border-bottom:1px solid gray;}
          &:nth-child(6){border-bottom:1px solid gray;}
          &:nth-child(7){border-right:1px solid gray;}
          &:nth-child(8){border-right:1px solid gray;}
          &:nth-child(9){}
        }

      }
      .options-enter-active {
        animation: showoptions .5s ;
      }
      .options-leave-active {
        animation: hideoptions .2s cubic-bezier(0,.5,1,.5);
      }
      @keyframes showoptions {
        0% {
          width: 142px;
          height: 142px;
        }
        30% {
          width: 272px;
          height: 272px;
        }
        60%{
          width: 242px;
          height: 242px;
        }
        80%{
          width: 252px;
          height: 252px;
        }
        100%{
          width: 242px;
          height: 242px;

        }
      }
      @keyframes hideoptions {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    }
    .buttonContainer{
      margin-top: 2rem;
      width: 100%;
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
      span{
        height: 40px;
        line-height: 40px;
        width: 30%;
        text-align: center;
        background: #bf7016;
        font-size: 20px;
        font-weight: 500;
        cursor: pointer;
        border-radius: 10px;
        top:0;
        box-shadow: 0px 6px #653104;
        color: #653104;
        font-weight: 600;
        position: relative;
        /* so nobody selects the inside text on button */
        user-select: none;

        /* Smoothing out hover using css3 transitions, if not, the pressed button effect looks a bit hard */
        transition: all 1.3s linear;
        &:active{
          top:6px;
          box-shadow: 0px 0px #123456;
        }

        animation:button-animation 1.3s infinite;
        animation-timing-function: linear;
        animation-direction:alternate;
        -webkit-animation-direction:alternate; /* Safari 和 Chrome */
        -webkit-animation:button-animation 1.3s infinite ; /*Safari and Chrome*/
        -webkit-animation-timing-function: linear;
      }

      @keyframes button-animation
      {
        0% {
          top:0;
          box-shadow: 0px 6px #653104;
        }
        50% {
          top:6px;
          box-shadow: 0px 0px #123456;
        }
        100% {
          top:0;
          box-shadow: 0px 6px #653104;
        }
      }

      @-webkit-keyframes button-animation /*Safari and Chrome*/
      {
        0% {
          top:0;
          box-shadow: 0px 6px #653104;
        }
        50% {
          top:6px;
          box-shadow: 0px 0px #123456;
        }
        100% {
          top:0;
          box-shadow: 0px 6px #653104;
        }
      }
    }
    .top-padding{
      height: 15%;
    }
    .competitionInfo{
      height: 30%;
      color: white;
      position: relative;
      overflow: hidden;
      .infoText{
        position: absolute;
        left: 20%;
        top: 50px;
        width: 60%;
      }
      .infoLogo{
        position: absolute;
        background: url('.././assets/images/logo.png') no-repeat;
        background-size: 100% 100%;
        width: 20%;
        height: 40px;
        top: 0;
        right: 40%;
      }
      .infoText-enter-active {
        animation: infoText-in .2s  cubic-bezier(.5,1,.5,1);
      }
      .infoLogo-enter-active {
        animation: infoLogo-in .4s  cubic-bezier(.5,1,.5,1);
      }
      /*文字进入动画*/
      @keyframes infoText-in {
        0%{
          left: -60%;
        }
        100%{
          left: 20%;
        }
      }
      /*图片进入*/
      @keyframes infoLogo-in {
        0%{
          right: -100px;
        }

        100%{
          right: 40%;
        }
      }

    }
  }
</style>
