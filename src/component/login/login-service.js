import { AsyncStorage } from 'react-native';
import { API } from '@services/API';

var urlLogin = API.auth + '/auth',
    urlPostRegister = API.auth + '/reg',
    urlForgotPass = API.auth + '/auth/forgot',
    urlUpdatePassword = API.auth + '/profile/change-password',
    urlListCompany = API.auth + '/company/get',
    urlPostMigrate = API.auth + '/reg/migrate',
    urlGetInfoUser = API.auth + '/profile/get';

// Reservation Service
export default loginService = {
    // ======================= //
    // Get List Company
    // ======================= //
    getListCompany: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            fetch(urlListCompany, {
                headers: {"Content-type": "application/json"}
            })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
        });
        return promiseObj;
    },

    // ======================= //
    // Post Login
    // ======================= //
    postLogin: (username,password) =>{
        const promiseObj = new Promise(function(resolve, reject){
            fetch(urlLogin, {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {"Content-type": "application/json"}
            })
            .then(response => response.json())
            .then(json => {
                resolve(json);
            })
            .catch(err => reject(err));
        });
        return promiseObj;
    },

    // ======================= //
    // Forgot Password
    // ======================= //
    putForgotPassword: (email) =>{
        const promiseObj = new Promise(function(resolve, reject){
            fetch(urlForgotPass, {
                method: 'PUT',
                body: JSON.stringify({
                    nik: email
                }),
                headers: {"Content-type": "application/json"}
            })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
        });
        return promiseObj;
    },

    // ==================================== //    
    // UPDATE PASSWORD USER
    // ==================================== //
    putPassword: (body) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlUpdatePassword, {
                    method: 'PUT',
                    body: JSON.stringify(body),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': token
                    })
                })
                .then(response => response.json())
                .then(json => {
                    if(json.data.token == undefined){
                        resolve(json);
                    }else{
                        AsyncStorage.setItem('token', json.data.token);
                        token = json.data.token;
                        loginService.putPassword(body);
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Post Login
    // ======================= //
    postRegister: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            fetch(urlPostRegister, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json"}
            })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(err => {
                reject(err);
            });
        });
        return promiseObj;
    },

    // ==================================== //    
    // GET INFO USER
    // ==================================== //
    getInfoUser: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlGetInfoUser,{
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': token
                    })
                })
                .then(response => response.json())
                .then(json => {
                    if(json.data.token == undefined){
                        resolve(json);
                    }else{
                        AsyncStorage.setItem('token', json.data.token);
                        token = json.data.token;
                        loginService.getInfoUser();
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Post Register
    // ======================= //
    postRegister: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            fetch(urlPostRegister, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json"}
            })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(err => {
                reject(err);
            });
        });
        return promiseObj;
    }

};