import React from 'react';
import { ScrollView,View, Text, Platform } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { BlockLogo } from '@directives';
import { Main,Variable,Typography } from '@styles';

class QRCodeComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "QR Code",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() { 
        return(
            <View style={{height:'100%',backgroundColor:'white'}}>
                <ScrollView>
                    <BlockLogo />
                    <View style={[Main.container,{marginTop:15,marginBottom:15}]}>
                        <Text style={[Typography.heading6,{textAlign:'center'}]}>Scan QR Code</Text>
                        <AutoHeightImage style={{marginBottom:15, left:'50%',marginLeft:-112.5}} width={225} source={require('../../../assets/img/balance/qrcode.jpg')} />
                        <Text style={[Typography.heading6,{textAlign:'center',marginBottom:5}]}>Jhon Tinsman</Text>
                        <Text style={[Typography.singleText,{textAlign:'center',marginBottom: 30}]}>324234</Text>
                    </View>
                </ScrollView>
            </View>
        ) 
    }
}


export default QRCodeComponent;