import React, { Component } from 'react';
import { ScrollView,View,StatusBar,Text,Platform } from 'react-native';
import { ButtonComponent, BlockLogo } from '@directives';
import { Main,Variable,Typography } from '@styles';

class PulsaFinishComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Finish Pulsa",
        headerTitleStyle: Variable.headerTitleStyle,
        headerLeft: null
    });

    constructor(props) {
        super(props);
        this.state = {};
    }

    onSubmit(){
        this.props.navigation.navigate('Login');
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
                        
                        <View style={{padding: 30, marginBottom: 50, backgroundColor: Variable.backgroundGray}}>
                            <Text style={Typography.heading5}>Pembelian Pulsa Berhasil</Text>
                            <Text style={[Typography.singleText,{marginBottom:15}]}>
                                Lorem ipsum dolor sit amet, ad per quando oblique sensibus, ne nam antiopam elaboraret, ea integre docendi pertinax vel. Alterum reformidans mei ex.
                            </Text>
                        </View>
                        
                        <ButtonComponent type="primary" text="Kembali" onClick={()=> this.props.navigation.popToTop()} disabled={false} isSubmit={false}/>
                    </View>
                
                </ScrollView>
            </View>

        )
    }
}

export default PulsaFinishComponent;