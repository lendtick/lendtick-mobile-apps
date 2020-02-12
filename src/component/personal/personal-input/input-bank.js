import React from 'react';
import { View,Alert } from 'react-native';
import * as _ from 'lodash';

import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
Validator.setMessages('en', en);

import { InputComponent,ButtonComponent,AlertBox,InputDropdown } from '@directives';
import personalService from '../personal.service';

class InputBank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false,
            isInvalid: false,
            isSuccess: false,
            isFailed: false,

            openPopupBank: false,
            selectedBank: null,
            arrBank: [],
        };
    }

    componentDidMount(){
        this.fetchBankProfile();
    }

    // Fetch Bank Profile
    // ========================= //
    fetchBankProfile(){
        personalService.getBankProfile().then(res => {
            this.setState(res['data']);
            this.fetchMaster();
        });
    }

    // Fetch Master
    // ========================= //
    fetchMaster(){
        let arrBank = [];
        personalService.getBank().then(res =>{
            _.map(res['data'],(x)=>{
                let obj = {value: x.id_bank, label: x.name_bank};
                arrBank.push(obj);
            });
            this.setState({
                arrBank: arrBank,
                selectedBank: _.find(arrBank, {value: this.state.id_bank})
            });
        });
    }

    // Validation
    // ======================== //
    validationSubmit(){
        let data = {
            id_bank: this.state.id_bank,
            account_name_bank: this.state.account_name_bank,
            account_number_bank: this.state.account_number_bank,
            branch_bank: this.state.branch_bank
        };

        let rules = {
            id_bank: 'required',
            account_name_bank: 'required',
            account_number_bank: 'required|numeric',
            branch_bank: 'required',
        };

        let validation = new Validator(data, rules);
        if(validation.passes()){
            this.onSubmit(data);
        }else{
            this.setState({isInvalid: true});
        }
    }

    // Submit
    // ======================== //
    onSubmit(data){
        this.setState({
            isFailed: false,
            isInvalid: false,
            isSubmit: true,
            isSuccess: false
        });
        personalService.putUpdateBankProfile(data).then(res =>{
            this.setState({
                isSubmit: false,
                isSuccess: true
            });
        }, err =>{
            this.setState({isSubmit: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.onSubmit(data)}],
                {cancelable: false},
            );
        });
    }

    render() { 
        return(
            <View>

                <InputDropdown 
                    label="Pilih Bank"
                    iconName={null}
                    placeholder="Pilih Bank"
                    value={this.state.id_bank}
                    items={this.state.arrBank}
                    onChange={(id_bank) => this.setState({id_bank})}/> 
                <InputComponent 
                    label="Nama Cabang"
                    iconName={null}
                    keyboardType="default"
                    placeholder="Masukan nama cabang"
                    value={this.state.branch_bank}
                    onChange={(branch_bank) => this.setState({branch_bank})}/>  
                <InputComponent 
                    label="No Rekening"
                    iconName={null}
                    keyboardType="numeric"
                    placeholder="Masukan nomor rekening"
                    value={this.state.account_number_bank}
                    onChange={(account_number_bank) => this.setState({account_number_bank})}/>  
                <InputComponent 
                    label="Nama pemilik rekening"
                    iconName={null}
                    keyboardType="default"
                    placeholder="Masukan nama pemilik rekening"
                    value={this.state.account_name_bank}
                    onChange={(account_name_bank) => this.setState({account_name_bank})}/> 

                {this.state.isInvalid ? <View style={{marginBottom:15}}><AlertBox type="warning" text="Masukan data dengan benar"/></View>: null}
                {this.state.isFailed ? <View style={{marginBottom:15}}><AlertBox type="success" text="Update data gagal"/></View>: null}
                {this.state.isSuccess ? <View style={{marginBottom:15}}><AlertBox type="success" text="Update data berhasil"/></View>: null}

                <ButtonComponent type="primary" text="Update data BANK" onClick={()=> this.validationSubmit()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/>
            </View>
        )
    }
}

export default InputBank;