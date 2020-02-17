import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ButtonComponent } from '@directives';
import { Col, Grid, Row} from "react-native-easy-grid";
import { Main,Typography, Variable} from '@styles';
import { styles } from './bpjs.style';

class BpjsConfirmation extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Konfirmasi BPJS",
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
            isSubmit: false
        };
    }

    componentDidMount() {
        console.log(this.props.bpjs)
    }

    submitOrder(e){
        let cart = {
            category_id: "CATBILLER",
            id_channel: "CHN0001",
            product_id: 11,
            product_name: this.props.bpjs.data.providerName,
            product_image_path: this.props.bpjs.data.providerImage,
            biller_id: this.props.bpjs.data.billersId,
            bill_id: 1,
            billertrx:1,
            biller_name: this.props.bpjs.data.title,
            bill_details: this.props.bpjs.data.descriptions,
            quantity: 1,
            sell_price: this.props.bpjs.data.total,
            base_price: this.props.bpjs.data.total,
            product_details:this.props.bpjs.data.providerName,
            additional_data_1: "Oke",
            additional_data_2: "Oke",
            additional_data_3: "Oke",
            totalPayment: this.props.bpjs.data.total,
            inquiry_id: this.props.bpjs.data.inquiryId,
            account_number: this.props.bpjs.bpjsNumber,
            systrace: this.props.bpjs.data.systraceApp,
        };
        let carts = this.props.cart.data;
        carts.push(cart);
        this.props.addToCart(carts);

        let totalPayment = this.props.bpjs.data.total;
        this.props.updatePayment(totalPayment);
        this.props.navigation.navigate(e);
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
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Jenis Layanan</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.bpjs.data.title}</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Provider</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.bpjs.data.providerName}</Text>
                        </View>

                        {/* <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Description</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.listrik.data.descriptions}</Text>
                        </View> */}
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>ID Pelanggan</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.bpjs.bpjsNumber}</Text>
                        </View>
                        <View>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Harga</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.bpjs.data.rp_total}</Text>
                        </View>
                        <View style={[Main.container,{paddingTop:15}]}>
                            { this.props.bpjs.data.body.length > 0 ? 
                                this.props.bpjs.data.body.map((item, x) => (
                                    <View key={x} style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:10}}>
                                        <Grid>
                                            <Col><Text style={{textAlign:'left', fontFamily:Variable.fontLight}}>{item.split(':')[0]}</Text></Col>
                                            <Col><Text style={{textAlign:'right', fontFamily:Variable.fontLight}}>{item.split(':')[1]}</Text></Col>
                                        </Grid>
                                    </View>
                                ))
                            : 
                                null
                            }
                        </View>
                    </View>
                    {/* ====== END INFORMASI ====== */}

                    <View style={[Main.container]}>
                        <View style={{marginTop:30}}/>
                        <ButtonComponent type="primary" text="Selesaikan Pembayaran" onClick={()=> this.submitOrder('Payment')}/>
                        <View style={{marginTop:15}}/>
                        {/* <ButtonComponent type="default" text="Tambahkan ke Keranjang" onClick={()=> this.submitOrder('Home')}/>
                        <View style={{marginTop:15}}/> */}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        bpjs: state.bpjs,
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
)(BpjsConfirmation)