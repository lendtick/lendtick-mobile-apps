import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ButtonComponent } from '@directives';
import { Main,Typography, Variable} from '@styles';
import { styles } from './pulsa.style';

class PulsaConfirmation extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Konfirmasi Pulsa",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = {};
    }

    submitOrder(e){
        let cart = {
            category_id: 11,
            id_channel: "CHN0001",
            product_id: 11,
            product_name: this.props.pulsa.data.providerName,
            product_image_path: this.props.pulsa.data.providerImage,
            biller_id: this.props.pulsa.data.billersIdPulsa,
            bill_id: 1,
            biller_name: this.props.pulsa.data.title,
            bill_details: this.props.pulsa.data.descriptions,
            quantity: 1,
            sell_price: this.props.pulsa.data.total,
            base_price: this.props.pulsa.data.total,
            product_details: 'Pulsa.' + this.props.pulsa.data.providerName,
            additional_data_1: "Oke",
            additional_data_2: "Oke",
            additional_data_3: "Oke",
            totalPayment: this.props.pulsa.data.total,
            inquiry_id: this.props.pulsa.data.inquiryId,
            account_number: this.props.pulsa.phoneNumber,
        };
        let carts = this.props.cart.data;
        carts.push(cart);
        this.props.addToCart(carts);

        let totalPayment = this.props.cart.totalPayment + this.props.pulsa.data.total;
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
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.pulsa.data.title}</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Deskripsi</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.pulsa.data.descriptions}</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Phone Number</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.pulsa.phoneNumber}</Text>
                        </View>
                        <View>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Harga</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.pulsa.data.rp_total}</Text>
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
        pulsa: state.pulsa,
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
)(PulsaConfirmation)
