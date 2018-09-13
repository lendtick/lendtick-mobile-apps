import React from 'react';
import { 
    View, 
    Text, 
    ScrollView,
    TouchableHighlight, 
    KeyboardAvoidingView,
    Image,
    ImageBackground,
    AsyncStorage 
} from 'react-native';
import Dimensions from 'Dimensions';
import { connect } from 'react-redux';

import { InputComponent,CartDirective,ButtonComponent } from '../../directive/index';
import { Input } from '../../styles/index';
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

class LoginComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Login",
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
            width: Dimensions.get('window').width - 35,
            textAlign: 'center'
        },
        headerLeft: null,
        headerRight: (
            <TouchableHighlight onPress={() => navigation.navigate('Shop')} underlayColor="transparent">
                <CartDirective />
            </TouchableHighlight>
        ),
    });

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            hidePassword: true,
            isSubmit: false
        };
    }

    onSubmit(){
        this.setState({isSubmit: true});
        loginService.postLogin(this.state.username,this.state.password).then(res =>{
            this.setState({isSubmit: false});
            if(res.status){
                AsyncStorage.setItem('token', res.data.token);
                this.props.setLogin(true);
                this.props.navigation.replace('Main'); 
            }else{
                this.setState({isSubmit: false});
                alert(res.message);
            }
        }, err =>{
            this.setState({isSubmit: false});
        });
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

                    <KeyboardAvoidingView behavior="position">

                        {/* ====== START FORM LOGIN ====== */}
                        <View style={styles.main}>
                            <InputComponent 
                                label="Email"
                                iconName={null}
                                keyboardType="email-address"
                                placeholder="Enter email address"
                                value={this.state.username}
                                onChange={(username) => this.setState({username})}/>

                            <InputComponent 
                                label="Password"
                                iconName={null}
                                placeholder="Enter password"
                                secureTextEntry={this.state.hidePassword}
                                value={this.state.password}
                                onChange={(password) => this.setState({password})}/>

                            {this.state.isSubmit ? null :
                            <TouchableHighlight onPress={()=> this.props.navigation.navigate('ForgotPass')} underlayColor="transparent">
                                <Text style={[Input.singleLink,{textAlign:'center', marginTop:10}]}>Lupa password ?</Text>
                            </TouchableHighlight>
                            }
                        </View>
                        {/* ====== END FORM LOGIN ====== */}
                    </KeyboardAvoidingView>

                    <View style={{paddingLeft:60, paddingRight: 60,paddingTop: 15,paddingBottom: 10,position:'relative',zIndex:2}}>
                        <ButtonComponent type="primary" text="MASUK" onClick={()=> this.onSubmit()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/>
                        <View style={{marginTop:10}}></View>
                        <ButtonComponent type="default" text="DAFTAR" onClick={()=> this.props.navigation.navigate('Signup')} disabled={this.state.isSubmit}/>
                    </View>
                </View>
            </ScrollView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		login: state.login
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