import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ButtonComponent } from '@directives';
import { Main,Typography, Variable} from '@styles';
import { styles } from './air.style';
import AutoHeightImage from 'react-native-auto-height-image';

class AirConfirmation extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Konfirmasi Pembayaran Air",
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
            product_name: this.props.air.data.providerName,
            product_image_path: this.props.air.data.providerImage,
            biller_id: this.props.air.data.billersId,
            bill_id: 1,
            billertrx:1,
            biller_name: this.props.air.data.title,
            bill_details: this.props.air.data.descriptions,
            quantity: 1,
            sell_price: this.props.air.data.total,
            base_price: this.props.air.data.total,
            product_details: this.props.air.token+ '.AIR.' + this.props.air.data.providerName,
            additional_data_1: "Oke",
            additional_data_2: "Oke",
            additional_data_3: "Oke",
            totalPayment: this.props.air.data.total,
            inquiry_id: this.props.air.data.inquiryId,
            account_number: this.props.air.token,
            systrace: this.props.air.data.systraceApp,
        };
        let carts = this.props.cart.data;
        carts.push(cart);
        this.props.addToCart(carts);

        let totalPayment = this.props.air.data.total;
        this.props.updatePayment(totalPayment);
        this.props.navigation.navigate(e);
    }


    render() {
        return (
            <View style={[styles.wrapper,{backgroundColor: Variable.backgroundGray}]}>
                <ScrollView>
                    {/* ====== START INFORMASI ====== */}
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0}]}>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                        <Text style={[Typography.singleText,{marginBottom:5}]}>Jenis Layanan</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.air.data.title}</Text>
                        </View>
                        {/* <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Description</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.air.data.descriptions}</Text>
                        </View> */}
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>ID Pelanggan</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.air.token}</Text>
                        </View>
                        <View>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Harga</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.air.data.rp_total}</Text>
                        </View>
                    </View>
                    {/* ====== END INFORMASI ====== */}

                    <View style={[Main.container]}>
                        <View style={{marginTop:30}}/>
                        <ButtonComponent type="primary" text="Selesaikan Pembayaran" onClick={()=> this.submitOrder('Payment')}/>
                        <View style={{marginTop:15}}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        air: state.air,
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
)(AirConfirmation)
// export default AirConfirmation;