import React from 'react';
import { View,Alert, Modal, TouchableHighlight, ScrollView, TouchableOpacity, Text } from 'react-native';
import * as _ from 'lodash';
import { AntDesign } from '@expo/vector-icons';

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
            modalBank: false,
            query: '',
            banks: []
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
            id_bank: this.state.id_bank.value,
            account_name_bank: this.state.account_name_bank,
            account_number_bank: this.state.account_number_bank,
            account_branch_bank: this.state.account_branch_bank
        };

        let rules = {
            id_bank: 'required',
            account_name_bank: 'required',
            account_number_bank: 'required|numeric',
            account_branch_bank: 'required',
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

    findBank(query) {
        if (query === '') {
            return [];
        }

        const { arrBank } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        data = arrBank.filter(bank => bank.label.search(regex) >= 0);
        // console.log(data);
        return data;
    }

    render() { 
        const { query } = this.state;
        const banks = this.findBank(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return(
            <View>

                {/* <InputDropdown 
                    label="Pilih Bank"
                    iconName={null}
                    placeholder="Pilih Bank"
                    value={this.state.id_bank}
                    items={this.state.arrBank}
                    onChange={(id_bank) => this.setState({id_bank})}/>  */}
                <InputComponent 
                    label="Pilih Bank"
                    iconName={null}
                    keyboardType="default"
                    placeholder="Pilih Bank"
                    value={this.state.id_bank ? this.state.id_bank.label : null}
                    isButton={true}
                    onClickBtn={() => this.setState({modalBank: !this.state.modalBank})}
                    onChange={() => null}/>
                <InputComponent 
                    label="Nama Cabang"
                    iconName={null}
                    keyboardType="default"
                    placeholder="Masukan nama cabang"
                    value={this.state.account_branch_bank}
                    onChange={(account_branch_bank) => this.setState({account_branch_bank})}/>  
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

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalBank}
                    onRequestClose={() => {
                        this.setState({modalBank: !this.state.modalBank});
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <View style={{justifyContent: 'center', alignItems: 'flex-end', padding: 16}}>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setState({modalBank: !this.state.modalBank});
                                    }}>
                                    {/* <Text>Keluar</Text> */}
                                    <AntDesign name="close" size={18} />
                                </TouchableHighlight>
                            </View>
                            <View style={{paddingHorizontal: 16}}>
                                <InputComponent 
                                    label="Nama Bank"
                                    iconName={null}
                                    keyboardType="default"
                                    placeholder="Masukan Nama Bank"
                                    value={this.props.value}
                                    onChange={text => this.setState({ query: text })}/>
                            </View>
                            <ScrollView style={{ marginBottom: 220 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
                                { banks.length === 1 && comp(query, banks[0].name_company) ? [] : _.map(banks, ({value, label}, k) => (
                                    <TouchableOpacity key={k} style={{ width: '100%', height: 50, borderBottomWidth: .3, borderBottomColor: '#ccc', justifyContent: 'center', paddingHorizontal: 16 }} onPress={() => this.setState({ id_bank: {value, label}, modalBank: !this.state.modalBank })}>
                                        <Text>{label}</Text>
                                    </TouchableOpacity>
                                )) }
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

export default InputBank;