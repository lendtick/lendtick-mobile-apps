import React from 'react';
import { View,Dimensions,Alert } from 'react-native';
// import { ImagePicker, Camera } from 'expo';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import AutoHeightImage from 'react-native-auto-height-image';
import * as _ from 'lodash';
import { InputMask } from '@directives';

import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
Validator.setMessages('en', en);

import { InputComponent,ButtonComponent,InputDropdown,AlertBox } from '@directives';
import personalService from '../personal.service';

toDataUrl = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
};

base64MimeType = (encoded) => {
    var result = null;
    if (typeof encoded !== 'string') {
        return result;
    }
  
    var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {
        result = mime[1];
    }
    return result;
}

class InputSallary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false,
            isInvalid: false,
            isSuccess: false,
            isFailed: false,

            salaryPhoto: null,
            openPopupGrade: false,
            selectedGrade: null,
            arrGrade: [],

            id_user_company: null,
            id_user_company_salary: null,
            message: null,

            slipGaji: {}
        };
    }

    componentDidMount(){
        this.fetchProfileSalary();
        this.fetchProfileDocument();
    }

    // Fetch Profile Salary
    // ======================= //
    fetchProfileSalary(){
        personalService.getProfileSalary().then(res =>{
            this.setState(res['data']);
            this.fetchMaster();

            toDataUrl(res['data'].salary_photo, (e) => {
                let imgData = e.replace('data:'+ base64MimeType(e) +';base64,','');
                let obj = {
                    type: base64MimeType(e),
                    base64: imgData,
                    uri:res['data'].salary_photo
                }
                this.setState({salaryPhoto:obj});
            });
            console.log(res)
        });
    }

    fetchProfileDocument(){
        personalService.getProfileDocument().then(res =>{
            console.log('profile document ==<>', res['data']);
            let f = _.filter(res['data'], v => v.id_document_type === "DOC006");
            if(f.length > 0) {
                this.setState({
                    slipGaji: f[0]
                })
            }
        });
    }

    // Fetch Data
    // ==================== //
    fetchMaster(){  
        let arrGrade  = [];
        personalService.getMasterGrade().then(res =>{
            _.map(res['data'],(x)=>{
                let obj = {value: x.id_grade , label: x.name_grade };
                arrGrade .push(obj);
            });
            this.setState({
                arrGrade : arrGrade ,
                selectedGrade : _.find(arrGrade , {value: this.state.id_Grade })
            });
        });
    }

    pickupImage = async () => {
        const statusCamera = await Permissions.getAsync(Permissions.CAMERA);
        const statusCameraRoll = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (statusCamera.status === 'granted' && statusCameraRoll.status === 'granted') {
            let response = await ImagePicker.launchImageLibraryAsync({
                base64: true,
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                }
            });
            if (!response.cancelled) {
                this.setState({salaryPhoto: response});
            }
        }else{
            Permissions.askAsync(Permissions.CAMERA);
            Permissions.askAsync(Permissions.CAMERA_ROLL);
        }
        
    }

    // Validation
    // ======================== //
    validationSubmit(){
        let data = {
            salary_amount: this.state.salary_amount.replace(/\D/g, ""),
            id_grade: this.state.id_grade,
            id_user_company: this.state.id_user_company,
            id_user_company_salary: this.state.id_user_company_salary,
            salary_photo: this.state.salaryPhoto !== null ? `data:image/png;base64,${this.state.salaryPhoto.base64}` : null
        };

        let rules = {
            id_grade: 'required',
            salary_amount: 'required|numeric',
            // salary_photo: 'required',
        };
        // console.log(data)
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
        console.log('data ==>', data)
        personalService.postReqSalary(data).then(res =>{
            this.setState({
                isSubmit: false,
                isSuccess: res.status === 1,
                isFailed: res.status === 0,
                message: res.message,
            });
            // console.log(res)
        }, err =>{
            this.setState({isSubmit: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.onSubmit()}],
                {cancelable: false},
            );
        });
    }

    render() { 
        const {slipGaji} = this.state;
        return(
            <View>

                {/* <InputComponent 
                    label="Nilai Gaji"
                    iconName={null}
                    keyboardType="numeric"
                    placeholder="Masukan nilai gaji"
                    value={this.state.salary_amount}

                    onChange={(salary_amount) => this.setState({salary_amount})}/>  */}
                <InputMask 
                    label="Nilai Gaji"
                    iconName={null}
                    keyboardType="numeric"
                    placeholder="Masukan nilai gaji"
                    value={this.state.salary_amount}
                    onChange={(salary_amount) => this.setState({salary_amount})}/>
            
                <InputDropdown 
                    label="Pilih Golongan"
                    iconName={null}
                    placeholder="Pilih golongan"
                    value={this.state.id_grade}
                    items={this.state.arrGrade}
                    onChange={(id_grade) => this.setState({id_grade})}/> 

                <InputComponent 
                    label="Foto Slip Gaji"
                    iconName="upload"
                    placeholder="Unggah slip gaji"
                    value={this.state.salaryPhoto != null ? this.state.salaryPhoto.uri.replace(/^.*[\\\/]/, '') : (slipGaji.path !== undefined ? slipGaji.path : null)}
                    isButton={true}
                    topIcon={2}
                    onClickBtn={()=> this.pickupImage()}/>
                {this.state.salaryPhoto != null ? <AutoHeightImage source={{uri: `data:${this.state.salaryPhoto.type};base64,${this.state.salaryPhoto.base64}`}} width={Dimensions.get('window').width - 30} style={{marginBottom:15}}/> : (slipGaji.path !== undefined ? <AutoHeightImage source={{uri: slipGaji.path}} width={Dimensions.get('window').width - 30} style={{marginBottom:15}}/> : null)}
                {this.state.isInvalid ? <View style={{marginBottom:15}}><AlertBox type="warning" text="Masukan data dengan benar"/></View>: null}
                {this.state.isFailed ? <View style={{marginBottom:15}}><AlertBox type="danger" text={this.state.message}/></View>: null}
                {this.state.isSuccess ? <View style={{marginBottom:15}}><AlertBox type="success" text={this.state.message}/></View>: null}
                
                <ButtonComponent type="primary" text="Update data gaji" onClick={()=> this.validationSubmit()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/>
            </View>
        )
    }
}

export default InputSallary;