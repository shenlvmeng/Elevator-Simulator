<template>
  <svg id="door">
    <transition name="left">
  	  <rect v-if="!isopen" class="doorbody" width="150" height="431" x="30" y="30"></rect>
    </transition>
    <transition name="right">
  	  <rect v-if="!isopen" class="doorbody" width="150" height="431" x="182" y="30"></rect>
  	 </transition>
  	<path d="M15 462 V 15 H 342 V 462" id="line"></path>
  </svg>
</template>

<script>
  export default {
  	name: 'doorbody',
  	props:{
  		isopen: {
  			required: true,
  			type: Boolean
  		}
  	}
  }
</script>

<style>
  .left-enter-active, .left-leave-active, .right-enter-active, .right-leave-active{
  	transition: all 1s ease;
  }
  .left-enter, .left-leave-active{
  	transform: translateX(-20px);
  	opacity: 0;
  }
  .right-enter, .right-leave-active{
  	transform: translateX(20px);
  	opacity: 0;
  }
  svg#door{
  	background-color: ivory;
  	width: 100%;
  	height: 100%;
  }
  .doorbody{
  	fill: silver;
  	stroke: #aaa;
  	stroke-width: 2;
  }
  #line{
  	fill: transparent;
  	stroke: cornflowerblue;
  	stroke-width: 30;
  	stroke-linecap: butt;
  	stroke-linejoin: miter;
  }
</style>