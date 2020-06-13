import { AsyncStorage } from 'react-native';
import { API } from '@services/API';

// Reservation Service
export default personalService = {
    // ======================= //
    // Update Data Employee
    // ======================= //
    updateDataEmployee: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/profile/company/update', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": token
                    },
                })
                .then(response => response.json())
                .then(json => resolve(json))
                .catch(err => {
                    reject(err);
                });
            });
        });
        return promiseObj;
    },


    // ======================= //
    // Get List Company
    // ======================= //
    getCompany: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/company/get',{
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
                        personalService.getCompany();
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Get Profile Company
    // ======================= //
    getProfileCompany: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/profile/company',{
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
                        personalService.getProfileCompany();
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },


    // ======================= //
    // Get Bank Profile
    // ======================= //
    getBank: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/mst/bank',{
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
                        personalService.getBank();
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Get Master Dcument Type
    // ======================= //
    getDocumentType: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.hostLoan + '/master/document',{
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
                        personalService.getDocumentType();
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Get Profile Document
    // ======================= //
    getProfileDocument: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/profile/document',{
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
                        personalService.getProfileDocument();
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },
    
    // ======================= //
    // Post Document
    // ======================= //
    postDocument: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/profile/document/add', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": token
                    },
                })
                .then(response => response.json())
                .then(json => resolve(json))
                .catch(err => {
                    reject(err);
                });
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Delete Dokumen
    // ======================= //
    deleteDocument: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/profile/document/delete', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": token
                    },
                })
                .then(response => response.json())
                .then(json => resolve(json))
                .catch(err => {
                    reject(err);
                });
            });
        });
        return promiseObj;
    },
    

    // ======================= //
    // Get Bank Profile
    // ======================= //
    getBankProfile: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/profile/bank',{
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
                        personalService.getBankProfile();
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Update Bank Profile
    // ======================= //
    putUpdateBankProfile: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/profile/bank/update', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": token
                    },
                })
                .then(response => response.json())
                .then(json => resolve(json))
                .catch(err => {
                    reject(err);
                });
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Update profile
    // ======================= //
    putUpdateProfile: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/profile/update', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": token
                    },
                })
                .then(response => response.json())
                .then(json => resolve(json))
                .catch(err => {
                    reject(err);
                });
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Get Profile Salary
    // ======================= //
    getProfileSalary: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/profile/salary',{
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
                        personalService.getProfileSalary();
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Post Salary
    // ======================= //
    postReqSalary: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/salary/req', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": token
                    },
                })
                .then(response => response.json())
                .then(json => resolve(json))
                .catch(err => {
                    reject(err);
                });
            });
        });
        return promiseObj;
    },
    
    // ======================= //
    // Get Info User
    // ======================= //
    getInfoUser: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/profile/get',{
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
                        personalService.getInfoUser();
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Get Master Gender
    // ======================= //
    getMasterGender: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/mst/gender',{
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
                        personalService.getMasterGender();
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Get Master Domimcile
    // ======================= //
    getMasterDomicile: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/mst/domicile',{
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
                        personalService.getMasterDomicile();
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Get Master Marriage
    // ======================= //
    getMasterMarriage: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/mst/marriage',{
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
                        personalService.getMasterMarriage();
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Get Master Religion
    // ======================= //
    getMasterReligion: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/mst/religion',{
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
                        personalService.getMasterReligion();
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Get Master Grade
    // ======================= //
    getMasterGrade: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/mst/grade',{
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
                        personalService.getMasterGrade();
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ==================================== //    
    // GET USER ADDRESS
    // ==================================== //
    getUserAddress: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/profile/get-address-by-user',{
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
                        personalService.getUserAddress();
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ==================================== //    
    // POST USER ADDRESS
    // ==================================== //
    postAddress : (body) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/profile/create-address-by-user', {
                    method: 'POST',
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
                        personalService.postAddress(body);
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ==================================== //    
    // UPDATE USER ADDRESS
    // ==================================== //
    putAddress : (body) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/profile/update-address-by-user', {
                    method: 'POST',
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
                        personalService.putAddress(body);
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ==================================== //    
    // DELETE USER ADDRESS
    // ==================================== //
    deleteAddress : (body) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/profile/delete-address-by-user', {
                    method: 'POST',
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
                        personalService.deleteAddress(body);
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Get List History Order
    // ======================= //
    getListHostoryOrder: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.hostLoan + '/order/history',{
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
                        personalService.getListHostoryOrder();
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Update profile
    // ======================= //
    putChangePassword: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(API.auth + '/profile/change-password', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": token
                    },
                })
                .then(response => response.json())
                .then(json => resolve(json))
                .catch(err => {
                    reject(err);
                });
            });
        });
        return promiseObj;
    },

};