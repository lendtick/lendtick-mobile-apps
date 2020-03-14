// API
import { API } from '@services/API';

var urlPostRegister = API.auth + '/reg',
    urlListCompany = API.auth + '/company/get',
    urlOtpValidate = API.auth + '/otp/validate',
    urlResendOTP = API.notif + '/send-otp';
    
// Reservation Service
export default registerService = {
    // ======================= //
    // Post OTV Resend
    // ======================= //
    postOtvResend: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            fetch(urlResendOTP, {
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
    // Post Register
    // ======================= //
    postRegister: (data) =>{
        // console.log('data ==>', JSON.stringify(data));
        
        // const promiseObj = new Promise(function(resolve, reject){
        //     fetch(urlPostRegister, {
        //         method: 'POST',
        //         body: JSON.stringify(data),
        //         headers: {
        //             Accept: 'application/json',
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //     .then(response => {
        //         console.log('response', response)
        //         console.log('response json', response.json())
        //         return response.json()
        //     })
        //     .then(json => {
        //         console.log('json ==>', json);
        //         resolve(json)
        //     })
        //     .catch(err => {
        //         console.log('err ==>', err);
        //         reject(err);
        //     });
        // });
        // return promiseObj;
        return fetch(urlPostRegister, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => json)
        .catch(err => {
            console.log('err ==>', err);
        });
    },

    // ======================= //
    // Post OTV Validate
    // ======================= //
    postOtvValidate: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            fetch(urlOtpValidate, {
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
    },



};