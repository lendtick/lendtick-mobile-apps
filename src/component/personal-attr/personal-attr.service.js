import { AsyncStorage } from 'react-native';
import { API } from '@services/API';

var urlGetLoanProfile = API.hostLoan + '/loan/profile',
    urlGetDetailLoan = API.hostLoan + '/loan/profile/detail',
    urlPutConfrimLoan = API.hostLoan + '/loan/confirm';

// Reservation Service
export default personalAttrService = {
    // ======================= //
    // Get Loan Profile
    // ======================= //
    getLoanProfile: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlGetLoanProfile,{
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': token
                    })
                })
                .then(response => response.json())
                .then(json => {
                    if(json.data){
                        if(json.data.token){
                            AsyncStorage.setItem('token', json.data.token);
                            token = json.data.token;
                            personalService.getLoanProfile();
                        }else{
                            resolve(json);                        
                        }
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Get Loan Profile Detail
    // ======================= //
    getLoanProfileDetail: (id,group) =>{
        const promiseObj = new Promise(function(resolve, reject){
            console.log(urlGetDetailLoan + '?id_loan=' + id + '&group=' + group);
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlGetDetailLoan + '?id_loan=' + id + '&group=' + group,{
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': token
                    })
                })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    if(json.data){
                        if(json.data.token){
                            AsyncStorage.setItem('token', json.data.token);
                            token = json.data.token;
                            personalService.getLoanProfileDetail(id);
                        }else{
                            resolve(json);                        
                        }
                    }
                })
                .catch(err => reject(err));
            });
        });
        return promiseObj;
    },

    // ======================= //
    // Reedem Voucher
    // ======================= //
    updateConfrim: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlPutConfrimLoan, {
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
};