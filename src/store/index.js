
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

const state = {
	questionlist: [{
		type:'contactInfo'
	}],
	currentQuestion: '',
	currentIndex:0,
	answerResult:''
}

Vue.use(Vuex)

export default new Vuex.Store({
	state,
	mutations,
	actions
})
