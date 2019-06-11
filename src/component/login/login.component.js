import React, { Component } from 'react';
import { ScrollView,View,StatusBar,TouchableHighlight,Text,KeyboardAvoidingView,AsyncStorage,Alert } from 'react-native';
import { Permissions } from 'expo';
import { Col,Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';

import { ButtonComponent, BlockLogo, InputComponent, AlertBox } from '@directives';
import { Main,Variable,Input } from '@styles';
import loginService from './login-service';
import registerNotification from '../../notification/registerNotification';

async function checkAllowNotif() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status === 'granted') {
        return true;
    }
}

async function checkAllowCamera() {
    const { statusCamera } = await Permissions.getAsync(Permissions.CAMERA);
    const { statusCameraRoll } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (statusCamera === 'granted' && statusCameraRoll === 'granted') {
        return true;
    }
}

class LoginComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Login",
        headerTitleStyle: Variable.headerTitleStyle,
        headerLeft: null
    });

    constructor(props) {
        super(props);
        this.state = { 
            username: null,
            password: null,
            hidePassword: true,
            isSubmit: false,
            isFailed: false,
            message: null,
            notification: null
        };
    }

    componentDidMount(){
        if(!checkAllowNotif()){
            Permissions.askAsync(Permissions.NOTIFICATIONS);
        }

        if(!checkAllowCamera()){
            Permissions.askAsync(Permissions.CAMERA);
            Permissions.askAsync(Permissions.CAMERA_ROLL);
        }
    }

    // handle Notification
    // =========================== //
    _handleNotification = (notification) => {
        this.setState({notification: notification});
    };

    // Login
    // =========================== //
    onSubmit(){
        this.setState({isSubmit: true, isFailed: false});
        loginService.postLogin(this.state.username,this.state.password).then(res =>{
            this.setState({isSubmit: false});
            if(res.status){
                AsyncStorage.setItem('token', res['data'].token);
                AsyncStorage.setItem('isNew', res['data'].is_new_user.toString());
                AsyncStorage.setItem('username', this.state.username);
                this.props.setLogin(true);

                registerNotification();

                switch(Number(res['data'].is_new_user)){
                    case 0 :
                        this.props.navigation.navigate('Home');
                    break;
                    case 1 :
                        this.props.navigation.navigate('LoginFirst');
                    break;
                    case 2 :
                        this.props.navigation.navigate('Register2');
                    break;
                }
            }else{
                this.setState({
                    isSubmit: false,
                    isFailed: true,
                    message: res.message
                });
            }
        }, err =>{
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
                <KeyboardAvoidingView behavior="position">
                <ScrollView>
                
                    <BlockLogo />
                    <StatusBar barStyle="dark-content" />
                
                    <View style={[Main.container,{marginTop: 15}]}>
                        
                        <InputComponent 
                            label="No Anggota Koperasi"
                            iconName={null}
                            keyboardType="numeric"
                            placeholder="Masukan No Anggota Koperasi"
                            value={this.state.username}
                            onChange={(username) => this.setState({username})}/>

                        <InputComponent 
                            label="Password"
                            iconName={null}
                            placeholder="Masukan password"
                            secureTextEntry={this.state.hidePassword}
                            value={this.state.password}
                            onChange={(password) => this.setState({password})}/>

                        {this.state.isFailed ? <AlertBox type="danger" text={this.state.message}/>: null}

                        <View style={{marginTop: 10, marginBottom: 30}}>
                            <TouchableHighlight onPress={()=> this.props.navigation.navigate('forgotPass')} underlayColor="transparent">
                                <Text style={[Input.singleLink,{textAlign:'center'}]}>Lupa password ?</Text>
                            </TouchableHighlight>
                        </View>
                        
                        <Grid>
                            <Col style={{paddingRight:7.5}}>
                                <ButtonComponent type="primary" text="LOGIN" onClick={()=> this.onSubmit()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/>
                            </Col>
                            <Col style={{paddingLeft:7.5}}>
                                <ButtonComponent type="default" text="REGISTER" onClick={()=> this.props.navigation.navigate('Register')} disabled={this.state.isSubmit} isSubmit={false}/>
                            </Col>
                        </Grid>
                    </View>
                
                </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		sign: state.sign
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setLogin: (e) => {
			dispatch({
				type: 'SET_LOGIN',
				isLogin: e
			})
        },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginComponent)
