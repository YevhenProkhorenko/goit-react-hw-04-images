import axios from 'axios';
const API_KEY = '29227612-6a3f7ca9f0166aa0e385beb2d';

const API = (query, page) => {
  return axios
    .get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&per_page=15&page=${page}`
    )
    .then(res => res.data.hits);
};
export default API;
