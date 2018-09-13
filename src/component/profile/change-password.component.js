import React from 'react';
import { View,Text,ScrollView,TouchableHighlight } from 'react-native';
import Dimensions from 'Dimensions';
var taiPasswordStrength = require("tai-password-strength");

import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
Validator.setMessages('en', en);

import { Component,Variable,Input } from '../../styles/index';
import { CartDirective,InputComponent,AlertBox,ButtonComponent } from '../../directive/index';
import { styles } from './profile.style';

import profileService from './profile-service';

class ChangePassComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Ubah Kata Sandi",
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
            PasswordCheck: null,
            Password: '',
            Repassword: '',
            oldPassword: '',
            isSubmit: false,
            isSuccess: false,
            isInvalid: false,
            inValidRePassword: false
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
        profileService.putPassword(data).then(res =>{
            if(res.status){
                this.setState({
                    isSuccess: true,
                    isSubmit: false,
                    old_password: '',
                    Password: '',
                    Repassword: '',
                    PasswordCheck: null,
                });
            }else{
                this.setState({isSubmit: false});
                alert(res.message);
            }
            
        }, err =>{
            this.setState({
                isFailed: true,
                isSubmit: false
            });
        })
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
            <View style={[styles.wrapper]}>
                <ScrollView>
                <View style={[Component.container,{paddingTop:15,paddingBottom:15}]}>
                    {/* ==================== START FORM ==================== */ }
                    <InputComponent 
                        label="Password lama"
                        iconName={null}
                        placeholder="Masukan password lama"
                        secureTextEntry={true}
                        value={this.state.oldPassword}
                        onChange={(oldPassword) => this.setState({oldPassword})}/>
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

                    {this.state.isFailed ? <AlertBox type="danger" text="Ganti password gagal, silakan coba lagi"/>: null}
                    {this.state.isInvalid ? <AlertBox type="warning" text="Ganti password gagal, pastikan anda telah memasukan data dengan benar"/>: null}
                    {this.state.isSuccess ? <AlertBox type="success" text="Ganti password berhasil"/>: null}
                    {this.state.inValidRePassword ? <AlertBox type="danger" text="Password tidak sama"/>: null}

                    <View style={{marginTop: 10}} />
                    <ButtonComponent type="primary" text="Ubah Password" onClick={()=> this.validationSubmit()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/>
                    {/* ==================== END FORM ==================== */ }
                </View>
                </ScrollView>
            </View>
        );
    }
}

export default ChangePassComponent;