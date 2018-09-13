import React from 'react';
import { View,Text,ScrollView,SafeAreaView,Image,TouchableHighlight,TextInput } from 'react-native';
import Dimensions from 'Dimensions';
import { Col,Row,Grid } from "react-native-easy-grid";
import Feather from 'react-native-vector-icons/Feather';

import { Component,Typography, Variable} from '../../styles/index';
import { CartDirective,FooterButton } from '../../directive/index';
import { styles } from './shop.style';

class CheckoutComponent extends React.Component {
    static navigationOptions = {
        title: "Checkout",
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
        headerRight: (<CartDirective />),
    };

    constructor(props) {
        super(props);
        this.state = { 
            inputEmail: null    
        };
    }
    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.wrapper}>
                    <View style={[Component.container,{paddingTop:15,paddingBottom:0}]}>
                        <Text style={[Typography.heading6,{marginBottom:5}]}>Badai Samoedra</Text>
                        <Text style={[Typography.singleText,{marginBottom:10}]}>082113123133</Text>
                        <Text style={Typography.singleText}>Jl.Kampung Nagrogjaya Desa.Sukamulya Kec.Pagaden</Text>
                    </View>

                    <Image style={[styles.line,{marginTop:15}]} source={require('../../../assets/bg/line.png')} />
                    <ScrollView>
                        <View style={[Component.container,{paddingTop:15,paddingBottom:15}]}>
                            {/* ======== START CART ITEM  ======== */}
                            <Grid style={styles.itemCart}>
                                <Row style={{padding:15,borderBottomWidth:1,borderColor:'#efefef'}}>
                                    <Col style={{width:90}}>
                                        <Image style={styles.imgThumb} source={require('../../../assets/product/img07.jpg')} />
                                    </Col>
                                    <Col>
                                        <Text style={Typography.heading6}>Jam pria Alexandre Christie Model number AC999 Silver Black</Text>
                                        <Grid>
                                            <Row>
                                                <Grid>
                                                    <Text style={[Typography.singleText,styles.cartPrice]}>Rp 1.450.000</Text>
                                                </Grid>
                                                <Grid>
                                                    <Text style={[Typography.singleText]}>x 2</Text>
                                                </Grid>
                                            </Row>
                                            <Row>
                                                <Col style={{width:25}}>
                                                    <Feather name="x-circle" size={16} color="#bfbfbf" /> 
                                                </Col>
                                                <Col>
                                                    <Text style={[Typography.singleText,{color:"#bfbfbf"}]}>Bayar kredit</Text>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </Col>
                                </Row>
                            </Grid>
                            {/* ======== END CART ITEM  ======== */}
                            {/* ======== START CART ITEM  ======== */}
                            <Grid style={styles.itemCart}>
                                <Row style={{padding:15,borderBottomWidth:1,borderColor:'#efefef'}}>
                                    <Col style={{width:90}}>
                                        <Image style={styles.imgThumb} source={require('../../../assets/product/img07.jpg')} />
                                    </Col>
                                    <Col>
                                        <Text style={Typography.heading6}>Jam pria Alexandre Christie Model number AC999 Silver Black</Text>
                                        <Grid>
                                            <Row>
                                                <Grid>
                                                    <Text style={[Typography.singleText,styles.cartPrice]}>Rp 1.450.000</Text>
                                                </Grid>
                                                <Grid>
                                                    <Text style={[Typography.singleText]}>x 1</Text>
                                                </Grid>
                                            </Row>
                                            <Row>
                                                <Col style={{width:25}}>
                                                    <Feather name="check-circle" size={16} color={Variable.colorPrimaryText} /> 
                                                </Col>
                                                <Col>
                                                    <Text style={Typography.singleText}>Bayar kredit</Text>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </Col>
                                </Row>
                            </Grid>
                            {/* ======== END CART ITEM  ======== */}
                            {/* ======== START CART ITEM  ======== */}
                            <Grid style={styles.itemCart}>
                                <Row style={{padding:15,borderBottomWidth:1,borderColor:'#efefef'}}>
                                    <Col style={{width:90}}>
                                        <Image style={styles.imgThumb} source={require('../../../assets/product/img07.jpg')} />
                                    </Col>
                                    <Col>
                                        <Text style={Typography.heading6}>Jam pria Alexandre Christie Model number AC999 Silver Black</Text>
                                        <Grid>
                                            <Row>
                                                <Grid>
                                                    <Text style={[Typography.singleText,styles.cartPrice]}>Rp 1.450.000</Text>
                                                </Grid>
                                                <Grid>
                                                    <Text style={[Typography.singleText]}>x 3</Text>
                                                </Grid>
                                            </Row>
                                            <Row>
                                                <Col style={{width:25}}>
                                                    <Feather name="x-circle" size={16} color="#bfbfbf" /> 
                                                </Col>
                                                <Col>
                                                    <Text style={[Typography.singleText,{color:"#bfbfbf"}]}>Bayar kredit</Text>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </Col>
                                </Row>
                            </Grid>
                            {/* ======== END CART ITEM  ======== */}
                        </View>
                    </ScrollView> 
                    {/* ====== START EMAIL ====== */}
                    <View style={[Component.container,{borderTopWidth:1,borderColor:'#efefef'}]}>
                        <View style={styles.wrapEmail}>
                            <TouchableHighlight style={styles.iconEmail} onPress={() => console.log('ok')} underlayColor="transparent">
                                <Feather name="mail" size={20} color="#9f9f9f" />
                            </TouchableHighlight>
                            <TextInput
                                style={[Typography.singleText,styles.inputSingleEmail]}
                                placeholder="Masukan alamat email"
                                underlineColorAndroid="transparent"
                                keyboardType="email-address"
                                onChangeText={(inputEmail) => this.setState({inputEmail})}
                                value={this.state.inputEmail}
                            />
                        </View>
                    </View>
                    {/* ====== END EMAIL ====== */}

                    {/* ====== START FOOTER ====== */}
                    <FooterButton text="Rp 100.000" textButton="Beli" onClick={()=> this.props.navigation.navigate('CheckoutSuccess')}/>
                    {/* ====== END FOOTER ====== */}
                </View>
            </SafeAreaView>
        );
    }
}

export default CheckoutComponent;