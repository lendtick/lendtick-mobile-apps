import React from 'react';
import { View,Text,Image,TouchableHighlight } from 'react-native';
import Dimensions from 'Dimensions';

import { Component, Typography } from '../../styles/index';
import { CartDirective } from '../../directive/index';
import { styles } from './profile.style';

class AboutComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Tentang Kami",
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
                    <Text style={[Typography.singleText,{textAlign:'center',marginBottom:15}]}>lendtick adalah platform belanja online yang menyediakan berbagai mcam produk mulai dari elektronik, gadget, dan lainnya. Lendtick juga menyediakan metode pembayaran baru melalui cicilan tanpa kartu kredit.</Text>
                    <Text style={[Typography.singleText,{textAlign:'center',marginBottom:50}]}>Semua Jasa yang ada di Lentdtick disediakan oleh PT. KOPERASI ASTRA INTERNATIONAL</Text>
                    <Text style={[Typography.singleText,{textAlign:'center'}]}>Copyright 2018 LENDTICK | All Rights Reserved</Text>
                </View>
            </View>
        );
    }
}

export default AboutComponent;