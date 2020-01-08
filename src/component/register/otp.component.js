import React, { Component } from 'react';
import { ScrollView,View,KeyboardAvoidingView,TouchableHighlight,Text,Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import CodeInput from 'react-native-confirmation-code-input';
import registerService from './register.service';
import { connect } from 'react-redux';

import { ButtonComponent, BlockLogo, AlertBox } from '@directives';
import { Main,Variable,Input,Typography } from '@styles';

let setTime;
class OtpComponent extends Component {
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
            isSubmit: false,
            checked: false,
            isValid: false,
            isFailed: false,
            isSuccessResend: false,
            otpNumber: null,
            countdown: 0,
            timeLimit: false,
            message: null
        };
    }

    componentDidMount(){
        this.counterTime();
    }

    counterTime(){
        var limit = 5;
        var fiveMin = 60 * limit;
        this.setState({timeLimit: false});

        setTime = setInterval(()=>{
            var timeleft = fiveMin--;
            var result = parseInt(timeleft / 60) + ':' + timeleft % 60; 
            this.setState({countdown: result});
            if(timeleft == 0) {
                clearInterval(setTime);
                this.setState({timeLimit: true});
            }
        }, 1000);
    }

    resetTime(){
        clearInterval(setTime);
        this.setState({countdown: '5:00'});
        this.counterTime();
    }
    
    onSubmit(){
        this.setState({
            isSubmit: true,
            isFailed: false,
            isSuccessResend: false,
            timeLimit: false
        });
        let data = {
            phone_number: this.props.register.data.phone_number,
            otp_number: this.state.otpNumber
        };
        registerService.postOtvValidate(data).then(res =>{
            if(res.status){
                this.setState({isSubmit: false});
                this.props.navigation.navigate('RegisterSuccess');
            }else{
                this.setState({
                    isFailed: true,
                    isSubmit: false,
                    message: "Kode OTP gagal dikirim, silakan submit ulang"
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

    resendOTP(){
        this.setState({
            isSubmit: false,
            isFailed: false,
            isSuccessResend: false,
            timeLimit: false
        });
        let data = {
            phone_number: this.props.register.data.phone_number,
            campaign: 'registrasi',
            user_id: this.props.register.data.id_user
        }
        clearInterval(setTime);
        registerService.postOtvResend(data).then(res =>{
            this.setState({countdown: '5:00', isSuccessResend: true});
            this.counterTime();
        });
    }

    _onFinishCheckingCode(e){
        this.setState({
            isValid: true,
            otpNumber: e
        });
    }

    render() {
        
        return (
            <View style={{height:'100%',backgroundColor:'white'}}>
                <KeyboardAvoidingView behavior="position">
                <ScrollView>
                
                    <BlockLogo />
                
                    <View style={[Main.container,{marginTop: 15,paddingBottom: 15}]}>

                       
                            <View style={{padding: 30, backgroundColor: Variable.backgroundGray}}>
                                <Text style={Typography.heading5}>Masukan kode OTP</Text>
                                <Text style={[Typography.singleText,{marginBottom:15}]}>
                                    Lorem ipsum dolor sit amet, ad per quando oblique sensibus, ne nam antiopam elaboraret, ea integre docendi pertinax vel. Alterum reformidans mei ex.
                                </Text>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Text style={[Typography.singleText]}>
                                        Kode expired dalam
                                    </Text>
                                    <Text style={[Typography.singleText,{marginLeft: 5, color: Variable.colorPrimary, fontWeight: 'bold'}]}>
                                        {this.state.countdown}
                                    </Text>
                                </View>
                            </View>

                            <CodeInput
                                ref="codeInputRef2"
                                secureTextEntry
                                codeLength={4}
                                activeColor={Variable.colorTitle}
                                inactiveColor={Variable.colorContent}
                                autoFocus={false}
                                ignoreCase={true}
                                inputPosition='center'
                                size={60}
                                onFulfill={(isValid) => this._onFinishCheckingCode(isValid)}
                                containerStyle={{ marginTop: 30 }}
                                codeInputStyle={{ borderWidth: 1, borderColor: '#dfdfdf' }}
                            />

                        <View style={{marginTop: 20, width: 94,left:'50%', marginLeft: -48}}>
                            <TouchableHighlight onPress={()=>{this.resendOTP()}} underlayColor="transparent">
                                <View style={{flex: 1, flexDirection: 'row',alignItems: 'center'}}>
                                    <AntDesign name="refresh-cw" size={14} color={Variable.colorPrimaryText} />
                                    <Text style={[Input.singleLink,{textAlign:'center',marginLeft: 5}]}>Kirim ulang</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        
                        <View style={{marginTop: 20}} />

                        {this.state.isSuccessResend ? <View style={{marginBottom: 15}}><AlertBox type="success" text="Kode OTP telah dikirim ulang"/></View> : null}
                        {this.state.isFailed ? <View style={{marginBottom: 15}}><AlertBox type="danger" text={this.state.message}/></View> : null}
                        {this.state.timeLimit ? <View style={{marginBottom: 15}}><AlertBox type="warning" text="Waktu anda telah habis silahkan untuk klik KIRIM ULANG"/></View> : null}
                        

                        <ButtonComponent type="primary" text="Masukan" onClick={()=> this.onSubmit()} disabled={!this.state.isValid || this.state.isSubmit} isSubmit={this.state.isSubmit}/>
                    </View>
                
                </ScrollView>
                </KeyboardAvoidingView>

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
)(OtpComponent)