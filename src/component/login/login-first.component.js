import React, { Component } from 'react';
import { ScrollView,View,StatusBar,Text, Platform } from 'react-native';
<<<<<<< HEAD
import { LinearGradient } from 'expo';
=======
import { LinearGradient } from 'expo-linear-gradient';
>>>>>>> master

import { ButtonComponent, BlockLogo } from '@directives';
import { Main,Variable,Typography } from '@styles';

class LoginFirstComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Login",
        headerTitleStyle: Variable.headerTitleStyle,
<<<<<<< HEAD
=======
        headerStyle: {
            elevation:0,
            backgroundColor: '#42A9A0',
            borderBottomWidth: 0,
        },
        headerTintColor: '#ffffff',
>>>>>>> master
        headerLeft: null
    });

    constructor(props) {
        super(props);
        this.state = {};
    }

    onSubmit(){
        this.props.navigation.navigate('GantiPass');
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
                        
                        <View style={{padding: 30, marginBottom: 30, backgroundColor: Variable.backgroundGray}}>
                            <Text style={Typography.heading5}>Selamat Datang</Text>
                            <Text style={[Typography.singleText,{marginBottom:15}]}>
                                Terimakasih Telah melakukan pendaftaran di Koperasi Astra International. 
                            </Text>
                        </View>
                        
                        <ButtonComponent type="primary" text="Ubah kata sandi" onClick={()=> this.onSubmit()} disabled={false} isSubmit={false}/>
                    </View>
                
                </ScrollView>
            </View>

        )
    }
}

export default LoginFirstComponent;