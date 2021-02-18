const API_URL = 'http://localhost:8085/api';

export default {
  // async calcProp(searchProp, params) {
  //   const urlParams = new URLSearchParams(params);
  //   const url = `${API_URL}/calc/${searchProp}?${urlParams}`;
  //   const response = await fetch(url, {
  //     headers: {
  //       accept: 'application/json',
  //     },
  //   });
  //   const data = await response.json();
  //   if (response.ok) {
  //         return data;
  //       }
  //   const error = new Error(data.message || 'Failed to get Prop');
  //   error.response = data;
  //   return error;
  // },
  async calcProp(searchProp) {
    const url = `${API_URL}/calc/${searchProp}`;
    const response = await fetch(url);
    return response.json();
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
