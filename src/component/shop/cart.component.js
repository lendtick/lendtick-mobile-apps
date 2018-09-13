import React from 'react';
import { View,Text,ScrollView,SafeAreaView,Image,TouchableHighlight } from 'react-native';
import Dimensions from 'Dimensions';
import { HeaderBackButton } from 'react-navigation';
import { Col,Row,Grid } from "react-native-easy-grid";
import Feather from 'react-native-vector-icons/Feather';

import { Component,Typography, Variable} from '../../styles/index';
import { CartDirective,FooterButton } from '../../directive/index';
import { styles } from './shop.style';

class CartComponent extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Shopping Cart",
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
        headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Home')} />,
        headerRight: (<CartDirective />),
    });

    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.wrapper}>
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
                                        <Text style={[Typography.singleText,styles.cartPrice]}>Rp 1.450.000</Text>
                                        <Grid>
                                            <Col style={{width:25}}>
                                                <Feather name="x-circle" size={16} color="#bfbfbf" /> 
                                            </Col>
                                            <Col>
                                                <Text style={[Typography.singleText,{color:'#bfbfbf'}]}>Bayar kredit</Text>
                                            </Col>
                                        </Grid>
                                    </Col>
                                </Row>
                                <Row style={{padding:15,backgroundColor:'#fafafa'}}>
                                    <Col>
                                        <View style={styles.wrapSpinner}>
                                            <Grid>
                                                <Col style={{width:30}}>
                                                    <TouchableHighlight style={styles.spinnerBtn} onPress={() => console.log('ok')} underlayColor="transparent">
                                                        <Feather name="minus" style={{top:3.5,left:3.5}} size={20} color="#6a6a6a" />                                            
                                                    </TouchableHighlight>
                                                </Col>
                                                <Col><Text style={[Typography.label,{textAlign:'center',top:6}]}>1</Text></Col>
                                                <Col style={{width:30}}>
                                                    <TouchableHighlight style={styles.spinnerBtn} onPress={() => console.log('ok')} underlayColor="transparent">
                                                        <Feather name="plus" style={{top:3.5,left:3.5}} size={20} color="#6a6a6a" />                                            
                                                    </TouchableHighlight>
                                                </Col>
                                            </Grid>
                                        </View>
                                    </Col>
                                    <Col>
                                        <Feather name="trash-2" style={{textAlign:'right',top:3}} size={20} color="#e74c3c" />    
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
                                        <Text style={Typography.heading6}>Jam pria Alexandre Christie Model number</Text>
                                        <Text style={[Typography.singleText,styles.cartPrice]}>Rp 1.450.000</Text>
                                        <Grid>
                                            <Col style={{width:25}}>
                                                <Feather name="check-circle" size={16} color={Variable.colorPrimaryText} /> 
                                            </Col>
                                            <Col>
                                                <Text style={Typography.singleText}>Bayar kredit</Text>
                                            </Col>
                                        </Grid>
                                    </Col>
                                </Row>
                                <Row style={{padding:15,backgroundColor:'#fafafa'}}>
                                    <Col>
                                        <View style={styles.wrapSpinner}>
                                            <Grid>
                                                <Col style={{width:30}}>
                                                    <TouchableHighlight style={styles.spinnerBtn} onPress={() => console.log('ok')} underlayColor="transparent">
                                                        <Feather name="minus" style={{top:3.5,left:3.5}} size={20} color="#6a6a6a" />                                            
                                                    </TouchableHighlight>
                                                </Col>
                                                <Col><Text style={[Typography.label,{textAlign:'center',top:6}]}>1</Text></Col>
                                                <Col style={{width:30}}>
                                                    <TouchableHighlight style={styles.spinnerBtn} onPress={() => console.log('ok')} underlayColor="transparent">
                                                        <Feather name="plus" style={{top:3.5,left:3.5}} size={20} color="#6a6a6a" />                                            
                                                    </TouchableHighlight>
                                                </Col>
                                            </Grid>
                                        </View>
                                    </Col>
                                    <Col>
                                        <Feather name="trash-2" style={{textAlign:'right',top:3}} size={20} color="#e74c3c" />    
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
                                        <Text style={Typography.heading6}>Jam pria Alexandre Christie Model</Text>
                                        <Text style={[Typography.singleText,styles.cartPrice]}>Rp 1.450.000</Text>
                                        <Grid>
                                            <Col style={{width:25}}>
                                                <Feather name="x-circle" size={16} color='#bfbfbf'/> 
                                            </Col>
                                            <Col>
                                                <Text style={[Typography.singleText,{color:'#bfbfbf'}]}>Bayar kredit</Text>
                                            </Col>
                                        </Grid>
                                    </Col>
                                </Row>
                                <Row style={{padding:15,backgroundColor:'#fafafa'}}>
                                    <Col>
                                        <View style={styles.wrapSpinner}>
                                            <Grid>
                                                <Col style={{width:30}}>
                                                    <TouchableHighlight style={styles.spinnerBtn} onPress={() => console.log('ok')} underlayColor="transparent">
                                                        <Feather name="minus" style={{top:3.5,left:3.5}} size={20} color="#6a6a6a" />                                            
                                                    </TouchableHighlight>
                                                </Col>
                                                <Col><Text style={[Typography.label,{textAlign:'center',top:6}]}>1</Text></Col>
                                                <Col style={{width:30}}>
                                                    <TouchableHighlight style={styles.spinnerBtn} onPress={() => console.log('ok')} underlayColor="transparent">
                                                        <Feather name="plus" style={{top:3.5,left:3.5}} size={20} color="#6a6a6a" />                                            
                                                    </TouchableHighlight>
                                                </Col>
                                            </Grid>
                                        </View>
                                    </Col>
                                    <Col>
                                        <Feather name="trash-2" style={{textAlign:'right',top:3}} size={20} color="#e74c3c" />    
                                    </Col>
                                </Row>
                            </Grid>
                            {/* ======== END CART ITEM  ======== */}
                        </View>
                    </ScrollView>   

                    {/* ====== START FOOTER ====== */}
                    <FooterButton text="Rp 100.000" textButton="Continue" onClick={()=> this.props.navigation.navigate('Checkout')}/>
                    {/* ====== END FOOTER ====== */}
                </View>
            </SafeAreaView>
            
        );
    }
}

export default CartComponent;