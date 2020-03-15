import React from 'react';
import { View,Text,ScrollView,Image,ActivityIndicator,Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Col,Grid } from "react-native-easy-grid";
import { Variable,Typography } from '@styles';
import { styles } from './balance.style';
import * as accounting from 'accounting';

import personalAttrService from './personal-attr.service';

class MiddleLoanComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pinjaman Microloan",
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
            disbursement_date: null,
            loan_approved:0,
            loan_number: null,
            loan_request: 0,
            name_loan_type: null,
            paid_off_date: null,
            request_date: null,
            status: 0,
            term_left: 0,
            term_paid: 0,
            term_total: 0,
            credit: [],
            loading: false,
        };
    }

    componentDidMount(){
        this.fetchDetailLoan();
    }

    fetchDetailLoan(){
        let moment = require("moment");
        this.setState({loading: true});
        personalAttrService.getLoanProfileDetail(this.props.navigation.getParam('id'),this.props.navigation.getParam('group')).then(res =>{
            console.log('response ==>', res.data);
            if(res.data.credit){
                res.data.credit.map((x)=>{
                    x.term_payment_date = moment(x.term_payment_date).format('DD MMM YYYY');
                    x.microloan_number = x.microloan_number;
                    x.disbursement_date = moment(x.disbursement_date).format('DD MMM YYYY');
                    x.request_date = moment(x.request_date).format('DD MMM YYYY');
                });
            }
            this.setState({
                disbursement_date: moment(res.data.disbursement_date).format('DD MMM YYYY'),
                loan_approved: res.data.loan_approved,
                loan_number: res.data.loan_number,
                loan_request: res.data.loan_request,
                name_loan_type: res.data.name_loan_type,
                paid_off_date: moment(res.data.paid_off_date).format('DD MMM YYYY'),
                request_date: moment(res.data.request_date).format('DD MMM YYYY'),
                status: res.data.status,
                term_left: res.data.term_left,
                term_paid: res.data.term_paid,
                term_total: res.data.term_total,
                credit: res.data.credit,
                loading: false
            });
        }, err =>{
            this.setState({loading: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchDetailLoan()}],
                {cancelable: false},
            );
        });
    }

    render() {
        console.log('state ==>', this.state.credit);
        
        return(
            <View style={{backgroundColor: '#f8f8ff',height:'100%'}}>
                {this.state.loading ? 
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="small" color="#6a6a6a" />
                </View>
                :
                <ScrollView>
                    {/* <LinearGradient
                        colors={Variable.colorGradient}
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        style={{ 
                            paddingTop: 50, 
                            paddingBottom: 50, 
                            alignItems: 'center'
                        }}>
                         <Text style={[Typography.heading3,{color:'#000',marginBottom:0}]}>Rp {accounting.formatMoney(this.props.navigation.getParam('payment'), "", 0, ",", ",")}</Text>
                    </LinearGradient> */}
                    <View style={{backgroundColor:'#ffffff'}}>
                        <Text style={[Typography.singleText,{textAlign:'center',padding:15}]}>Tagihan bulan ini</Text>
                    </View>
                    <Image style={{width:'100%',height:10}} source={require('@assets/img/bg/line.png')} />

                    {/* ====== START CREDIT ====== */}
                    {this.state.credit ?
                    <View>
                        <Grid style={{padding:15,marginTop:15}}>
                            <Col><Text style={[Typography.heading6,{textAlign:'center',marginBottom:0}]}>No MikroLoan</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'center',marginBottom:0}]}>Cicilan Ke</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'center',marginBottom:0}]}>Tanggal Request</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'center',marginBottom:0}]}>Tanggal Bayar</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'center',marginBottom:0}]}>Tanggal Pencairan</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'center',marginBottom:0}]}>Jumlah</Text></Col>
                        </Grid>
                        <View style={[styles.wrapDetailDescPinjaman,{padding:0,marginTop:0}]}>
                        {this.state.credit.map((x,i)=>(
                            <Grid key={i} style={{padding:15,borderBottomWidth:1,borderColor:'#dfdfdf'}}>
                                <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>{x.microloan_number}</Text></Col>
                                <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>{x.term}</Text></Col>
                                <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>{x.request_date}</Text></Col>
                                <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>{x.term_payment_date}</Text></Col>
                                <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>{x.disbursement_date}</Text></Col>
                                <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>Rp {accounting.formatMoney(x.amount, "", 0, ",", ",")}</Text></Col>
                            </Grid>
                        ))}
                        </View>
                    </View>
                    : null }
                    {/* ====== END CREDIT ====== */}
                </ScrollView>
                }
            </View>
        ) 
    }
}


export default MiddleLoanComponent;