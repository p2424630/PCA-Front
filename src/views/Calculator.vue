<template>
  <div class="calculator-view">
    <form class="flex" @submit.prevent="propSubmitted()">
      <input
        v-model="searchProp"
        class="u-full-width"
        name="searchProp"
        id="searchProp"
        type="text"
        placeholder="Enter Proposition"
      />
      <button type="submit">calculate</button>
    </form>
    <strong v-if="loading">Loading...</strong>
    <p class="errorFetching" v-if="errorFetching">
      {{ results.response.Error }}
    </p>
    <section v-if="!loading && !errorFetching" class="u-full-width">
      <div v-for="(resData, resName) in results" :key="resName">
        <span
          v-if="
            resName !== 'Interpretations' && resName !== 'Variables' && resName !== 'Proposition'
          "
        >
          <strong>{{ resName }}: </strong>
          <span :class="{ resDataT: resData === true, resDataF: resData === false }"
            >{{ resData }}
          </span>
        </span>
      </div>
    </section>
    <table v-if="!errorFetching && showTable" class="u-full-width">
      <thead>
        <tr>
          <th>#</th>
          <th v-for="variable in results.Variables" :key="variable">{{ variable }}</th>
          <th>{{ results.Proposition }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(interpretation, row) in results.Interpretations" :key="row">
          <td>{{ row + 1 }}</td>
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
  </div>
</template>

<script>
import API from "@/API";
export default {
  data() {
    return {
      searchProp: "",
      loading: false,
      errorFetching: false,
      showTable: false,
      results: [],
    };
  },
  methods: {
    propSubmitted() {
      this.loading = true;
      this.errorFetching = false;
      (this.showTable = false), (this.results = []);
      API.calcProp(this.searchProp, "test").then((results) => {
        this.loading = false;
        this.results = results;
        this.showTable = true;
        if (results instanceof Error) {
          this.errorFetching = true;
        }
      });
    },
  },
};
</script>

<style>
.calculator-view {
  margin: 2em auto 2em auto;
  width: 85%;
}
.calculator-view form {
  margin: 0;
}
.calculator-view .flex {
  display: flex;
}
.calculator-view td,
.calculator-view th {
  font-size: 12px;
  text-align: center;
}
</style>
