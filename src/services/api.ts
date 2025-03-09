import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

export async function getToken() {
    try {
        const response = await api.post('/auth', {
            consumer_key: "ba7b676014d6ab3ee25df8a244e3d5109dd463154750c60970a8aa8084890093",
            consumer_secret: "1ecf43b9750696e00218ecff02591c2515db1d9f984da0b60284e320223554e8",
            code: "4bb649c8be7c78ac373c1c201d486ffe51ba4da49d4c592cbffe6c12675faca0"
        });
        return response.data;
    }
    catch {
        return false;
    }
};

export async function refreshToken(refreshToken: string) {
    const response = await api.post('/auth', {
            params: {
              refreshToken,
            },
        });
        localStorage.setItem('token', JSON.stringify(response.data));
};

api.interceptors.request.use((config) => {
    let token = localStorage.getItem('token');

    if (token) {
        let convertedToken = JSON.parse(token);
        if (new Date (convertedToken.date_expiration_access_token) < new Date()) {
            let newToken = refreshToken(convertedToken.refresh_token)
            config.params = {...config.params, access_token: newToken}        
        }
        else{
            config.params = {...config.params, access_token: convertedToken.access_token}        
        }
    }
    return config
  })
  

export default api;