import React from 'react';
import { View, Text, TouchableHighlight, ScrollView, TextInput, Image, Dimensions, ActivityIndicator } from 'react-native';
import { Col, Grid, Row} from "react-native-easy-grid";
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as accounting from 'accounting';
import { FooterButton,Modal,ButtonComponent,InputComponent,AlertBox } from '@directives';
import { Main,Typography,Variable } from '@styles';
import { styles } from './air.style';
import { LinearGradient } from 'expo-linear-gradient';

import billerService from '../biller.service';

class AirComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "PDAM",
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
            token: '',
            selectedLink: 'aetra',
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
            systraceApp:null,
            billersdetailtemp:[],
            alert:[],
            bodyDetails : []
        };
    }

    componentDidMount(){
        this._isMounted = true;
    }

    fetchBiller(){
        if(this.state.token){
            let obj ={
                billerid: this.state.selectedLink === 'aetra' ? '9960101' : '9960102',
                accountnumber: this.state.token.split(' ').join('')
            };
            this.setState({isSubmitToken: true});
            billerService.postBillerInquiry(obj).then(res =>{
                console.log(res);
                // res = 
                //     {
                //         "status": 1,
                //         "message": "Sukses",
                //         "data": {
                //           "system_message": "IDPEL YANG ANDA MASUKAN SALAH, MOHON TELITI KEMBALI",
                //           "response": {
                //             "additionaldata": [],
                //             "billdetails": [{
                //                 "adminfee":"2500.0",
                //                 "billid":"1",
                //                 "currency":"360",
                //                 "title":"Tagihan PDAM AETRA",
                //                 "totalamount":"80145.00",
                //                 "descriptions":null,
                //                 "body":[
                //                     "NOMEN : 30008082",
                //                     "NAMA : RIA SEPTI MIA",
                //                     "ALAMAT : ",
                //                     "TOTAL TAGIHAN : 1 Bln",
                //                     "BL/TH : OKT16",
                //                     "RP TAG : Rp. 80.145,00",
                //                     "DENDA : Rp. 0,00",
                //                     "Admin Bank : Rp. 2.500,00",
                //                     "Total Amount : Rp. 82.645,00"
                //                 ]
                //             }],
                //             "billername": "PDAM AETRA",
                //             "inquiryid": "27489249",
                //             "paymenttype": "CLOSE_PAYMENT",
                //             "responsecode": "0000",
                //             "responsemsg": "IDPEL YANG ANDA MASUKAN SALAH, MOHON TELITI KEMBALI",
                //             "subscriberid": "082112121213123",
                //             "subscribername": ""
                //           },
                //           "trace": {
                //             "session_id": "81215AEFADFB710C1258F79ABA1AD710.node3",
                //             "request_date_time": "20190704185319",
                //             "words": "30f3b982d948631325d086da21f6bb56dc1b695c",
                //             "biller_id": "9900002",
                //             "account_number": "082114610188",
                //             "systrace": 1565440486,
                //             "inquiry_id": "27490626"
                //           }
                //         }
                //       };
                if (res.status && res.message === 'Sukses') {
                    let billdetails = res.data.response.billdetails;
                    _.map(billdetails, (x)=>{
                        let totalAmountTagihan = Number(x.totalamount) + Number(x.adminfee);
                        x['total'] = Number(x.totalamount) + Number(x.adminfee);
                        x['rp_total'] = "Rp " + accounting.formatMoney(totalAmountTagihan, "", 0, ",", ",");

                        let totalAmount = Number(x.totalamount) - Number(x.adminfee);
                        x['rp_totalamount'] = "Rp " + accounting.formatMoney(totalAmount, "", 0, ",", ",");
                    });

                    if (res.data.response.responsecode == '0000' && res.data.response.billdetails.length > 0){
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
                            // isSingle: this.state.selectedLink === 'aetra' ? false : true,
                            resMsg: res.data.response.responsemsg,
                            resStatus:res.data.response.responsecode,
                            systraceApp: res.data.trace.systrace,
                        });
                        this.selectBiller(res.data.response.billdetails[0]);
                    } else {
                        this.setState({
                            billdetails: [],
                            isSubmitToken: false,
                            providerName: res.data.response.billername,
                            providerImage: null,
                            inquiryId: res.data.response.inquiryid,
                            // isSingle: this.state.selectedLink === 'aetra' ? false : true,
                            resMsg: 'Terjadi Kesalahan Dari Vendor Penyedia Jasa' ,
                            resStatus:res.data.response.responsecode,
                        });
                    }
                } else {
                    this.setState({
                        billdetails: [],
                        isSubmitToken: false,
                        providerName: res.data.response.billername,
                        // providerImage: null,
                        // inquiryId: res.data.response.inquiryid,
                        // isSingle: this.state.selectedLink === 'aetra' ? false : true,
                        resMsg: res.data.response.responsemsg ,
                        resStatus:res.data.response.responsecode,
                    });
                }
                
            });
        }
    }

    selectBiller(e){
        this.setState({
            totalAmount: e ? e.rp_total : "Rp 0",
            // selectedBiller: e
        });
        let provider = {
            providerName: this.state.providerName, 
            providerImage: this.state.providerImage,
            inquiryId: this.state.inquiryId,
            systraceApp:this.state.systraceApp,
            billersId: this.state.selectedLink === 'aetra' ? '9960101' : '9960102'
        };
        this.props.updateDataListrik(_.merge(e,provider));
        this.props.updateToken(this.state.token);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.wrapSelect}>
                    <Grid>
                        <Col style={{borderRightWidth:1,borderColor:'#efefef'}}>
                            <TouchableHighlight onPress={()=> {
                                this.setState({selectedLink: 'aetra'});
                                setTimeout(()=>{
                                    this.fetchBiller();
                                }, 500);
                            }} underlayColor="transparent">
                                <Text style={this.state.selectedLink == 'aetra' ? styles.itemLinkActive : styles.itemLink}>PDAM AETRA</Text>
                            </TouchableHighlight>
                        </Col>
                        <Col>
                            <TouchableHighlight onPress={()=> {
                                this.setState({selectedLink: 'palyja'});
                                setTimeout(()=>{
                                    this.fetchBiller();
                                }, 500);
                            }} underlayColor="transparent">
                                <Text style={this.state.selectedLink == 'palyja' ? styles.itemLinkActive : styles.itemLink}>PDAM PALYJA</Text>
                            </TouchableHighlight>
                        </Col>
                    </Grid>
                </View>

                <View style={{padding:15}}>
                    <InputComponent 
                        label={null}
                        iconName={null}
                        keyboardType="numeric"
                        placeholder="Masukan nomor meter"
                        value={this.state.token}
                        onChange={(token) => this.setState({token})}/>
                    <ButtonComponent type="primary" text={'Cek Tagihan'} onClick={()=> this.fetchBiller()} disabled={this.state.isSubmitToken || this.state.token == ''} isSubmit={this.state.isSubmitToken} />
                </View>
                <Image style={styles.line} source={require('@assets/img/bg/line.png')} />

                <ScrollView style={{backgroundColor: Variable.backgroundGray}}>
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
                </ScrollView>

                {/* ====== START FOOTER ====== */}
                {this.state.totalAmount != 'Rp 0' && this.state.resStatus == '0000'? 
                    <FooterButton text={this.state.totalAmount} textButton="Selanjutnya" onClick={()=> this.props.personal.data == null ? this.props.navigation.navigate('LoginUser') : this.props.navigation.navigate('AirConfirmation')}/>
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
        updateDataListrik: (e) =>{
            dispatch({
				type: 'UPDATE_DATA_AIR',
				data: e
			})
        },
        updateToken: (e) =>{
            dispatch({
				type: 'UPDATE_TOKEN_AIR',
				token: e
			})
        }
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AirComponent)
