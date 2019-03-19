import { AsyncStorage } from 'react-native';
import { API } from '@services/API';

var urlGetProfile = API.auth + '/profile/get';

var token;
setInterval(()=>{
    AsyncStorage.getItem('token').then((result)=>{
        if(result != null){
            token = result;
        }
    });
},1000);

// Reservation Service
export default homeService = {
    
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

    
};