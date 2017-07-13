
import axios from 'axios'
import '../mock/index.js'
export default {
	getQData({commit},grade) {
		axios.get('http://test.getquestion')
			.then(function (response) {
					console.log('mock数据');
					console.log(response);
					commit('GET_QUESTION',{data:response.data});
			})
	},
	nextQuestion({commit},self){
		commit('NEXT_QUESTION');
	},
	postData({ commit , state},self) {

		let postdata={
			'name':self.postParams.name,
			'phone':self.postParams.phone,
			'score':self.postParams.score,
			'grade':sessionStorage.getItem('grade')
		}
		console.log('提交的参数');
		console.log(postdata);
		
		let url = 'http//test.postanswer';
		console.log(postdata);
		axios.post(url,postdata)
			.then(function(res) {
				console.log('获取的结果');
				console.log(res);
				commit('SAVE_RESULT',{data:res.data});//把结果存起来
				if(res.data.finished){
					//finished为true代表未答过
					//是第一次提交，直接查看结果
					self.$router.push('/result')
				}else{
					//不是第一次提交，显示提示手机已答题，或查看已提交结果
					self.showQuery=true;
				}

			})
			.catch(function () {
				console.log(error);
			})
	}
}
