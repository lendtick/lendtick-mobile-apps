import React, { Component } from 'react';
import { ScrollView,View,Text, Clipboard,TouchableOpacity, Alert } from 'react-native';
import { Main,Variable,Typography } from '@styles';
import { AntDesign } from '@expo/vector-icons';
import * as accounting from 'accounting';
import { AlertBox,ButtonComponent, Panel } from '@directives';
import { styles } from './history-order.style';

class detailHistoryOrderComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Detail Transaksi",
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
        this.state = {
            detail: null,
            date: null,
            payment: null,
            total: null,
            status: null,
            billDetails:[]
        };
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.setState({
            billDetails:JSON.parse(navigation.state.params.detail.bill_details),
            detail: navigation.state.params.detail,
            date: navigation.state.params.date,
            payment: navigation.state.params.payment,
            status: navigation.state.params.status,
            total: navigation.state.params.total,
        });
    }

    writeToClipboard = async () => {
        await Clipboard.setString(this.state.payment.number_payment);
        Alert.alert(
            'Info',
            'VA berhasil disalin',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    };

    renderVA(){

    }

    render() {
        return (
            <View style={[styles.wrapper]}>
                <ScrollView>
                    {/* ====== START INFORMASI ====== */}
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:5,marginBottom:10}]}>
                        <Text style={{fontFamily:Variable.fontLight}}>Status</Text>
                        <Text style={this.state.status.id_workflow_status == "ODSTS01" ? styles.singleStatusWarning : styles.singleStatusSuccess}>{this.state.status.workflow_status_name}</Text>
                    </View>
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0,marginBottom:10}]}>
                        {/* <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.detail.biller_name}</Text>
                        </View> */}
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={{fontFamily:Variable.fontLight}}>Tanggal Transaksi</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.date}</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={{fontFamily:Variable.fontLight}}>Jenis Transaksi</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.detail.biller_name.split('-')[0]}</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={{fontFamily:Variable.fontLight}}>Jenis Layanan</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.detail.product_name}</Text>
                        </View>
                        <View style={{marginBottom:15}}>
                            <Text style={{fontFamily:Variable.fontLight}}>Nomer {this.state.detail.biller_id == '9950102' || this.state.detail.biller_id == '9950101' ? 'Meteran' : 'Telepon'}</Text>
                            <Text style={[Typography.label]}>{this.state.detail.account_number}</Text>
                        </View>
                    </View>
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0,marginBottom:10}]}>
                        <View style={{marginBottom:15}}>
                            <Text style={{fontFamily:Variable.fontLight}}>Rincian</Text>
                            {this.state.billDetails ?
                                this.state.billDetails.map((data,i) => (
                                <Text key={i} style={{fontFamily:Variable.fontMedium}}>{data}</Text>
                            )):null}
                        </View>
                    </View>
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0,marginBottom:10}]}>
                        <View>
                            <Text style={{fontFamily:Variable.fontLight}}>Harga</Text>
                            <Text style={styles.priceHistory}>Rp. {accounting.formatMoney(this.state.total, "", 0, ",", ",")}</Text>
                        </View>
                    </View>
                    
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0}]}>
                        <View>
                            <Text style={{fontFamily:Variable.fontLight, marginBottom:5}}>Metode Pembayaran</Text>
                            <Text style={{fontFamily:Variable.fontMedium, marginBottom:15}}>{this.state.payment.name_payment_type}</Text>
                            {console.log(this.state.payment)}
                        </View>
                        {this.state.payment.name_payment_type === 'VA' ? 
                        <View style={{borderTopWidth:1,borderColor:'#efefef',paddingTop:15}}>
                            <Text style={{fontFamily:Variable.fontLight, marginBottom:5}}>VA Number</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Text style={{fontFamily:Variable.fontMedium, marginBottom:15}}>{this.state.payment.number_payment}</Text>
                                <TouchableOpacity onPress={() => this.writeToClipboard()}>
                                    <AntDesign name="copy1" size={18} style={{marginLeft: 10, marginBottom:15}} color={Variable.colorContent} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        : null}
                    </View>

                    {this.state.payment.id_payment_type == 'PAY003' ?
                    <View style={Main.container}>
                        <Text style={[Typography.singleTitle,{marginTop:15}]}>Tata Cara Pembayaran</Text>
                    </View>
                    : null }

                    {this.state.payment.id_payment_type == 'PAY003' ?
                    <View style={[Main.container, {paddingHorizontal: 0}]}>
                        <Panel title="Pembayaran Melalui ATM Permata" onClick={() => this.setState(prevState => ({collapse1: !prevState.collapse1}))} collapse={this.state.collapse1}>
                            <AlertBox type="info" text={[
                                'Masukkan PIN',
                                'Pilih menu TRANSAKSI LAINNYA',
                                'Pilih menu PEMBAYARAN',
                                'Pilih menu PEMBAYARAN LAINNYA',
                                'Pilih menu VIRTUAL ACCOUNT',
                                'Masukkan nomor VIRTUAL ACCOUNT yang tertera pada halaman konfirmasi, dan tekan BENAR',
                                'Pilih rekening yang menjadi sumber dana yang akan didebet, lalu tekan YA untuk konfirmasi transaksi',
                            ]}/>
                        </Panel>
                        <Panel title="Pembayaran Melalui ATM Prima" onClick={() => this.setState(prevState => ({collapse2: !prevState.collapse2}))} collapse={this.state.collapse2}>
                            <AlertBox type="info" text={[
                                'Masukkan PIN',
                                'Pilih menu TRANSAKSI LAINNYA',
                                'Pilih menu KE REK BANK LAIN',
                                'Masukkan kode sandi Bank Permata (013) kemudian tekan BENAR',
                                'Masukkan nomor VIRTUAL ACCOUNT yang tertera pada halaman konfirmasi, dan tekan BENAR',
                                'Masukkan jumlah pembayaran sesuai dengan yang ditagihkan dalam halaman konfirmasi',
                                'Pilih BENAR untuk menyetujui transaksi tersebut',
                            ]}/>
                        </Panel>
                        <Panel title="Pembayaran Melalui ATM Bersama" onClick={() => this.setState(prevState => ({collapse3: !prevState.collapse3}))} collapse={this.state.collapse3}>
                            <AlertBox type="info" text={[
                                'Masukkan PIN',
                                'Pilih menu TRANSAKSI',
                                'Pilih menu KE REK BANK LAIN',
                                'Masukkan kode sandi Bank Permata (013) diikuti dengan nomor VIRTUAL ACCOUNT yang tertera pada halaman konfirmasi, dan tekan BENAR',
                                'Masukkan jumlah pembayaran sesuai dengan yang ditagihkan dalam halaman konfirmasi',
                                'Pilih BENAR untuk menyetujui transaksi tersebut',
                            ]}/>
                        </Panel>
                        <Panel title="Pembayaran Melalui Permata Mobile" onClick={() => this.setState(prevState => ({collapse4: !prevState.collapse4}))} collapse={this.state.collapse4}>
                            <AlertBox type="info" text={[
                                'Buka aplikasi PermataMobile Internet (Android/iPhone)',
                                'Masukkan User ID & Password',
                                'Pilih Pembayaran Tagihan',
                                'Pilih Virtual Account',
                                'Masukkan 16 digit nomor Virtual Account yang tertera pada halaman konfirmasi',
                                'Masukkan nominal pembayaran sesuai dengan yang ditagihkan',
                                'Muncul Konfirmasi pembayaran',
                                'Masukkan otentikasi transaksi/token',
                                'Transaksi selesai',
                            ]}/>
                        </Panel>
                        <Panel title="Pembayaran Melalui Permata Net" onClick={() => this.setState(prevState => ({collapse5: !prevState.collapse5}))} collapse={this.state.collapse5}>
                            <AlertBox type="info" text={[
                                'Buka website PermataNet: https://new.permatanet.com',
                                'Masukkan user ID & Password',
                                'Pilih Pembayaran Tagihan',
                                'Pilih Virtual Account',
                                'Masukkan 16 digit nomor Virtual Account yang tertera pada halaman konfirmasi',
                                'Masukkan nominal pembayaran sesuai dengan yang ditagihkan',
                                'Muncul Konfirmasi pembayaran',
                                'Masukkan otentikasi transaksi/token',
                                'Transaksi selesai',
                            ]}/>
                        </Panel>

                    </View> : null }
                    {/* ====== END INFORMASI ====== */}
                
                </ScrollView>
            </View>

        )
    }
}

export default detailHistoryOrderComponent;
