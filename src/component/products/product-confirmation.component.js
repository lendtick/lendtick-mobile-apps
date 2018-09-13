import React from 'react';
import { View,Text,Image,TouchableHighlight,ScrollView } from 'react-native';
import { Col,Row,Grid } from "react-native-easy-grid";
import Dimensions from 'Dimensions';
import Feather from 'react-native-vector-icons/Feather';

import { CartDirective,FooterButton,AlertBox } from '../../directive/index';
import { Component,Typography,Variable } from '../../styles/index';
import { styles } from './product.style';

class ProductConfirmationComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Confirmation Order",
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
        this.state = { 
            qty: 1,
            price: 1450000
        };
    }

    addQty(){
        this.setState({qty: this.state.qty + 1});
    }

    lessQty(){
        if(this.state.qty != 1){
            this.setState({qty: this.state.qty - 1});
        }
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <ScrollView>
                    <View style={[Component.container,{paddingTop:30,paddingBottom:15}]}>
                        <Grid>
                            <Col style={{width:115}}>
                                <Image style={styles.imgThumb} source={require('../../../assets/product/img07.jpg')} />
                            </Col>
                            <Col>
                                <Text style={Typography.heading6}>Jam pria Alexandre Christie Model number AC999 Silver Black</Text>
                                <Text style={Typography.singleText}>Quantity :</Text>

                                {/* ======== START SPINNER  ======== */}
                                <View style={styles.wrapSpinner}>
                                    <Grid>
                                        <Col style={{width:30}}>
                                            <TouchableHighlight style={styles.spinnerBtn} onPress={() => this.lessQty()} underlayColor="transparent">
                                                <Feather name="minus" style={{top:3.5,left:3.5}} size={20} color="#6a6a6a" />                                            
                                            </TouchableHighlight>
                                        </Col>
                                        <Col><Text style={[Typography.label,{textAlign:'center',top:6}]}>{this.state.qty}</Text></Col>
                                        <Col style={{width:30}}>
                                            <TouchableHighlight style={styles.spinnerBtn} onPress={() => this.addQty()} underlayColor="transparent">
                                                <Feather name="plus" style={{top:3.5,left:3.5}} size={20} color="#6a6a6a" />                                            
                                            </TouchableHighlight>
                                        </Col>
                                    </Grid>
                                </View>
                                 {/* ======== END SPINNER  ======== */}
                            </Col>
                        </Grid>
                    </View>

                    <Image style={[styles.line,{marginTop:15}]} source={require('../../../assets/bg/line.png')} />

                    <View style={[Component.container,{paddingTop:15,paddingBottom:15}]}>
                        <Grid>
                            <Col>
                                <Text style={{color:Variable.colorContent,marginTop:7}}>Total Price</Text>
                            </Col>
                            <Col>
                                <Text style={[Typography.heading5,{textAlign:'right'}]}>Rp {(this.state.qty * this.state.price).toLocaleString()}</Text>
                            </Col>
                        </Grid>

                        <View style={{borderBottomWidth:1,borderColor:'#dfdfdf',marginTop:0,marginBottom:15}}></View>

                        <Grid>
                            <Col style={{width:30}}>
                                <Feather name="check-square" size={20} color={Variable.colorPrimaryText} />
                            </Col>
                            <Col>
                                <Text style={[Typography.singleText,{marginBottom:15,marginTop:3,color:Variable.colorContent}]}>Cicilan bulanan [Sudah termasuk biaya administrasi]</Text>
                            </Col>
                        </Grid>
                        
                        <View style={{borderBottomWidth:1,borderColor:'#dfdfdf',marginTop:0,marginBottom:15}}></View>

                        <Text style={{color:Variable.colorContent,marginBottom:10}}>Metode pembayaran</Text>
                        <Grid>
                            <Row style={{marginLeft:-7.5,marginRight:-7.5}}>
                                <Col>
                                    <View style={styles.itemAttribute}>
                                        <Text style={styles.textAttribute}>Harga</Text>
                                    </View>
                                </Col>
                                <Col>
                                    <View style={styles.itemAttribute}>
                                        <Text style={styles.textattributeActive}>3 Bulan</Text>
                                    </View>
                                </Col>
                            </Row>
                            <Row style={{marginLeft:-7.5,marginRight:-7.5}}>
                                <Col>
                                    <View style={styles.itemAttribute}>
                                        <Text style={styles.textAttribute}>6 Bulan</Text>
                                    </View>
                                </Col>
                                <Col>
                                    <View style={styles.itemAttribute}>
                                        <Text style={styles.textAttribute}>9 Bulan</Text>
                                    </View>
                                </Col>
                            </Row>
                            <Row style={{marginLeft:-7.5,marginRight:-7.5}}>
                                <Col style={{width:'50%'}}>
                                    <View style={styles.itemAttribute}>
                                        <Text style={styles.textAttribute}>12 Bulan</Text>
                                    </View>
                                </Col>
                            </Row>
                        </Grid>
                        
                        <View style={{borderBottomWidth:1,borderColor:'#dfdfdf',marginTop:10,marginBottom:15}}></View>
                        <Text style={Typography.heading6}>Waktu Pembayaran</Text>
                        <Grid>
                            <Row style={styles.borderLine}> 
                                <Col><Text style={Typography.singleText}>1. 25/08/2018</Text></Col>
                                <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>Rp. 131.000</Text></Col>
                            </Row>
                            <Row style={styles.borderLine}>
                                <Col><Text style={Typography.singleText}>2. 26/08/2018</Text></Col>
                                <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>Rp. 131.000</Text></Col>
                            </Row>
                            <Row style={styles.borderLine}>
                                <Col><Text style={Typography.singleText}>3. 27/08/2018</Text></Col>
                                <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>Rp. 131.000</Text></Col>
                            </Row>
                        </Grid>

                        <Grid>
                            <Col style={{width:30}}>
                                <Feather name="square" size={20} color={Variable.colorPrimaryText} />
                            </Col>
                            <Col>
                                <Text style={[Typography.singleText,{marginBottom:15,marginTop:3,color:Variable.colorContent}]}>Saya menyetujui cicilan tersebut Syarat dan ketentuan</Text>
                            </Col>
                        </Grid>

                        <AlertBox 
                            type="warning" 
                            text="Rp 10.450 Biaya keterlambatan akan dikenakan jika anda gagal membayar sesuai tanggal tagihan bulan ini."
                        />
                    </View>
                </ScrollView>

                 {/* ====== START FOOTER ====== */}
                 <FooterButton text="Rp. 1.600.000" textButton="Masukan Troli" onClick={()=> this.props.navigation.navigate('Shop')}/>
                {/* ====== END FOOTER ====== */}
            </View>
            
        );
    }
}

export default ProductConfirmationComponent;