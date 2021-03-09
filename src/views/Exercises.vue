<template>
  <h3>Exercises Page</h3>
  <ul>
    <li v-for="(section, v) in results.Sections" :key="v">
      {{ section }}
    </li>
  </ul>
  <Excercise />
</template>

<script>
import Excercise from "@/components/Excercise.vue";
import API from "@/API";
export default {
  data() {
    return {
      title: "Exercises",
      results: [],
    };
  },
  created() {
    API.sections().then((results) => {
      this.results = results;
    });
  },
  // methods: {
  //   getSections() {
  //     console.log(this.results);
  //   },
  // },
  components: {
    Excercise,
  },
};
</script>

<style></style>
