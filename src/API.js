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
    return await this.apiBuilder(`${API_URL}/calc/${encodeURIComponent(searchProp)}`);
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
    return await this.apiBuilder(
      `${API_URL}/exercises/eval/${encodeURIComponent(q_prop)}?methods=${methods}&t_prop=${encodeURIComponent(t_prop)}`
    );
  },
  async partial(prop, methods) {
    return await this.apiBuilder(`${API_URL}/partial/${encodeURIComponent(prop)}?methods=${methods}`);
  },
};
