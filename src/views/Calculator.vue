<template>
  <form class="flex" @submit.prevent="formSubmitted()">
    <input
      v-model="searchProp"
      class="u-full-width"
      type="text"
      id="searchProp"
      name="searchProp"
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
        <th v-for="Variab in results.Variables" :key="Variab">{{ Variab }}</th>
        <th>{{ results.Proposition }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(e, i) in results.Interpretations" :key="i">
        <td
          v-for="(bool, k) in e"
          :key="k"
          :class="{ resDataT: bool === true, resDataF: bool === false }"
        >
          {{ bool }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import API from "../API";
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
    formSubmitted() {
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
  width: 80%;
  margin: 2em auto 0 auto;
}
form {
  margin: 1em auto 0 auto;
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
table {
  margin: 1em auto 0 auto;
}
td,
th {
  font-size: 0.8em;
  text-align: center;
}
</style>
