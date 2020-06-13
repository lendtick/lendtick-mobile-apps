import React from 'react';
import { View,Text,TouchableHighlight,ScrollView,TextInput,Image,Dimensions,ActivityIndicator } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
import { LinearGradient } from 'expo-linear-gradient';
import AutoHeightImage from 'react-native-auto-height-image';
import * as _ from 'lodash';
import * as accounting from 'accounting';
import { store } from '@services/store';
import { AlertBox } from '@directives';
import { connect } from 'react-redux';
import watch from 'redux-watch';
import { Main,Typography,Variable } from '@styles';
import { FooterButton,Modal } from '@directives';
import { styles } from './paket-data.style';

import billerService from '../biller.service';

class PaketDataComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Paket Data",
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
            phoneNumber:null,
            listContact: [],
            listContactFilter: [],
            popupContacts: false,
            loadingContact: false,
            providerName: null,
            providerImage: null,
            billdetails:[],
            loadingBiller: false,
            totalAmount: "Rp 0",
            selectedBiller: null,
            timeout: null,
            billersIdPaketData: null,
            inquiryId: null,
            systracePaket:null,
            alert:[]
        };

        let watchPersonal = watch(store.getState, 'personal.data')
        store.subscribe(watchPersonal((newVal, oldVal, objectPath) => {
            this.setMyNumber();
        }));
    }

    componentDidMount(){
        this._isMounted = true;
        try{
            this.setMyNumber();
        }catch(err){}
    }


    checkPhone(phone){
        phone = phone.replace('+62',0);
        phone = phone.replace(/-/g,'');
        phone = phone.replace(/ /g,'');
        if(phone.length > 4){
            billerService.getInfoPhone(phone.substring(0,4)).then(res =>{
                console.log(res);
                if(res.data.length){
                    this.setState({
                        providerName: res.data[0].provider_phone_name,
                        providerImage: res.data[0].provider_phone_image,
                        billersIdPaketData: res.data[0].billers_id_paketdata
                    });
                    this.fetchBiller(res.data[0].billers_id_paketdata);
                }
            });
        }else{
            this.setState({
                totalAmount:  'Rp 0',
                billdetails: []
            });
        }
    }

    setMyNumber(){
        this.setState({phoneNumber: this.props.personal.data.phone_number});
        this.checkPhone(this.props.personal.data.phone_number);
    }

    selectContact(e){
        this.setState({ phoneNumber: e,popupContacts: false});
        this.checkPhone(e);
    }

    changePhone(e){
        let listing = this.state.listContact;
        const filtered = _.filter(listing, (o) =>{
            return _.lowerCase(o.name).indexOf(e) > -1;
        });
        this.setState({listContactFilter:filtered});
    }

    browseContact = async() =>{
        const { status } = await Permissions.getAsync(Permissions.CONTACTS);
        if (status === 'granted') {
            this.setState({loadingContact: true});
            const { data } = await Contacts.getContactsAsync();
            this.setState({
                listContact: data,
                listContactFilter: data,
                popupContacts: true,
                loadingContact: false
            });
        }else{
            Permissions.askAsync(Permissions.CONTACTS);
        }
    }

    fetchBiller(billerid){
        let obj ={
            billerid: billerid,
            accountnumber: this.state.phoneNumber.split(' ').join('').replace('+62',0)
        };
        
        this.setState({loadingBiller: true});
        billerService.postBillerInquiry(obj).then(res =>{
            if(res.status){
                if(res.data){
                    let billdetails = res.data.response.billdetails;
                    if (billdetails.length > 0){
                        _.map(billdetails, (x)=>{
                            x['total'] = Number(x.totalamount) + Number(x.adminfee)
                            x['rp_total'] = "Rp " + accounting.formatMoney(x['total'], "", 0, ",", ",")
                            x['rp_totalamount'] = "Rp " + accounting.formatMoney(x['totalamount'], "", 0, ",", ",")
                            x['priceToPay'] = x.totalamount
                        });
                        this.setState({
                            billdetails: billdetails,
                            loadingBiller: false,
                            inquiryId: res.data.response.inquiryid,
                            systracePaket: res.data.trace.systrace
                        });
                    }else {
                        this.setState({
                            loadingBiller: false,
                            inquiryId: res.data.response.inquiryid,
                            systracePaket: res.data.trace.systrace,
                            alert:['danger', 'ERROR', 'Terjadi Kesalahan Dari Vendor Penyedia Jasa']
                        });
                    }
                    if(billdetails.length) this.selectBiller(billdetails[0]);
                }else{
                    this.setState({
                        billdetails: [],
                        loadingBiller: false,
                        alert:['danger', 'ERROR', 'Terjadi Kesalahan Dari Vendor Penyedia Jasa']
                    });
                }
            }else{
                this.setState({
                    billdetails: [],
                    loadingBiller: false,
                    alert:['warning', 'pemberitahuan', 'Anda belum memilih operator']
                });
            }
        });
    }

    selectBiller(e){
        this.setState({
            totalAmount: e ? e.rp_total : "Rp 0",
            selectedBiller: e
        });
        let provider = {
            bill_id : e.billid,
            providerName: this.state.providerName, 
            providerImage: this.state.providerImage,
            billersIdPaketData: this.state.billersIdPaketData,
            inquiryId: this.state.inquiryId,
            systracePaket: this.state.systracePaket
        };
        this.props.updateDataPaketDate(_.merge(e,provider));
        this.props.updatePhonePaketDate(this.state.phoneNumber.replace('+62',0));
    }

    chaneNumber(e){
        clearTimeout(this.state.timeout);
        this.state.timeout = setTimeout(() => {
            this.checkPhone(e);
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={{paddingTop:15,paddingBottom:15}}>
                    <View style={Main.container}>
                        {/* ====== START INPUT PHONE NUMBER ====== */}
                        <View style={styles.wrapPhoneNumber}>
                            <View style={styles.iconPhoneNumber}>
                                {this.state.providerImage ? <AutoHeightImage source={{uri: this.state.providerImage}} width={35} style={styles.imgProvider}/> : null }
                            </View>
                            <TextInput
                                style={[Typography.singleText,styles.inputSinglePhoneNumber]}
                                placeholder="Enter phone number"
                                underlineColorAndroid="transparent"
                                keyboardType="phone-pad"
                                onChangeText={(phoneNumber) => {
                                    this.setState({phoneNumber});
                                    this.chaneNumber(this.state.phoneNumber);
                                }}
                                value={this.state.phoneNumber}
                            />
                        </View>

                        <Text style={styles.centerTextPhone}>Or get from</Text>

                        <View style={styles.wrapSelectPhoneLink}>
                            <Grid>
                                <Col style={{borderRightWidth:1,borderColor:'#efefef'}}>
                                    <TouchableHighlight onPress={()=> this.props.personal.data == null ? this.props.navigation.navigate('LoginUser') : this.setMyNumber()} underlayColor="transparent">
                                        <Text style={styles.phoneLink}>My Number</Text>
                                    </TouchableHighlight>
                                </Col>
                                <Col>
                                    <TouchableHighlight onPress={()=> this.browseContact()} underlayColor="transparent">
                                        {this.state.loadingContact ? 
                                            <ActivityIndicator size="small" color={Variable.colorContent} style={{top:13}}/> 
                                            : 
                                            <Text style={styles.phoneLink}>Browse Contact</Text>                                         
                                        }
                                    </TouchableHighlight>
                                </Col>
                            </Grid>
                        </View>
                        {/* ====== END INPUT PHONE NUMBER ====== */}
                    </View>
                </View>
                <Image style={styles.line} source={require('@assets/img/bg/line.png')} />

                {/* ====== START LIST ====== */}
                <ScrollView style={{backgroundColor: Variable.backgroundGray}}>
                    {this.state.loadingBiller ? 
                    <View style={{padding:30}}>  
                        <ActivityIndicator size="small" color="#333" style={{marginBottom:15}}/>
                    </View>
                    :
                    <View style={[Main.container,{paddingTop:15}]}>
                        {this.state.billdetails.length ? 
                            <View>
                                {this.state.billdetails.map((item,i)=>(
                                    <TouchableHighlight key={i} onPress={()=> this.selectBiller(item)} underlayColor="transparent">
                                        <LinearGradient 
                                            colors={this.state.selectedBiller == item ? Variable.colorGradient : ['#fff', '#fff']}
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                            style={styles.gradientBox}>
                                                <Text style={this.state.selectedBiller == item ? styles.titleGradientBox : styles.titleWhiteBox}>{item.title}</Text>
                                        </LinearGradient>
                                    </TouchableHighlight>
                                ))}
                            </View>
                        : <AlertBox type={this.state.alert[0]} title={this.state.alert[1]} text={this.state.alert[2]}/>}
                    </View>
                    }
                </ScrollView>
                {/* ====== END LIST ====== */}

                {/* ====== START FOOTER ====== */}
                {this.state.totalAmount != 'Rp 0' ? 
                    <FooterButton text={this.state.totalAmount} textButton="Selanjutnya" onClick={()=> this.props.personal.data == null ? this.props.navigation.navigate('LoginUser') : this.props.navigation.navigate('PaketDataConfirmation')}/>
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
        updateDataPaketDate: (e) =>{
            dispatch({
				type: 'UPDATE_DATA_PAKET_DATA',
				data: e
			})
        },
        updatePhonePaketDate: (e) =>{
            dispatch({
				type: 'UPDATE_PHONE_PAKET_DATA',
				phoneNumber: e
			})
        }
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PaketDataComponent)
