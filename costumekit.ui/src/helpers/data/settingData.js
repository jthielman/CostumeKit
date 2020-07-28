import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getAllSettings = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/settings`)
    .then((output) => resolve(output.data))
    .catch((err) => reject(err));
});

export default { getAllSettings };
