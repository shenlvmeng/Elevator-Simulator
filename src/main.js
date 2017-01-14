import Vue from 'vue'
import Pre from './Preface.vue'
//import Door from './Door.vue' //just for test

new Vue({
  el: "#wrapper",
  data:{
  	preface: true,
  	style: "preface"
  },
  methods: {
  	change () {
  	  this.preface = false;
  	  this.style = 'content';
  	}
  },
  components: {
  	Preface: Pre
  }
});

//下面供测试
// new Vue({
// 	el: "#test",
// 	data: {
// 	  flag: false
// 	},
// 	components: {
// 	  Door: Door
// 	}
// })