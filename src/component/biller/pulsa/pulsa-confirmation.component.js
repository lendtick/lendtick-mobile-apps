import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as accounting from 'accounting';
import { ButtonComponent } from '@directives';
import { Main,Typography, Variable} from '@styles';
import { styles } from './pulsa.style';

class PulsaConfirmation extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Konfirmasi Pulsa",
        titleBillers: [],
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        try{
            this.titleBillers();
        }catch(err){}
    }

    titleBillers(){
        let titleBiller = this.props.pulsa.data.title.split('-');
        this.setState({titleBiller: titleBiller[0]});
    }

    submitOrder(e){
        let cart = {
            category_id: "CATBILLER",
            id_channel: "CHN0001",
            product_id: 11,
            product_name: this.props.pulsa.data.providerName,
            product_image_path: this.props.pulsa.data.providerImage,
            biller_id: this.props.pulsa.data.billersIdPulsa,
            bill_id: 1,
            biller_name: this.props.pulsa.data.title,
            bill_details: this.props.pulsa.data.descriptions,
            billertrx:1,
            quantity: 1,
            sell_price: Number(this.props.pulsa.data.paket_pulsa),
            base_price: Number(this.props.pulsa.data.paket_pulsa),
            product_details: 'Pulsa.' + this.props.pulsa.data.providerName,
            additional_data_1: "Oke",
            additional_data_2: "Oke",
            additional_data_3: "Oke",
            totalPayment: Number(this.props.pulsa.data.paket_pulsa),
            inquiry_id: this.props.pulsa.data.inquiryId,
            account_number: this.props.pulsa.phoneNumber,
        };
        let carts = this.props.cart.data;
        carts.push(cart);
        this.props.addToCart(carts);

        this.props.updatePayment(Number(this.props.pulsa.data.paket_pulsa));
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
                        {/* <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.pulsa.data.title}</Text>
                        </View> */}
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Jenis Layanan</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.titleBiller}</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Nomor Handphone</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.props.pulsa.phoneNumber}</Text>
                        </View>
                        <View>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Harga</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>Rp {accounting.formatMoney(this.props.pulsa.data.paket_pulsa, "", 0, ",", ",")}</Text>
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
