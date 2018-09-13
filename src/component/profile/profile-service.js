import { AsyncStorage } from 'react-native';
import { API } from '../../service/API';

var token;
setInterval(()=>{
    AsyncStorage.getItem('token').then((result)=>{
        if(result != null){
            token = result;
        }
    });
},1000);

// ==================================== //    
// URL
// ==================================== //
var urlGetAddress = API.auth + '/profile/get-address-by-user',
    urlPostAddress = API.auth + '/profile/create-address-by-user',
    urlPutAddress = API.auth + '/profile/update-address-by-user',
    urlDeleteAddress = API.auth + '/profile/delete-address-by-user',
    
    urlGetInfoUser = API.auth + '/profile/get',
    urlUpdatePassword = API.auth + '/profile/change-password';

var profileService = {
    // ==================================== //    
    // GET INFO USER
    // ==================================== //
    getInfoUser: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            fetch(urlGetInfoUser,{
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
				    'Authorization': token
                })
            })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if(json.data.token == undefined){
                    resolve(json);
                }else{
                    AsyncStorage.setItem('token', json.data.token);
                    token = json.data.token;
                    profileService.getInfoUser();
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
                    profileService.getUserAddress();
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
                    profileService.postAddress(body);
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
                    profileService.putAddress(body);
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
                    profileService.deleteAddress(body);
                }
            })
            .catch(err => reject(err));
        });
        return promiseObj;
    },

    // ==================================== //    
    // UPDATE PASSWORD USER
    // ==================================== //
    putPassword: (body) =>{
        const promiseObj = new Promise(function(resolve, reject){
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
                    profileService.putPassword(body);
                }
            })
            .catch(err => reject(err));
        });
        return promiseObj;
    },
};
export default profileService;