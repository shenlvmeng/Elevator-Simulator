<template>
  <div id="app">
    <span>这是一栋</span>
    <input type="text" ref="input" :value="floor" @input="update($event.target.value)" @keyup.enter="start()">
    <span>层的{{ title }}</span>
    <p>（按Enter进入，刷新还原）</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      floor: 0
    }
  },
  methods: {
    update (value) {
      value = parseInt(value);
      if (Number.isInteger(value)) {
        this.floor = value;
      }
      this.$refs.input.value = this.floor;
    },
    start () {
      if (this.floor > 200 || this.floor < 1) {
        alert('诡异的楼层。');
        this.floor = 0;
        return;
      }
      this.$emit('start');
    }
  },
  computed: {
    title () {
      if (this.floor > 50) {
        return "摩天大楼";
      } else if (this.floor > 10) {
        return "大楼";
      } else if (this.floor > 0) {
        return "小楼";
      } else {
        return "楼";
      }
    }
  }
}
</script>

<style>
  p {
    margin-bottom: 0;
    font-size: 14px;
    color: #aaa;
  }
  #app {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    font-size: 40px;
  }
  #app input[type="text"]{
    color: #fff;
    background-color: #111;
    max-width: 2em;
    line-height: 30px;
    border: 0;
    border-bottom: 2px solid #fff;
    text-align: center;
    font-family: Helvetica, sans-serif;
    font-size: 35px;
    outline: none;
  }
</style>
