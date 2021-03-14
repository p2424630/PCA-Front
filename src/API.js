const API_URL = "http://localhost:8085/api";

export default {
  async calcProp(searchProp) {
    const url = `${API_URL}/calc/${searchProp}`;
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
    const error = new Error(data.message || "Failed to get Prop");
    error.response = data;
    return error;
  },
  async sections() {
    const url = `${API_URL}/exercises`;
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
    const error = new Error(data.message || "Failed to get Exercise Sections");
    error.response = data;
    return error;
  },
  async exercises(section) {
    const url = `${API_URL}/exercises/${section}`;
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
    const error = new Error(data.message || "Failed to get Exercises for this Section");
    error.response = data;
    return error;
  },
  async calcExercise(q_prop, methods, t_prop) {
    const url = `${API_URL}/exercises/eval/${q_prop}?methods=${methods}&t_prop=${t_prop}`;
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
    const error = new Error(data.message || "Failed to get Response for exercise");
    error.response = data;
    return error;
  },
  async calcPropSat(searchProp) {
    const url = `${API_URL}/sat/${searchProp}`;
    const response = await fetch(url);
    return response.json();
  },
  async calcPropTaut(searchProp) {
    const url = `${API_URL}/taut/${searchProp}`;
    const response = await fetch(url);
    return response.json();
  },
  async calcPropContr(searchProp) {
    const url = `${API_URL}/contr/${searchProp}`;
    const response = await fetch(url);
    return response.json();
  },
  async calcPropInterp(searchProp) {
    const url = `${API_URL}/interp/${searchProp}`;
    const response = await fetch(url);
    return response.json();
  },
};
