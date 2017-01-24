import Vue from 'vue'
import Pre from './Preface.vue'
import Control from './Control.vue'
//import Door from './Door.vue' //just for test

new Vue({
  el: "#wrapper",
  data:{
  	view: 'Preface',
  	style: "preface",
    floor: 10
  },
  methods: {
  	change (floor) {
  	  this.view = 'Elevator';
  	  this.style = 'content';
      this.floor = floor;
  	}
  },
  components: {
  	Preface: Pre,
    Elevator: Control
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