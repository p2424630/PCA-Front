<template>
  <div class="exercises-view">
    <div id="loader" ref="loader"></div>
    <div id="exercisesSections">
      <label
        v-for="(section, index) in exSections.Sections"
        :key="index"
        id="sectionTitle"
        @click="getExcercises(section)"
        >{{ section }}</label
      >
    </div>
    <div id="sectionExercises" v-if="!loading && !initial">
      <div id="curExercises" v-for="(curExercises, index) in sectionsEx.Exercises" :key="index">
        <h3>{{ index + 1 }}) {{ curExercises.question }}</h3>
        <div v-for="(curExercise, exerciseId) in curExercises.props" :key="exerciseId">
          <exercise :curExercise="curExercise" :eval_methods="curExercises.eval_methods" :exerciseId="exerciseId" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Exercise from "@/components/Exercise.vue";
import API from "@/API";
export default {
  components: {
    Exercise,
  },
  data() {
    return {
      loading: false,
      initial: true,
      exSections: [],
      sectionsEx: [],
    };
  },
  created() {
    API.sections().then((exSections) => {
      this.exSections = exSections;
    });
  },
  methods: {
    getExcercises(section) {
      this.loading = true;
      this.$refs.loader.classList.add("waiting");
      API.exercises(section).then((sectionsEx) => {
        this.loading = false;
        this.$refs.loader.classList.remove("waiting");
        this.initial = false;
        this.sectionsEx = sectionsEx;
      });
    },
  },
};
</script>

<style>
.exercises-view {
  display: grid;
  grid-template-columns: min-content auto;
  grid-auto-rows: min(10rem, 100%);
  column-gap: 0.25em;
}
.exercises-view #exercisesSections {
  margin: 0.5em 0.5em 0.5em 1em;
  opacity: 0.8;
  display: grid;
}
.exercises-view #exercisesSections #sectionTitle {
  background-color: hsl(240, 20%, 20%);
  color: white;
  text-transform: uppercase;
  padding: 0.5rem;
  cursor: pointer;
}
.exercises-view #exercisesSections #sectionTitle:hover {
  background-color: hsl(240, 20%, 40%);
  transition: 0.5s;
}
.exercises-view #sectionExercises {
  display: grid;
  column-gap: 0.25em;
}
.exercises-view #curExercises {
  padding: 0.5rem;
  background-color: hsl(240, 20%, 90%);
  margin: 0.5em;
}
.exercises-view #curExercises h3 {
  font-size: 1rem;
  margin: 0;
}
</style>
