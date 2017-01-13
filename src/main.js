import Vue from 'vue'
import Pre from './Preface.vue'

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
  	preface: Pre
  }
});