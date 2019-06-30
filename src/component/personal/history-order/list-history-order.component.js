import React, { Component } from 'react';
import { ScrollView,View,Text,TouchableHighlight,Alert,ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Col,Row,Grid } from "react-native-easy-grid";
import * as accounting from 'accounting';
import { Main,Variable,Typography } from '@styles';
import { AlertBox } from '@directives';
import { styles } from './history-order.style';

import personalService from '../personal.service';

class listHistoryOrderComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pembelian Saya",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false
        };
    }

    componentDidMount(){
        this.fetchHistoryOrder();
    }

    fetchHistoryOrder(){
        let moment = require("moment");
        this.setState({loading: true});
        personalService.getListHostoryOrder().then(res =>{
            res['data'].map((x)=>{
                x.date = moment(x.billing_date.substring(0, 10)).format('DD MMM YYYY');             
            });
            this.setState({
                data: res['data'],
                loading: false
            });
            console.log(this.state.data)
        }, err =>{
            this.setState({loading: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchUser()}],
                {cancelable: false},
            );
        });
    }

    render() {
        return (
            <View style={[styles.wrapper]}>
                {this.state.loading ? 
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="small" color="#6a6a6a" />
                </View>
                :
                <View style={{height:'100%'}}>
                    <ScrollView>
                        <View style={{padding:15}}>
                            {this.state.data.map((x,i)=>(
                                <View key={i} style={styles.itemHistory}>
                                    <View style={styles.headerHistory}>
                                        <Text style={styles.descHistory}>{x.date}</Text>
                                        <Text style={styles.descHistory}>{x.billing_number}</Text>
                                    </View>
                                    <View style={[styles.bodyHistory,{borderTopWidth:1,borderColor: '#efefef'}]}>
                                        <Text style={styles.titleHistory}>{x.order_detail[0].biller_name}</Text>
                                        <Text style={styles.descHistory}>{x.order_detail[0].product_name}</Text>
                                    </View>
                                    <View style={[styles.bodyHistory,{borderTopWidth:1,borderColor: '#efefef'}]}>
                                        <Text style={styles.titleHistory}>Nomer {x.order_detail[0].biller_id == '9950102' || x.order_detail[0].biller_id == '9950101' ? 'Meteran' : 'Telepon'}</Text>
                                        <Text style={styles.descHistory}>{x.order_detail[0].account_number}</Text>
                                    </View>
                                    <View style={[styles.bodyHistory,{borderTopWidth:1,borderColor: '#efefef'}]}>
                                        <Text style={styles.titleHistory}>Total Pembayaran</Text>
                                        <Text style={styles.descHistory}>Rp. {accounting.formatMoney(Number(x['total_billing']), "", 0, ",", ",")}</Text>
                                    </View>
                                    <AlertBox type={x.id_workflow_status == "ODSTS99" ? 'danger' : 'info'} title={null} text={x.workflow_status_name}/>
                                    <View style={{borderTopWidth:1,borderColor: '#efefef'}}>
                                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('DetailHistoryOrder',{
                                            detail:x.order_detail[0],
                                            date: x.date,
                                            payment: x.order_payment[0],
                                            total: x.total_billing,
                                            status: {
                                                id_workflow_status: x.id_workflow_status,
                                                workflow_status_name: x.workflow_status_name,
                                            }
                                        })} underlayColor="#fafafa">
                                            <Text style={styles.linkDefault}>Lihat Detail</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                }
            </View>

        )
    }
}

export default listHistoryOrderComponent;