import { AsyncStorage } from 'react-native';
import { API } from '@services/API';

var urlPostOrder = API.finance + '/order/biller';

// Payment Service
export default paymentService = {
    // ======================= //
    // Post Order
    // ======================= //
    postOrder: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            console.log(data);
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlPostOrder, {
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
    },
};