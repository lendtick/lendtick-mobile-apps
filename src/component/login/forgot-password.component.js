import React, { Component } from 'react';
import { ScrollView,View,StatusBar,Platform,TouchableHighlight,Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import loginService from './login-service';
import { ButtonComponent, BlockLogo, InputComponent, AlertBox } from '@directives';
import { Main,Variable,Input } from '@styles';

class ForgotPassComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Lupa Kata Sandi",
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
            isSubmit: false,
            isFailed: false,
            oldPassword: null,
            newPassword: null,
            confirmPassword: null,
            hidePassword: true,
            email: null,
            message: null
        };
    }

    onSubmit(){
        this.setState({isSubmit: true, isFailed: false, message: null});
        loginService.putForgotPassword(this.state.email).then(res =>{
            if(res.status){
                this.props.setResponseForgotPass(res.message);
                this.props.navigation.navigate('forgotPassSuccess');
            }else{
                this.setState({isSubmit: false, isFailed: true, message: res.message});
            }
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
        return (
            <View style={{height:'100%',backgroundColor:'white'}}>
                <ScrollView>
                
                    <BlockLogo />
                
                    <View style={[Main.container,{marginTop: 15,paddingBottom:15}]}>
                        <StatusBar barStyle="dark-content" />

                        <InputComponent 
                            label="No Anggota Koperasi"
                            iconName={null}
                            keyboardType="numeric"
                            placeholder="Masukan No Anggota Koperasi"
                            value={this.state.email}
                            onChange={(email) => this.setState({email})}/>
                        
                        {this.state.isFailed ? <View style={{marginBottom: 15}}><AlertBox type="danger" text={this.state.message}/></View> : null}
                        
                        <View style={{marginBottom: 15}}>
                            <TouchableHighlight onPress={()=> this.props.navigation.navigate('LoginUser')} underlayColor="transparent">
                                <Text style={[Input.singleLink,{textAlign:'center'}]}>Kembali</Text>
                            </TouchableHighlight>
                        </View>

                        <ButtonComponent type="primary" text="Submit" onClick={()=> this.onSubmit()} disabled={this.state.isSubmit || !this.state.email} isSubmit={this.state.isSubmit}/>
                    </View>
                
                </ScrollView>
            </View>

        )
    }
}

const mapStateToProps = (state) => {
	return {
		login: state.login
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setResponseForgotPass: (e) => {
			dispatch({
				type: 'FORGOT_PASS',
				responseForgotPass: e
			})
        },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ForgotPassComponent)