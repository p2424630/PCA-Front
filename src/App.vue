<template>
  <!-- <div id="app"> -->
  <NavBar v-bind:title="title" />
  <div class="routerBody">
    <router-view />
  </div>
  <!-- </div> -->
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  data() {
    return {
      title: "PCA",
    };
  },
  components: {
    NavBar,
  },
};
</script>

<style>
body {
  margin: 0;
}
.routerBody {
  width: 85%;
  margin: 2em auto 1em auto;
}
</style>
