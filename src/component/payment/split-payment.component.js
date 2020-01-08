import React from 'react';
import { View,Text,ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Col,Grid } from "react-native-easy-grid";
import { ButtonComponent,InputMask } from '@directives';
import { Main,Variable,Typography } from '@styles';
import * as accounting from 'accounting';

class SplitPayment extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pembayaran Split",
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
            saldo: 500000,
            calcSaldo: 500000,
            middleloanCount: "0",
            vaCount: 0,
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
                    id_payment_type: "PAY004",
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

    calcSaldo(e){
        let middleCount = Number(e.replace(/,/g, '').replace('Rp ', ''));
        if(middleCount > this.state.saldo){
            this.setState({calcSaldo: 0});
        }else{
            let calcSaldo = this.state.saldo - middleCount;
            this.setState({calcSaldo: calcSaldo});
        }
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
                            <Col><Text style={Typography.singleText}>Total Belanja</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Rp  {accounting.formatMoney(this.props.cart.totalPayment, "", 0, ",", ",")}</Text></Col>
                        </Grid>
                    </View>
                    {/* ======= End Information ========= */}

                    <View style={[Main.container,{marginTop:15, marginBottom:15}]}>
                        <InputMask 
                            label="Middleloan"
                            iconName={null}
                            keyboardType="numeric"
                            placeholder="Masukan jumlah nominal"
                            value={this.state.middleloanCount}
                            onChange={(middleloanCount) =>{
                                this.setState({middleloanCount});
                                this.calcSaldo(middleloanCount);
                            }}/>
                        <Text style={[Typography.singleText,{marginTop:-10,marginBottom:15,fontSize:12}]}>Max : Rp {accounting.formatMoney(this.state.saldo, "", 0, ",", ",")}</Text>

                        <InputMask 
                            label="VA"
                            iconName={null}
                            keyboardType="numeric"
                            placeholder="Masukan jumlah nominal"
                            value={this.state.calcSaldo.toString()}
                            disabled={true}/>

                        <ButtonComponent type="primary" text="Bayar" onClick={()=> this.createOrder()} disabled={this.state.isSubmit || this.state.calcSaldo === 0} isSubmit={this.state.isSubmit}/>
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
)(SplitPayment)