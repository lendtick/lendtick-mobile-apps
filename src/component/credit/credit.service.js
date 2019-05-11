import { AsyncStorage } from 'react-native';
import { API } from '@services/API';

var urlGetProfileFullfillment = API.auth + '/profile/fullfillment',
    urlGetMasterLoanType = API.hostLoan + '/master/loan/type/',
    urlGetOffset = API.hostLoan + '/loan/unpaid',
    urlGetLoanTerm = API.hostLoan + '/master/loan/term',
    urlGetLoanDocument = API.hostLoan + '/loan/document/',
    urlPostDocument = API.auth + '/profile/document/add',

    urlPostReqLoan = API.hostLoan + '/loan/request',
    
    urlPostSimulation = API.hostLoan + '/loan/simulation',
    urlVoucherValidate = API.hostLoan + '/loan/voucher/validate',
    urlReedemVoucher = API.hostLoan + '/loan/voucher/redeem',
    urlPostEligibility = API.hostLoan + '/loan/eligibility',
    urlPostLoanDraft = API.hostLoan + '/loan/draft',

    urlGetMasterLoan = API.hostLoan + '/master/loan/type'

// Reservation Service
export default creditService = {
    // ======================= //
    // Remove character from number
    // ======================= //
    convertFormatNumber(e){
        return Number(e.replace(/,/g, '').replace('Rp ', ''));
    },

    // ======================= //
    // Get Master Loan
    // ======================= //
    getMasterLoan: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlGetMasterLoan,{
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
                            creditService.getMasterLoan();
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
    // Get Loan Term
    // ======================= //
    getLoanTerm: () =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlGetLoanTerm,{
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
                            creditService.getLoanTerm();
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
    // Post Request Loan
    // ======================= //
    postReqLoan: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlPostReqLoan, {
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
    // Post Document
    // ======================= //
    postDocument: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlPostDocument, {
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

    // ======================= //
    // Post Draft
    // ======================= //
    postLoanDraft: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlPostLoanDraft, {
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

    // ======================= //
    // Post Simulation
    // ======================= //
    postSimulation: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlPostSimulation, {
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

    // ======================= //
    // Check Eligibility
    // ======================= //
    postEligibility: (data) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlPostEligibility, {
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
    
    // ======================= //
    // Get Loan Document
    // ======================= //
    getLoanDocument: (id) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlGetLoanDocument + id,{
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
                            creditService.getLoanDocument();
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
    // Get Validate Voucher
    // ======================= //
    getValidateVoucher: (voucher,loan_type) =>{
        const promiseObj = new Promise(function(resolve, reject){
            AsyncStorage.getItem('token').then((token)=>{
                fetch(urlVoucherValidate + '?code='+ voucher +'&loan_type=' + loan_type,{
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
                            creditService.getValidateVoucher();
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
                            creditService.getInfoUserFullfillment();
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
                            creditService.getMstLoanType();
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
            console.log(urlGetOffset);
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
                            creditService.getOffset();
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