<template>
  <form class="flex" @submit.prevent="propSubmitted()">
    <input
      v-model="searchProp"
      class="u-full-width"
      name="searchProp"
      id="searchProp"
      type="text"
      placeholder="Enter Proposition"
    />
    <button type="submit">CALCULATE</button>
  </form>
  <strong v-if="loading">Loading...</strong>
  <section class="u-full-width">
    <div v-for="(resData, resName) in results" :key="resName">
      <span
        v-if="resName !== 'Interpretations' && resName !== 'Variables' && resName !== 'Proposition'"
      >
        <strong>{{ resName }}: </strong>
        <span :class="{ resDataT: resData === true, resDataF: resData === false }"
          >{{ resData }}
        </span>
      </span>
    </div>
  </section>
  <table class="u-full-width">
    <thead>
      <tr>
        <th v-for="variable in results.Variables" :key="variable">{{ variable }}</th>
        <th>{{ results.Proposition }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(interpretation, row) in results.Interpretations" :key="row">
        <td
          v-for="(bool, i) in interpretation"
          :key="i"
          :class="{ resDataT: bool === true, resDataF: bool === false }"
        >
          {{ bool }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import API from "@/API";
export default {
  data() {
    return {
      title: "Calculator",
      searchProp: "",
      results: [],
      loading: false,
    };
  },
  methods: {
    propSubmitted() {
      this.loading = true;
      this.results = [];
      API.calcProp(this.searchProp).then((results) => {
        this.results = results;
        this.loading = false;
      });
    },
  },
};
</script>

<style>
body {
  width: 90%;
  margin: 2em auto 1em auto;
}
form {
  margin: 1em auto auto auto;
}
.resDataT {
  text-transform: capitalize;
  color: green;
}
.resDataF {
  text-transform: capitalize;
  color: red;
}
.flex {
  display: flex;
}
td,
th {
  font-size: 0.8em;
  text-align: center;
}
</style>
