import React, { Component } from 'react';
import { ScrollView,View,StatusBar,Text,Dimensions,AsyncStorage } from 'react-native';
import { ImagePicker, Camera } from 'expo';
import AutoHeightImage from 'react-native-auto-height-image';
import { ButtonComponent, BlockLogo, InputComponent, AlertBox, Modal, InputDropdown } from '@directives';
import { Main,Variable, Typography } from '@styles';
import * as _ from 'lodash';

import loginService from './login-service';
import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
Validator.setMessages('en', en);

var taiPasswordStrength = require("tai-password-strength");

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

async function checkAllowCamera() {
    const { statusCamera } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    const { statusCameraRoll } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (statusCamera === 'granted' && statusCameraRoll === 'granted') {
        return true;
    }
}

class Register2Component extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Register",
        headerTitleStyle: Variable.headerTitleStyle,
        headerLeft: null
    });

    constructor(props) {
        super(props);
        this.state = { 
            name: null,
            email: null,
            phone_number: null,
            identity_id: null,
            nik: null,
            company: null,
            nik: null,
            identityPhoto: null,
            companyIdentityPhoto: null,
            personalPhoto: null,
            Password: '',
            Repassword: '',
            openPopupCompany: false,
            isSubmit: false,
            isFailed: false,
            inValidRePassword: false,
            openInfo: true,
            message: "Daftar gagal, silakan coba lagi",
            arrCompany: [],
        };
    }

    componentDidMount(){
        this.fetchListCompany();
        Permissions.askAsync(Permissions.CAMERA);
        Permissions.askAsync(Permissions.CAMERA_ROLL);

        setTimeout(()=>{
            this.fetchInfoUser();
        }, 1000);
    }

    fetchListCompany(){
        this.setState({ arrCompany: []});
        loginService.getListCompany().then(res =>{
            _.map(res.data,(x)=>{
                let obj = {value: x.id_company, label: x.name_company};
                this.state.arrCompany.push(obj);
            });
            this.setState({
                arrCompany: this.state.arrCompany
            })
        }, err =>{
            this.fetchListCompany();
        })
    }

    fetchInfoUser(){
        this.setState({isloading: true});
        loginService.getInfoUser().then(res =>{
            this.setState(res.data);
            this.setState({isloading: false});
            
            toDataUrl(res.data.personal_identity_path, (e) => {
                let imgData = e.replace('data:'+ base64MimeType(e) +';base64,','');
                let obj = {
                    type: base64MimeType(e),
                    base64: imgData,
                    uri:res.data.personal_identity_path
                }
                this.setState({identityPhoto:obj});
            });

            toDataUrl(res.data.personal_photo, (e) => {
                let imgData = e.replace('data:'+ base64MimeType(e) +';base64,','');
                let obj = {
                    type: base64MimeType(e),
                    base64: imgData,
                    uri:res.data.personal_photo
                }
                this.setState({personalPhoto:obj});
            });
        }, err =>{
            this.fetchInfoUser();
            this.setState({isloading: false});
        })
    }

    pickupImage = async (param,type) => {
        if(checkAllowCamera()){
            let response = await ImagePicker.launchImageLibraryAsync({
                cameraType: type,
                allowsEditing: true,
                base64: true,
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                }
            });
            if (!response.cancelled) {
                switch(param){
                    case 'identityPhoto' : 
                        this.setState({identityPhoto: response});
                    break;
                    case 'companyIdentityPhoto' : 
                        this.setState({companyIdentityPhoto: response});
                    break;
                };
            }
        }else{
            Permissions.askAsync(Permissions.CAMERA);
            Permissions.askAsync(Permissions.CAMERA_ROLL);
        }
    }

    async snapPhoto() {       
        if (this.camera) {
            const options = { quality: 1, base64: true, fixOrientation: true, exif: true};
            let photo = await this.camera.takePictureAsync(options);
            let obj = {
                base64: photo.base64,
                uri: photo.uri
            }
            this.setState({
                personalPhoto: obj,
                openCameraProfile: false,
                type:"image"
            });
        }
    }

    // Validation
    // ======================== //
    validationSubmit(){
        if(!_.isNil(this.state.identityPhoto) && !_.isNil(this.state.personalPhoto) && !this.state.inValidRePassword ){
            this.setState({
                isFailed: false,
                isInvalid: false
            });

            let data = {
                name: this.state.name,
                role: 'ROLE001',
                company: this.state.company,
                identity_photo: `data:image/png;base64,${this.state.identityPhoto.base64}`,
                personal_photo: `data:image/png;base64,${this.state.personalPhoto.base64}`,
                company_identity_photo: `data:image/png;base64,${this.state.companyIdentityPhoto.base64}`,
                phone_number: this.state.phone_number,
                email: this.state.email,
                nik: this.state.nik,
                identity_id: this.state.identity_id,
                password: this.state.Password
            };

    
            let rules = {
                name: 'required',
                email: 'required|email',
                company: 'required',
                identity_photo: 'required',
                company_identity_photo: 'required',
                phone_number: 'required|numeric',
                personal_photo: 'required',
                nik: 'required|numeric',
                identity_id: 'required|numeric',
                password: 'required',
            };
    
            let validation = new Validator(data, rules);
            if(validation.passes()){
                this.onSubmit(data);
            }else{
                this.setState({isInvalid: true});
            }
        }else{
            this.setState({isInvalid: true});
        }
    }

    setPassword(e){
        var strengthTester = new taiPasswordStrength.PasswordStrength();
        var results = strengthTester.check(e);
        this.setState({
            Password:e,
            PasswordCheck: results.strengthCode
        });
    }
    setConfirmPassword(e){
        this.setState({Repassword:e});
        if(this.state.Password != e && e != ''){
            this.setState({inValidRePassword: true});
        }else{
            this.setState({inValidRePassword: false});
        }
    }

    // Submit
    // ======================== //
    onSubmit(data){
        console.log(data);
        this.setState({
            isFailed: false,
            isSubmit: true,
            isInvalid: false
        });
        loginService.postRegister(data).then(res =>{
            console.log(res);
            if(res.status){
                AsyncStorage.setItem('isNew', '0');
                this.props.navigation.navigate('User');
            }else{
                this.setState({
                    isFailed: true,
                    message: res.message,
                    isSubmit: false
                });
            }
            
        }, err =>{
            this.setState({
                isFailed: true,
                isSubmit: false
            });
        });
    }

    render() {
        const { hasCameraPermission } = this.state;
        let alertComponent;
        switch(this.state.PasswordCheck){
            case "VERY_WEAK" :
                alertComponent = (
                    <AlertBox 
                        type="warning" 
                        text="Password lemah"
                    />
                );
            break;
            case "WEAK" :
                alertComponent = (
                    <AlertBox 
                        type="success" 
                        text="Password cukup sulit"
                    />
                );
            break;
            case "REASONABLE" :
                alertComponent = (
                    <AlertBox 
                        type="success" 
                        text="Password sulit"
                    />
                );
            break;
            case "STRONG" :
            case "VERY_STRONG" :
                alertComponent = (
                    <AlertBox 
                        type="success" 
                        text="Password sangat sulit"
                    />
                );
            break;
        }
        return (
            <View style={{height:'100%',backgroundColor:'white'}}>
                <ScrollView>
                    <BlockLogo />
                    <View style={[Main.container,{marginTop: 15, paddingBottom: 30}]}>
                        <StatusBar barStyle="dark-content" />
                        
                        <View>
                            <InputComponent 
                                label="Nama Lengkap"
                                iconName={null}
                                keyboardType="default"
                                placeholder="Masukan nama lengkap"
                                value={this.state.name}
                                onChange={(name) => this.setState({name})}/>

                            <InputComponent 
                                label="Email"
                                iconName={null}
                                keyboardType="email-address"
                                placeholder="Masukan alamat email"
                                value={this.state.email}
                                onChange={(email) => this.setState({email})}/>

                            <InputComponent 
                                label="No Handphone"
                                iconName={null}
                                keyboardType="phone-pad"
                                placeholder="Masukan nomor handphone"
                                value={this.state.phone_number}
                                onChange={(phone_number) => this.setState({phone_number})}/>

                            <InputComponent 
                                label="No KTP"
                                iconName={null}
                                keyboardType="numeric"
                                placeholder="Masukan nomor KTP"
                                value={this.state.identity_id}
                                onChange={(identity_id) => this.setState({identity_id})}/>

                            <InputComponent 
                                label="Foto KTP"
                                iconName="upload"
                                placeholder="Unggah foto KTP"
                                value={this.state.identityPhoto != null ? this.state.identityPhoto.uri.replace(/^.*[\\\/]/, '') : null}
                                isButton={true}
                                topIcon={2}
                                onClickBtn={()=> this.pickupImage('identityPhoto','front')}/>
                            {this.state.identityPhoto != null ? <AutoHeightImage source={{uri: `data:${this.state.identityPhoto.type};base64,${this.state.identityPhoto.base64}`}} width={Dimensions.get('window').width - 30} style={{marginBottom:15}}/> : null}

                            <InputComponent 
                                label="No NIK"
                                iconName={null}
                                keyboardType="numeric"
                                placeholder="Masukan NIK (Nomor Induk Karyawan)"
                                value={this.state.nik}
                                onChange={(nik) => this.setState({nik})}/>
                    
                            <InputDropdown 
                                label="Nama Perusahaan"
                                iconName={null}
                                placeholder="Nama Perusahaan"
                                value={this.state.company}
                                items={this.state.arrCompany}
                                onChange={(company) => this.setState({company})}/>  

                            <InputComponent 
                                label="Foto Kartu ID"
                                iconName="upload"
                                placeholder="Unggah foto kartu ID"
                                value={this.state.companyIdentityPhoto != null ? this.state.companyIdentityPhoto.uri.replace(/^.*[\\\/]/, '') : null}
                                isButton={true}
                                topIcon={2}
                                onClickBtn={()=> this.pickupImage('companyIdentityPhoto','front')}/>
                            {this.state.companyIdentityPhoto != null ? <AutoHeightImage source={{uri: `data:${this.state.companyIdentityPhoto.type};base64,${this.state.companyIdentityPhoto.base64}`}} width={Dimensions.get('window').width - 30} style={{marginBottom:15}}/> : null}

                            <InputComponent 
                                label="Foto Profile"
                                iconName="upload"
                                placeholder="Unggah foto profile"
                                value={this.state.personalPhoto != null ? this.state.personalPhoto.uri.replace(/^.*[\\\/]/, '') : null}
                                isButton={true}
                                topIcon={2}
                                onClickBtn={()=> this.pickupImage('personalPhoto','front')}/>
                            {this.state.personalPhoto != null ? <AutoHeightImage source={{uri: `data:${this.state.personalPhoto.type};base64,${this.state.personalPhoto.base64}`}} width={Dimensions.get('window').width - 30} style={{marginBottom:15}}/> : null}             

                            <InputComponent 
                                label="Password"
                                iconName={null}
                                placeholder="Enter password"
                                secureTextEntry={true}
                                value={this.state.Password}
                                onChange={(e) => this.setPassword(e)}/>
                            {this.state.Password != '' ? <View style={{marginBottom:15}}>{alertComponent}</View> : null}

                            <InputComponent 
                                label="Confirm Password"
                                iconName={null}
                                placeholder="Enter confirm password"
                                secureTextEntry={true}
                                value={this.state.Repassword}
                                onChange={(e) => this.setConfirmPassword(e)}/>
                            {this.state.inValidRePassword ? <View style={{marginBottom:15}}><AlertBox type="danger" text="Password tidak sama"/></View>: null}                            
                            {this.state.isInvalid ? <View style={{marginBottom:15}}><AlertBox type="warning" text="Daftar gagal, Pastikan anda telah memasukan data dengan benar"/></View>: null}
                            {this.state.isFailed ? <View style={{marginBottom:15}}><AlertBox type="danger" text={this.state.message}/></View> : null}
                        </View>
                        <ButtonComponent type="primary" text="Daftar" onClick={()=> this.validationSubmit()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/>
                    </View>
                </ScrollView>

                {/* ====== Take Camera ====== */}
                <Modal 
                    isOpen={this.state.openCameraProfile}
                    title="Ambil Photo Profile"
                    textRight="Take Picture"
                    rightClick={this.snapPhoto.bind(this)}
                    height={320}
                    width={320}
                    textLeft={null}>
                    {hasCameraPermission === false ? <Text style={[Typography.singleText,{textAlign:'center',padding:15}]}>No access to camera</Text> 
                    : 
                    <Camera     
                        style={{width:320,height:320}} 
                        type={Camera.Constants.Type.front} 
                        ref={ (ref) => {this.camera = ref} }>
                    </Camera>
                    }
                </Modal>
                {/* ====== Take Camera ====== */}

                {/* ====== Start Modal Info ====== */}
                <Modal 
                    isOpen={this.state.openInfo}
                    title="Info"
                    textRight="Ok"
                    height={50}
                    rightClick={() => this.setState({openInfo: false})}
                    textLeft={null}>
                    <View style={{padding:15}}>
                        <Text style={Typography.singleText}>Silakan melengkapi data berikut</Text>
                    </View>
                </Modal>
                {/* ====== End Modal Indo ====== */}
            </View>
        )
    }
}


export default Register2Component;