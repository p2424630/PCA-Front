<template>
  <div class="exercises-view">
    <div class="exercisesSections" v-for="(section, index) in exSections.Sections" :key="index">
      <label class="sectionTitle" @click="getExcercises(section)">{{ section }}</label>
    </div>
    <strong v-if="loading">Loading...</strong>
    <div class="sectionExercises" v-if="!loading && !initial">
      <div class="curExercises" v-for="(curExercises, index) in sectionsEx.Exercises" :key="index">
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
      this.sectionsEx = [];
      API.exercises(section).then((sectionsEx) => {
        this.loading = false;
        this.initial = false;
        this.sectionsEx = sectionsEx;
      });
    },
  },
};
</script>

<style>
.exercises-view .exercisesSections .sectionTitle {
  background-color: hsl(240, 40%, 10%);
  color: white;
  text-transform: uppercase;
  margin: 0;
  padding: 0.25rem 1rem;
  cursor: pointer;
  opacity: 0.8;
}

.exercises-view .exercisesSections .sectionTitle:hover {
  background-color: hsl(240, 20%, 20%);
  transition: 0.5s;
}

.exercises-view .curExercises {
  padding: 1rem 0 2rem 1.5rem;
}

.exercises-view .curExercises h3 {
  font-size: 2rem;
}
</style>
