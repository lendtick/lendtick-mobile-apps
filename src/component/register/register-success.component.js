import React, { Component } from 'react';
import { ScrollView,View,StatusBar,Text,Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ButtonComponent, BlockLogo } from '@directives';
import { Main,Variable,Typography } from '@styles';

class RegisterSuccessComponent extends Component {
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
        this.state = {};
    }

    onSubmit(){
        this.props.navigation.navigate('LoginUser');
    }

    _onFinishCheckingCode(e){
        this.setState({isValid: e});
    }

    render() {
        return (
            <View style={{height:'100%',backgroundColor:'white'}}>
                <ScrollView>
                
                    <BlockLogo />
                
                    <View style={[Main.container,{marginTop: 15,paddingBottom: 15}]}>
                        <StatusBar barStyle="dark-content" />
                        
                        <View style={{padding: 30, marginBottom: 50, backgroundColor: Variable.backgroundGray}}>
                            <Text style={Typography.heading5}>Sukses mendaftar</Text>
                            <Text style={[Typography.singleText,{marginBottom:15}]}>
                                Selamat kamu berhasil mendaftar, silahkan lakukan transfer melalui VA Permata yang dikirim melalui sms.
                            </Text>
                        </View>
                        
                        <ButtonComponent type="primary" text="Login" onClick={()=> this.onSubmit()} disabled={false} isSubmit={false}/>
                    </View>
                
                </ScrollView>
            </View>

        )
    }
}

export default RegisterSuccessComponent;