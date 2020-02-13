import React, { Component } from 'react';
import { ScrollView,View,StatusBar,KeyboardAvoidingView,AsyncStorage,Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
var taiPasswordStrength = require("tai-password-strength");

import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
Validator.setMessages('en', en);

import { ButtonComponent, BlockLogo, InputComponent,AlertBox } from '@directives';
import { Main,Variable } from '@styles';
import loginService from './login-service';

class GantiPassComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Ganti Password",
        headerTitleStyle: Variable.headerTitleStyle,
        headerStyle: {
            elevation:0,
            backgroundColor: '#42A9A0',
            borderBottomWidth: 0,
        },
        headerTintColor: '#ffffff',
    });

    constructor(props) {
        super(props);
        this.state = { 
            PasswordCheck: null,
            Password: '',
            Repassword: '',
            oldPassword: '',
            isSubmit: false,
            isSuccess: false,
            isInvalid: false,
            inValidRePassword: false,
            hidePassword: true,
            hideNewPassword: true,
            hideConfirmNewPassword: tru,
        };
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


    // Validation
    // ======================== //
    validationSubmit(){
        this.setState({
            isSuccess: false,
            isFailed: false,
            isInvalid: false,
        });
        let data = {
            old_password: this.state.oldPassword,
            new_password: this.state.Password,
        };

        let rules = {
            old_password: 'required',
            new_password: 'required',
        };

        let validation = new Validator(data, rules);
        if(validation.passes() && !this.state.inValidRePassword){
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
            isInvalid: false,
            inValidRePassword: false
        });
        loginService.putPassword(data).then(res =>{
            if(res.status){
                this.setState({
                    isSuccess: true,
                    isSubmit: false,
                    old_password: '',
                    Password: '',
                    Repassword: '',
                    PasswordCheck: null,
                });
                AsyncStorage.removeItem('isNew').then(()=>{
                    this.props.navigation.navigate('LoginUser');
                });
            }else{
                this.setState({isSubmit: false});
            }
        }, err =>{
            this.setState({
                isFailed: true,
                isSubmit: false
            });
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.onSubmit(data)}],
                {cancelable: false},
            );
        })
    }

    clickIconPassword(){
        this.setState(({
            hidePassword: !this.state.hidePassword
        }));
    }

    clickIconNewPassword(){
        this.setState(({
            hideNewPassword: !this.state.hideNewPassword
        }));
    }

    clickIconConfirmNewPassword(){
        this.setState(({
            hideConfirmNewPassword: !this.state.hideConfirmNewPassword
        }));
    }

    render() {
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
                <KeyboardAvoidingView behavior="position">
                <ScrollView>
                
                    <BlockLogo />
                
                    <View style={[Main.container,{marginTop: 15, paddingBottom:15}]}>
                        <StatusBar barStyle="dark-content" />
                        
                        {/* ==================== START FORM ==================== */ }
                        <InputComponent 
                            label="Password lama"
                            iconName={this.state.hidePassword ? "eye" : "eye"}
                            placeholder="Masukan password lama"
                            secureTextEntry={true}
                            value={this.state.oldPassword}
                            onClickIcon={() => this.clickIconPassword()}
                            onChange={(oldPassword) => this.setState({oldPassword})}/>
                        <InputComponent 
                            label="Password Baru"
                            iconName={this.state.hideNewPassword ? "eye" : "eye"}
                            placeholder="Masukan password baru"
                            secureTextEntry={true}
                            value={this.state.Password}
                            onClickIcon={() => this.clickIconNewPassword()}
                            onChange={(e) => this.setPassword(e)}/>
                        {this.state.Password != '' ? <View style={{marginBottom:15}}>{alertComponent}</View> : null}
                        <InputComponent 
                            label="Konfirmasi Password"
                            iconName={this.state.hideConfirmNewPassword ? "eye" : "eye"}
                            placeholder="Masukan konfirmasi password"
                            secureTextEntry={true}
                            value={this.state.Repassword}
                            onClickIcon={() => this.clickIconConfirmNewPassword()}
                            onChange={(e) => this.setConfirmPassword(e)}/>

                        {this.state.isFailed ? <AlertBox type="danger" text="Ganti password gagal, silakan coba lagi"/>: null}
                        {this.state.isInvalid ? <AlertBox type="warning" text="Ganti password gagal, pastikan anda telah memasukan data dengan benar"/>: null}
                        {this.state.isSuccess ? <AlertBox type="success" text="Ganti password berhasil"/>: null}
                        {this.state.inValidRePassword ? <AlertBox type="danger" text="Password tidak sama"/>: null}

                        <View style={{marginTop: 10}} />
                        <ButtonComponent type="primary" text="Ubah Password" onClick={()=> this.validationSubmit()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/>
                        <View style={{marginTop: 15}} />
                        {/* ==================== END FORM ==================== */ }
                    </View>
                
                </ScrollView>
                </KeyboardAvoidingView>
            </View>

        )
    }
}

export default GantiPassComponent;