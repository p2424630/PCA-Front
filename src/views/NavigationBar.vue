<template>
  <div class="navbar">
    <div class="navbar-left">
      <div class="navbar-brand">
        APPNAME
      </div>
      <slot name="left"></slot>
    </div>
    <div class="navbar-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    customContent: {
      type: String,
      default: "default Content",
    },
  },
};
</script>

<style></style>
