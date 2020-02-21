<template>
  <div>
    这是son1
    <dir>{{cc}}</dir>
  </div>
</template>
<script>
export default {
  props: ["cc"],
  data() {
    return {};
  },
  methods: {
    change() {
      this.$emit("bian", "子传父");
    }
  },
  mounted() {
    this.change();
  }
};
</script>