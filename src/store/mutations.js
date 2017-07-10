
const GET_QUESTION = 'GET_QUESTION' //取题目
const NEXT_QUESTION = 'NEXT_QUESTION' //跳到下一题
const SAVE_RESULT = 'SAVE_RESULT' //保存结果


export default {
  [GET_QUESTION](state,payload) {
    state.currentIndex=0;
    state.questionlist=[{
  		type:'contactInfo'
  	}];
    state.questionlist=payload.data.concat(state.questionlist);
    state.currentQuestion=state.questionlist[state.currentIndex];
  },
  [NEXT_QUESTION](state,payload) {
    if(state.currentIndex==state.questionlist.length-1){
      return false;
    }
    state.currentIndex++;
    state.currentQuestion=state.questionlist[state.currentIndex];
  },
  [SAVE_RESULT](state,payload) {
    state.answerResult=payload.data;
  }
}
