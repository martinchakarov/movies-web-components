import { request } from './request.js';

const apiKey = "AIzaSyDEo7XTiKr3z8ckIYZvZMJgcfWwT9HH0Yg";
const databaseUrl = "https://movies-38894-default-rtdb.europe-west1.firebasedatabase.app";


const api = {
    register: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    login:`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
};

export const register = async (email, password) => {
    let res = await request(api.register, 'POST', {
        email,
        password
    });

    localStorage.setItem('auth', JSON.stringify(res));

    return res;
}