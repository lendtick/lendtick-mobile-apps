import React from 'react';
import { View,Text,ScrollView,Alert } from 'react-native';
import { connect } from 'react-redux';
import { Col,Grid } from "react-native-easy-grid";
import * as accounting from 'accounting';
import { ButtonComponent,AlertBox } from '@directives';
import { Main,Variable,Typography } from '@styles';
import paymentService from './payment.service';

class MicroloanPayment extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pembayaran Microloan",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = {
            typeAlert:'info',
            titleAlert:'INFORMASI',
            isSubmit: false,
            saldo: 0,
            plafond: 0,
            unpaid: 0,
            total: 0,
            message: null,
            resMessage:'testing',
            resCode:'0000',
        };
    }

    componentDidMount(){
        this.fetchBalance();
    }

    fetchBalance(){
        paymentService.postBalance({total_purchase: this.props.cart.totalPayment}).then(res =>{
            this.setState({
                saldo: res.data.balance,
                plafond: res.data.plafond,
                unpaid: res.data.unpaid,
                total: res.data.balance - this.props.cart.totalPayment,
                message: res.message
            });
        },err =>{
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchBalance()}],
                {cancelable: true},
            );
        });
    }

    microloanOrder(){
        let moment = require("moment");
        let obj = {
            payroll_period: moment().format("YYYY-MM-DD"),
            amount: this.props.cart.totalPayment
        };

        this.setState({isSubmit: true});
        paymentService.postMicroloanOrder(obj).then(res =>{
            this.createOrder(res.data.id_microloan_credit);
        }, err =>{
            this.setState({isSubmit: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchBalance()}],
                {cancelable: true},
            );
        });
    }

    createOrder(id_microloan_credit){
        let obj = {
            total_billing: this.props.cart.totalPayment,
            id_workflow_status: "ODSTS01",
            id_user_company: 71,
            id_delivery_type: "DLV001",
            name_delivery_type: "Direct",
            cart: this.props.cart.data,
            payment: [
                {
                    id_payment_type: "PAY001",
                    total_payment: this.props.cart.totalPayment,
                    identifier_number: 11,
                    number_payment: id_microloan_credit
                }
            ]
        };

        this.setState({isSubmit: true});
        paymentService.postOrder(obj).then(res =>{
            console.log(res.data);
            if (!res.status || res.status == 0) {
                this.setState({isSubmit: false, resCode:'9999', resMessage:res.data.message_system});
            } else {
                this.setState({isSubmit: false});
                this.props.addToCart([]);
                this.props.updatePayment(0);
                this.props.navigation.navigate('FinishPayment');
            }
            
        }, err =>{
            this.setState({isSubmit: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.createOrder()}],
                {cancelable: true},
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
                            <Col><Text style={Typography.singleText}>Saldo</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Rp {accounting.formatMoney(this.state.saldo, "", 0, ",", ",")}</Text></Col>
                        </Grid>
                    </View>
                    <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1, borderColor: '#dfdfdf'}]}>
                        <Grid>
                            <Col><Text style={Typography.singleText}>Total Belanja</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Rp -{accounting.formatMoney(this.props.cart.totalPayment, "", 0, ",", ",")}</Text></Col>
                        </Grid>
                    </View>
                    <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1, borderColor: '#dfdfdf',marginBottom:15}]}>
                        <Grid>
                            <Col><Text style={Typography.singleText}>Sisa Saldo</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Rp {accounting.formatMoney(this.state.total, "", 0, ",", ",")}</Text></Col>
                        </Grid>
                    </View>
                    {/* ======= End Information ========= */}

                    <View style={[Main.container,{marginTop:15, marginBottom:15}]}>
                        {this.state.message ? 
                            <AlertBox 
                                type={this.state.typeAlert} 
                                title={this.state.titleAlert}
                                text={this.state.message}
                            />
                        : null }

                        <View style={{marginTop:15}}></View>

                        <ButtonComponent type="primary" text="Bayar" onClick={()=> this.microloanOrder()} disabled={this.state.isSubmit || this.state.total <= 0} isSubmit={this.state.isSubmit}/>
                    </View>

                    {
                        this.state.resCode == '9999' ?
                            <View style={[Main.container,{marginTop:15, marginBottom:15}]}>
                                <AlertBox 
                                    type='danger' 
                                    title='ERROR SYSTEM'
                                    text={this.state.resMessage}
                                />
                            </View>
                        : null
                    }
                    
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
)(MicroloanPayment)
