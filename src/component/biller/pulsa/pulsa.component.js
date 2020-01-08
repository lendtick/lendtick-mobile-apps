import React from 'react';
import { View,Text,TouchableHighlight,ScrollView,TextInput,Image,Dimensions,ActivityIndicator,TouchableOpacity } from 'react-native';
import { Col, Grid, Row } from "react-native-easy-grid";
import AutoHeightImage from 'react-native-auto-height-image';
import { Contacts } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';
import * as Permissions from 'expo-permissions';
import * as _ from 'lodash';
import * as accounting from 'accounting';
import { store } from '@services/store';
import { AlertBox } from '@directives';
import watch from 'redux-watch';
import { connect } from 'react-redux';
import { Main,Typography,Variable } from '@styles';
import { FooterButton,Modal } from '@directives';
import { styles } from './pulsa.style';
import billerService from '../biller.service';

class PulsaComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pulsa",
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
            billersIdPulsa: null,
            billdetails:[],
            loadingBiller: false,
            totalAmount: "Rp 0",
            selectedBiller: null,
            timeout: null,
            inquiryId: null,
            systraceApp:null,
            billersdetailtemp:[]
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
                if(res.data.length){
                    this.setState({
                        providerName: res.data[0].provider_phone_name,
                        providerImage: res.data[0].provider_phone_image,
                        billersIdPulsa: res.data[0].billers_id_pulsa
                    });
                    this.fetchBiller(res.data[0].billers_id_pulsa);
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
                    let len = billdetails.length / 3;
                    let arrbilldetails = [];
                    _.map(billdetails, (x)=>{
                        x['total'] = Number(x.totalamount) + Number(x.adminfee)
                        x['rp_total'] = "Rp " + accounting.formatMoney(x['total'], "", 0, ",", ",")
                        x['paket_pulsa'] = x['body'][0].replace('DENOM           : ','')
                        x['priceToPay'] = x.totalamount
                    });
                    for(i=0; i<len; i++){
                        arrbilldetails.push(billdetails.splice(0,3));
                    }
                    console.log(arrbilldetails);
                    this.setState({
                        billdetails: billdetails,
                        billersdetailtemp:arrbilldetails,
                        loadingBiller: false,
                        inquiryId: res.data.response.inquiryid,
                        systraceApp: res.data.trace.systrace
                    });
                    if(arrbilldetails.length) this.selectBiller(arrbilldetails[0][0]);
                }else{
                    this.setState({
                        billdetails: [],
                        billersdetailtemp: [],
                        loadingBiller: false,
                    });
                }
            }else{
                this.setState({
                    billdetails: [],
                    billersdetailtemp: [],
                    loadingBiller: false,
                });
            }
        });
    }

    selectBiller(e){
        this.setState({
            totalAmount: e ? e.paket_pulsa : "Rp 0",
            selectedBiller: e
        });
        let provider = {
            bill_id : e.billid,
            providerName: this.state.providerName, 
            providerImage: this.state.providerImage,
            billersIdPulsa: this.state.billersIdPulsa,
            inquiryId: this.state.inquiryId,
            systraceApp:this.state.systraceApp
        };
        this.props.updateDataPulsa(_.merge(e,provider));
        this.props.updatePhonePulsa(this.state.phoneNumber.replace('+62',0));
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
                        {this.state.billersdetailtemp.length ? 
                            <View>
                                <Grid>
                                {this.state.billersdetailtemp.map((row, k)=>(
                                    <Row key={k}>
                                        {row.map((item,i) => (
                                            <Col key={i} style={styles.itemPulsa}>
                                                <TouchableHighlight onPress={()=> this.selectBiller(item)} underlayColor="transparent">
                                                    <LinearGradient 
                                                        colors={this.state.selectedBiller == item ? ['#8DCBC6', '#8DCBC6'] : ['#fff', '#fff']}
                                                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                                        style={styles.gradientBox}>
                                                        <Text style={this.state.selectedBiller == item ? styles.titleGradientBox : styles.titleWhiteBox}>{accounting.formatMoney(item.paket_pulsa, "", 0, ",", ",")}</Text>
                                                    </LinearGradient>
                                                </TouchableHighlight>
                                            </Col>
                                        ))}
                                    </Row>
                                ))}
                                </Grid>
                            </View>
                        : <AlertBox type={'warning'} title={'Pemberitahuan!'} text={'Anda belum memilih operator'}/> }
                    </View>
                    }
                </ScrollView>
                {/* ====== END LIST ====== */}

                {/* ====== START FOOTER ====== */}
                {this.state.totalAmount != 'Rp 0' ? 
                <FooterButton 
                    text={'Rp ' + accounting.formatMoney(this.state.totalAmount, "", 0, ",", ",")} 
                    textButton="Selanjutnya" 
                    onClick={()=> this.props.personal.data == null ? this.props.navigation.navigate('LoginUser') : this.props.navigation.navigate('PulsaConfirmation')}/>
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
        updateDataPulsa: (e) =>{
            dispatch({
				type: 'UPDATE_DATA_PULSA',
				data: e
			})
        },
        updatePhonePulsa: (e) =>{
            dispatch({
				type: 'UPDATE_PHONE_PULSA',
				phoneNumber: e
			})
        }
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PulsaComponent)
