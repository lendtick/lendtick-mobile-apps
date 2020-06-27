import React from 'react';
import { View, Text, TouchableHighlight, ScrollView, TextInput, Image, Dimensions, ActivityIndicator } from 'react-native';
import { Col, Grid, Row} from "react-native-easy-grid";
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as accounting from 'accounting';
import { FooterButton,Modal,ButtonComponent,InputComponent,AlertBox } from '@directives';
import { Main,Typography,Variable } from '@styles';
import { styles } from './bpjs.style';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckBox } from 'react-native-elements'; 

import billerService from '../biller.service';

class BpjsComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "BPJS",
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
            bpjsNumber: '',
            bpjsMonth:null,
            bpjsMonthFullString: '',
            selectedLink: 'token',
            isSubmitToken: false,
            billdetails: [],
            totalAmount: 'Rp 0',
            selectedBiller: null,
            providerName: null,
            providerImage: null,
            isSingle: false,
            inquiryId: null,
            resStatus:'0000',
            resMsg:null,
            alertMsg:null,
            systraceApp:null,
            billersdetailtemp:[],
            alertCondition:false,
            bodyDetails : []
        };
    }

    componentDidMount(){
        this._isMounted = true;
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        let Month = new Date().getMonth();
        let Year = new Date().getFullYear();
        this.setState({bpjsMonth: Month, bpjsMonthFullString: monthNames[Month]+' '+Year});
    }

    fetchBiller(){
        if(this.state.bpjsNumber){
            let obj ={
                billerid: '3200001',
                accountnumber: this.state.bpjsNumber.split(' ').join('')
            };
            this.setState({isSubmitToken: true});
            billerService.postBillerInquiry(obj).then(res =>{
                console.log(res);
                if (res.status && res.message === 'Sukses') {
                    let billdetails = res.data.response.billdetails;
                    console.log(billdetails);
                    console.log(res.data.response);
                    _.map(billdetails, (x)=>{
                        let totalAmountTagihan = Number(x.totalamount) + Number(x.adminfee);
                        x['total'] = Number(x.totalamount) + Number(x.adminfee);
                        x['rp_total'] ="Rp " + accounting.formatMoney(totalAmountTagihan, "", 0, ",", ",");

                        let totalAmount = Number(x.totalamount) - Number(x.adminfee);
                        x['rp_totalamount'] = "Rp " + accounting.formatMoney(totalAmount, "", 0, ",", ",");
                    });
                    if (res.data.response.responsecode == "0000"){
                        let bodyDetail = res.data.response.billdetails[0].body;
                        let bodyHasil = [];
                        for(a=0; a < bodyDetail.length; a++) {
                            bodyHasil.push(bodyDetail[a]);
                        }
                        this.setState({
                            billdetails: billdetails,
                            bodyDetails: bodyHasil,
                            isSubmitToken: false,
                            providerName: res.data.response.billername,
                            providerImage: null,
                            inquiryId: res.data.response.inquiryid,
                            resMsg: res.data.response.responsemsg,
                            resStatus:res.data.response.responsecode,
                            systraceApp: res.data.trace.systrace,
                            alertCondition:false,
                            alertMsg:null
                        });
                    } else {
                        this.setState({
                            billdetails: billdetails,
                            isSubmitToken: false,
                            providerName: res.data.response.billername,
                            providerImage: null,
                            inquiryId: res.data.response.inquiryid,
                            resMsg: res.data.response.responsemsg,
                            resStatus:res.data.response.responsecode,
                            alertCondition:true,
                            alertMsg:null
                        });
                    }
                    this.selectBiller(billdetails[0]);
                } else if (res.data.response.responsecode == '5560') {
                    
                    this.setState({
                        resMsg: 'Nomor BPJS yang anda masukkan salah/tidak terdaftar',
                        alertMsg: 'Nomor BPJS yang anda masukkan salah/tidak terdaftar',
                        isSubmitToken: false,
                        alertCondition:true
                    });
                    
                } else {
                    
                    this.setState({
                        resMsg: res.data.response.responsemsg,
                        alertMsg: res.data.system_message,
                        isSubmitToken: false,
                        alertCondition:true
                    });
                }
                
            });
        }
    }

    selectBiller(e){
        this.setState({
            totalAmount: e ? e.rp_total : "Rp 0",
            selectedBiller: e
        });
        let provider = {
            providerName: this.state.providerName, 
            providerImage: this.state.providerImage,
            inquiryId: this.state.inquiryId,
            systraceApp:this.state.systraceApp,
            billersId: '3200001'
        };
        this.props.updateDataBpjs(_.merge(e,provider));
        this.props.updateToken(this.state.bpjsNumber);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <View style={styles.wrapper}>

                <View style={{padding:15}} removeClippedSubviews={false}>
                    <InputComponent 
                        label={'Nomor BPJS Kesehatan'}
                        iconName={null}
                        keyboardType="numeric"
                        placeholder="Masukan nomor BPJS"
                        value={this.state.bpjsNumber}
                        onChange={(bpjsNumber) => this.setState({bpjsNumber})}/>
  
                    <InputComponent 
                        label={'Bayar Untuk Bulan Berjalan'}
                        iconName={null}
                        value={this.state.bpjsMonthFullString}/>
                    <ButtonComponent type="primary" text={'Cek Tagihan'} onClick={()=> this.fetchBiller()} disabled={this.state.isSubmitToken || this.state.token == ''} isSubmit={this.state.isSubmitToken} />
                    
                </View>
                <Image style={styles.line} source={require('@assets/img/bg/line.png')} />
                <ScrollView style={{backgroundColor: Variable.backgroundGray}}>
                    {this.state.alertMsg === null ?
                        <View style={[Main.container,{paddingTop:15}]}>
                            { this.state.billdetails.length > 0 ? 
                                this.state.bodyDetails.map((item, x) => (
                                    <View key={x} style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:10}}>
                                        <Grid>
                                            <Col><Text style={{textAlign:'left', fontFamily:Variable.fontLight}}>{item.split(':')[0]}</Text></Col>
                                            <Col><Text style={{textAlign:'right', fontFamily:Variable.fontLight}}>{item.split(':')[1]}</Text></Col>
                                        </Grid>
                                    </View>
                                ))
                            : 
                                null
                            }
                        </View>
                    :
                        <AlertBox type={'warning'} title={'Pemberitahuan!'} text={this.state.alertMsg}/>
                    }
                </ScrollView>

                {/* ====== START FOOTER ====== */}
                {this.state.totalAmount != 'Rp 0' && this.state.resStatus == '0000'? 
                    <FooterButton text={this.state.totalAmount} textButton="Selanjutnya" onClick={()=> this.props.personal.data == null ? this.props.navigation.navigate('LoginUser') : this.props.navigation.navigate('BpjsConfirmation')}/>
                : null}
                {/* ====== END FOOTER ====== */}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        personal: state.personal
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
        updateDataBpjs: (e) =>{
            dispatch({
				type: 'UPDATE_DATA_BPJS',
				data: e
			})
        },
        updateToken: (e) =>{
            dispatch({
				type: 'UPDATE_TOKEN_BPJS',
				bpjsNumber: e
			})
        }
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BpjsComponent)
