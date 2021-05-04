<template>
  <nav>
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
  background-color: hsl(240, 40%, 15%);
  opacity: 0.8;
}
nav .routerLink {
  text-decoration: none;
  color: white;
  padding: 0.25em 0.5em;
}
nav .routerLink:hover {
  color: gray;
  transition: 0.5s;
}
</style>
