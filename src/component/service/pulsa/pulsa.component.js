import React from 'react';
import { View,Text,TouchableHighlight,ScrollView,TextInput,Image,Dimensions,ActivityIndicator } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Feather from 'react-native-vector-icons/Feather';
import { Contacts } from 'expo';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { Main,Typography,Variable } from '@styles';
import { FooterButton,Modal } from '@directives';
import { styles } from './pulsa.style';

import pulseService from './pulse.service';

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
            providerName: null
        };
    }

    componentDidMount(){
       this.setMyNumber();
    }

    checkPhone(phone){
        if(phone.length > 4){
            pulseService.getInfoPhone(phone.substring(0,4)).then(res =>{
                console.log(res);
                this.setState({providerName: res.data[0].provider_phone_name})
            });
        }
    }

    setMyNumber(){
        this.setState({phoneNumber: this.props.personal.data.phone_number});
        this.checkPhone(this.props.personal.data.phone_number);
    }

    selectContact(e){
        this.setState({
            phoneNumber: e,
            popupContacts: false
        });
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

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={{paddingTop:15,paddingBottom:15}}>
                    <View style={Main.container}>
                        {/* ====== START INPUT PHONE NUMBER ====== */}
                        <View style={styles.wrapPhoneNumber}>
                            <View style={styles.iconPhoneNumber}>
                                <Text style={Typography.singleText}>{this.state.providerName}</Text>
                            </View>
                            <TextInput
                                style={[Typography.singleText,styles.inputSinglePhoneNumber]}
                                placeholder="Enter phone number"
                                underlineColorAndroid="transparent"
                                dataDetectorTypes="phoneNumber"
                                onChangeText={(phoneNumber) => {
                                    this.setState({phoneNumber});
                                    this.checkPhone(phoneNumber)
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

                <ScrollView style={{backgroundColor: Variable.backgroundGray}}>
                    <View style={{paddingTop:15,paddingBottom:15,paddingLeft:7.5,paddingRight:7.5}}>
                        <Grid>
                            <Row>
                                <Col>
                                    <View style={styles.itemPulsa}>
                                        <Text style={styles.textPulsa}>Rp. 5000</Text>
                                    </View>
                                </Col>
                                <Col>
                                    <View style={styles.itemPulsa}>
                                        <Text style={styles.textPulsa}>Rp. 10,000</Text>
                                    </View>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <View style={styles.itemPulsa}>
                                        <Text style={styles.textPulsa}>Rp. 15,000</Text>
                                    </View>
                                </Col>
                                <Col>
                                    <View style={styles.itemPulsa}>
                                        <Text style={styles.textPulsa}>Rp. 20,000</Text>
                                    </View>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <View style={styles.itemPulsa}>
                                        <Text style={styles.textPulsa}>Rp. 50,000</Text>
                                    </View>
                                </Col>
                                <Col>
                                    <View style={styles.itemPulsa}>
                                        <Text style={styles.textPulsa}>Rp. 100,000</Text>
                                    </View>
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                </ScrollView>

                {/* ====== START FOOTER ====== */}
                <FooterButton text="Rp 100.000" textButton="Continue" onClick={()=> this.props.navigation.navigate('PulsaConfirmation')}/>
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
		setGetData: (e) => {
			dispatch({
				type: 'UPDATE_DATA_PERSONAL',
				data: e
			})
        },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PulsaCompnent)
