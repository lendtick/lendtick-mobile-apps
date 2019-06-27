import React, { Component } from 'react';
import { ScrollView,View,Text } from 'react-native';
import { Main,Variable,Typography } from '@styles';
import { AlertBox } from '@directives';
import { styles } from './history-order.style';

class detailHistoryOrderComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Detail Transaksi",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = {};
    }

    onSubmit(){
        this.props.navigation.navigate('LoginUser');
    }

    _onFinishCheckingCode(e){
        this.setState({isValid: e});
    }

    render() {
        return (
            <View style={[styles.wrapper]}>
                <ScrollView>
                    {/* ====== START INFORMASI ====== */}
                    <View style={[Main.container]}>
                        <Text style={[Typography.singleTitle,{marginTop:15}]}>Informasi</Text>
                    </View>
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0}]}>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.label,{marginBottom:15}]}>Paket Data</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Tanggal Transaksi</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>28 Mar 2019 21:23</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Jenis Transaksi</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>Paket Data</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Jenis Layanan</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>Telkomsel - Simpati Data 25.000</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Nomor</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>082114619877</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Harga</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>Rp. 26.000</Text>
                        </View>
                        <View>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Harga</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>Rp. 26.000</Text>
                        </View>
                    </View>

                    <View style={[Main.container,{marginTop:15}]}>
                        <Text style={[Typography.singleTitle,{marginTop:15}]}>Pembayaran</Text>
                    </View>
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0}]}>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Metode Pemayaran</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>CASH</Text>
                        </View>
                        <View>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>VA Number</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>12312391231299</Text>
                        </View>
                    </View>
                    <View style={[Main.container,{marginTop:15,marginBottom:15}]}>
                        <AlertBox type="danger" title={null} text="Transaksi Gagal"/>
                    </View>
                    {/* ====== END INFORMASI ====== */}
                
                </ScrollView>
            </View>

        )
    }
}

export default detailHistoryOrderComponent;