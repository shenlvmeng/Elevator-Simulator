<template>
  <div id="door">
  	<p>
  	  <input type="text" :value="floor" @input="update($event.target.value)">
  	  <span>{{floorName}}</span>
  	</p>
  	<div id="door-body">
  	  <DoorBody id="left-door">
  	  <DoorBody id="right-door">
  	</div>
  	<aside id="buttons">
  	  <div class="circle" v-if="floor < maxFloor"><span id="up-triangle" :class="{active: !isPushable}"></span></div>
  	  <div class="circle" v-if="floor > 1"><span id="down-triangle"></span></div>
  	</aside>
  </div>
</template>

<script>
  import DoorBody from './DoorBody.vue';

  export default {
  	name: 'door',
  	data () {
  		floor: 1,
  		maxFloor: this.maxBuildingFloor,
  		isPushable: !this.isArrived,
  		up:    false,
  		down:  false
  	},
  	props: ['maxBuildingFloor', 'isArrived'],
  	methods: {
  	  //People on the 'floor'th floor send up command
  	  up () {
  	  	if (isPushable) {
  	  	  this.isPushable = false;
  	  	  this.$emit('up', this.floor);
  	  	}
  	  },
      //People on the 'floor'th floor send down command
  	  down () {
  	  	if (isPushable) {
  	  	  this.isPushable = false;
  	  	  this.$emit('down', this.floor);
  	  	}
  	  },
  	  //verify floor
  	  update () {
  		value = parseInt(value);
	    if (Number.isInteger(value) && value > 0) {
	      this.floor = value;
	    }
	    this.$refs.input.value = this.floor;
	    this.$emit('floorChange', this.floor);
   	  }
  	},
  	computed: {
  	  floorName () {
  	  	let suffix = 'th';
  		if (floor % 10 == 1) {
  		  suffix = 'st';
  		} else if (floor % 10 == 2) {
  		  suffix  = 'nd';
  		} else if (floor % 10 == 3) {
  		  suffix = 'rd';
  		}
  		return suffix + ' F';
  	  }
  	},
  	components: {
  	  DoorBody: DoorBody
  	}
  }	
</script>

<style>
  #door{
  	width: 300px;
  	height: 840px;
  	margin: auto 0;
  	float: left;
  }
  p{
  	margin: 0;
  	text-align: center;
  	font-family: Arial;
  	font-weight: bold;
  	font-size: 20px;
  	line-height: 25px;
  }
  input {
  	font-size: 20px;
  	font-family: Arial;
  	font-weight: bold;
  	max-width: 3.5em;
  }
  input:focus{
  	outline: none;
  }
  aside{
  	float: right;
  	bottom: 110px;
  	background: grey;
  	border: 3px solid #999;
  	border-radius: 5px;

  }
  #door-body{
  	background-color: ivory;
  	width: 100%;
  }
  #left-door{
  	float: left;
  }
  #right-door{
  	float: right;
  }
  .isPushable{
  	border-color: red;
  }
  .circle{
  	width: 10px;
  	height: 10px;
  	margin: 5px;
  	border: 1px solid #aaa;
  	border-radius: 5px;
  	background-color: silver;
  }
  #up-triangle{
  	width: 6px;
  	height: 6px;
  	border: 0 0 6px 0;
  	border-color: #eee;
  }
  #down-triangle{
  	width: 6px;
  	height: 6px;
  	border: 6px 0 0 0;
  	border-color: #eee;
  }
</style>