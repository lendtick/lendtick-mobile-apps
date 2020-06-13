import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform , View,Alert, TouchableHighlight, ScrollView, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ButtonComponent, BlockLogo, InputComponent, AlertBox } from '@directives';
import personalService from './personal.service';
import { Main,Variable } from '@styles';

import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
Validator.setMessages('en', en);



class GantiPassUserComponent extends Component {
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
            isSubmit: false,
            oldPassword: null,
            newPassword: null,
            confirmPassword: null,
            hideoldPassword: true,
            hidenewPassword: true,
            hideconfirmPassword: true,
        };
    }


    // Validation
    // ======================== //
    validationSubmit(){ 

        let data = {
            old_password: this.state.oldPassword,
            new_password: this.state.newPassword,
            confirm_password: this.state.confirmPassword
        };

        let rules = {
            old_password: 'required',
            new_password: 'required',
            confirm_password: 'required'
        };

        let validation = new Validator(data, rules);

        // check_value = this.state.newPassword == this.state.confirmPassword ? true : false;

        if(validation.passes()){
            this.onSubmit(data);
        }else{
            this.setState({isInvalid: true});
        }
    }

    // Submit
    // ======================== //
    onSubmit(data){
        console.log('data ==>', data);
        this.setState({
            isFailed: false,
            isInvalid: false,
            isSubmit: true,
            isSuccess: false
        });
        personalService.putChangePassword(data).then(res =>{
            if(res.status){
                this.setState({isSubmit: false, isSuccess: true, message: res.message});
            }else{
                this.setState({isSubmit: false, isFailed: true, message: res.message});
            }
            // console.log(res);
            // this.setState({
            //     isSubmit: false,
            //     isSuccess: true
            // });
        }, err =>{
            this.setState({isSubmit: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.onSubmit(data)}],
                {cancelable: false},
            );
        });
    }


    // onSubmit(){
    //     this.setState({isSubmit: true, isFailed: false});
    //     setTimeout(()=>{
    //         this.setState({isSubmit: false});
    //         this.props.navigation.navigate('PersonalUser');
    //     }, 3000);
    // }

    clickIconPassword(){
        this.setState(({
            hideoldPassword: !this.state.hideoldPassword
        }));
    }

    clickIconNewPassword(){
        this.setState(({
            hidenewPassword: !this.state.hidenewPassword,
        }));
    }

    clickIconConfirmPassword(){
        this.setState(({
            hideconfirmPassword: !this.state.hideconfirmPassword
        }));
    }

    
            

    render() {
        return (
            <View style={{height:'100%',backgroundColor:'white'}}>
                <KeyboardAvoidingView behavior="position">
                <ScrollView>
                {this.state.isFailed ? <View style={{marginBottom: 15}}><AlertBox type="danger" text={this.state.message}/></View> : null}

                {this.state.isSuccess ? <View style={{marginBottom: 15}}><AlertBox type="success" text={this.state.message}/></View> : null}

                    <View style={[Main.container,{marginTop: 15, paddingBottom:15}]}>                        
                        <View>
                            <InputComponent 
                                label="Password lama"
                                iconName={this.state.hideoldPassword ? "eye" : "eye"}
                                placeholder="Masukan password lama"
                                secureTextEntry={this.state.hideoldPassword} 
                                onClickIcon={() => this.clickIconPassword()}
                                value={this.state.oldPassword}
                                onChange={(oldPassword) => this.setState({oldPassword})}/>

                            <InputComponent 
                                label="Password baru"
                                iconName={this.state.hidenewPassword ? "eye" : "eye"}
                                placeholder="Masukan password baru"
                                secureTextEntry={this.state.hidenewPassword}
                                value={this.state.newPassword}
                                onClickIcon={() => this.clickIconNewPassword()}
                                onChange={(newPassword) => this.setState({newPassword})}/>    

                            <InputComponent 
                                label="Konfirmasi password baru"
                                iconName={this.state.hideconfirmPassword ? "eye" : "eye"}
                                placeholder="Masukan konfirmasi password baru"
                                secureTextEntry={this.state.hideconfirmPassword}
                                onClickIcon={() => this.clickIconConfirmPassword()}
                                value={this.state.confirmPassword}
                                onChange={(confirmPassword) => this.setState({confirmPassword})}/>        

                        </View>

                        <ButtonComponent type="primary" text="Ubah" onClick={()=> this.validationSubmit()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/>
                        {/* <ButtonComponent type="primary" text="Update data BANK" onClick={()=> this.validationSubmit()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/> */}

                    </View>
                
                </ScrollView>
                </KeyboardAvoidingView>
            </View>

        )
    }
}

export default GantiPassUserComponent;