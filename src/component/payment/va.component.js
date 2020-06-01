import React from 'react';
import { View,Text,ScrollView, Clipboard,Alert } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { AlertBox,ButtonComponent, Panel } from '@directives';
import { Main,Variable,Typography } from '@styles';
import * as accounting from 'accounting';
import { TouchableOpacity } from 'react-native-gesture-handler';

class VAComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pembayaran",
        headerTitleStyle: Variable.headerTitleStyle,
        headerStyle: {
            elevation:0,
            backgroundColor: '#42A9A0',
            borderBottomWidth: 0,
        },
        headerTintColor: '#ffffff',
        headerLeft: null
    });

    constructor(props) {
        super(props);
        this.state = {
            collapse1: false,
            collapse2: false,
            collapse3: false,
            collapse4: false,
            collapse5: false,
        };
    }

    writeToClipboard = async () => {
        await Clipboard.setString(this.props.cart.vanumber);
        Alert.alert(
            'Info',
            'VA berhasil disalin',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    };

    render() { 
        return(
            <View style={{height:'100%',backgroundColor:'white'}}>
                <ScrollView>
                    {/* ======= Start Information ========= */}
                    <View style={Main.container}>
                        <Text style={[Typography.singleTitle,{marginTop:15}]}>Informasi</Text>
                    </View>
                    <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1,borderTopWidth:1, borderColor: '#dfdfdf'}]}>
                        <Grid>
                            <Col><Text style={Typography.singleText}>No VA</Text></Col>
                            <Col style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>{this.props.cart.vanumber}</Text>
                                <TouchableOpacity onPress={() => this.writeToClipboard()}>
                                    <AntDesign name="copy1" size={18} style={{marginLeft: 10, marginBottom:0}} color={Variable.colorContent} />
                                </TouchableOpacity>
                            </Col>
                        </Grid>
                    </View>
                    <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1, borderColor: '#dfdfdf'}]}>
                        <Grid>
                            <Col><Text style={Typography.singleText}>Bank</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Permata</Text></Col>
                        </Grid>
                    </View>
                    <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1, borderColor: '#dfdfdf',marginBottom:15}]}>
                        <Grid>
                            <Col><Text style={Typography.singleText}>Total Belanja</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Rp {accounting.formatMoney(this.props.cart.totalPayment, "", 0, ",", ",")}</Text></Col>
                        </Grid>
                    </View>
                    {/* ======= End Information ========= */}
                    <View style={Main.container}>
                        <Text style={[Typography.singleTitle,{marginTop:15}]}>Tata Cara Pembayaran</Text>
                    </View>

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
                                'Transaksi selesa',
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
                        {/* <Text style={[Typography.singleTitle,{marginTop:15,marginBottom:15}]}>Tatacara Pembayaran</Text>
                        <AlertBox type="info" text={[
                            'Masukkan kartu ATM dan PIN',
                            'Pilih menu "Bayar/Beli"',
                            'Pilih menu "Lainnya", hingga menemukan menu "Multipayment"',
                            'Masukkan Kode Biller KAI  (XX), lalu pilih Benar',
                            'Masukkan "Nomor Virtual Account" , lalu pilih tombol Benar',
                            'Masukkan Angka "1" untuk memilih tagihan, lalu pilih tombol Ya',
                            'Akan muncul konfirmasi pembayaran, lalu pilih tombol Ya8. Simpan struk sebagai bukti pembayaran Anda'
                        ]}/> */}

                        <View style={{marginTop:15, marginBottom:15}}>
                            <ButtonComponent type="primary" text="Selesai" onClick={()=>{
                                this.props.navigation.navigate('ListHistoryOrder'); 
                                this.props.updatePayment(0);
                            }}/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        ) 
    }
}


const mapStateToProps = (state) => {
	return {
        cart: state.cart
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
        updatePayment: (e) => dispatch({type: 'UPDATE_TOTAL_PAYMENT', totalPayment: e}),
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VAComponent)
