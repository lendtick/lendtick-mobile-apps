import { AsyncStorage } from 'react-native';
import { API } from '@services/API';

var urlGetProfileFullfillment = API.auth + '/profile/fullfillment',
    urlGetMasterLoanType = API.hostLoan + '/master/loan/type/',
    urlGetOffset = API.hostLoan + '/loan/unpaid',
    
    urlReedemVoucher = API.hostLoan + '/loan/voucher/redeem';

// Reservation Service
export default creditService = {
    // ======================= //
    // Reedem Voucher
    // ======================= //
    reedemVoucher: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlReedemVoucher, {
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
    // Get Info User
    // ======================= //
    getInfoUserFullfillment: (id) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlGetProfileFullfillment + '?id=' + id,{
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
                            personalService.getInfoUser();
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
    // Get Master Loan Type
    // ======================= //
    getMstLoanType: (id) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlGetMasterLoanType + id,{
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
                            personalService.getInfoUser();
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
    // Get Offset
    // ======================= //
    getOffset: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlGetOffset,{
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
                            personalService.getInfoUser();
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

};