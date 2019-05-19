import React from 'react';
import { View,Text,ScrollView } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';
import { AlertBox,ButtonComponent } from '@directives';
import { Main,Variable,Typography } from '@styles';

import paymentService from './payment.service';

class VAComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pembayaran",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false
        };
    }
    
    createOrder(){
        let obj = {
            total_billing: this.props.cart.totalPayment,
            id_workflow_status: "ODSTS01",
            id_user_company: 71,
            id_delivery_type: "DLV001",
            name_delivery_type: "Direct",
            cart: this.props.cart.data,
            payment: [
                {
                    id_payment_type: "PAY003",
                    total_payment: this.props.cart.totalPayment,
                    identifier_number: 11
                }
            ]
        };

        this.setState({isSubmit: true});
        paymentService.postOrder(obj).then(res =>{
            this.setState({isSubmit: false});
            this.props.addToCart([]);
            this.props.updatePayment(0);
            this.props.navigation.navigate('FinishPayment');
        }, err =>{
            this.setState({isSubmit: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.submitLoan()}],
                {cancelable: false},
            );
        })
    }

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
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>8889991710103</Text></Col>
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
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Rp {this.props.cart.totalPayment.toLocaleString()}</Text></Col>
                        </Grid>
                    </View>
                    {/* ======= End Information ========= */}

                    <View style={Main.container}>
                        <Text style={[Typography.singleTitle,{marginTop:15,marginBottom:15}]}>Tatacara Pembayaran</Text>
                        <AlertBox type="info" text={[
                            'Masukkan kartu ATM dan PIN',
                            'Pilih menu "Bayar/Beli"',
                            'Pilih menu "Lainnya", hingga menemukan menu "Multipayment"',
                            'Masukkan Kode Biller KAI  (XX), lalu pilih Benar',
                            'Masukkan "Nomor Virtual Account" , lalu pilih tombol Benar',
                            'Masukkan Angka "1" untuk memilih tagihan, lalu pilih tombol Ya',
                            'Akan muncul konfirmasi pembayaran, lalu pilih tombol Ya8. Simpan struk sebagai bukti pembayaran Anda'
                        ]}/>

                        <View style={{marginTop:15, marginBottom:15}}>
                            <ButtonComponent type="primary" text="Bayar" onClick={()=> this.createOrder()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/>
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
        addToCart: (e) => dispatch({type: 'UPDATE_CART', data: e}),
        updatePayment: (e) => dispatch({type: 'UPDATE_TOTAL_PAYMENT', totalPayment: e})
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VAComponent)
