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
            billDetails:[]
        };
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.setState({
            billDetails:JSON.parse(navigation.state.params.detail.bill_details),
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
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:5,marginBottom:10}]}>
                        <Text style={{fontFamily:Variable.fontLight}}>Status</Text>
                        <Text style={this.state.status.id_workflow_status == "ODSTS01" ? styles.singleStatusWarning : styles.singleStatusSuccess}>{this.state.status.workflow_status_name}</Text>
                    </View>
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0,marginBottom:10}]}>
                        {/* <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.detail.biller_name}</Text>
                        </View> */}
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={{fontFamily:Variable.fontLight}}>Tanggal Transaksi</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.date}</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={{fontFamily:Variable.fontLight}}>Jenis Transaksi</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.detail.biller_name}</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={{fontFamily:Variable.fontLight}}>Jenis Layanan</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>{this.state.detail.product_name}</Text>
                        </View>
                        <View style={{marginBottom:15}}>
                            <Text style={{fontFamily:Variable.fontLight}}>Nomer {this.state.detail.biller_id == '9950102' || this.state.detail.biller_id == '9950101' ? 'Meteran' : 'Telepon'}</Text>
                            <Text style={[Typography.label]}>{this.state.detail.account_number}</Text>
                        </View>
                    </View>
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0,marginBottom:10}]}>
                        <View style={{marginBottom:15}}>
                            <Text style={{fontFamily:Variable.fontLight}}>Rincian</Text>
                            {this.state.billDetails ?
                                this.state.billDetails.map((data,i) => (
                                <Text key={i} style={{fontFamily:Variable.fontMedium}}>{data}</Text>
                            )):null}
                        </View>
                    </View>
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0,marginBottom:10}]}>
                        <View>
                            <Text style={{fontFamily:Variable.fontLight}}>Harga</Text>
                            <Text style={styles.priceHistory}>Rp. {accounting.formatMoney(this.state.total, "", 0, ",", ",")}</Text>
                        </View>
                    </View>
                    
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0}]}>
                        <View>
                            <Text style={{fontFamily:Variable.fontLight, marginBottom:5}}>Metode Pembayaran</Text>
                            <Text style={{fontFamily:Variable.fontMedium, marginBottom:15}}>{this.state.payment.name_payment_type}</Text>
                        </View>
                        {this.state.payment.name_payment_type === 'VA' ? 
                        <View style={{borderTopWidth:1,borderColor:'#efefef',paddingTop:15}}>
                            <Text style={{fontFamily:Variable.fontLight, marginBottom:5}}>VA Number</Text>
                            <Text style={{fontFamily:Variable.fontMedium, marginBottom:15}}>{this.state.payment.number_payment}</Text>
                        </View>
                        : null}
                    </View>
                    {/* ====== END INFORMASI ====== */}
                
                </ScrollView>
            </View>

        )
    }
}

export default detailHistoryOrderComponent;