import { AsyncStorage } from 'react-native';
import { API } from '@services/API';

var urlGetProfile = API.auth + '/profile/get';

// Reservation Service
export default homeService = {
    
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
                    if(json.data){
                        if(json.data.token){
                            AsyncStorage.setItem('token', json.data.token); 
                            homeService.getInfoUser();
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