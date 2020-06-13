import React from 'react';
import { View,Alert } from 'react-native';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
Validator.setMessages('en', en);
import moment from 'moment';
import 'moment/locale/id'

import { InputComponent,ButtonComponent,AlertBox,InputDropdown } from '@directives';
import personalService from '../personal.service';

class InputPersonal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            birth_date: null,
            isSubmit: false,
            isInvalid: false,
            isSuccess: false,
            isFailed: false,

            openPopupGender: false,
            selectedGender: null,
            arrGender: [],

            openPopupDomicile: false,
            selectedDomicile: null,
            arrDomicile: [],

            openPopupReligion: false,
            selectedReligion: null,
            arrReligion: [],

            openPopupMarriage: false,
            selectedMarriage: null,
            arrMarriage: [],
        };
    }

    componentDidMount(){
        this.setState(this.props.personal.data);
        this.fetchMaster();
    }

    componentWillUnmount() {
        this.fetchUser();
    }

    fetchUser(){
        personalService.getInfoUser().then(res =>{
            let dataUser = res['data'];
            this.props.setGetData(dataUser);
        }, err =>{
            this.setState({loading: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchUser()}],
                {cancelable: false},
            );
        });
    }
    
    // Validation
    // ======================== //
    validationSubmit(){
        let data = {
            id: this.state.id_user,
            name: this.state.name,
            birth_date: moment(this.state.birth_date).format('YYYY-MM-DD'),
            birth_place: this.state.birth_place,
            email: this.state.email,
            id_religion: this.state.id_religion,
            id_gender: this.state.id_gender,
            identity_id: this.state.identity_id,
            phone_number: this.state.phone_number,
            id_marriage_status: this.state.id_marriage_status,
            id_domicile_address_status: this.state.id_domicile_address_status,
            NPWP_No: this.state.NPWP_No,
            mother_name: this.state.mother_name,
        };

        let rules = {
            id: 'required',
            name: 'required',
            birth_date: 'required',
            birth_place: 'required',
            email: 'required',
            id_religion: 'required',
            id_gender: 'required',
            identity_id: 'required',
            phone_number: 'required|numeric',
            id_marriage_status: 'required',
            id_domicile_address_status: 'required',
            NPWP_No: 'required|numeric',
            mother_name: 'required',
        };

        let validation = new Validator(data, rules);
        if(validation.passes()){
            this.onSubmit(data);
        }else{
            this.setState({isInvalid: true});
        }
    }

    // Fetch Master
    // ========================= //
    fetchMaster(){
        // Init List Gender
        // ===================== //
        let arrGender = [];
        personalService.getMasterGender().then(res =>{
            _.map(res['data'],(x)=>{
                let obj = {value: x.id_gender, label: x.name_gender};
                arrGender.push(obj);
            });
            this.setState({
                arrGender: arrGender,
                selectedGender: _.find(arrGender, {value: this.state.id_gender})
            });
        });

        // Init List Domicile
        // ===================== //
        let arrDomicile = [];
        personalService.getMasterDomicile().then(res =>{
            _.map(res['data'],(x)=>{
                let obj = {value: x.id_domicile_address_status, label: x.name_domicile_address_status};
                arrDomicile.push(obj);
            });
            this.setState({
                arrDomicile: arrDomicile,
                selectedDomicile: _.find(arrDomicile, {value: this.state.id_domicile_address_status})
            });
        });
        
        // Init List Marriage
        // ===================== //
        let arrMarriage = [];
        personalService.getMasterMarriage().then(res =>{
            _.map(res['data'],(x)=>{
                let obj = {value: x.id_marriage_status, label: x.marriage_status_name};
                arrMarriage.push(obj);
            });
            this.setState({
                arrMarriage: arrMarriage,
                selectedMarriage: _.find(arrMarriage, {value: this.state.id_marriage_status})
            });
        });

        // Init List Religion
        // ===================== //
        let arrReligion = [];
        personalService.getMasterReligion().then(res =>{
            _.map(res['data'],(x)=>{
                let obj = {value: x.id_religion, label: x.name_religion};
                arrReligion.push(obj);
            });
            this.setState({
                arrReligion: arrReligion,
                selectedReligion: _.find(arrReligion, {value: this.state.id_religion})
            });
        });
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
        console.log('data ==>', data);
        personalService.putUpdateProfile(data).then(res =>{
            this.setState({
                isSubmit: false,
                isSuccess: true
            });
        }, err =>{
            this.setState({isSubmit: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.onSubmit()}],
                {cancelable: false},
            );
        })
    }

    render() { 
        return(
            <View>
                <InputComponent 
                    label="No Anggota"
                    iconName={null}
                    keyboardType="numeric"
                    placeholder="Masukan nomor anggota"
                    value={this.state.id_koperasi}
                    disabled={true}
                    onChange={(id_koperasi) => this.setState({id_koperasi})}/>
                
                <InputComponent 
                    label="Nama Lengkap"
                    iconName={null}
                    keyboardType="default"
                    placeholder="Masukan nama lengkap"
                    value={this.state.name}
                    onChange={(name) => this.setState({name})}/>
                <InputComponent 
                    label="Tanggal Lahir"
                    iconName={null}
                    keyboardType="default"
                    placeholder="Masukan tanggal lahir"
                    isDate={true}
                    dateName="birth_date"
                    value={this.state.birth_date}
                    onChange={(birth_date) => this.setState({birth_date})}/>

                <InputComponent 
                    label="Tempat Lahir"
                    iconName={null}
                    keyboardType="default"
                    placeholder="Masukan tempat lahir"
                    value={this.state.birth_place}
                    onChange={(birth_place) => this.setState({birth_place})}/>

                <InputDropdown 
                    label="Agama"
                    iconName={null}
                    placeholder="Agama"
                    value={this.state.id_religion}
                    items={this.state.arrReligion}
                    onChange={(id_religion) => this.setState({id_religion})}/> 

                <InputDropdown 
                    label="Jenis kelamin"
                    iconName={null}
                    placeholder="Jenis kelamin"
                    value={this.state.id_gender}
                    items={this.state.arrGender}
                    onChange={(id_gender) => this.setState({id_gender})}/>

                <InputComponent 
                    label="No KTP"
                    iconName={null}
                    keyboardType="numeric"
                    placeholder="Masukan nomor KTP"
                    value={this.state.identity_id}
                    onChange={(identity_id) => this.setState({identity_id})}/> 

                <InputComponent 
                    label="No Handphone"
                    iconName={null}
                    keyboardType="numeric"
                    placeholder="Masukan nomor handphone"
                    value={this.state.phone_number}
                    onChange={(phone_number) => this.setState({phone_number})}/>  

                <InputDropdown 
                    label="Status Perkawinan"
                    iconName={null}
                    placeholder="Status Perkawinan"
                    value={this.state.id_marriage_status}
                    items={this.state.arrMarriage}
                    onChange={(id_marriage_status) => this.setState({id_marriage_status})}/>

                <InputDropdown 
                    label="Status Tempat Tinggal"
                    iconName={null}
                    placeholder="Status Tempat Tinggal"
                    value={this.state.id_domicile_address_status}
                    items={this.state.arrDomicile}
                    onChange={(id_domicile_address_status) => this.setState({id_domicile_address_status})}/>

                <InputComponent 
                    label="No NPWP"
                    iconName={null}
                    keyboardType="numeric"
                    placeholder="Masukan nomor NPWP"
                    value={this.state.NPWP_No}
                    onChange={(NPWP_No) => this.setState({NPWP_No})}/>

                <InputComponent 
                    label="Email"
                    iconName={null}
                    keyboardType="email-address"
                    placeholder="Masukan alamat email"
                    value={this.state.email}
                    onChange={(email) => this.setState({email})}/>

                <InputComponent 
                    label="Nama Ibu Kandung"
                    iconName={null}
                    keyboardType="default"
                    placeholder="Nama Ibu Kandung"
                    value={this.state.mother_name}
                    onChange={(mother_name) => this.setState({mother_name})}/>

                {this.state.isInvalid ? <View style={{marginBottom:15}}><AlertBox type="warning" text="Masukan data dengan benar"/></View>: null}
                {this.state.isFailed ? <View style={{marginBottom:15}}><AlertBox type="success" text="Update date berhasil"/></View>: null}
                {this.state.isSuccess ? <View style={{marginBottom:15}}><AlertBox type="success" text="Update date berhasil"/></View>: null}
                
                <ButtonComponent type="primary" text="Update data personal" onClick={()=> this.validationSubmit()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
	return {
        personal: state.personal,
        input: state.input
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setGetData: (e) => {
			dispatch({
				type: 'UPDATE_DATA_PERSONAL',
				data: e
			})
        },
        setGetData: (e) => {
			dispatch({
				type: 'UPDATE_DATA_PERSONAL_HOME',
				data: e
			})
        },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InputPersonal)
