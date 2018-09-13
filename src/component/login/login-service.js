// API
import { API } from '../../service/API';

var urlLogin = API.auth + '/auth',
    urlPostRegister = API.auth + '/reg',
    urlListCompany = API.auth + '/company/get';

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
            .then(json => resolve(json))
            .catch(err => reject(err));
        });
        return promiseObj;
    },

    // ======================= //
    // Post Login
    // ======================= //
    postRegister: (data) =>{
        console.log(data);
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

    // ======================= //
    // Forgot Password
    // ======================= //
    postForgotPassword: (email) =>{
        const promiseObj = new Promise(function(resolve, reject){
            fetch(urlForgotPass, {
                method: 'POST',
                body: JSON.stringify({
                    email: email
                }),
                headers: {"Content-type": "application/json"}
            })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
        });
        return promiseObj;
    }
};