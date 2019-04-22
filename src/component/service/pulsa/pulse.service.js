import { AsyncStorage } from 'react-native';
import { API } from '@services/API';

var urlGetcheckPhone = API.finance + '/order/check-phone';

// Reservation Service
export default pulseService = {
    
    // ======================= //
    // Get List Company
    // ======================= //
    getInfoPhone: (phone) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                console.log(urlGetcheckPhone + '?phone_number=' + phone);
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