<template>
  <div id="app">
    <transition name='tiptext'>
      <h3 v-if="tipError" class="tiptext"><span></span><span>{{tiptext}}</span></h3>
    </transition>

    <router-view></router-view>
  </div>
</template>

<script>

import { bus } from './bus.js'

export default {
  data(){
    return{
      tipError:false,
      tiptext:'操作有误'
    }
  },
  methods:{
    show(text){
      this.tiptext=text;
      this.tipError=true
      setTimeout(function () {
        this.tipError=false;
      }.bind(this),1200)
    }
  },
  created:function(){

    bus.$on('tip', (text) => {
        this.show(text);
    })
  }
}

</script>

<style lang='less' scope>

#app {
    width: 100%;
    height: 100%;
    .tiptext{
      position: fixed;
      width: auto;
      left: 50%;
      transform:translateX(-50%);
      font-size: 16px;
      height: 25px;
      top:15px;
      overflow: hidden;

      box-shadow: 0 2px 4px #e98b21, 0 0 6px #000;
      color: #e98b21;
      padding-right: 10px;
      span{float: left;}
      &>span:nth-child(1){
        background: #e98b21;
        width: 25px;height: 100%;
      }
      &>span:nth-child(2){
        margin-left: 10px;
        height: 100%;
      }
    }

    .tiptext-enter-active {
      animation: bounce-in .2s ;
    }
    .tiptext-leave-active {
      animation: bounce-out 1s cubic-bezier(0,.5,1,.5);
    }
    @keyframes bounce-in {
      0% {
        top:-30px;
        opacity: 0;
      }
      100% {
        top:15px;
        opacity: 1;
      }
    }
    @keyframes bounce-out {
      0% {
        top:15px;
        opacity: 1;
      }
      100% {
        top:-30px;
        opacity: 0;
      }
    }
}
</style>
