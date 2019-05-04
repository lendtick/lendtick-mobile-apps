import { AsyncStorage } from 'react-native';
import { API } from '@services/API';

var urlGetLoanProfile = API.hostLoan + '/loan/profile',
    urlGetDetailLoan = API.hostLoan + '/loan/profile/detail'

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
    getLoanProfileDetail: (id) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlGetDetailLoan + '?id_loan=' + id,{
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
};