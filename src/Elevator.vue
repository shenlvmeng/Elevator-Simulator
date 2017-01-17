<template>
  <div id="elevator" :style="elevatorStyle"></div>
</template>

<script>
  export default {
  	name: 'elevator',
  	data () {
  	  return {
  	  	//current position
  	  	pos: 1,
  	  	//togo list
  	  	tasks: [],
		//direction
		//0 for still, 1 for up, 2 for down
		dir: 0,
		//listen to change of newtasks
		tmpTask: this.newtask,
		//style of a single elevator
  	  	elevatorStyle: {
  	  	  height: (this.height / this.floors) + 'px',
  	  	  top: ((pos - 1) * this.height / this.floors) + 'px',
  	  	  left: (this.key * 52) + 'px'
  	  	}
  	  }
  	},
  	props: ['floors', 'newtask', 'height', 'key'],
  	methods: {
  	//recursively move to next destination until tasks list is empty
  	  move () {
  	  	if (this.tasks.length == 0) {
  	  	  this.dir = 0;
  	  	  return;
  	  	}
  	  	let next = this.tasks[0].t;
  	  	if (this.pos == next) {
  	  	  this.tasks.shift();
  	  	  setTimeOut(this.move, 500);
  	  	} else if (this.pos > next) {
  	      this.dir = 2;
  	      this.pos--;
  	      this.$emit('floorchange', this.pos, 2, this.key);
  	      setTimeOut(this.move, 500);
  	  	} else if (this.pos < next) {
  	  	  this.dir = 1;
  	  	  this.pos++;
  	  	  this.$emit('floorchange', this.pos, 1, this.key);
  	  	  setTimeOut(this.move, 500);
  	  	}
  	  }
  	}
  	watch: {
  	//put new task into correct list position
  	//call move function when insert into empty tasks list
  	  tmpTask (val) {
  	  	if (!val.d) {
  	  	  return;
  	  	}
  	  	let i = 0;
  	  	if (this.tasks.length == 0) {
  	  		this.tasks.push(val);
  	  		//asynchronic call move()
  	  		var promise = new Promise(function(resolve, reject){
			  this.move();
  	  		});
  	  		return;
  	  	}
  	  	//look for appropriate position
  	  	while (i < this.tasks.length) {
  	  	  if (this.tasks[i].d == val.d) {
  	  	  	while (i < this.tasks.length && (this.tasks[i].d != val.d || (val.d == 1 && this.tasks[i].t < val.t) || (val.d == 2 && this.tasks[i].t > val.t))) {
  	  	  	  i++;
  	  	  	}
  	  	  	this.tasks.splice(i, 0, val);
  	  	  	return;
  	  	  }
  	  	  i++;
  	  	}
  	  	this.tasks.push(val);
  	  }
  	}
  }
</script>

<style>
  #elevator{
  	display: absolute;
  	width: 45px;
  	border: 1px solid steelblue;
  	transition: top .5s;
  }
</style>