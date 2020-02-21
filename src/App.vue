<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  components: {}
};
</script>
<style>
::-webkit-scrollbar-track {
  background: rgb(129, 125, 125);
  border-radius: 0;
}
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(161, 154, 154, 0.25);
  transition: coor 0.2s ease;
}
</style>
