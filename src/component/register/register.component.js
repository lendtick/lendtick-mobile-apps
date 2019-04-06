import React, { Component } from 'react';
import { ScrollView,View,StatusBar,TouchableHighlight,Text,Dimensions,Platform } from 'react-native';
import { LinearGradient, ImagePicker, Camera, Permissions } from 'expo';
import AutoHeightImage from 'react-native-auto-height-image';
import { ButtonComponent, BlockLogo, InputComponent, AlertBox, Modal,InputDropdown } from '@directives';
import { Main,Variable,Input, Typography } from '@styles';
import * as _ from 'lodash';
import { connect } from 'react-redux';

import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
Validator.setMessages('en', en);

async function checkAllowCamera() {
    const { statusCamera } = await Permissions.getAsync(Permissions.CAMERA);
    const { statusCameraRoll } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (statusCamera === 'granted' && statusCameraRoll === 'granted') {
        return true;
    }
}

class RegisterComponent extends Component {
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

            openCameraProfile: false,
            personalPhoto: null,

            openPopupCompany: false,
            isFailed: false,
            arrCompany: [],

        };
    }

    componentDidMount(){
        this.fetchListCompany();
    }
    
    fetchListCompany(){
        this.setState({ arrCompany: []});
        registerService.getListCompany().then(res =>{
            _.map(res['data'],(x)=>{
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

    pickupImage = async (param) => {
        if(checkAllowCamera()){
            let response = await ImagePicker.launchImageLibraryAsync({
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

    snapPhoto = async ()=>{       
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
        if(!_.isNil(this.state.identityPhoto) && !_.isNil(this.state.personalPhoto) ){
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
                identity_id: this.state.identity_id
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
                identity_id: 'required|numeric'
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

    // Submit
    // ======================== //
    onSubmit(data){
        this.setState({
            isFailed: false,
            isInvalid: false
        });
        this.props.setRegister(data);
        this.props.navigation.navigate('Term');
    }

    render() {
        const { hasCameraPermission } = this.state;
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
                                onClickBtn={()=> this.pickupImage('identityPhoto')}/>
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
                                onClickBtn={()=> this.pickupImage('companyIdentityPhoto')}/>
                            {this.state.companyIdentityPhoto != null ? <AutoHeightImage source={{uri: `data:${this.state.companyIdentityPhoto.type};base64,${this.state.companyIdentityPhoto.base64}`}} width={Dimensions.get('window').width - 30} style={{marginBottom:15}}/> : null}

                            <InputComponent 
                                label="Foto Profile"
                                iconName="upload"
                                placeholder="Unggah foto profile"
                                value={this.state.personalPhoto != null ? this.state.personalPhoto.uri.replace(/^.*[\\\/]/, '') : null}
                                isButton={true}
                                topIcon={2}
                                onClickBtn={()=> this.setState({openCameraProfile: true})}/>
                            {this.state.personalPhoto != null ? <AutoHeightImage source={{uri: `data:${this.state.personalPhoto.type};base64,${this.state.personalPhoto.base64}`}} width={Dimensions.get('window').width - 30} style={{marginBottom:15}}/> : null}
                            {this.state.isInvalid ? <AlertBox type="warning" text="Daftar gagal, Pastikan anda telah memasukan data dengan benar"/>: null}
                        </View>

                        <View style={{marginTop: 20, marginBottom: 30}}>
                            <TouchableHighlight onPress={()=> this.props.navigation.navigate('Login')} underlayColor="transparent">
                                <Text style={[Input.singleLink,{textAlign:'center'}]}>Sudah punya akun ?</Text>
                            </TouchableHighlight>
                        </View>
                        
                        <ButtonComponent type="primary" text="Daftar" onClick={()=> this.validationSubmit()}/>
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
            </View>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		register: state.register
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setRegister: (e) => {
			dispatch({
				type: 'FILL_REGISTER',
				data: e
			})
        },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegisterComponent)