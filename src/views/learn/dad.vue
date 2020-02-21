<template>
  <div>
    <son1 @bian="change2" :cc="cc"></son1>
  </div>
</template>
<script>
import son1 from "@/views/learn/son1";
export default {
  data() {
    return { cc: "父传子" };
  },
  methods: {
    change2(change) {
      console.log(change);
      this.cc = change;
    }
  },
  components: {
    son1
  }
};
</script>