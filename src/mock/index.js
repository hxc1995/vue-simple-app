var Mock= require('mockjs')
let a = Mock.mock('http://test.getquestion', [
	{
		"id":2556,
		"content":"鲁迅早年到（）留学学习医学？",
		"optionList":[
		 {"id":10314,"content":"法国","score":0,"picId":null},
		 {"id":10315,"content":"英国","score":0,"picId":null},
		 {"id":10312,"content":"日本","score":1,"picId":null},
		 {"id":10313,"content":"美国","score":0,"picId":null}
		],
		"type":"Radio",
		"kind":"TextKnowledge"
	},
	{
		"id":2557,
		"content":"《父亲的病》中作者提到了几个庸医？（）",
		"optionList":[
		{"id":10319,"content":"5","score":0,"picId":null},
		{"id":10316,"content":"2","score":0,"picId":null},
		{"id":10317,"content":"3","score":1,"picId":null},
		{"id":10318,"content":"4","score":0,"picId":null}
		],
		"type":"Radio",
		"kind":"TextKnowledge"
	}]);
let b = Mock.mock('http//test.postanswer',function (options) {
	console.log('options');
	console.log(options.body);
	return {
		finished:true,
		flag:5,
		score:5
	}
});
let c = Mock.mock('http://test.getrank',[
	{"phoneNum":"134****3412","sorce":4,"rank":1},
	{"phoneNum":"134****1234","sorce":2,"rank":1},
	{"phoneNum":"134****3231","sorce":1,"rank":1},
	{"phoneNum":"134****1231","sorce":0,"rank":1}
]);
export default {
	a,
	b,
	c
}