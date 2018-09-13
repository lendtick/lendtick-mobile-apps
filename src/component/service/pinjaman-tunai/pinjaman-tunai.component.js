import React from 'react';
import { View, Text, TouchableHighlight, ScrollView, Image, ActivityIndicator } from 'react-native';
import Dimensions from 'Dimensions';
import { Col, Row, Grid } from "react-native-easy-grid";
import Feather from 'react-native-vector-icons/Feather';

import { Component,Typography,Input,Variable } from '../../../styles/index';
import { CartDirective } from '../../../directive/index';
import { styles } from './pinjaman-tunai.style';

class PinjamanTunaiComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pinjaman Tunai",
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
            <View style={styles.wrapper}>
                <ScrollView>
                    <View style={[Component.container,{paddingTop:15}]}>
                        <Text style={Typography.singleTitle}>Jenis Pinjaman Tunai</Text>
                    </View>

                    <View style={{paddingLeft:15,paddingRight:15,paddingBottom:15}}>
                        <Grid>
                            <Row>
                                <Col style={{paddingRight:7.5}}>
                                    <View style={styles.itemPinjaman}>
                                        <Image style={styles.imgItem} source={require('../../../../assets/icons/pinjaman-tunai/img01.png')} />
                                        <Text style={styles.textPinjaman}>Multi Guna</Text>
                                    </View>
                                </Col>
                                <Col style={{paddingLeft:7.5}}>
                                    <View style={styles.itemPinjaman}>
                                        <Image style={styles.imgItem} source={require('../../../../assets/icons/pinjaman-tunai/img02.png')} />
                                        <Text style={styles.textPinjaman}>Multi Griya</Text>
                                    </View>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{paddingRight:7.5}}>
                                    <View style={styles.itemPinjaman}>
                                        <Image style={styles.imgItem} source={require('../../../../assets/icons/pinjaman-tunai/img03.png')} />
                                        <Text style={styles.textPinjaman}>Darurat</Text>
                                    </View>
                                </Col>
                                <Col style={{paddingLeft:7.5}}>
                                    <View style={styles.itemPinjaman}>
                                        <Image style={styles.imgItem} source={require('../../../../assets/icons/pinjaman-tunai/img04.png')} />
                                        <Text style={styles.textPinjaman}>Usaha</Text>
                                    </View>
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                    <Image style={styles.line} source={require('../../../../assets/bg/line.png')} />

                    <View style={[Component.container,{paddingTop:15}]}>
                        <Text style={Typography.singleTitle}>Jumlah Pinjaman</Text>
                    </View>
                    <View style={styles.wrapCounter}>
                        <Text style={styles.textCounter}>Rp. 50.000.000</Text>
                    </View>

                    <View style={[Component.container,{marginBottom:15}]}>
                        <Grid>
                            <Col style={{width:35}}>
                                <Feather name="square" size={20} color={Variable.colorPrimary} />
                            </Col>
                            <Col>
                                <Text style={Typography.singleText}>Saya telah membaca dan menyetujui Perjanjian Peminjaman di koperasi ASTRA</Text>
                            </Col>
                        </Grid>

                        <TouchableHighlight style={[this.state.disabled ? Input.btnDisabled : Input.btnPrimary,{marginTop:15}]} onPress={()=> console.log('Aweu')} underlayColor={this.state.disabled ? '#999' : Variable.colorPrimary}>
                            {this.state.isSubmit ? <ActivityIndicator size="small" color="#fff" /> : <Text style={Input.btnText}>Berikutnya</Text> }
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default PinjamanTunaiComponent;