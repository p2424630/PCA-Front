<template>
  <nav class="nav-bar">
    <router-link class="routerLink" to="/">{{ title }}</router-link>
    <router-link class="routerLink" to="/Exercises">Exercises</router-link>
    <router-link class="routerLink" to="/Calculator">Calculator</router-link>
  </nav>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
nav :first-child {
  margin-right: auto;
  font-weight: bold;
}

nav {
  display: flex;
  font-size: 1.5em;
  background-color: rgba(0, 0, 15, 0.8);
}

nav .routerLink:hover {
  color: silver;
  transition: 0.5s;
}

nav .routerLink {
  text-decoration: none;
  color: white;
  padding: 0.25em 1em;
  display: inline-block;
}
</style>
