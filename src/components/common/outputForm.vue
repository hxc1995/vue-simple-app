<template>
<div class="qst-box" v-show="renderSuccess" >
  <div class="padding-space">

  </div>
  <section class="radio-question" v-if="question.type=='Radio'">
    <h5>
      <strong>{{currentIdex+1}}、</strong>&nbsp;{{question.content}}
    </h5>
    <fieldset>
      <p v-for="(item,index) in question.optionList" >
        <input type="radio" :id="'radio'+item.id" name="radio" :value="index+1" v-model="checkedBox">
        <label :for="'radio'+item.id" >
          {{aBC[index]}}、{{item.content}}
        </label>
      </p>
    </fieldset>

  </section>
  <section class="checkbox-question" v-if="question.type=='MultiSelect'">
    <h5>
      <strong>{{currentIdex+1}}、</strong>&nbsp;{{question.content}}
    </h5>
    <fieldset>
      <p v-for="(Mitem,Mindex) in question.optionList" >
        <input type="checkbox" name="checkbox" :id="'checkbox'+Mitem.id" :value="Mindex+1" v-model="checkedBox">
        <label :for="'checkbox'+Mitem.id" >
          {{aBC[Mindex]}}、{{Mitem.content}}
        </label>
      </p>
    </fieldset>
  </section>
  <section class="contactInfo" v-if="question.type=='contactInfo'">
    <p>

      <input type="text" id="contactName" v-model="postParams.name" placeholder='姓名'>
    </p>
    <p>

      <input type="text" id="contactPhone" v-model="postParams.phone" placeholder='手机号'>
    </p>
  </section>
  <p v-if="!isLast ">
    <span type="button"  @click="subSelection"  >下一页</span>
  </p>
  <p v-if="isLast " >
    <span type="button"  @click="subAnswer" >提交</span>
  </p>
  <transition name="queryOK">
    <div class="queryOK" v-if="showQuery">
      <span @click="closeQuery">此手机号已答题，请更换</span>
      <span @click="toResultPage">查看已答结果</span>
    </div>
  </transition>
  <div class="grayBackground" v-if="showQuery">

  </div>

</div>
</template>


<script>

import { mapActions } from 'vuex'
import { bus } from '../../bus.js'


export default {
  props: ['question'],
  data() {
  	return {
      postParams:{
        name: "",
        phone: "",
        score: 0
      },
      renderSuccess:false,
      rightOptions:'',
      checkedBox:[],
      aBC:['A','B','C','D','E','F'],
      phoneReg:/^1[3578]\d{9}$/,
      showQuery:false
  	}
  },
  methods:{
    subAnswer() {
      console.log('this.postParams');
      console.log(this.postParams);
      if(!this.postParams.name){
        bus.$emit('tip', '请填写名字')
        return false;
      }else if(!this.postParams.phone || !this.phoneReg.test(this.postParams.phone)){

        bus.$emit('tip', '手机号格式不对')
        return false;
      }
      this.postData(this);

    },
    subSelection() {
      // console.log('选择的选项');
      // console.log(this.checkedBox);
      // console.log('正确的答案');
      // console.log(this.rightOptions);
      // console.log(Object.prototype.toString.call(this.checkedBox));

      if(Object.prototype.toString.call(this.checkedBox)=='[object Number]'){
        console.log('this.checkedBoxA');
        console.log(this.checkedBox);
        if(!this.checkedBox){
          bus.$emit('tip', '请选择选项')
          return false
        }
        this.postParams.score+=this.checkedBox==Number(this.rightOptions)?1:0;
      }else{
        console.log('this.checkedBox');
        console.log(this.checkedBox);
        if(!this.checkedBox.length){
          bus.$emit('tip', '请选择选项')
          return false
        }
        this.checkedBox.sort(function (a,b) { return a-b });
        this.postParams.score+=this.checkedBox.join('')==this.rightOptions?1:0;
      }

      this.nextQuestion();
    },
    toResultPage(){
      this.$router.push('/result')
    },
    closeQuery(){
      this.showQuery=false;
    },
    ...mapActions({
      nextQuestion: 'nextQuestion',
      postData: 'postData'
    })
  },
  computed:{
    isLast(){
      return this.$store.state.questionlist.length-this.$store.state.currentIndex==1;
    },
    currentQuestion(){
      return this.$store.state.currentQuestion;
    },
    currentIdex(){
      return this.$store.state.currentIndex;
    }
  },
 	updated:function(){
     this.renderSuccess=true;
     console.log('数据变化');
 	},
  watch: {
    currentQuestion(val){
      //切换到下一题就重新获取正确的选项，并且初始化已选选项和正确选项
      this.rightOptions="";
      this.checkedBox=[];
      console.log('重新获取的问题');
      console.log(val);
      if(this.$store.state.questionlist.length-this.$store.state.currentIndex!=1){
        //最后一题是填写信息，获取不到正确选项
        let optionList = val.optionList;
        for(var i=0;i<optionList.length;i++){
          if(optionList[i].score){
            this.rightOptions+=(i+1).toString();
          }
        }
      }

    }
  }
}
</script>
<style lang='less' >
.qst-box{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .padding-space{
    width: 100%;
    height: 15%;
  }
  &>section{
    width: 80%;
    min-height: 40%;
    margin: 0 auto;
    h5{
      width: 100%;
      min-height: 30px;
      line-height: 30px;
      font-size: 1.6rem;
      margin-bottom: 1rem;
      color: rgb(226, 225, 225);
    }
    fieldset{
      width: 100%;
      height: auto;
      padding-top: 1rem;
      overflow: hidden;
      border: none;
      p{
        width: 100%;
        min-height: 2rem;
        margin-top: .5rem;
        overflow: hidden;
        color: rgb(226, 225, 225);
        input{
          font-size: 1.5rem;
          float: left;
          width: 5%;
          display: none;
          opacity:0;-webkit-appearance:none;
        }
        label{
          font-size: 1.4rem;
          float: left;
          width: 85%;
          margin-left: 3%;
          padding-left: 10%;
          padding-right: 5%;
          position: relative;
        }
        input+label:before{
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 8px;
          content: '';
          color: #fff;
          border: 1px solid #dce4e6;
          border-radius: 3px;
          position: absolute;
          top: 0;
          left: 0;
        }
        input[type=radio]+label:before {
            border-radius: 50%;
        }
        input[type=checkbox]+label:before {
            border-radius: 3px;
        }
        input[type=checkbox]:checked+label:before,input[type=radio]:checked+label:before{
          content:'\2713';
          color:#fff;
          background-color: rgba(49, 185, 104, 0);
          font-size:16px;
          text-align: center;
          border-color: #fdfdfd;
        }
      }
    }
    &.contactInfo{
      overflow: hidden;

      p{
        width: 70%;
        margin-left: 15%;
        border-bottom: 1px solid gray;
        &:first-child{margin-top: 6rem;}
        &:last-child{margin-top: 3rem;}
        input{
          border: none;
          display: block;
          background: none;
          width: 100%;
          color:rgb(226, 225, 225);
          font-size: 17px;
          /*-webkit-appearance:none;*/
          &:focus{
            color:FFF;
            outline: none;
          }
        }
      }
    }
  }
  &>p{
    width: 100%;
    text-align: center;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction:row;
    justify-content: center;
    span{
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
      transition: all 0.1s ease;
      &:active{
        top:5px;
        box-shadow: 0px 0px #123456;
      }
    }
  }
  .queryOK{
    width: 240px;
    height: 110px;
    position: fixed;
    left: 0;right: 0;top: 0;bottom: 0;margin: auto;
    z-index: 99;
    font-size: 18px;
    cursor: pointer;
    span{
      display: block;
      width: 100%;
      height: 40px;
      line-height: 40px;
      width: 100%;
      text-align: center;
      background: #bf7016;

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
      transition: top .1s ease;
      &:active{
        top:6px;
        box-shadow: 0px 0px #123456;
      }
      &:last-child{
        margin-top:20px;
      }
    }
  }
  .queryOK-enter-active {
    animation: query-in .5s ;
  }
  .options-leave-active{
    animation: query-out .2s cubic-bezier(0,.5,1,.5);
  }
  @keyframes query-in {
    0% {
      width: 180px;
      font-size: 12px;
    }
    30%{
      width: 240px;
      font-size: 18px;
    }
    50%{
      width: 200px;
      font-size: 16px;
    }
    60%{
      width: 240px;
      font-size: 18px;
    }
    100% {
      width: 240px;
      font-size: 18px;
    }
  }
  @keyframes query-out{
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .grayBackground{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;left: 0;
    background-color: rgba(10, 10, 10, 0.89);
    z-index: 9;
  }
}

</style>
