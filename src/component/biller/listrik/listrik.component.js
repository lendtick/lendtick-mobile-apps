import React from 'react';
import { View, Text, TouchableHighlight, ScrollView, TextInput, Image, Dimensions, ActivityIndicator } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as accounting from 'accounting';
import { FooterButton,Modal,ButtonComponent,InputComponent,AlertBox } from '@directives';
import { Main,Typography,Variable } from '@styles';
import { styles } from './listrik.style';

import billerService from '../biller.service';

class ListrikComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Listrik",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = { 
            token: '',
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
            resMsg:null
        };
    }

    componentDidMount(){}

    fetchBiller(){
        if(this.state.token){
            let obj ={
                billerid: this.state.selectedLink === 'token' ? '9950102' : '9950101',
                accountnumber: this.state.token.split(' ').join('')
            };
            this.setState({isSubmitToken: true});
            billerService.postBillerInquiry(obj).then(res =>{
                console.log(res.data.response);
                let billdetails = res.data.response.billdetails;
                _.map(billdetails, (x)=>{
                    let totalAmountTagihan = Number(x.totalamount) + Number(x.adminfee);
                    x['total'] = this.state.selectedLink === 'token' ? Number(x.totalamount) : Number(x.totalamount) + Number(x.adminfee);
                    x['rp_total'] = this.state.selectedLink === 'token' ? "Rp " + accounting.formatMoney(Number(x['totalamount']), "", 0, ",", ",") : "Rp " + accounting.formatMoney(totalAmountTagihan, "", 0, ",", ",");

                    let totalAmount = Number(x.totalamount) - Number(x.adminfee);
                    x['rp_totalamount'] = "Rp " + accounting.formatMoney(totalAmount, "", 0, ",", ",");
                });

                if (res.data.response.responsecode == '0000'){
                    this.setState({
                        billdetails: billdetails,
                        isSubmitToken: false,
                        providerName: res.data.response.billername,
                        providerImage: null,
                        inquiryId: res.data.response.inquiryid,
                        isSingle: this.state.selectedLink === 'token' ? false : true,
                        resMsg: res.data.response.responsemsg,
                        resStatus:res.data.response.responsecode,
                    });
                } else {
                    this.setState({
                        billdetails: billdetails,
                        isSubmitToken: false,
                        providerName: res.data.response.billername,
                        providerImage: null,
                        inquiryId: res.data.response.inquiryid,
                        isSingle: this.state.selectedLink === 'token' ? false : true,
                        resMsg: res.data.response.responsemsg,
                        resStatus:res.data.response.responsecode,
                    });
                }
                
                if(billdetails.length) this.selectBiller(billdetails[0]);
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
            billersId: this.state.selectedLink === 'token' ? '9950102' : '9950101'
        };
        this.props.updateDataListrik(_.merge(e,provider));
        this.props.updateToken(this.state.token);
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.wrapSelect}>
                    <Grid>
                        <Col style={{borderRightWidth:1,borderColor:'#efefef'}}>
                            <TouchableHighlight onPress={()=> {
                                this.setState({selectedLink: 'token'});
                                setTimeout(()=>{
                                    this.fetchBiller();
                                }, 500);
                            }} underlayColor="transparent">
                                <Text style={this.state.selectedLink == 'token' ? styles.itemLinkActive : styles.itemLink}>Token Listrik</Text>
                            </TouchableHighlight>
                        </Col>
                        <Col>
                            <TouchableHighlight onPress={()=> {
                                this.setState({selectedLink: 'tagihan'});
                                setTimeout(()=>{
                                    this.fetchBiller();
                                }, 500);
                            }} underlayColor="transparent">
                                <Text style={this.state.selectedLink == 'tagihan' ? styles.itemLinkActive : styles.itemLink}>Tagihan Listrik</Text>
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
                    <ButtonComponent type="primary" text={this.state.selectedLink === 'token' ? 'Cari' : 'Cek Tagihan'} onClick={()=> this.fetchBiller()} disabled={this.state.isSubmitToken || this.state.token == ''} isSubmit={this.state.isSubmitToken} />
                </View>
                <Image style={styles.line} source={require('@assets/img/bg/line.png')} />

                {/* ====== START LIST ====== */}
                <ScrollView style={{backgroundColor: Variable.backgroundGray}}>
                    { this.state.loadingBiller ? 
                        <View style={{padding:30}}>  
                            <ActivityIndicator size="small" color="#333" style={{marginBottom:15}}/>
                        </View>
                        :
                        <View style={[Main.container,{paddingTop:15}]}>
                            {this.state.resStatus == '0000' ? 
                                <View>
                                    {this.state.billdetails.map((item,i)=>(
                                        <TouchableHighlight key={i} onPress={()=> this.selectBiller(item)} underlayColor="transparent">
                                            <View style={[styles.whiteBox,this.state.selectedBiller == item ? styles.whiteBoxActive : null]}>
                                                {/* <Text style={styles.titleWhiteBox}>{item.title}</Text> */}
                                                {this.state.isSingle ? 
                                                    <View>
                                                        <Text style={[Typography.singleText,{textAlign:'left'}]}>{item.body[0]}</Text> 
                                                        <Text style={[Typography.singleText,{textAlign:'left'}]}>{item.body[1]}</Text> 
                                                        <Text style={[Typography.singleText,{textAlign:'left'}]}>{item.body[2]}</Text> 
                                                        <Text style={[Typography.singleText,{textAlign:'left'}]}>{item.body[3]}</Text> 
                                                        <Text style={[Typography.singleText,{textAlign:'left'}]}>{item.body[4]}</Text> 
                                                        <Text style={[Typography.singleText,{textAlign:'left'}]}>{item.body[5]}</Text> 
                                                        <Text style={[Typography.singleText,{textAlign:'left'}]}>{item.body[6]}</Text> 
                                                    </View>
                                                : 
                                                    <Text style={styles.titleWhiteBox}>{item.rp_totalamount}</Text> 
                                                }
                                            </View>
                                        </TouchableHighlight>
                                    ))}
                                </View>
                            : <AlertBox type={'warning'} title={'Pemberitahuan!'} text={this.state.resMsg}/>}
                        </View>
                    }

                    <View style={[Main.container,{paddingTop:15,paddingBottom:15}]}>
                        {this.state.selectedLink === 'token' ?
                        <AlertBox type="info" text={[
                            'Informasi kode token yang Anda bayar akan dikirimkan maksimal 2x24 jam. ',
                            'Pembelian token listrik tidak dapat dilakukan pada jam 23:00-00:59 WIB.',
                        ]}/>
                        :
                        <AlertBox type="info" text={[
                            'Jatuh tempo pembayaran tagihan listrik adalah tanggal 20 di setiap bulannya. ',
                            'Pembayaran tagihan listrik tidak dapat dilakukan pada pukul 23.45-00.30 WIB sesuai dengan ketentuan dari pihak PLN',
                            'Proses verifikasi pembayaran membutuhkan waktu maksimum 2x24 jam ',
                            'Total tagihan yang tertera sudah termasuk denda (bila ada)'
                        ]}/>
                        }
                    </View>

                </ScrollView>
                {/* ====== END LIST ====== */}

                {/* ====== START FOOTER ====== */}
                {this.state.totalAmount != 'Rp 0' && this.state.resStatus == '0000'? 
                    <FooterButton text={this.state.totalAmount} textButton="Selanjutnya" onClick={()=> this.props.personal.data == null ? this.props.navigation.navigate('LoginUser') : this.props.navigation.navigate('ListrikConfirmation')}/>
                : null}
                {/* ====== END FOOTER ====== */}

                {/* ====== START Contacts ====== */}
                <Modal 
                    isOpen={this.state.popupContacts}
                    title="Daftar Kontak"
                    textRight="Tutup"
                    rightClick={()=> this.setState({popupContacts: false})}
                    height={Dimensions.get('window').height - (Dimensions.get('window').height * 0.45)}
                    width={Dimensions.get('window').width - 30}
                    textLeft={null}>
                    <View style={{borderBottomWidth:5,borderColor:'#dfdfdf',paddingLeft:15,paddingRight:15}}>
                        <TextInput
                            style={[Typography.singleText,styles.inputSinglePhoneNumber]}
                            placeholder="Cari nama kontak"
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.changePhone(text)}
                        />
                    </View>
                    
                    {_.map(this.state.listContactFilter,(x,i)=>(
                        <View key={i} style={[styles.listContact]} key={i}>
                            <Text style={styles.listContactText}>{x.name}</Text>
                            {_.map(x.phoneNumbers,(item,index)=>(
                                <View key={index} style={{
                                    paddingLeft:15,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    borderLeftWidth:1,
                                    borderTopWidth:1,
                                    borderColor:'#efefef',
                                    backgroundColor: '#fafafa'
                                }}>
                                    <TouchableHighlight onPress={()=> this.selectContact(item.number)} underlayColor="transparent">
                                        <Text style={[Typography.singleText,{paddingLeft:15,fontSize:12}]}>
                                            {item.number}
                                        </Text>
                                    </TouchableHighlight> 
                                </View>
                            ))}
                        </View>
                    ))}
                </Modal>
                {/* ====== END Contacts ====== */}
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
				type: 'UPDATE_DATA_LISTRIK',
				data: e
			})
        },
        updateToken: (e) =>{
            dispatch({
				type: 'UPDATE_TOKEN_LISTRIK',
				token: e
			})
        }
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListrikComponent)
