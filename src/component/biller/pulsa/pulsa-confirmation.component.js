import React from 'react';
import { View, Text, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { FooterButton } from '@directives';
import { Main,Typography, Variable} from '@styles';
import { styles } from './pulsa.style';

import billerService from '../biller.service';

class PulsaConfirmation extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Konfirmasi Pulsa",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false
        };
    }

    submit(){
        this.setState({isSubmit: true});
        let obj = {
            "total_billing": 50000,
            "id_workflow_status": "ODSTS01",
            "id_user_company": 71,
            "id_delivery_type": "DLV001",
            "name_delivery_type": "Direct",
            "cart": [
                {
                    "category_id": 11,
                    "id_channel": "CHN0001",
                    "product_id": 11,
                    "product_name": "biller pulsa",
                    "product_image_path": "biller pulsa",
                    "biller_id": 1222,
                    "bill_id": 1,
                    "biller_name": "pulsa tsel",
                    "bill_details": "keterangan",
                    "quantity": 1,
                    "sell_price": 1,
                    "base_price": 1,
                    "product_details": 1,
                    "additional_data_1": "Oke",
                    "additional_data_2": "Oke",
                    "additional_data_3": "Oke"
                }
            ]
        };
        billerService.postOrder(obj).then(res =>{
            this.setState({isSubmit: false});
            this.props.navigation.navigate('Payment');
        });
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
                </ScrollView>

                {/* ====== START FOOTER ====== */}
                <FooterButton 
                    text={this.props.pulsa.data.rp_total} 
                    disabled={this.state.isSubmit}
                    isSubmit={this.state.isSubmit}
                    textButton="Konfirmasi" onClick={()=> this.submit()}/>
                {/* ====== END FOOTER ====== */}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        pulsa: state.pulsa
	}
}
const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PulsaConfirmation)
