import React from 'react';
import { View,Text,TouchableHighlight,ScrollView,TextInput,Image,Dimensions,ActivityIndicator } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import AutoHeightImage from 'react-native-auto-height-image';
import { Contacts } from 'expo';
import * as _ from 'lodash';
import { store } from '@services/store';
import watch from 'redux-watch';
import { connect } from 'react-redux';
import { Main,Typography,Variable } from '@styles';
import { FooterButton,Modal } from '@directives';
import { styles } from './pulsa.style';
import billerService from '../biller.service';

class PulsaCompnent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pulsa",
        headerTitleStyle: Variable.headerTitleStyle,
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
            loadingBiller: true,
            totalAmount: "Rp 0",
            selectedBiller: null,
            timeout: null
        };

        let watchPersonal = watch(store.getState, 'personal.data')
        store.subscribe(watchPersonal((newVal, oldVal, objectPath) => {
            this.setMyNumber();
        }));
    }

    componentDidMount(){
        try{
            this.setMyNumber();
        }catch(err){}
    }

    checkPhone(phone){
        phone = phone ? phone.replace(/-/g,'').replace(/ /g,'').replace('+62',0) : 0;
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
        this.setState({loadingContact: true});
        const { data } = await Contacts.getContactsAsync();
        this.setState({
            listContact: data,
            listContactFilter: data,
            popupContacts: true,
            loadingContact: false
        });
    }

    fetchBiller(billerid){
        let obj ={
            billerid: billerid,
            accountnumber: this.state.phoneNumber.split(' ').join('')
        };
        
        this.setState({loadingBiller: true});
        billerService.postBillerInquiry(obj).then(res =>{
            if(res.data){
                let billdetails = res.data.response.billdetails;
                _.map(billdetails, (x)=>{
                    x['total'] = Number(x.totalamount) - Number(x.adminfee)
                    x['rp_total'] = "Rp " + x['total'].toLocaleString()
                });
                this.setState({
                    billdetails: billdetails,
                    loadingBiller: false,
                });
                if(billdetails.length) this.selectBiller(billdetails[0]);
            }else{
                this.setState({
                    billdetails: [],
                    loadingBiller: false,
                });
            }
        });
    }

    selectBiller(e){
        this.setState({
            totalAmount: e.rp_total,
            selectedBiller: e
        });
        let provider = {
            providerName: this.state.providerName, 
            providerImage: this.state.providerImage,
            billersIdPulsa: this.state.billersIdPulsa
        };
        this.props.updateDataPulsa(_.merge(e,provider));
        this.props.updatePhonePulsa(this.state.phoneNumber);
    }

    chaneNumber(e){
        clearTimeout(this.state.timeout);
        this.state.timeout = setTimeout(() => {
            this.checkPhone(e);
        }, 500);
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
                                    <TouchableHighlight onPress={()=> this.setMyNumber()} underlayColor="transparent">
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
                                        <View style={[styles.whiteBox,this.state.selectedBiller == item ? styles.whiteBoxActive : null]}>
                                            <Text style={styles.titleWhiteBox}>{item.title}</Text>
                                            <Text style={styles.descWhiteBox}>{item.descriptions}</Text>
                                        </View>
                                    </TouchableHighlight>
                                ))}
                            </View>
                        : <Text style={[Typography.singleText,{textAlign:'center', marginTop:30}]}>Pulsa tidak ditemukan</Text>}
                    </View>
                    }
                </ScrollView>
                {/* ====== END LIST ====== */}

                {/* ====== START FOOTER ====== */}
                {this.state.totalAmount != 'Rp 0' ? 
                <FooterButton 
                    text={this.state.totalAmount} 
                    textButton="Continue" 
                    onClick={()=> this.props.navigation.navigate('PulsaConfirmation')}/>
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
)(PulsaCompnent)
