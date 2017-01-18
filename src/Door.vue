<template>
  <div id="door">
  	<p>
  	  <input type="number" :step="step" ref="input" :value="floor" @input="update($event.target.value)">
  	  <span>{{floorName}}</span>
  	</p>
  	<aside id="buttons">
  	  <transition>
  	    <div class="circle" v-if="floor < maxFloor" @click="up()"><div id="up-triangle" :class="{active: isUp && isPushable}"></div></div>
  	  </transition>
  	  <transition>
  	    <div class="circle" v-if="floor > 1" @click="down()"><div id="down-triangle" :class="{active: isDown && isPushable}"></div></div>
  	  </transition>
  	</aside>
  	<DoorBody :isopen="pos == floor && (isUp || isDown)">
  </div>
</template>

<script>
  import DoorBody from './DoorBody.vue';

  export default {
  	name: 'door',
  	data () {
  	  return {
  		floor: 1,
  		step: Math.ceil(this.maxbuildingfloor / 10),
  		maxFloor: this.maxbuildingfloor,
      //whether the elevator has arrvied
  		isPushable: this.pos != this.floor || (this.upList.length == 0 && this.downList.length == 0)
  	  }
  	},
    //`pos`, `toup` and `todown` are calculated from list sended from Control component
  	props: ['maxbuildingfloor', 'pos', 'toup', 'todown'],
  	methods: {
  	  //People on the 'floor'th floor send up command
  	  up () {
  	  	if (!this.isUp && this.isPushable) {
  	  	  this.$emit('up', this.floor);
  	  	}
  	  },
      //People on the 'floor'th floor send down command
  	  down () {
  	  	if (!this.isDown && this.isPushable) {
  	  	  this.$emit('down', this.floor);
  	  	}
  	  },
  	  //verify floor
  	  update (value) {
  		  value = parseInt(value);
	      if (!isNaN(value) && Number.isInteger(value) && value > 0 && value <= this.maxFloor) {
	        this.floor = value;
	      }
	      this.$refs.input.value = this.floor;
   	  }
  	},
  	computed: {
  	  floorName () {
  	  	let suffix = 'th';
  		if (this.floor % 10 == 1) {
  		  suffix = 'st';
  		} else if (this.floor % 10 == 2) {
  		  suffix  = 'nd';
  		} else if (this.floor % 10 == 3) {
  		  suffix = 'rd';
  		}
  		return suffix + ' F';
  	  },
      isUp () {
        return !(this.upList.indexOf(this.floor) == -1);
      },
      isDown () {
        return !(this.downList.indexOf(this.floor) == -1);
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
  #door p{
  	margin: 0;
  	color: #111;
  	text-align: center;
  	font-family: Arial;
  	font-weight: bold;
  	font-size: 30px;
  	line-height: 80px;
  }
  #door input {
  	line-height: 30px;
  	font-size: 25px;
  	font-family: Arial;
  	font-weight: bold;
  	max-width: 2em;
  }
  input:focus{
  	outline: none;
  }
  aside{
  	position: absolute;
  	right: 50px;
  	top: 210px;
  	background: grey;
  	border: 3px solid #999;
  	border-radius: 5px;

  }
  .v-enter-active, .v-leave-active{
  	transition: opacity .7s;
  }
  .v-enter, .v-leave-active{
  	opacity: 0;
  }
  .isPushable{
  	border-color: red;
  }
  .circle{
  	width: 30px;
  	height: 30px;
  	margin: 5px;
  	border: 1px solid #aaa;
  	border-radius: 15px;
  	background-color: #ccc;
  }
  .circle:nth-child(2){
  	margin-top: 15px;
  }
  #up-triangle{
    width: 0; 
    height: 0; 
    margin-top: 6px;
    margin-left: 3px;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid #eee;
  }
  #down-triangle{
    width: 0; 
    height: 0; 
    margin-top: 11px;
    margin-left: 3px;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid #eee;
  }
  #up-triangle.active{
  	border-bottom-color: rgba(255,0,0,0.6);
  }
  #down-triangle.active{
  	border-top-color: rgba(255,0,0,0.6);
  }
</style>