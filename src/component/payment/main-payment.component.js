import React from 'react';
import { ScrollView,View,Text,TouchableHighlight, Dimensions, Alert } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';
import * as accounting from 'accounting';
import { AntDesign } from '@expo/vector-icons';
import { ButtonComponent,Modal,AlertBox } from '@directives';
import { Main,Variable,Typography } from '@styles';

import paymentService from './payment.service';

class MainPaymentComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pembayaran",
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
            selectType: 'va',
            popUpOrder: false,
            idPaymentType: null,
            message: null
        };
    }

    gotoPayment(e){
        switch(e){
            case "va" :
                this.setState({idPaymentType: "PAY003"});
                this.createOrder();
            break;
            case "middleloan" :
                this.setState({idPaymentType: "PAY003"});
            break;
            case "microloan" :
                this.props.navigation.navigate('MicroloanPayment');
            break;
            case "split" :
                this.setState({idPaymentType: "PAY003"});
            break;
        }
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

        this.setState({isSubmit: true,message: null});
        
        paymentService.postOrder(obj).then(res =>{
            this.setState({isSubmit: false});

            if(res.status){
                this.props.addToCart([]);
                this.props.updateVA(res.data.va_number);
                switch(this.state.selectType){
                    case "va" :
                        this.props.navigation.navigate('VAPayment');
                    break;
                    case "middleloan" :
                        this.props.navigation.navigate('MiddlePayment');
                    break;
                    case "split" :
                        this.props.navigation.navigate('SplitPayment');
                    break;
                }
            }else{
                this.setState({message: res.message});
            }
            
        }, err =>{
            console.log(err);
            this.setState({isSubmit: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.createOrder()}],
                {cancelable: true},
            );
        })
    }

    backHome(){
        this.props.addToCart([]);
        this.props.updatePayment(0);
        this.props.navigation.navigate('Home');
    }

    render() { 
        return(
            <View style={{height:'100%',backgroundColor:'white'}}>
                <ScrollView>
                    {/* ======= Start Information ========= */}
                    <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1,borderTopWidth:1,marginBottom:15, borderColor: '#dfdfdf'}]}>
                        <Grid>
                            <Col><Text style={Typography.singleText}>Total Tagihan</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Rp {accounting.formatMoney(this.props.cart.totalPayment, "", 0, ",", ",")}</Text></Col>
                        </Grid>
                    </View>
                    {/* <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1, borderColor: '#dfdfdf'}]}>
                        <Grid>
                            <Col><Text style={Typography.singleText}>Total Belanja</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Rp {accounting.formatMoney(this.props.cart.totalPayment, "", 0, ",", ",")}</Text></Col>
                        </Grid>
                    </View>
                    <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1, borderColor: '#dfdfdf',marginBottom:15}]}>
                        <Grid>
                            <Col><Text style={Typography.singleText}>Total Bayar</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Rp {accounting.formatMoney(this.props.cart.totalPayment, "", 0, ",", ",")}</Text></Col>
                        </Grid>
                    </View> */}
                    <View style={Main.container}>
                        <ButtonComponent type="primary" text="Produk yang dibeli" onClick={()=> this.setState({popUpOrder: true})} disabled={this.props.cart.totalPayment == 0}/>
                    </View>
                    {/* ======= End Information ========= */}

                    {/* ======= Start List Payment ========= */}
                    <View style={Main.container}>
                        <Text style={[Typography.singleTitle,{marginTop:30,marginBottom:15}]}>Pilih Metode pembayaran</Text>
                        
                        <TouchableHighlight onPress={()=> this.setState({selectType: 'va'})} underlayColor="transparent">
                            <View style={{flex: 1, flexDirection: 'row',padding:15, backgroundColor:'white',borderWidth:1,borderBottomWidth:0,borderColor:'#efefef'}}>
                                <AntDesign name={this.state.selectType == 'va' ? "checksquareo" : "closesquareo"} size={14} style={{marginRight: 10, top:2}} color={Variable.colorPrimary} />
                                <Text style={[Typography.singleText,this.state.selectType == 'va' ? {color:Variable.colorPrimary,fontFamily: Variable.fontBold} : null]}>Virtual Account</Text>
                            </View>
                        </TouchableHighlight>

                        {/* <TouchableHighlight onPress={()=> this.setState({selectType: 'middleloan'})} underlayColor="transparent">
                            <View style={{flex: 1, flexDirection: 'row',padding:15, backgroundColor:'white',borderWidth:1,borderColor:'#efefef'}}>
                                <AntDesign name={this.state.selectType == 'middleloan' ? "check-circle" : "circle"} size={14} style={{marginRight: 10, top:2}} color={Variable.colorPrimary} />
                                <Text style={[Typography.singleText,this.state.selectType == 'middleloan' ? {color:Variable.colorPrimary,fontFamily: Variable.fontBold} : null]}>Middleloan</Text>
                            </View>
                        </TouchableHighlight> */}

                        <TouchableHighlight onPress={()=> this.setState({selectType: 'microloan'})} underlayColor="transparent">
                            <View style={{flex: 1, flexDirection: 'row',padding:15, backgroundColor:'white',borderWidth:1,borderColor:'#efefef'}}>
                                <AntDesign name={this.state.selectType == 'microloan' ? "checksquareo" : "closesquareo"} size={14} style={{marginRight: 10, top:2}} color={Variable.colorPrimary} />
                                <Text style={[Typography.singleText,this.state.selectType == 'microloan' ? {color:Variable.colorPrimary,fontFamily: Variable.fontBold} : null]}>Saldo KAI</Text>
                            </View>
                        </TouchableHighlight>

                        {/* <TouchableHighlight onPress={()=> this.setState({selectType: 'split'})} underlayColor="transparent">
                            <View style={{flex: 1, flexDirection: 'row',padding:15, backgroundColor:'white',borderWidth:1,borderTopWidth:0,borderBottomWidth:1,borderColor:'#efefef'}}>
                                <AntDesign name={this.state.selectType == 'split' ? "check-circle" : "circle"} size={14} style={{marginRight: 10, top:2}} color={Variable.colorPrimary} />
                                <Text style={[Typography.singleText,this.state.selectType == 'split' ? {color:Variable.colorPrimary,fontFamily: Variable.fontBold} : null]}>Split (Middleloan & VA)</Text>
                            </View>
                        </TouchableHighlight> */}

                        <View style={{marginTop:15, marginBottom:15}}>
                            
                            {this.state.message ? <View style={{marginBottom:15}}><AlertBox type="danger" title={null} text={this.state.message}/></View> : null} 

                            <ButtonComponent type="primary" text="Pilih" onClick={()=> this.gotoPayment(this.state.selectType)} isSubmit={this.state.isSubmit} disabled={this.props.cart.totalPayment == 0 || this.state.isSubmit}/>
                            <View style={{marginTop:15}}/>
                            <ButtonComponent type="default" text="Batalkan" onClick={()=> this.backHome()} isSubmit={false} disabled={this.state.isSubmit}/>
                            <View style={{marginTop:15}}/>
                            {/* <ButtonComponent type="default" text="Kembali" onClick={()=> this.props.navigation.navigate('Home')}/>
                            <View style={{marginTop:15}}/> */}
                        </View>
                    </View>
                    {/* ======= End List Payment ========= */}

                </ScrollView>

                {/* ====== START Contacts ====== */}
                <Modal 
                    isOpen={this.state.popUpOrder}
                    title="Daftar beli"
                    textRight="Tutup"
                    rightClick={()=> this.setState({popUpOrder: false})}
                    height={Dimensions.get('window').height - (Dimensions.get('window').height * 0.45)}
                    width={Dimensions.get('window').width - 30}
                    textLeft={null}>
                    {this.props.cart.data.map((x,i)=>(
                        <View key={i} style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1, borderColor: '#dfdfdf'}]}>
                            <Text style={[Typography.heading6,{marginBottom:0}]}>{x.biller_name}</Text>
                            <Text style={Typography.singleText}>Rp {accounting.formatMoney(x.totalPayment, "", 0, ",", ",")}</Text>
                        </View>
                    ))}
                </Modal>
                {/* ====== END Contacts ====== */}
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
        updateVA: (e) => dispatch({type: 'UPDATE_VA_NUMBER', vanumber: e}),
        updatePayment: (e) => dispatch({type: 'UPDATE_TOTAL_PAYMENT', totalPayment: e}),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainPaymentComponent)
