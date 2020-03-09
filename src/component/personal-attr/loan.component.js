import React from 'react';
import { View,Text,ScrollView,ActivityIndicator,Alert } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import { Variable,Typography } from '@styles';
import { ButtonComponent,AlertBox } from '@directives';
import { styles } from './balance.style';
import * as accounting from 'accounting';

import personalAttrService from './personal-attr.service';

class LoanComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Loan",
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
            isSubmit: false
        };
    }

    componentDidMount(){
        this.fetchDetailLoan();
    }

    fetchDetailLoan(){
        let moment = require("moment");
        this.setState({loading: true});
        personalAttrService.getLoanProfileDetail(this.props.navigation.getParam('id'),this.props.navigation.getParam('group')).then(res =>{
            if(res.data.credit){
                res.data.credit.map((x)=>{
                    x.term_payment_date = moment(x.term_payment_date).format('DD MMM YYYY');
                });
            }
            console.log(res.data)
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

    confrimLoan(){
        this.setState({isSubmit: true});
        let obj = {
            id_loan: this.props.navigation.getParam('id')
        };
        personalAttrService.updateConfrim(obj).then(res =>{
            this.setState({isSubmit: false});
            this.fetchDetailLoan();
        }, err =>{
            this.setState({isSubmit: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchDetailLoan()}],
                {cancelable: false},
            );
        })
    }

    render() { 
        return(
            <View style={{backgroundColor: '#f8f8ff',height:'100%'}}>
                {this.state.loading ? 
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="small" color="#6a6a6a" />
                </View>
                :
                <View style={{height:'100%'}}>
                    {/* ====== START LOAN NUMBER ====== */}
                    <View style={{padding:15,backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#dfdfdf', ...Variable.boxShadow}}>
                        <Text style={[Typography.singleText,{color: Variable.colorTitle,fontFamily:Variable.fontBold}]}>No. {this.state.loan_number}</Text>
                    </View>
                    {/* ====== END LOAN NUMBER ====== */}

                    <ScrollView>
                        {/* ====== START STEP ====== */}
                        <View style={{padding:15,paddingTop:30,paddingBottom:30}}>
                            <Grid>
                                <Col>
                                    <View>
                                        <View style={[styles.circleDetail,this.state.status > 1 ? {opacity:1,borderStyle: 'solid'} : {borderColor: Variable.colorPrimary,opacity:1,borderStyle: 'solid'}]}>
                                            <Text style={[styles.circleDetailText,Typography.singleText]}>1</Text>
                                        </View>
                                        <Text style={[Typography.singleText,{textAlign:'center',fontSize:10}]}>Pengajuan</Text>
                                    </View>
                                </Col>
                                <Col>
                                    <View>
                                        <View style={[styles.circleDetail,this.state.status > 2 ? {opacity:1,borderStyle: 'solid'} : {borderColor: Variable.colorPrimary,opacity:1,borderStyle: 'solid'}]}>
                                            <Text style={[styles.circleDetailText,Typography.singleText]}>2</Text>
                                        </View>
                                        <Text style={[Typography.singleText,{textAlign:'center',fontSize:10}]}>Approval</Text>
                                    </View>
                                </Col>
                                <Col>
                                    <View>
                                        <View style={[styles.circleDetail,this.state.status > 3 ? {opacity:1,borderStyle: 'solid'} : {borderColor: Variable.colorPrimary,opacity:1,borderStyle: 'solid'}]}>
                                            <Text style={[styles.circleDetailText,Typography.singleText]}>3</Text>
                                        </View>
                                        <Text style={[Typography.singleText,{textAlign:'center',fontSize:10}]}>Konfirmasi</Text>
                                    </View>
                                </Col>
                                <Col>
                                    <View>
                                        <View style={[styles.circleDetail,this.state.status > 4 ? {opacity:1,borderStyle: 'solid'} : {borderColor: Variable.colorPrimary,opacity:1,borderStyle: 'solid'}]}>
                                            <Text style={[styles.circleDetailText,Typography.singleText]}>4</Text>
                                        </View>
                                        <Text style={[Typography.singleText,{textAlign:'center',fontSize:10}]}>Uang diterima</Text>
                                    </View>
                                </Col>
                            </Grid>
                        </View>
                        {/* ====== END STEP ====== */}

                        {/* ====== START DESC ====== */}
                        <View style={[styles.wrapDetailDescPinjaman,{paddingTop:30,paddingBottom:30}]}>
                            <Text style={Typography.heading6}>Konfirmasi jumlah pinjaman</Text>

                            <Text style={Typography.singleText}>
                                jumlah pinjaman yang anda ajukan sebelumnya {accounting.formatMoney(this.state.loan_request, "", 0, ",", ",")}, di approve hanya {accounting.formatMoney(this.state.loan_approved, "", 0, ",", ",")}
                            </Text>
                            {this.state.status == 3 ? <View style={{marginTop:15}}><ButtonComponent type="primary" text="Konfirmasi" onClick={()=> this.confrimLoan()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/></View> : null} 
                        </View>
                        {/* ====== START DESC ====== */}

                        {/* ====== START COUNTER ====== */}
                        <View style={{padding:15,paddingTop:30,paddingBottom:30}}>
                            <Grid>
                                <Col>
                                    <Text style={[Typography.singleText,{textAlign: 'center'}]}>Tenor</Text>
                                    <Text style={[Typography.heading4,{textAlign: 'center',marginBottom:10,marginTop:10}]}>{this.state.term_total}</Text>
                                    <Text style={[Typography.singleText,{textAlign: 'center'}]}>Bulanan</Text>
                                </Col>
                                <Col>
                                    <Text style={[Typography.singleText,{textAlign: 'center'}]}>dibayar</Text>
                                    <Text style={[Typography.heading4,{textAlign: 'center',marginBottom:10,marginTop:10}]}>{this.state.term_paid}</Text>
                                    <Text style={[Typography.singleText,{textAlign: 'center'}]}>Bulanan</Text>
                                </Col>
                                <Col>
                                    <Text style={[Typography.singleText,{textAlign: 'center'}]}>sisa</Text>
                                    <Text style={[Typography.heading4,{textAlign: 'center',marginBottom:10,marginTop:10}]}>{this.state.term_left}</Text>
                                    <Text style={[Typography.singleText,{textAlign: 'center'}]}>Bulanan</Text>
                                </Col>
                            </Grid>
                        </View>
                        {/* ====== END COUNTER ====== */}

                        {/* ====== START KETERANGAN ====== */}
                        <View style={[styles.wrapDetailDescPinjaman,{padding:0}]}>
                            <Grid style={{padding:15,borderBottomWidth:1,borderColor:'#dfdfdf'}}>
                                <Col><Text style={Typography.label}>Tipe Pinjaman</Text></Col>
                                <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>{this.state.name_loan_type}</Text></Col>
                            </Grid>
                            <Grid style={{padding:15,borderBottomWidth:1,borderColor:'#dfdfdf'}}>
                                <Col><Text style={Typography.label}>Tanggal Mengajukan</Text></Col>
                                <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>{this.state.request_date}</Text></Col>
                            </Grid>
                            <Grid style={{padding:15,borderBottomWidth:1,borderColor:'#dfdfdf'}}>
                                <Col><Text style={Typography.label}>Tanggal Pencairan</Text></Col>
                                <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>{this.state.disbursement_date}</Text></Col>
                            </Grid>
                            <Grid style={{padding:15}}>
                                <Col><Text style={Typography.label}>Estimasi Tanggal Lunas</Text></Col>
                                <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>{this.state.paid_off_date}</Text></Col>
                            </Grid>
                        </View>
                        {/* ====== END KETERANGAN ====== */}

                        {/* ====== START CREDIT ====== */}
                        {this.state.credit ?
                        <View>
                            <Grid style={{padding:15,marginTop:15}}>
                                <Col><Text style={[Typography.heading6,{textAlign:'center',marginBottom:0}]}>Cicilan Ke</Text></Col>
                                <Col><Text style={[Typography.heading6,{textAlign:'center',marginBottom:0}]}>Tanggal Bayar</Text></Col>
                                <Col><Text style={[Typography.heading6,{textAlign:'center',marginBottom:0}]}>Jumlah</Text></Col>
                            </Grid>
                            <View style={[styles.wrapDetailDescPinjaman,{padding:0,marginTop:0}]}>
                            {this.state.credit.map((x,i)=>(
                                <Grid key={i} style={{padding:15,borderBottomWidth:1,borderColor:'#dfdfdf'}}>
                                    <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>{x.left}</Text></Col>
                                    <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>{x.term_payment_date}</Text></Col>
                                    <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>Rp {accounting.formatMoney(x.amount, "", 0, ",", ",")}</Text></Col>
                                </Grid>
                            ))}
                            </View>
                        </View>
                        : null }
                        {/* ====== END CREDIT ====== */}
                    </ScrollView>
                </View>
                }
            </View>
        ) 
    }
}


export default LoanComponent;