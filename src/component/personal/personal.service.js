import { AsyncStorage } from 'react-native';
import { API } from '@services/API';

var urlGetProfile = API.auth + '/profile/get',
    urlPutProfile = API.auth + '/profile/update',
    urlGetMasterGrade = API.auth + '/mst/grade',
    urlGetMasterGender = API.auth + '/mst/gender',
    urlGetMasterDomicile = API.auth + '/mst/domicile',
    urlGetMasterMarriage = API.auth + '/mst/marriage',
    urlGetMasterReligion = API.auth + '/mst/religion',
    urlGetMasterBank = API.auth + '/mst/bank',
    urlGetMasterCopany = API.auth + '/company/get',
    urlGetMasterDocumentType = API.hostLoan + '/master/document',

    urlGetProfileCompany = API.auth + '/profile/company',

    urlGetProfileDocument = API.auth + '/profile/document',
    urlPostDocument = API.auth + '/profile/document/add',
    urlDeleteDocument = API.auth + '/profile/document/delete',

    urlGetBankProfile = API.auth + '/profile/bank',
    urlPutBankProfile = API.auth + '/profile/bank/update',
    
    urlPostSalary = API.auth + '/salary/req',
    urlGetSalary = API.auth + '/profile/salary',

    urlGetAddress = API.auth + '/profile/get-address-by-user',
    urlPostAddress = API.auth + '/profile/create-address-by-user',
    urlPutAddress = API.auth + '/profile/update-address-by-user',
    urlDeleteAddress = API.auth + '/profile/delete-address-by-user',

    urlPutEmployee = API.auth + '/profile/company/update';

// Reservation Service
export default personalService = {
    // ======================= //
    // Update Data Employee
    // ======================= //
    updateDataEmployee: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlPutEmployee, {
                    method: 'PUT',
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
                fetch(urlGetMasterCopany,{
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
    // Get Profile Company
    // ======================= //
    getProfileCompany: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlGetProfileCompany,{
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
    // Get Bank Profile
    // ======================= //
    getBank: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlGetMasterBank,{
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
                fetch(urlGetMasterDocumentType,{
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
    // Get Profile Document
    // ======================= //
    getProfileDocument: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlGetProfileDocument,{
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
    // Post Document
    // ======================= //
    postDocument: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlPostDocument, {
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
                fetch(urlDeleteDocument, {
                    method: 'PUT',
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
                fetch(urlGetBankProfile,{
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
                fetch(urlPutBankProfile, {
                    method: 'PUT',
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
                fetch(urlPutProfile, {
                    method: 'PUT',
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
                fetch(urlGetSalary,{
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
                fetch(urlPostSalary, {
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
    getInfoUser: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlGetProfile,{
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
                fetch(urlGetMasterGender,{
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
                fetch(urlGetMasterDomicile,{
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
                fetch(urlGetMasterMarriage,{
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
                fetch(urlGetMasterReligion,{
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
                fetch(urlGetMasterGrade,{
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
                fetch(urlGetAddress,{
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
                fetch(urlPostAddress, {
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
                fetch(urlPutAddress, {
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
                fetch(urlDeleteAddress, {
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

};