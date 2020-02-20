import React, { Component } from 'react';
import { ScrollView,View,StatusBar,TouchableHighlight,Text,Dimensions,Platform, StyleSheet, TouchableOpacity } from 'react-native';
// import { ImagePicker} from 'expo';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import AutoHeightImage from 'react-native-auto-height-image';
import { ButtonComponent, BlockLogo, InputComponent, AlertBox, Modal, InputDropdown, InputAutocomplete} from '@directives';
import { Main,Variable,Input, Typography } from '@styles';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';
import { AntDesign } from '@expo/vector-icons';

import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
Validator.setMessages('en', en);

class RegisterComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Register",
        headerTitleStyle: Variable.headerTitleStyle,
        headerStyle: {
            elevation:0,
            backgroundColor: '#42A9A0',
            borderBottomWidth: 0,
        },
        headerTintColor: '#ffffff',
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
            query: '',
            companies:[],
            nik: null,
            department: null,
            division: null,
            posiition: null,
            // identityPhoto: null,
            // companyIdentityPhoto: null,

            openCameraProfile: false,
            // personalPhoto: null,

            openPopupCompany: false,
            isFailed: false,
            arrCompany: [],
            errorInputName: false
        };
    }

    componentDidMount(){
        this.fetchListCompany();
    }
    
    fetchListCompany(){
        // this.setState({ arrCompany: []});
        registerService.getListCompany().then(res =>{
            _.map(res['data'],(x)=>{
                // let obj = {value: x.id_company, label: x.name_company};
                // this.state.arrCompany.push(obj);
                let obj = res['data'];
                this.setState({
                    companies: obj
                })
            });
            // this.setState({
            //     arrCompany: this.state.arrCompany
            // })
        }, err =>{
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchListCompany()}],
                {cancelable: false},
            );
        })
    }

    pickupImage = async(param) =>{
        const statusCamera = await Permissions.getAsync(Permissions.CAMERA);
        const statusCameraRoll = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (statusCamera.status === 'granted' && statusCameraRoll.status === 'granted') {
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
            console.log('masuk sini');
            Permissions.askAsync(Permissions.CAMERA);
            Permissions.askAsync(Permissions.CAMERA_ROLL);
        }
    }

    snapPhoto = async() => {    
        const statusCamera = await Permissions.getAsync(Permissions.CAMERA);
        const statusCameraRoll = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (statusCamera.status === 'granted' && statusCameraRoll.status === 'granted') {
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
        }else{
            console.log('masuk sini');
            Permissions.askAsync(Permissions.CAMERA);
            Permissions.askAsync(Permissions.CAMERA_ROLL);
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

            console.log('final ==>', this.state.company);
             
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
                department: this.state.department,
                division: this.state.division,
                position: this.state.posiition
            };
    
            let rules = {
                name: 'required',
                email: 'required|email',
                company: 'required',
                identity_photo: 'required',
                company_identity_photo: 'required',
                personal_photo: 'required',
                phone_number: 'required|numeric',
                nik: 'required|numeric',
                identity_id: 'required|numeric'
            };
    
            let validation = new Validator(data, rules);
            let validateName = this.state.name.match(/\d+/);
            if(validateName){
                this.setState({errorInputName: true});
            }else{
                this.setState({errorInputName: false});
                if(validation.passes()){
                    this.onSubmit(data);
                }else{
                    this.setState({isInvalid: true});
                }
            }
        }
        else{
            this.setState({isInvalid: true});
        }
    }

    // Submit
    // ======================== //
    onSubmit(data){
        console.log("ini data mana==> ", data);
        this.setState({
            isFailed: false,
            isInvalid: false
        });
        this.props.setRegister(data);
        this.props.navigation.navigate('Term');
    }

    findCompanies(query) {
        if (query === '') {
            return [];
        }

        const { companies } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        data = companies.filter(company => company.name_company.search(regex) >= 0);
        // console.log(data);
        return data;
    }

    _handleChangeText = ({ nativeEvent: { text } }) => {
        this.setState({ query: text });
    };

    _handleTouch = (name) => {
        this.setState({ query: name });
        console.log(this.state.query);
    };

    render() {
        const { hasCameraPermission } = this.state;
        const { query } = this.state;
        const companies = this.findCompanies(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return (
            <View style={{height:'100%',backgroundColor:'white'}}>
                <ScrollView>
                    <BlockLogo />
                    <View style={[Main.container,{marginTop: 15, paddingBottom: 15}]}>
                        <StatusBar barStyle="dark-content" />
                        
                        <View>
                            <InputComponent 
                                label="Nama Lengkap"
                                iconName={null}
                                keyboardType="default"
                                placeholder="Masukan nama lengkap"
                                value={this.state.name}
                                onChange={(name) => {
                                    this.setState({name});
                                    let validateName = name.match(/\d+/);
                                    if(validateName){
                                        this.setState({errorInputName: true});
                                    }else{
                                        this.setState({errorInputName: false});
                                    }
                                }}/>
                            {this.state.errorInputName ? <View style={{marginBottom:15}}><AlertBox type="warning" text="Pastikan nama lengkap tidak mengandung angka"/></View>: null}

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

                            {/* <InputDropdown 
                                label="Nama Perusahaan"
                                iconName={null}
                                value={this.state.company}
                                items={this.state.arrCompany}
                                onChange={(company) => this.setState({company})}/> */}
                            
                            {/* <InputAutocomplete
                                label="Nama Perusahaan"
                                placeholder="Input Nama Perusahaan"
                                value={this.state.company}
                                onChange={(company) => this.setState({company})}
                            /> */}
                            <View style={{position:'relative'}}>
                                <View style={[Input.wrapInput,{backgroundColor:this.props.disabled ? '#f8f8ff' : '#ffffff'}]}>
                                    <Text style={[Typography.label, {marginBottom:5}]}>Nama Perusahaan</Text>
                                        {/* <TouchableHighlight underlayColor="transparent" style={[Input.icon,{top: 10}]}>
                                            <AntDesign name='user'/>
                                        </TouchableHighlight> */}
                                        <Autocomplete
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            // containerStyle={styles.inputText}
                                            data={companies.length === 1 && comp(query, companies[0].name_company) ? [] : companies}
                                            defaultValue={query}
                                            onChangeText={ text => this.setState({ query: text }) }
                                            // onChange={ this._handleChangeText }
                                            value={this.props.value}
                                            placeholder={this.props.placeholder}
                                            renderItem={({ name_company, id_company }) => (
                                                <TouchableOpacity onPress={() => this.setState({ query: name_company, company: id_company })}>
                                                    <Text >
                                                        {/* {title} ({release_date.split('-')[0]}) */}
                                                        {name_company}
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                </View>
                            </View>

                            <InputComponent 
                                label="Department"
                                iconName={null}
                                keyboardType="default"
                                placeholder="Masukan department"
                                value={this.state.department}
                                onChange={(department) => this.setState({department})}/>

                            <InputComponent 
                                label="Divisi"
                                iconName={null}
                                keyboardType="default"
                                placeholder="Masukan divisi"
                                value={this.state.division}
                                onChange={(division) => this.setState({division})}/>

                            <InputComponent 
                                label="Position"
                                iconName={null}
                                keyboardType="default"
                                placeholder="Masukan posisi"
                                value={this.state.position}
                                onChange={(position) => this.setState({position})}/>

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
                            <TouchableHighlight onPress={()=> this.props.navigation.navigate('LoginUser')} underlayColor="transparent">
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