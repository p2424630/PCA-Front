<template>
  <div class="exercises-view">
    <div class="exercisesSections" v-for="(section, v) in exSections.Sections" :key="v">
      <label class="sectionTitle" @click="getExcercises(section)">{{ section }}</label>
    </div>
    <strong v-if="loading">Loading...</strong>
    <div class="sectionExercises" v-if="!loading && !initial">
      <div class="curExercises" v-for="(curExercises, sectionId) in sectionsEx.Exercises" :key="sectionId">
        {{ sectionId + 1 }}) {{ curExercises.question }}
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
  background-color: rgba(25, 25, 50, 0.8);
  color: white;
  text-transform: uppercase;
  margin: 0;
  padding: 0.25em 1.5em;
  cursor: pointer;
}

.exercises-view .exercisesSections .sectionTitle:hover {
  background-color: rgba(50, 50, 75, 0.8);
  transition: 0.2s;
}

.exercises-view .curExercises {
  padding: 1em 0 2em 1.5em;
}
</style>
