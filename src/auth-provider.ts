/*在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发,这个文件实现的功能是模拟第三方服务的auth*/
/*
功能模块
* */
import { User } from "screens/project-list/search-panel";
const localStorageKey = "__auth_provider_token__";
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ( {user} : { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || "");
    console.log('打印下user',user)
    return user;
};

export const login = (data: { username: string; password: string }) => {
    return fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if (response.ok) {
            console.log(await response.json)
            return handleUserResponse(await response.json());
        } else {
            return Promise.reject(await response.json());
        }
    });
};

export const register = (data: { username: string; password: string }) => {
    return fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if (response.ok) {
            return handleUserResponse(await response.json());
        } else {
            return Promise.reject(await response.json());
        }
    });
};

export const logout = async ()=>window.localStorage.removeItem(localStorageKey)