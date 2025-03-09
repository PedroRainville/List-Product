import api from '../services/api.ts';

export async function getProducts() {
    const response = await api.get(`products`);
    return response;
};

export async function getCategories() {
    const response = await api.get(`/categories`);
    return response;

};
