import Axios from 'axios';
export const api = Axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productsApi = {
  async getProducts() {
    const response = await api.get(`/products`);
    return response;
  },
};

export const reviewsApi = {
  async getReviews() {
    const response = await api.get(`/reviews`);
    return response;
  },

  async postReviews({ ...data }) {
    const response = await api.post(`/reviews`, { ...data });
    return response.data;
  },
};
