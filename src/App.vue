<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <span> - </span>
      <router-link to="/Calc">Calculator</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Proposition App",
    };
  },
};
</script>

<style></style>
