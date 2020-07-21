import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getUserOutfits = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/outfits/user/${userId}`)
    .then((output) => resolve(output.data))
    .catch((err) => reject(err));
});

const getOneOutfit = (outfitId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/outfits/${outfitId}`)
    .then((output) => resolve(output.data))
    .catch((err) => reject(err));
});

export default { getUserOutfits, getOneOutfit };
