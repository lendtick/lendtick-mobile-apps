import React, { Component } from 'react';
import { ScrollView,View,Text } from 'react-native';
import { Main,Variable,Typography } from '@styles';
import * as accounting from 'accounting';
import { AlertBox } from '@directives';
import { styles } from './history-order.style';

class detailHistoryOrderComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Detail Transaksi",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = {
            detail: null,
            date: null,
            payment: null,
            total: null,
            status: null,
        };
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.setState({
            detail: navigation.state.params.detail,
            date: navigation.state.params.date,
            payment: navigation.state.params.payment,
            status: navigation.state.params.status,
            total: navigation.state.params.total,
        });
    }

    render() {
        return (
            <View style={[styles.wrapper]}>
                <ScrollView>
                    {/* ====== START INFORMASI ====== */}
                    <View style={[Main.container]}>
                        <Text style={[Typography.singleTitle,{marginTop:15}]}>Informasi</Text>
                    </View>
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0}]}>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.detail.biller_name}</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Tanggal Transaksi</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.date}</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Jenis Transaksi</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.detail.biller_name}</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Jenis Layanan</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.detail.product_name}</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Nomer {this.state.detail.biller_id == '9950102' || this.state.detail.biller_id == '9950101' ? 'Meteran' : 'Telepon'}</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.detail.account_number}</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Detail</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.detail.bill_details}</Text>
                        </View>
                        <View>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Harga</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>Rp. {accounting.formatMoney(this.state.total, "", 0, ",", ",")}</Text>
                        </View>
                    </View>

                    <View style={[Main.container,{marginTop:15}]}>
                        <Text style={[Typography.singleTitle,{marginTop:15}]}>Pembayaran</Text>
                    </View>
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0}]}>
                        <View>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Metode Pembayaran</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.payment.name_payment_type}</Text>
                        </View>
                        {this.state.payment.name_payment_type === 'VA' ? 
                        <View style={{borderTopWidth:1,borderColor:'#efefef',paddingTop:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>VA Number</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.payment.number_payment}</Text>
                        </View>
                        : null}
                    </View>
                    <View style={[Main.container,{marginTop:15,marginBottom:15}]}>
                        <AlertBox type={this.state.status.id_workflow_status == "ODSTS99" ? 'danger' : 'info'} title={null} text={this.state.status.workflow_status_name}/>
                    </View>
                    {/* ====== END INFORMASI ====== */}
                
                </ScrollView>
            </View>

        )
    }
}

export default detailHistoryOrderComponent;