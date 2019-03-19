import React, { Component } from 'react';
import { ScrollView,View,StatusBar,Text, Platform } from 'react-native';
import { LinearGradient } from 'expo';

import { ButtonComponent, BlockLogo } from '@directives';
import { Main,Variable,Typography } from '@styles';

class LoginFirstComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Login",
        headerTitleStyle: Variable.headerTitleStyle,
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
                
                    <View style={[Main.container,{marginTop: 15,paddingBottom: 30}]}>
                        <StatusBar barStyle="dark-content" />
                        
                        <View style={{padding: 30, marginBottom: 30, backgroundColor: Variable.backgroundGray}}>
                            <Text style={Typography.heading5}>Selamat Datang</Text>
                            <Text style={[Typography.singleText,{marginBottom:15}]}>
                                Telah melakukan registrasi, kami akan kirimkan info jika user anda sudah siap
                            </Text>
                            <Text style={[Typography.singleText]}>
                                Lorem ipsum dolor sit amet, ad per quando oblique sensibus, ne nam antiopam elaboraret, ea integre docendi pertinax vel. Alterum reformidans mei ex.
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