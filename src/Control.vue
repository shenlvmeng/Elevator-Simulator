<template>
  <div id="content">
    <div id="well" ref="well" :style="{height: height + 'px'}">
      <Elevator v-for="(task, index) in newTasks" :newtask="task" :floors="maxFloor" :height="height" :id="index" @floorchange="update">
    </div>
    <div v-for="i in [0,1]" class="door">
      <Door :maxbuildingfloor="maxFloor" :pos="positions[i]" :dir="directions[i]" :toup="upList" :todown="downList" :id="i+1" @up="up" @down="down">
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
  	data () {
      return {
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
    	  height: 0
      }
  	},
    props: {
      floor: {
        require: true
      }
    },
    mounted () {
      window.addEventListener('resize', this.adjustResize);
      this.$nextTick(function(){
        this.height = this.$el.clientHeight;
      });
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
  	  	if (this.downList.indexOf(floor) == -1) {
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
  	  	  	  this.newTasks.splice(1, 1, {t: dst, d: d});
  	  	  	  return;
  	  	  	}
  	  	  }
  	  	  this.newTasks.splice(0, 1, {t: dst, d: d});
  	  	//different directions
  	  	} else {
  	  	  if ((d2 == 1 && p2 < dst) || (d2 == 2 && p2 > dst)) {
  	  		this.newTasks.splice(1, 1, {t: dst, d: d});
  	  	  } else {
  	  		if (Math.abs(p1 - dst) > Math.abs(p2 - dst)) {
  	  		  this.newTasks.splice(1, 1, {t: dst, d: d});
  	  		} else {
  	  		  this.newTasks.splice(0, 1, {t: dst, d: d});
  	  		}
  	  	  }
  	  	}
  	  },
  	//update positions and directions together with uplist and downlist
  	  update (pos, dir, key) {
        //Be careful !!! Use splice() instead of []
        //or changes will not be detected
  	  	this.positions.splice(key, 1, pos);
  	  	this.directions.splice(key, 1, dir);
        let p, self = this;
  	  	if (dir <= 1 && (p = this.upList.indexOf(pos), p != -1)) {
  	  	  setTimeout(function(){self.upList.splice(p, 1);}, 1200);
  	  	} else if (dir != 1 && (p = this.downList.indexOf(pos), p != -1)) {
  	  	  setTimeout(function(){self.downList.splice(p, 1);}, 1200);
  	  	}
  	  },
  	//update floor destination input from elevator panel
  	  updateFloor (value) {
  		  value = parseInt(value);
	      if (!isNaN(value) && Number.isInteger(value) && value > 0 && value <= this.maxFloor) {
	        this.dstFloor = value;
	      }
        this.$refs.panelinput.value = this.dstFloor;
  	  },
  	//switch panel ownership
  	  changeKey (event) {
  	  	this.activeID = event.target.value;
  	  },
  	//add floor input from panel input
  	  addDst () {
  	  	let n = {t: this.dstFloor, d: 0};
  	  	this.newTasks = n;
  	  },
    //adjust resize event of Window
      adjustResize () {
        this.height = this.$el.clientHeight;
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
    position: relative;
  }
  #well{
  	width: 100px;
  	height: 100%;
  	min-height: 600px;
  	position: relative;
  	float: right;
  	border: 1px solid #333;
  	padding: 0 2px;
  }
  #panel{
  	position: fixed;
    bottom: 20px;
    height: 50px;
    width: 357px;
    padding-left: 50px;
    background-color: #fff;
    opacity: .8;
  }
  #panel select, #panel input{
    margin-top: 10px;
    font-size: 20px;
    font-family: Microsoft Yahei, sans-serif;
  }
  div.door{
    display: inline-block;
    margin-left: 50px;
  }
</style>