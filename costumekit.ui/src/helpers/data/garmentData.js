import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getGarmentsByOutfitId = (outfitId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/garments/outfit/${outfitId}`)
    .then((output) => resolve(output.data))
    .catch((err) => reject(err));
});

const getOneGarment = (garmentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/garments/${garmentId}`)
    .then((output) => resolve(output.data))
    .catch((err) => reject(err));
});

const getAllGarments = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/garments`)
    .then((output) => resolve(output.data))
    .catch((err) => reject(err));
});

const addGarmentToOutfit = (garmentId, outfitId) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/garments/${garmentId}/outfits/${outfitId}`)
    .then((output) => resolve(output.data))
    .catch((err) => reject(err));
});

const removeFromOutfit = (garmentId, outfitId) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/garments/${garmentId}/outfits/${outfitId}`)
    .then((output) => resolve(output))
    .catch((err) => reject(err));
});

const addGarment = (garment) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/garments/add`, garment)
    .then((returnedGarment) => resolve(returnedGarment.data))
    .catch((err) => reject(err));
});

export default {
  getGarmentsByOutfitId,
  getOneGarment,
  getAllGarments,
  addGarmentToOutfit,
  removeFromOutfit,
  addGarment,
};
