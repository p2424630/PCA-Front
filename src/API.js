const API_URL = 'http://localhost:8085/api';

export default {
  calcProp(searchProp) {
    const url = `${API_URL}/calc/${searchProp}`;
        return fetch(url).then(response => response.json());
  },
};