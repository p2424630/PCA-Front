const API_URL = "http://localhost:8085/api";

export default {
  async apiBuilder(url) {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    const error = new Error(data.message || "Failed to get Response");
    error.response = data;
    return error;
  },
  async calcProp(searchProp) {
    searchProp = this.encodeInput(searchProp);
    return await this.apiBuilder(`${API_URL}/calc/${searchProp}`);
  },
  async sections() {
    return await this.apiBuilder(`${API_URL}/exercises`);
  },
  async laws() {
    return await this.apiBuilder(`${API_URL}/laws`);
  },
  async exercises(section) {
    return await this.apiBuilder(`${API_URL}/exercises/${section}`);
  },
  async calcExercise(q_prop, methods, t_prop) {
    t_prop = this.encodeInput(t_prop);
    console.log(t_prop);
    return await this.apiBuilder(`${API_URL}/exercises/eval/${q_prop}?methods=${methods}&t_prop=${t_prop}`);
  },
  async partial(prop, methods) {
    prop = this.encodeInput(prop);
    return await this.apiBuilder(`${API_URL}/partial/${prop}?methods=${methods}`);
  },
  encodeInput(str) {
    return encodeURIComponent(str);
  },
};
