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
            console.log(token,urlGetProfile);
            fetch(urlGetProfile,{
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
                        personalService.getInfoUser();
                    }else{
                        resolve(json);                        
                    }
                }
            })
            .catch(err => reject(err));
        });
        return promiseObj;
    },

    
};