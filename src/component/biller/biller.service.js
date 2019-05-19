import { AsyncStorage } from 'react-native';
import { API } from '@services/API';

var urlGetcheckPhone = API.finance + '/order/check-phone',
    urlPostInquiry = API.finance + '/biller/inquiry',
    urlPostOrder = API.finance + '/order/biller';

// Reservation Service
export default billerService = {
    
    // ======================= //
    // Get List Company
    // ======================= //
    getInfoPhone: (phone) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlGetcheckPhone + '?phone_number=' + phone,{
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
                            billerService.getInfoPhone();
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
    // Post BIller Inquiry
    // ======================= //
    postBillerInquiry: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlPostInquiry, {
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
    }
};