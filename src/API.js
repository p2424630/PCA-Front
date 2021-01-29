const API_URL = 'http://localhost:8085/api';

export default {
  calcProp(searchProp) {
    const url = `${API_URL}/calc/${searchProp}`;
    return fetch(url).then(response => response.json());
  },
  calcPropSat(searchProp) {
    const url = `${API_URL}/sat/${searchProp}`;
    return fetch(url).then(response => response.json());
  },
  calcPropTaut(searchProp) {
    const url = `${API_URL}/taut/${searchProp}`;
    return fetch(url).then(response => response.json());
  },
  calcPropContr(searchProp) {
    const url = `${API_URL}/contr/${searchProp}`;
    return fetch(url).then(response => response.json());
  },
  calcPropInterp(searchProp) {
    const url = `${API_URL}/interp/${searchProp}`;
    return fetch(url).then(response => response.json());
  },
};
