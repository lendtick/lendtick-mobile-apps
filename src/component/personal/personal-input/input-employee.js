import React from 'react';
import { View } from 'react-native';
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
            join_date: null,
            division: null,
            position: null
        };
    }

    componentDidMount(){
        this.fetchMasterCompany();
        this.fetchProfileCompany();
    }

    fetchProfileCompany(){
        personalService.getProfileCompany().then(res =>{
            this.setState(res.data);
        });
    }

    fetchMasterCompany(){
        let arrCompany = [];
        personalService.getCompany().then(res =>{
            _.map(res.data,(x)=>{
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
            id_employee: this.state.id_employee,
            id_company: this.state.id_company,
            join_date: this.state.join_date,
            division: this.state.division,
            position: this.state.position
        };

        let rules = {
            id_employee: 'required',
            id_company: 'required',
            join_date: 'required',
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
        console.log(data);
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
                    onChange={(id_employee) => this.setState({id_employee})}/>

                <InputDropdown 
                    label="Nama Perusahaan"
                    iconName={null}
                    placeholder="Pilih perusahaan"
                    value={this.state.id_company}
                    items={this.state.arrCompany}
                    onChange={(id_company) => this.setState({id_company})}/> 

                <InputComponent 
                    label="Tanggal Masuk"
                    iconName={null}
                    keyboardType="default"
                    placeholder="Masukan tanggal masuk"
                    isDate={true}
                    value={this.state.join_date}
                    onChange={(join_date) => this.setState({join_date})}/>

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

                {this.state.isInvalid ? <View style={{marginBottom:15}}><AlertBox type="warning" text="Masukan data dengan benar"/></View>: null}
                {this.state.isFailed ? <View style={{marginBottom:15}}><AlertBox type="danger" text="Update data pegawai gagal"/></View>: null}
                {this.state.isSuccess ? <View style={{marginBottom:15}}><AlertBox type="success" text="Update data pegawai berhasil"/></View>: null}


                <ButtonComponent type="primary" text="Update data pegawai" onClick={()=> this.validationSubmit()} disabled={false} isSubmit={false}/>
            </View>
        )
    }
}

export default InputEmployee;