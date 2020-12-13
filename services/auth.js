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

export const login = async (email, password) => {
    let res = await request(api.login, 'POST', {
        email,
        password
    });

    localStorage.setItem('auth', JSON.stringify(res));

    return res;
}

export const getUserData = () => {
    try {
        let data = JSON.parse(localStorage.getItem('auth'));

        return {
            isAuthenticated: Boolean(data.idToken),
            email: data.email
        };
    } catch (error) {
        return {
            isAuthenticated: false,
            email: ''
        }
    }
}

export const logout = () => {
    localStorage.setItem('auth', '');
}