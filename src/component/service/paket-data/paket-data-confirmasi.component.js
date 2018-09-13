import React from 'react';
import { View, Text, TouchableHighlight, ScrollView } from 'react-native';
import Dimensions from 'Dimensions';
import { Col, Row, Grid } from "react-native-easy-grid";
import Feather from 'react-native-vector-icons/Feather';

import { AlertBox,CartDirective } from '../../../directive/index';
import { Component,Typography, Variable} from '../../../styles/index';
import { styles } from './paket-data.style';

class PaketDataConfirmation extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Konfirmasi Paket Data",
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
                    <View style={[Component.container,{paddingBottom:15}]}>
                        
                        {/* ====== START INFORMASI ====== */}
                        <Text style={[Typography.singleTitle,{marginTop:15}]}>Informasi</Text>
                        <View style={[Component.wrapInfo,{paddingBottom:5,marginTop:0}]}>
                            <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                                <Text style={[Typography.singleText,{marginBottom:5}]}>Phone Number</Text>
                                <Text style={Typography.label}>089876567865</Text>
                            </View>
                            <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                                <Text style={[Typography.singleText,{marginBottom:5}]}>Paket Data</Text>
                                <Text style={Typography.label}>Pulsa Internet Telkomsel Rp. 500,000</Text>
                            </View>
                            <View>
                                <Text style={[Typography.singleText,{marginBottom:5}]}>Harga</Text>
                                <Text style={Typography.label}>Rp 500,000</Text>
                            </View>
                        </View>
                        {/* ====== END INFORMASI ====== */}

                        {/* ====== START METODE ====== */}
                        <Text style={[Typography.singleTitle,{marginTop:30}]}>Metode Pembayaran</Text>
                        <View style={[Component.wrapInfo,{paddingBottom:5,marginTop:0,marginBottom:15}]}>
                            <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                                <Text style={[Typography.singleText,{marginBottom:5}]}>Bayar dengan koperasi</Text>
                                <Text style={Typography.label}>Rp. 50.000 * 1 Bulan</Text>
                            </View>
                            <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                                <Text style={[Typography.singleText,{marginBottom:5}]}>Waktu Pembayaran</Text>
                                <Grid style={{marginBottom:15}}>
                                    <Col>
                                        <Text style={[Typography.singleText,{marginBottom:5}]}>1. 25/01/2018</Text>
                                    </Col>
                                    <Col>
                                        <Text style={{textAlign:'right',color:Variable.colorPrimaryText}}>Rp 131,000</Text>
                                    </Col>
                                </Grid>
                            </View>
                            <View>
                                <Text style={[Typography.singleText,{marginBottom:5}]}>Jumlah Pembayaran</Text>
                                <Text style={Typography.label}>Rp 1,600,000</Text>
                            </View>
                        </View>
                        {/* ====== END METODE ====== */}

                        <AlertBox 
                            type="warning" 
                            text="Rp 10.450 Biaya keterlambatan akan dikenakan jika anda gagal membayar sesuai tanggal tagihan bulan ini."
                        />
                    </View>
                </ScrollView>

                {/* ====== START FOOTER ====== */}
                <View style={styles.footer}>
                    <Grid>
                        <Col>
                            <Text style={styles.footerText}>Rp 100,000</Text>
                        </Col>
                        <Col style={{width:150}}>
                            <TouchableHighlight onPress={()=> this.props.navigation.navigate('PaketDataConfirmation')} underlayColor="transparent">
                                <Text style={styles.footerBtn}>Continue</Text>
                            </TouchableHighlight>
                        </Col>
                    </Grid>
                </View>
                {/* ====== END FOOTER ====== */}
            </View>
        );
    }
}

export default PaketDataConfirmation;