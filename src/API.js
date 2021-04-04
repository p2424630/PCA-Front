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
    return await this.apiBuilder(`${API_URL}/calc/${searchProp}`);
  },
  async sections() {
    return await this.apiBuilder(`${API_URL}/exercises`);
  },
  async exercises(section) {
    return await this.apiBuilder(`${API_URL}/exercises/${section}`);
  },
  async calcExercise(q_prop, methods, t_prop) {
    return await this.apiBuilder(`${API_URL}/exercises/eval/${q_prop}?methods=${methods}&t_prop=${t_prop}`);
  },
  async partialAppl(prop, methods) {
    return await this.apiBuilder(`${API_URL}/partial/${prop}?methods=${methods}`);
  },
};
