import React, { Component } from 'react';
import { ScrollView,View,StatusBar,Text,Platform } from 'react-native';
<<<<<<< HEAD
import { LinearGradient } from 'expo';
=======
import { LinearGradient } from 'expo-linear-gradient';
>>>>>>> master

import { ButtonComponent, BlockLogo } from '@directives';
import { Main,Variable,Typography } from '@styles';

class RegisterSuccessComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Register",
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
                            <Text style={Typography.heading5}>Terimakasih</Text>
                            <Text style={[Typography.singleText,{marginBottom:15}]}>
                                Lorem ipsum dolor sit amet, ad per quando oblique sensibus, ne nam antiopam elaboraret, ea integre docendi pertinax vel. Alterum reformidans mei ex.
                            </Text>
                        </View>
                        
                        <ButtonComponent type="primary" text="Kembali Login" onClick={()=> this.onSubmit()} disabled={false} isSubmit={false}/>
                    </View>
                
                </ScrollView>
            </View>

        )
    }
}

export default RegisterSuccessComponent;