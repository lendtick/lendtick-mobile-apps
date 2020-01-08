import React, { Component } from 'react';
import { ScrollView,View,Text,TouchableHighlight,Alert,ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Col,Row,Grid } from "react-native-easy-grid";
import * as accounting from 'accounting';
import { Main,Variable,Typography } from '@styles';
import { AlertBox } from '@directives';
import { styles } from './history-order.style';
import { FooterButton,Modal } from '@directives';

import personalService from '../personal.service';

class listHistoryOrderComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pembelian Saya",
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
            data: [],
            loading: false
        };
    }

    componentDidMount(){
        this._isMounted = true;
        this.fetchHistoryOrder();
    }

    fetchHistoryOrder(){
        let moment = require("moment");
        this.setState({loading: true});
        personalService.getListHostoryOrder().then(res =>{
            if(res){
                res['data'].map((x)=>{
                    x.date = moment(x.billing_date.substring(0, 10)).format('DD MMM YYYY');             
                });
                this.setState({
                    data: res['data'],
                    loading: false
                });
                console.log(this.state.data)
            }
            
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

    fetchUser(){
        this.setState({loading: false});
        personalService.getInfoUser().then(res =>{
            let dataUser = res['data'];
            this.props.setGetData(dataUser);
            let moment = require("moment");
            let dateBecomeMember = dataUser.date_become_member ? moment(dataUser.date_become_member.substring(0, 10)).add(1800, 'days').format('DD MMM YYYY') : '-';
            // this.setState({
            //     name: dataUser.name,
            //     id: dataUser.id_koperasi,
            //     validDate: "Valid date : " + dateBecomeMember,
            //     loading: false
            // });
        }, err =>{
            this.setState({loading: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                {cancelable: false},
            );
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
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
                                    <View style={x.id_workflow_status == "ODSTS01" ? styles.statusHistoryWarning: styles.statusHistorySuccess}>
                                        <Text style={{textAlign: 'center'}}>{x.workflow_status_name}</Text>
                                    </View>
                                    <View style={styles.headerHistory}>
                                        <Text style={styles.descHistory}>{x.date}</Text>
                                        <Text style={styles.invoiceHistory}>{x.billing_number}</Text>
                                    </View>
                                    <View style={[styles.bodyHistory,{borderTopWidth:1,borderColor: '#efefef'}]}>
                                        <Text style={styles.titleHistory}>{'Nama Produk : ' + x.order_detail[0].product_name}</Text>
                                        <Text style={styles.descHistory}>{x.order_detail[0].biller_name.split('-')[0]}</Text>
                                    </View>
                                    <View style={[styles.bodyHistory,{borderTopWidth:1,borderColor: '#efefef'}]}>
                                        <Text style={styles.titleHistory}>Nomer {x.order_detail[0].biller_id == '9950102' || x.order_detail[0].biller_id == '9950101' ? 'Meteran' : 'Telepon'}</Text>
                                        <Text style={styles.descHistory}>{x.order_detail[0].account_number}</Text>
                                    </View>
                                    <View style={[styles.bodyHistory,{borderTopWidth:1,borderColor: '#efefef'}]}>
                                        <Text style={styles.titleHistory}>Total Pembayaran</Text>
                                        <Text style={styles.priceHistory}>Rp. {accounting.formatMoney(Number(x['total_billing']), "", 0, ",", ",")}</Text>
                                    </View>
                                    {/* <View style={{borderTopWidth:1,borderColor: '#efefef'}}> */}
                                    <FooterButton 
                                        text={null}
                                        textButton="Lihat Detail" 
                                        onClick={()=> this.props.navigation.navigate('DetailHistoryOrder',{
                                            detail:x.order_detail[0],
                                            date: x.date,
                                            payment: x.order_payment[0],
                                            total: x.total_billing,
                                            status: {
                                                id_workflow_status: x.id_workflow_status,
                                                workflow_status_name: x.workflow_status_name,
                                            }
                                        })}/>
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