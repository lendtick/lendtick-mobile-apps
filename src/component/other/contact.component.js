import React from 'react';
import { View,Text,ScrollView } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import { BlockLogo } from '@directives';
import { Main,Variable,Typography } from '@styles';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

class ContactComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Hubungi kami",
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
        this.state = {  };
    }

    render() { 
        return(
            <View style={{height:'100%',backgroundColor:'white'}}>
                <ScrollView>
                    <BlockLogo />
                    <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1,borderTopWidth:1,marginBottom:15, borderColor: '#dfdfdf'}]}>
                        <Grid>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <AntDesign name="phone" size={18} style={{marginRight: 10, top:2}} color={Variable.colorContent} />
                                <Text style={Typography.singleText}>Telepon</Text>
                            </View>
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>021-65832776</Text></Col>
                        </Grid>
                    </View>
                    <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1,marginBottom:15, borderColor: '#dfdfdf'}]}>
                        <Grid>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <AntDesign name="facebook-square" size={18} style={{marginRight: 10, top:2}} color={Variable.colorContent} />
                                <Text style={Typography.singleText}>Facebook</Text>
                            </View>
                            {/* <Col><AntDesign name="facebook" size={18} style={{textAlign:'left',top:-2}} color={Variable.colorContent} /></Col>
                            <Col><Text style={Typography.singleText}>Facebook</Text></Col> */}
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Koperasi astra</Text></Col>
                        </Grid>
                    </View>
                    <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1,marginBottom:15, borderColor: '#dfdfdf'}]}>
                        <Grid>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <AntDesign name="instagram" size={18} style={{marginRight: 10, top:2}} color={Variable.colorContent} />
                                <Text style={Typography.singleText}>Instagram</Text>
                            </View>
                            {/* <Col><AntDesign name="instagram" size={18} style={{textAlign:'left',top:-2}} color={Variable.colorContent} /></Col>
                            <Col><Text style={Typography.singleText}>Instagram</Text></Col> */}
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Koperasiastra</Text></Col>
                        </Grid>
                    </View>
                    <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1,marginBottom:15, borderColor: '#dfdfdf'}]}>
                        <Grid>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <AntDesign name="mail" size={18} style={{marginRight: 10, top:2}} color={Variable.colorContent} />
                                <Text style={Typography.singleText}>Email</Text>
                            </View>
                            {/* <Col><AntDesign name="mail" size={18} style={{textAlign:'left',top:-2}} color={Variable.colorContent} /></Col>
                            <Col><Text style={Typography.singleText}>Email</Text></Col> */}
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>customer.care@koperasi-astra.com</Text></Col>
                        </Grid>
                    </View>
                    <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1,marginBottom:15, borderColor: '#dfdfdf'}]}>
                        <Grid>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Icon name="whatsapp" size={18} style={{marginRight: 10, top:2}} color={Variable.colorContent} />
                                <Text style={Typography.singleText}>Whatsapp</Text>
                            </View>
                            {/* <Col><Icon name="whatsapp" size={18} style={{textAlign:'left',top:-2}} color={Variable.colorContent} /></Col>
                            <Col><Text style={Typography.singleText}>Whatsapp</Text></Col> */}
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>0815 1145 4560</Text></Col>
                        </Grid>
                    </View>
                </ScrollView>
            </View>
        ) 
    }
}


export default ContactComponent;