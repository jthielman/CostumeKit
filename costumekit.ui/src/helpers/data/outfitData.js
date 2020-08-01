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

const addOutfit = (outfit) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/outfits/add`, outfit)
    .then((returnedOutfit) => resolve(returnedOutfit.data))
    .catch((err) => reject(err));
});

const updateDetails = (outfit) => new Promise((resolve, reject) => {
  axios.put(`${baseUrl}/outfits/update/`, outfit)
    .then((result) => resolve(result))
    .catch((err) => reject(err));
});

export default {
  getUserOutfits,
  getOneOutfit,
  addOutfit,
  updateDetails,
};
