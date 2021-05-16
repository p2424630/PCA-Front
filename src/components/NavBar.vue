<template>
  <nav>
    <router-link title="Go to Home" class="routerLink" to="/">{{ title }}</router-link>
    <router-link title="Go to Exercises" class="routerLink" to="/Exercises">Exercises</router-link>
    <router-link title="Go to Calculator" class="routerLink" to="/Calculator">Calculator</router-link>
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
  background-color: var(--bg);
}
nav .routerLink {
  text-decoration: none;
  padding: 0.25em 0.5em;
}
nav .routerLink:hover {
  color: var(--primary);
  transition: 0.2s;
}
</style>
