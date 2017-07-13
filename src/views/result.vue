<template>
  <div class="result" v-if="!allRank">
    <div class="resultCon">
      <h1>你获得{{examResult.score}}分</h1>
      <h1>你排在了{{examResult.flag}}名</h1>
    </div>
    <div class="selshow">
      <span type="button" @click="toshow">邀好友闯关</span>
      <span type="button" @click="getallRank">查看总排名</span>
    </div>
    <div class="shareBg" v-if="showShare">
        <img src="./../assets/images/sharebg.png" alt="sharebg" @click="showShare=false">
    </div>
  </div>
  <div class="rank" v-else>
    <!--排名-->
    <div class="selfRank">
      <p>您当前排名为<br/>第{{examResult.flag}}名</p>
    </div>
    <div class="allrank">
      <ul>
        <li v-for="(item,index) in allRank">{{item.phoneNum}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.rank}}名</li>
      </ul>
    </div>
    <div class="selshow">
      <span type="button" @click="toshow">邀好友闯关</span>
    </div>
    <div class="shareBg" v-if="showShare">
        <img src="./../assets/images/sharebg.png" alt="sharebg" @click="showShare=false">
    </div>
  </div>
</template>

<script>

import axios from 'axios';
export default {

  data() {
  	return {
      showShare:false,
      allRank:'',
  	}
  },
  methods: {
    toshow(){
      this.showShare=true
    },
    getallRank(){
      let self = this;
      let grade = sessionStorage.getItem('grade')
      axios.get('http://test.getrank')
        .then(function (res) {
          console.log(res);
          self.allRank=res.data;
          console.log(JSON.stringify(res.data));
        })
        .catch(function (err) {
          console.log(err);
        })
    }
  },
  computed:{
    examResult(){
      return this.$store.state.answerResult
    }
  },
  components:{

  },
  beforeCreate:function(){
		  if(!sessionStorage.getItem('u')){
        this.$router.push({name:'home'})
      }
	}
}
</script>

<style lang='less' >
  .result{
    height: 100%;
    width: 100%;
    background: url('.././assets/images/doexam-bg.jpg') no-repeat ;
    background-size: 100% 100%;
    overflow: hidden;
    .resultCon{
        margin-top: 10rem;
        h1{
          text-align: center;
          font-size: 29px;
          color: #bf7016;
        }
    }
    .selshow{
      overflow: hidden;
      height: 60px;
      margin-top: 5rem;
      span{
        float: left;
        height: 40px;
        line-height: 40px;
        width: 30%;
        text-align: center;
        background: #bf7016;
        font-size: 20px;
        font-weight: 500;
        margin: 0 1.5%;
        cursor: pointer;
        position: relative;
        border-radius: 10px;
        box-shadow: 0px 5px #653104;
        color: #653104;
        font-weight: 600;

        /* so nobody selects the inside text on button */
        user-select: none;

        /* Smoothing out hover using css3 transitions, if not, the pressed button effect looks a bit hard */
        transition: all 0.2s ease;
        &:active{
          top:5px;
          box-shadow: 0px 0px #123456;
        }
        &:first-child{margin-left: 20%;}
      }
    }
    .shareBg{
      position: fixed;
      width: 100%;
      height: 100%;
      top:0;left: 0;
      background-color: rgba(10, 10, 10, 0.89);
      img{
        width: 90%;
        height: 60%;
        margin-left: 5%;
      }
    }
  }
  .rank{
    width: 100%;
    height: 100%;
    background: url('.././assets/images/doexam-bg.jpg') no-repeat ;
    background-size: 100% 100%;
    .selfRank{
      height: 20%;
      width: 100%;
      position: relative;

      p{
        position: absolute;
        bottom: 10px;
        left: 0;
        right:0;
        color: #bf7016;
        font-size: 25px;
        text-align: center;
      }
    }
    .allrank{
      height: 50%;
      overflow: scroll;
			-webkit-overflow-scrolling: touch;
      padding: 0 2rem;
      ul{
        li{
          text-align: center;
          color: #bf7016;
          font-size: 20px;
        }
      }
    }
    .shareBg{
      position: fixed;
      width: 100%;
      height: 100%;
      top:0;left: 0;
      background-color: rgba(10, 10, 10, 0.89);
      img{
        width: 90%;
        height: 60%;
        margin-left: 5%;
      }
    }
    .selshow{
      overflow: hidden;
      height: 60px;
      margin-top: 2rem;
      span{
        float: left;
        height: 40px;
        line-height: 40px;
        width: 30%;
        text-align: center;
        background: #bf7016;
        font-size: 20px;
        font-weight: 500;
        /*margin: 0 1.5%;*/
        margin-left: 35%;
        cursor: pointer;
        position: relative;
        border-radius: 10px;
        box-shadow: 0px 5px #653104;
        color: #653104;
        font-weight: 600;

        /* so nobody selects the inside text on button */
        user-select: none;

        /* Smoothing out hover using css3 transitions, if not, the pressed button effect looks a bit hard */
        transition: all 0.2s ease;
        &:active{
          top:5px;
          box-shadow: 0px 0px #123456;
        }
      }
    }
  }
</style>
