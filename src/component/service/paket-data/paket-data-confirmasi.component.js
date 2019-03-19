import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";

import { AlertBox,FooterButton } from '@directives';
import { Main,Typography, Variable} from '@styles';
import { styles } from './paket-data.style';

class PaketDataConfirmation extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Konfirmasi Paket Data",
        headerTitleStyle: Variable.headerTitleStyle,
    });


    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={[styles.wrapper,{backgroundColor: Variable.backgroundGray}]}>
                <ScrollView>
                    {/* ====== START INFORMASI ====== */}
                    <View style={[Main.container]}>
                        <Text style={[Typography.singleTitle,{marginTop:15}]}>Informasi</Text>
                    </View>
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0}]}>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Phone Number</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>089876567865</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Paket Data</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>Pulsa Internet Telkomsel Rp. 500,000</Text>
                        </View>
                        <View>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Harga</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>Rp 500,000</Text>
                        </View>
                    </View>
                    {/* ====== END INFORMASI ====== */}
                    
                        {/* ====== START METODE ====== */}
                    <View style={[Main.container]}>
                        <Text style={[Typography.singleTitle,{marginTop:30}]}>Metode Pembayaran</Text>
                    </View>
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0,marginBottom:15}]}>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Bayar dengan koperasi</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>Rp. 50.000 * 1 Bulan</Text>
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
                            <Text style={[Typography.label,{marginBottom:15}]}>Rp 1,600,000</Text>
                        </View>
                    </View>
                    {/* ====== END METODE ====== */}

                    <View style={[Main.container,{paddingBottom:15}]}>
                        <AlertBox 
                            type="warning" 
                            text="Rp 10.450 Biaya keterlambatan akan dikenakan jika anda gagal membayar sesuai tanggal tagihan bulan ini."
                        />
                    </View>
                </ScrollView>

                {/* ====== START FOOTER ====== */}
                <FooterButton text="Rp 100.000" textButton="Konfirmasi" onClick={()=> console.log("asdasd")}/>
                {/* ====== END FOOTER ====== */}
            </View>
        );
    }
}

export default PaketDataConfirmation;