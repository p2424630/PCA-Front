<template>
  <div class="nav">
    <!-- <span> {{ title }}- </span> -->
    <router-link to="/Exercises">Exercises</router-link>
    <span> | </span>
    <router-link to="/Calculator">Calculator</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      title: "PCA",
    };
  },
};
</script>

<style>
.nav {
  font-size: 1.5em;
}
</style>
