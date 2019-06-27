import React, { Component } from 'react';
import { ScrollView,View,Text,TouchableHighlight } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Col,Row,Grid } from "react-native-easy-grid";
import { Main,Variable,Typography } from '@styles';
import { AlertBox } from '@directives';
import { styles } from './history-order.style';

class listHistoryOrderComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pembelian Saya",
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
                    <View style={{padding:15}}>
                        <View style={styles.itemHistory}>
                            <View style={styles.headerHistory}>
                                <Text style={styles.descHistory}>28 Mar 2019 21:23</Text>
                                <Text style={styles.descHistory}>INV/20190321/123123123</Text>
                            </View>
                            <AlertBox type="danger" title={null} text="Transaksi Gagal"/>
                            <View style={styles.bodyHistory}>
                                <Text style={styles.titleHistory}>Paket Data</Text>
                                <Text style={styles.descHistory}>Telkomsel - Simpati Data 25.000</Text>
                            </View>
                            <View style={[styles.bodyHistory,{borderTopWidth:1,borderColor: '#efefef'}]}>
                                <Text style={styles.titleHistory}>Nomer Telepon</Text>
                                <Text style={styles.descHistory}>082114619877</Text>
                            </View>
                            <View style={[styles.bodyHistory,{borderTopWidth:1,borderColor: '#efefef'}]}>
                                <Text style={styles.titleHistory}>Total Pembayaran</Text>
                                <Text style={styles.descHistory}>Rp. 26.000</Text>
                            </View>
                            <View style={{borderTopWidth:1,borderColor: '#efefef'}}>
                                <TouchableHighlight onPress={()=> this.props.navigation.navigate('DetailHistoryOrder')} underlayColor="#fafafa">
                                    <Text style={styles.linkDefault}>Lihat Detail</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.itemHistory}>
                            <View style={styles.headerHistory}>
                                <Text style={styles.descHistory}>28 Mar 2019 21:23</Text>
                                <Text style={styles.descHistory}>INV/20190321/123123123</Text>
                            </View>
                            <AlertBox type="success" title={null} text="Transaksi Berhasil"/>
                            <View style={styles.bodyHistory}>
                                <Text style={styles.titleHistory}>Paket Data</Text>
                                <Text style={styles.descHistory}>Telkomsel - Simpati Data 25.000</Text>
                            </View>
                            <View style={[styles.bodyHistory,{borderTopWidth:1,borderColor: '#efefef'}]}>
                                <Text style={styles.titleHistory}>Nomer Telepon</Text>
                                <Text style={styles.descHistory}>082114619877</Text>
                            </View>
                            <View style={[styles.bodyHistory,{borderTopWidth:1,borderColor: '#efefef'}]}>
                                <Text style={styles.titleHistory}>Total Pembayaran</Text>
                                <Text style={styles.descHistory}>Rp. 26.000</Text>
                            </View>
                            <View style={{borderTopWidth:1,borderColor: '#efefef'}}>
                                <TouchableHighlight onPress={()=> this.props.navigation.navigate('DetailHistoryOrder')} underlayColor="#fafafa">
                                    <Text style={styles.linkDefault}>Lihat Detail</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>

        )
    }
}

export default listHistoryOrderComponent;