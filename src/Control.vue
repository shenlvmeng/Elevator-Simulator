<template>
  <div id="content">
    <Door :maxbuildingfloor="maxFloor" :pos="positions[0]" :toup="upList" :todown="downList" @up="up" @down="down">
    <Door :maxbuildingfloor="maxFloor" :pos="positions[1]" :toup="upList" :todown="downList" @up="up" @down="down">
    <div id="well" ref="well">
      <Elevator v-for="(task, index) in newTasks" :newtask="task" :floors="maxFloor" :height="height" :key="index" @floorchange="update">
    </div>
    <div id="panel">
      <select @change="changeKey($event)"><option v-for="id in ids" :value="id">电梯 {{id}}</option></select>
  	  <input type="number" :step="step" ref="panelinput" :value="dstFloor" @input="updateFloor($event.target.value)" @keyup.enter="addDst">
    </div>
  </div>
</template>

<script>
  import Door from './Door.vue';
  import Elevator from './Elevator.vue';

  export default {
  	name: 'control',
  	data: {
  	  //elevator ID
  	  //just for v-for
  	  ids: [0, 1],
  	  //active elevator ID
  	  //for <select>
  	  activeID: 0,
  	  //temporary floor input from panel
  	  dstFloor: 1,
  	  //step value for <input> in panel
  	  step: Math.ceil(this.floor / 10),
  	  //store positions of all elevators
  	  //Assume that all elevators start from 1st floor
  	  positions: [1, 1],
  	  //store directions of all elevators
  	  //0 for still, 1 for up, 2 for down
  	  directions: [0, 0],
  	  //max floor of this building
  	  maxFloor: this.floor,
  	  //floor list waiting for up
  	  upList: [],
  	  //floor list waiting for down
  	  downList: [],
  	  //elevator new tasks
  	  newTasks: [{}, {}],
  	  //height of DOM div#well
  	  height: this.$refs.well.clientHeight;
  	},
  	methods: {
  	//listen to `up` event from elevator door
  	  up (floor) {
  	  	if (this.upList.indexOf(floor) == -1) {
  	  	  this.upList.push(floor);
  	  	  this.allocate(floor, 1);
  	  	}
  	  },
  	//listen to `down` event from elevator door
  	  down (floor) {
  	  	if (this.upList.indexOf(floor) == -1) {
  	  	  this.downList.push(floor);
  	  	  this.allocate(floor, 2);
  	  	}
  	  },
  	//allocate elevator tasks
  	  allocate (f, d) {
  	  	//Notice: Assume that elevator 1 has higher priority
  	  	let dst = f,
  	  		d1 = this.directions[0],
  	  		d2 = this.directions[1],
  	  		p1 = this.positions[0],
  	  		p2 = this.positions[1];
  	  	//allocate tasks
  	  	//3 conditions: pick up; still; different directions
  	  	//pick up or still
  	  	if (d1 == 0 || (d1 == 1 && p1 < dst) || (d1 == 2 && p1 > dst)) {
  	  	  if (d2 == 0 || (d2 == 1 && p2 < dst) || (d2 == 2 && p2 > dst)) {
  	  	  	if (Math.abs(p1 - dst) > Math.abs(p2 - dst)) {
  	  	  	  this.newTasks[1] = {t: dst, d: d};
  	  	  	  return;
  	  	  	}
  	  	  }
  	  	  this.newTasks[0] = {t: dst, d: d};
  	  	//different directions
  	  	} else {
  	  	  if ((d2 == 1 && p2 < dst) || (d2 == 2 && p2 > dst)) {
  	  		this.newTasks[1] = {t: dst, d: d};
  	  	  } else {
  	  		if (Math.abs(p1 - dst) > Math.abs(p2 - dst)) {
  	  		  this.newTasks[1] = {t: dst, d: d};
  	  		} else {
  	  		  this.newTasks[0] = {t: dst, d: d};
  	  		}
  	  	  }
  	  	}
  	  },
  	//update positions and directions together with uplist and downlist
  	  update (pos, dir, key) {
  	  	this.positions[key] = pos;
  	  	this.directions[key] = dir;
  	  	if (dir == 1 && (let p = this.upList.indexOf(pos), p != -1)) {
  	  	  this.upList.splice(p, -1);
  	  	} else if (dir == 2 && (let p = this.downList.indexOf(pos), p != -1)) {
  	  	  this.downList.splice(p, -1);
  	  	}
  	  },
  	//update floor destination input from elevator panel
  	  updateFloor (value) {
  		value = parseInt(value);
	    if (!isNaN(value) && Number.isInteger(value) && value > 0 && value <= this.maxFloor) {
	      this.dstFloor = value;
	    }
        this.$refs.panelinput.value = this.dstFloor;
  	  }
  	//switch panel ownership
  	  changeKey (event) {
  	  	this.activeID = event.target.value;
  	  }
  	//add floor input from panel input
  	  addDst () {
  	  	let n = {t: this.dstFloor, d: 0};
  	  	this.newTasks = n;
  	  }
  	},
  	components: {
  	  Door: Door,
  	  Elevator: Elevator
  	}
  }
</script>

<style>
  #content{
  	width: 100%;
  }
  #well{
  	width: 100px;
  	height: 100%;
  	min-height: 600px;
  	display: relative;
  	float: right;
  	border: 1px solid #333;
  	padding: 0 2px;
  }
  #panel{
  	position: fixed;
  }
</style>