import React from 'react';
import { ScrollView,View, Text } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { BlockLogo } from '@directives';
import { Main,Variable,Typography } from '@styles';
// import QRCode from 'react-native-qrcode';

class QRCodeComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "QR Code",
        headerTitleStyle: Variable.headerTitleStyle,
        headerStyle: {
            elevation:0,
            backgroundColor: '#42A9A0',
            borderBottomWidth: 0,
        },
        headerTintColor: '#ffffff',
    });

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() { 
        return(
            <View style={{height:'100%',backgroundColor:'white'}}>
                <ScrollView>
                    <BlockLogo />
                    <View style={[Main.container,{marginTop:15,marginBottom:15}]}>
                        <Text style={[Typography.heading6,{textAlign:'center'}]}>Scan QR Code</Text>
                        <View style={{marginBottom:15, marginLeft: 'auto', marginRight: 'auto'}}>
                            {/* <QRCode
                                value={this.props.navigation.getParam('code')}
                                size={200}
                                bgColor='#3a3a3a'
                                fgColor='white'/> */}
                        </View>
                        <Text style={[Typography.heading6,{textAlign:'center',marginBottom:5}]}>{this.props.navigation.getParam('name')}</Text>
                        <Text style={[Typography.singleText,{textAlign:'center',marginBottom: 30}]}>{this.props.navigation.getParam('code')}</Text>
                    </View>
                </ScrollView>
            </View>
        ) 
    }
}


export default QRCodeComponent;