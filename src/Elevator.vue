<template>
  <div id="elevator" :style="{height: (height / floors) + 'px', bottom: (pos * height / floors) + 'px', left: (3 + id * 52) + 'px'}"></div>
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
		    tmpTask: this.newtask
  	  }
  	},
  	props: ['floors', 'newtask', 'height', 'id'],
    created () {
      this.pos = 1;
    },
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
  	  	  this.$emit('floorchange', this.pos, 0, this.id);
  	  	  setTimeOut(this.move, 800);
  	  	} else if (this.pos > next) {
  	      this.dir = 2;
  	      this.pos--;
  	      this.$emit('floorchange', this.pos, 2, this.id);
  	      setTimeOut(this.move, 100);
  	  	} else if (this.pos < next) {
  	  	  this.dir = 1;
  	  	  this.pos++;
  	  	  this.$emit('floorchange', this.pos, 1, this.id);
  	  	  setTimeOut(this.move, 100);
  	  	}
  	  }
  	},
    computed: {
      // //style of a single elevator
      // Unknown reason for not working
      // elevatorStyle: {
      //   height: (this.height / this.floors) + 'px',
      //   bottom: (this.pos * this.height / this.floors) + 'px',
      //   left: (0 + this.id * 52) + 'px'
      // }
    },
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
  	  	//people in the elevator choose the destination
  	  	if (val.d == 0) {
  	  	  let tmp = (val.t - this.pos) * (this.tasks[0].t - val.t);
  	  	  if (tmp > 0 || val.t == this.pos) {
  	  	  	this.tasks.unshift(val);
  	  	  	return;
  	  	  } else if (tmp < 0) {
  	  	  	//give this.dir the right direction
  	  	  	if ((this.dir - 1.5) * (val.t - this.pos) < 0) {
  	  	  	  val.d = this.dir;
  	  	  	} else {
  	  	  	  val.d = 3 - this.dir;
  	  	  	}
  	  	  } else {
  	  	  	return;
  	  	  }
  	  	}
  	  	//look for appropriate position
  	  	while (i < this.tasks.length) {
  	  	  if (this.tasks[i].d == val.d) {
  	  	  	while (i < this.tasks.length && (this.tasks[i].d != val.d || (val.d == 1 && this.tasks[i].t < val.t) || (val.d == 2 && this.tasks[i].t > val.t))) {
  	  	  	  i++;
  	  	  	}
  	  	  	//avoid duplicated insertion
  	  	  	if (this.tasks[i].t != val.t) {
  	  	  	  this.tasks.splice(i, 0, val);
  	  	  	}
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
  	position: absolute;
  	width: 45px;
  	border: 1px solid steelblue;
  	transition: top .5s;
  }
</style>