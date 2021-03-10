<template>
  <div class="exercises-view">
    <div class="sections-bar" v-for="(section, v) in exSections.Sections" :key="v">
      <label class="section-title" @click="getExcercises(section)">{{ section }}</label>
    </div>
    <strong v-if="loading">Loading...</strong>
    <div v-if="!loading && !initial">
      <div class="curExercises" v-for="(curExercises, id) in sectionsEx.Exercises" :key="id">
        {{ curExercises.question }}
        <div class="curExercise" v-for="(curExercise, id) in curExercises.props" :key="id">
          <Exercise :curExercise="curExercise" :eval_methods="curExercises.eval_methods" />
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
      title: "Exercises",
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
      this.initial = false;
      this.loading = true;
      this.sectionsEx = [];
      API.exercises(section).then((sectionsEx) => {
        this.loading = false;
        this.sectionsEx = sectionsEx;
      });
    },
  },
};
</script>

<style>
.exercises-view .sections-bar .section-title {
  background-color: rgba(25, 25, 50, 0.8);
  color: white;
  text-transform: uppercase;
  margin: 0;
  padding: 0.25em 1.5em;
}

.exercises-view .sections-bar .section-title:hover {
  background-color: rgba(50, 50, 75, 0.8);
}

.exercises-view .curExercises {
  padding: 1em 0 2em 1.5em;
}
</style>
