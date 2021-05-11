import axios from 'axios';
import { Cat } from '../models/Cat';
import { FavouriteCat } from '../models/FavouriteCat';
import { Votes } from '../models/Votes';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;

export const getMyImages = (): Promise<Cat[]> => {
  return axios.get('/images/search?limit=100').then((response) => {
    if (response.data instanceof Array) {
      return response.data.map(
        (cat) =>
          ({
            id: cat.id,
            url: cat.url,
            width: cat.width,
            height: cat.height,
            original_filename: cat.original_filename,
            catInfo: {
              favorite: null,
              votes: 0
            }
          } as Cat)
      );
    }
    throw new Error('No cats returned.');
  });
};

export const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios
    .post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-api-key': 'c66c6975-3272-4516-a15a-fff7059051e7'
      }
    })
    .catch(function (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response?.data?.message);
      }
      throw error;
    });
};

export const getFavourites = (): Promise<FavouriteCat[]> => {
  return axios.get('/favourites').then((response) => {
    if (response.data instanceof Array) {
      return response.data.map((fav) => ({
        id: fav.id,
        imageId: fav.image_id
      }));
    }
    return [];
  });
};

export const addFavourite = (id: string) =>
  axios.post('/favourites', {
    image_id: id
  });

export const removeFavourite = (id: number) =>
  axios.delete(`/favourites/${id}`);

export const getVotes = (): Promise<Votes[]> => {
  return axios.get('/votes').then((response) => {
    if (response.data instanceof Array) {
      return response.data.reduce((agr: Votes[], vote) => {
        if (agr.some((v) => v.imageId === vote.image_id)) {
          const currentVote = agr.find((v) => v.imageId === vote.image_id);
          if (currentVote) {
            currentVote.votes = currentVote.votes + (vote.value ? 1 : -1);
          }
        } else {
          agr.push({ imageId: vote.image_id, votes: vote.value ? 1 : -1 });
        }
        return agr;
      }, []);
    }
    return [];
  });
};

export const upvote = (id: string) =>
  axios.post('/votes', {
    image_id: id,
    value: 1
  });

export const downvote = (id: string) =>
  axios.post('/votes', {
    image_id: id,
    value: 0
  });

export const removeCat = (id: string) => axios.delete(`/images/${id}`);
