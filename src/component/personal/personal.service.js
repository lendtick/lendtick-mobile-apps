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

    urlGetBankProfile = API.auth + '/profile/bank',
    urlPutBankProfile = API.auth + '/profile/bank/update',
    
    urlPostSalary = API.auth + '/salary/req',
    urlGetSalary = API.auth + '/profile/salary',

    urlGetAddress = API.auth + '/profile/get-address-by-user',
    urlPostAddress = API.auth + '/profile/create-address-by-user',
    urlPutAddress = API.auth + '/profile/update-address-by-user',
    urlDeleteAddress = API.auth + '/profile/delete-address-by-user';

var token;
setInterval(()=>{
    AsyncStorage.getItem('token').then((result)=>{
        if(result != null){
            token = result;
        }
    });
},1000);

// Reservation Service
export default personalService = {
    // ======================= //
    // Get Bank Profile
    // ======================= //
    getBank: () =>{
        const promiseObj = new Promise(function(resolve, reject){
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
        return promiseObj;
    },

    // ======================= //
    // Get Bank Profile
    // ======================= //
    getBankProfile: () =>{
        const promiseObj = new Promise(function(resolve, reject){
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
        return promiseObj;
    },

    // ======================= //
    // Update Bank Profile
    // ======================= //
    putUpdateBankProfile: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
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
        return promiseObj;
    },

    // ======================= //
    // Update profile
    // ======================= //
    putUpdateProfile: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
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
        return promiseObj;
    },

    // ======================= //
    // Get Profile Salary
    // ======================= //
    getProfileSalary: () =>{
        const promiseObj = new Promise(function(resolve, reject){
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
        return promiseObj;
    },

    // ======================= //
    // Post Salary
    // ======================= //
    postReqSalary: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
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
        return promiseObj;
    },
    
    // ======================= //
    // Get List Company
    // ======================= //
    getInfoUser: () =>{
        const promiseObj = new Promise(function(resolve, reject){
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
        return promiseObj;
    },

    // ======================= //
    // Get Master Gender
    // ======================= //
    getMasterGender: () =>{
        const promiseObj = new Promise(function(resolve, reject){
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
        return promiseObj;
    },

    // ======================= //
    // Get Master Domimcile
    // ======================= //
    getMasterDomicile: () =>{
        const promiseObj = new Promise(function(resolve, reject){
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
        return promiseObj;
    },

    // ======================= //
    // Get Master Marriage
    // ======================= //
    getMasterMarriage: () =>{
        const promiseObj = new Promise(function(resolve, reject){
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
        return promiseObj;
    },

    // ======================= //
    // Get Master Religion
    // ======================= //
    getMasterReligion: () =>{
        const promiseObj = new Promise(function(resolve, reject){
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
        return promiseObj;
    },

    // ======================= //
    // Get Master Grade
    // ======================= //
    getMasterGrade: () =>{
        const promiseObj = new Promise(function(resolve, reject){
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
        return promiseObj;
    },

    // ==================================== //    
    // GET USER ADDRESS
    // ==================================== //
    getUserAddress: () =>{
        const promiseObj = new Promise(function(resolve, reject){
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
        return promiseObj;
    },

    // ==================================== //    
    // POST USER ADDRESS
    // ==================================== //
    postAddress : (body) =>{
        const promiseObj = new Promise(function(resolve, reject){
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
        return promiseObj;
    },

    // ==================================== //    
    // UPDATE USER ADDRESS
    // ==================================== //
    putAddress : (body) =>{
        const promiseObj = new Promise(function(resolve, reject){
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
        return promiseObj;
    },

    // ==================================== //    
    // DELETE USER ADDRESS
    // ==================================== //
    deleteAddress : (body) =>{
        const promiseObj = new Promise(function(resolve, reject){
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
        return promiseObj;
    },

};