<template>
  <div class="doexam" >
    <output-from :question="question" ></output-from>
  </div>
</template>

<script>

import outputFrom from "../components/common/outputForm.vue"
import { mapActions } from 'vuex'

export default {
  data() {
  	return {
      question:''
  	}
  },
  methods: {
    ...mapActions({
      getQData: 'getQData',
      nextQuestion: 'nextQuestion'
    })
  },
  computed: {
    currentQuestion(){
      return this.$store.state.currentQuestion;
    }
  },
  beforeCreate:function(){
		  if(!sessionStorage.getItem('u')){
        this.$router.push({name:'home'})
      }
	},
  created:function () {
    if(sessionStorage.getItem('u')){
      this.getQData(this.$route.params.grade);
    }

  },
  components:{
    outputFrom
  },
  watch: {
    currentQuestion(val){
      this.question=val
    }
  }
}
</script>

<style lang='less' >
  .doexam{
    height: 100%;
    width: 100%;
    background: url('.././assets/images/doexam-bg.jpg') no-repeat ;
    background-size: 100% 100%;
  }
</style>
