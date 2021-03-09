<template>
  <!-- <div id="app"> -->
  <nav-bar :title="title" />
  <router-view />
  <!-- </div> -->
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      title: "PCA",
    };
  },
};
</script>

<style>
body {
  margin: 0;
}
</style>
