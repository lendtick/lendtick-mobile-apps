import React from 'react';
import { View,Text,Image,TouchableHighlight } from 'react-native';
import Dimensions from 'Dimensions';

import { Component, Typography,Input } from '../../styles/index';
import { CartDirective } from '../../directive/index';
import { styles } from './profile.style';

class ContactComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Hubungi Kami",
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
            width: Dimensions.get('window').width - 150,
            textAlign: 'center'
        },
        headerRight: (
            <TouchableHighlight onPress={() => navigation.navigate('Shop')} underlayColor="transparent">
                <CartDirective />
            </TouchableHighlight>
        ),
    });


    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={{height:'100%',flexDirection: 'column',justifyContent: 'center',backgroundColor:'#ffffff'}}>
                <Image style={styles.logoProfile} source={require("../../../assets/img-holder.png")} />
                <View style={[Component.container,{paddingTop:30,paddingBottom:15}]}>
                    <Text style={[Typography.singleTitle,{textAlign:'center',marginBottom:5,marginTop:0}]}>LENDTICK</Text>
                    <Text style={[Typography.singleText,{textAlign:'center',marginBottom:30}]}>V 1.0</Text>
                    <TouchableHighlight style={[this.state.disabled ? Input.btnDisabled : Input.btnDefault,{marginTop:10}]} onPress={()=> console.log('Aweu')} underlayColor={this.state.disabled ? '#999' : '#fff'}>
                        <Text style={Input.btnTextDefaul}>021 - 2423423</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

export default ContactComponent;