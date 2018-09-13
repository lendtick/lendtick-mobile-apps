import React from 'react';
import { 
    View, 
    Text, 
    ScrollView,
    TouchableHighlight, 
    Image,
    ImageBackground,
} from 'react-native';
import Dimensions from 'Dimensions';
import * as _ from 'lodash';
var ImagePicker = require('react-native-image-picker');

import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
Validator.setMessages('en', en);

import { CartDirective,ButtonComponent,Modal,AlertBox } from '../../directive/index';
import { InputComponent } from '../../directive/index';
import { styles } from './login.style';
import loginService from './login-service';

// Reducer
// ======================= //
export const loginReducer = (state = {
    isLogin: false
}, action) => {
	switch(action.type){
		case "SET_LOGIN" :
			state = {
				...state,
				isLogin: action.isLogin
			}
		break;
	}
	return state;
}

class SignupComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Sign Up",
        headerStyle: {
            backgroundColor: '#fff',
            overflow: 'hidden',
        },
        headerTintColor: '#3a3a3a',
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: 14,
            color: '#3a3a3a',
            letterSpacing: .5,
            width: Dimensions.get('window').width - 150,
            textAlign: 'center'
        },
        headerRight: (
            <TouchableHighlight onPress={() => navigation.navigate('Shop')} underlayColor="transparent">
                <CartDirective />
            </TouchableHighlight>
        ),
    });

    constructor(props) {
        super(props);
        this.state = { 
            name: null,
            company: null,
            phone_number: null,
            email: null,
            imageSource: null,
            identityPhoto: null,
            companyIdentityPhoto: null,
            personalPhoto: null,

            isSubmit: false,
            openPopupCompany: false,
            arrCompany: [],
            selectedCompany: null,

            isSuccess: false,
            isFailed: false,
        };
    }

    componentDidMount(){
        this.fetchListCompany();
    }

    pickupImage(param,type){
        ImagePicker.showImagePicker({
            cameraType: type,
            storageOptions: {
                cameraRoll: true,
                skipBackup: true,
                waitUntilSaved:true,
                path: 'images'
            }
        },(response) => {
            console.log('Response = ', response);
            if(response.fileName != undefined){
                switch(param){
                    case 'identityPhoto' : 
                        this.setState({identityPhoto: response});
                    break;
                    case 'companyIdentityPhoto' : 
                        this.setState({companyIdentityPhoto: response});
                    break;
                    case 'personalPhoto' : 
                        this.setState({personalPhoto: response});
                    break;
                };
            }
        });
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

    // Validation
    // ======================== //
    validationSubmit(){
        this.setState({
            isSuccess: false,
            isFailed: false,
            isInvalid: false
        });
        let data = {
            name: this.state.name,
            company: this.state.selectedCompany.value,
            identity_photo: `data:${this.state.identityPhoto.type};base64,${this.state.identityPhoto.data}`,
            company_identity_photo: `data:${this.state.companyIdentityPhoto.type};base64,${this.state.companyIdentityPhoto.data}`,
            phone_number: this.state.phone_number,
            email: this.state.email,
            personal_photo: `data:${this.state.personalPhoto.type};base64,${this.state.personalPhoto.data}`,
        };

        let rules = {
            name: 'required',
            email: 'required|email',
            company: 'required',
            identity_photo: 'required',
            company_identity_photo: 'required',
            phone_number: 'required|numeric',
            personal_photo: 'required',
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
            isSuccess: false,
            isFailed: false,
            isSubmit: true,
            isInvalid: false
        });
        loginService.postRegister(data).then(res =>{
            this.setState({
                isSuccess: true,
                isSubmit: false,
                name: null,
                company: null,
                phone_number: null,
                email: null,
                imageSource: null,
                identityPhoto: null,
                companyIdentityPhoto: null,
                personalPhoto: null,
                selectedCompany: null,
            });
        }, err =>{
            this.setState({
                isFailed: true,
                isSubmit: false
            });
        })
    }

    render() {
        return (
            <ImageBackground source={require('../../../assets/bg/bg1.png')} style={{width: '100%', height: '100%'}}>
            <ScrollView>
                <View style={styles.wrapper}>

                     <View style={{height:160}}>
                        <View style={styles.wrapHeader}>
                            <Image 
                                style={{width:'200%',height:'200%'}}
                                source={require('../../../assets/bg/bg2.png')} />
                        </View>
                        <Image 
                            style={styles.logo}
                            source={require('../../../assets/icon-square.png')} />
                    </View>

                    {/* ====== START FORM LOGIN ====== */}
                    <View style={styles.main}>
                        <InputComponent 
                            label="Nama lengkap"
                            iconName={null}
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
                            placeholder="Masukan no handphone"
                            value={this.state.phone_number}
                            onChange={(phone_number) => this.setState({phone_number})}/>

                        <InputComponent 
                            label="Perusahaan"
                            iconName="chevron-down"
                            placeholder="Pilih nama perusahaan anda"
                            value={this.state.selectedCompany != null ? this.state.selectedCompany.label: null}
                            isButton={true}
                            topIcon={2}
                            onClickBtn={()=> this.setState({openPopupCompany: true})}/>

                        <InputComponent 
                            label="Photo identitas"
                            iconName="upload"
                            placeholder="Unggah photo identitas"
                            value={this.state.identityPhoto != null ? this.state.identityPhoto.fileName : null}
                            isButton={true}
                            topIcon={2}
                            onClickBtn={()=> this.pickupImage('identityPhoto','front')}/>
                        {this.state.identityPhoto != null ? <Image source={{uri: `data:${this.state.identityPhoto.type};base64,${this.state.identityPhoto.data}`}} style={{width:100,height:100,marginBottom:20}}/> : null}

                        <InputComponent 
                            label="Photo Identitas Perushaan"
                            iconName="upload"
                            placeholder="Unggah photo identitas perushaan"
                            value={this.state.companyIdentityPhoto != null ? this.state.companyIdentityPhoto.fileName : null}
                            isButton={true}
                            topIcon={2}
                            onClickBtn={()=> this.pickupImage('companyIdentityPhoto','back')}/>
                        {this.state.companyIdentityPhoto != null ? <Image source={{uri: `data:${this.state.companyIdentityPhoto.type};base64,${this.state.companyIdentityPhoto.data}`}} style={{width:100,height:100,marginBottom:20}}/> : null}

                        <InputComponent 
                            label="Photo Personal"
                            iconName="upload"
                            placeholder="Unggah photo personal"
                            value={this.state.personalPhoto != null ? this.state.personalPhoto.fileName : null}
                            isButton={true}
                            topIcon={2}
                            onClickBtn={()=> this.pickupImage('personalPhoto','back')}/>
                        {this.state.personalPhoto != null ? <Image source={{uri: `data:${this.state.personalPhoto.type};base64,${this.state.personalPhoto.data}`}} style={{width:100,height:100,marginBottom:20}}/> : null}

                        {this.state.isFailed ? <AlertBox type="danger" text="Daftar gagal, silakan coba lagi"/>: null}
                        {this.state.isInvalid ? <AlertBox type="warning" text="Daftar gagal, Pastikan anda telah memasukan data dengan benar"/>: null}
                        {this.state.isSuccess ? <AlertBox type="success" text="Daftar berhasil"/>: null}
                        
                    </View>
                    {/* ====== END FORM LOGIN ====== */}

                    <View style={{paddingLeft:60, paddingRight: 60,paddingBottom:15, paddingTop:15, position:'relative',zIndex:2}}>
                        <ButtonComponent type="primary" text="DAFTAR" onClick={()=> this.validationSubmit()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/>
                    </View>
                </View>
            </ScrollView>

            {/* ====== START LIST COMPANY ====== */}
            <Modal 
                isOpen={this.state.openPopupCompany}
                title="Pilih nama perushaan anda"
                textRight="Close"
                rightClick={() => this.setState({
                    openPopupCompany: false
                })}
                textLeft={null}>
                {this.state.arrCompany.map((item,i) => (
                    <TouchableHighlight key={i} style={styles.listState} onPress={() => this.setState({
                        selectedCompany: item
                    })} 
                    underlayColor="#fafafa">
                        <Text style={this.state.selectedCompany == item ? styles.listTextStateActive : styles.listTextState}>{item.label}</Text>
                    </TouchableHighlight>
                ))}
            </Modal>
            {/* ====== END LIST COMPANY ====== */}

            </ImageBackground>
        );
    }
}

export default SignupComponent;