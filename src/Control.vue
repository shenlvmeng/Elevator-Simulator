<template>
  <div id="content">
    <Door :maxbuildingfloor="maxFloor" :isarrived="arr1">
    <Door :maxbuildingfloor="maxFloor" :isarrived="arr2">
   </div>
</template>

<script>
  import Door from './Door.vue'

  export default {
  	name: 'control',
  	data: {
  	  //store positions of all elevators
  	  //Assume that all elevators start from 1st floor
  	  positions: [1, 1],
  	  //store directions of all elevators
  	  //0 for up, 1 for down
  	  directions: [0, 0],
  	  //store two door floors
  	  floors: [1, 1]
  	  //max floor of this building
  	  maxFloor: this.floor
  	},
  	methods: {

  	},
  	computed: {
  	  isarr1 () {
  	  	return this.positions[0] === this.floor[0];
  	  },
  	  isarr2 () {
  	  	return this.positions[1] === this.floor[1];
  	  }
  	}
  }
</script>

<style>

</style>