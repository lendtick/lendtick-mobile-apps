import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ButtonComponent } from '@directives';
import { Main,Typography, Variable} from '@styles';
import { styles } from './paket-data.style';

class PaketDataConfirmation extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Konfirmasi Paket Data",
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

    submitOrder(e){
        let cart = {
            category_id: "CATBILLER",
            id_channel: "CHN0001",
            product_id: 11,
            product_name: this.props.paketData.data.providerName,
            product_image_path: this.props.paketData.data.providerImage,
            biller_id: this.props.paketData.data.billersIdPaketData,
            bill_id: this.props.paketData.data.bill_id,
            billertrx:1,
            biller_name: this.props.paketData.data.title.split('-')[0].trim() || '',
            bill_details: this.props.paketData.data.descriptions,
            quantity: 1,
            sell_price: this.props.paketData.data.total,
            base_price: this.props.paketData.data.priceToPay,
            product_details: 'PaketData.' + this.props.paketData.data.providerName,
            additional_data_1: "Oke",
            additional_data_2: "Oke",
            additional_data_3: "Oke",
            totalPayment: this.props.paketData.data.total,
            inquiry_id: this.props.paketData.data.inquiryId,
            systrace: this.props.paketData.data.systracePaket,
            account_number: this.props.paketData.phoneNumber,
        };
        let carts = this.props.cart.data;
        carts.push(cart);
        this.props.addToCart(carts);

        let totalPayment = this.props.cart.totalPayment + this.props.paketData.data.total;
        this.props.updatePayment(totalPayment);
        this.props.navigation.navigate(e);
    }

    render() {
        return (
            <View style={[styles.wrapper,{backgroundColor: Variable.backgroundGray}]}>
                <ScrollView>
                    {/* ====== START INFORMASI ====== */}
                    {console.log(this.props.paketData.data)}
                    <View style={[Main.container]}>
                        <Text style={[Typography.singleTitle,{marginTop:15}]}>Informasi</Text>
                    </View>
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0}]}>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.paketData.data.title.split('-')[0].trim() || ''}</Text>
                        </View> 
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Phone Number</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.paketData.phoneNumber}</Text>
                        </View>
                        <View>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Harga</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.paketData.data.rp_total}</Text>
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
        paketData: state.paketData,
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
)(PaketDataConfirmation)