import React from 'react';
import { View,Alert } from 'react-native';
import * as _ from 'lodash';
import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
Validator.setMessages('en', en);

import { InputComponent,ButtonComponent,AlertBox,InputDropdown } from '@directives';
import personalService from '../personal.service';

class InputEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_employee: null,
            arrCompany: [],
            id_company: null,
            employee_starting_date: null,
            division: null,
            position: null,
            message: null
        };
    }

    componentDidMount(){
        this.fetchMasterCompany();
        this.fetchProfileCompany();
    }

    fetchProfileCompany(){
        personalService.getProfileCompany().then(res =>{
            let moment = require("moment");
            res['data'].employee_starting_date = moment(res['data'].employee_starting_date).format('DD MMM YYYY');
            this.setState(res['data']);
        });
    }

    fetchMasterCompany(){
        let arrCompany = [];
        personalService.getCompany().then(res =>{
            _.map(res['data'],(x)=>{
                let obj = {value:x.id_company, label:x.name_company};
                arrCompany.push(obj);
            });
            this.setState({arrCompany: arrCompany});
        });
    }

    // Validation
    // ======================== //
    validationSubmit(){
        let data = {
            division: this.state.division,
            position: this.state.position
        };

        let rules = {
            division: 'required',
            position: 'required',
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
        personalService.updateDataEmployee(data).then(res =>{
            if(res.status == 1){
                this.setState({
                    message: res.message,
                    isSuccess: true,
                    isSubmit: false
                });
                this.fetchProfileCompany();
            }else{
                this.setState({
                    message: res.message,
                    isFailed: true,
                    isSubmit: false
                });
            }
        }, err =>{
            this.setState({isSubmit:false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.onUpdateMainAddress(obj)}],
                {cancelable: false},
            );
        });
    }

    render() { 
        return(
            <View>
                <InputComponent 
                    label="NIK"
                    iconName={null}
                    keyboardType="numeric"
                    placeholder="Masukan nomor NRP"
                    value={this.state.id_employee}
                    disabled={true}
                    onChange={(id_employee) => this.setState({id_employee})}/>

                <InputDropdown 
                    label="Nama Perusahaan"
                    iconName={null}
                    placeholder="Pilih perusahaan"
                    value={this.state.id_company}
                    items={this.state.arrCompany}
                    disabled={true}
                    onChange={(id_company) => this.setState({id_company})}/> 

                <InputComponent 
                    label="Tanggal Karyawan Tetap"
                    iconName={null}
                    keyboardType="default"
                    placeholder="Masukan tanggal karyawan tetap"
                    isDate={true}
                    value={this.state.employee_starting_date}
                    disabled={true}
                    onChange={(employee_starting_date) => this.setState({employee_starting_date})}/>

                <InputComponent 
                    label="Divisi"
                    iconName={null}
                    keyboardType="default"
                    placeholder="Masukan nama divisi"
                    value={this.state.division}
                    onChange={(division) => this.setState({division})}/>  

                <InputComponent 
                    label="Jabatan"
                    iconName={null}
                    keyboardType="default"
                    placeholder="Masukan nama jabatan"
                    value={this.state.position}
                    onChange={(position) => this.setState({position})}/>    

                {this.state.isInvalid ? <View style={{marginBottom:15}}><AlertBox type="warning" text={this.state.message}/></View>: null}
                {this.state.isFailed ? <View style={{marginBottom:15}}><AlertBox type="danger" text={this.state.message}/></View>: null}
                {this.state.isSuccess ? <View style={{marginBottom:15}}><AlertBox type="success" text={this.state.message}/></View>: null}


                <ButtonComponent type="primary" text="Update data pegawai" onClick={()=> this.validationSubmit()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/>
            </View>
        )
    }
}

export default InputEmployee;