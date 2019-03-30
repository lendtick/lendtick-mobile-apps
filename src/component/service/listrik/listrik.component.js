import React from 'react';
import { View, Text, TouchableHighlight, ScrollView, TextInput, Image, Dimensions } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';
import { Contacts } from 'expo';
import * as _ from 'lodash';
import { AlertBox,FooterButton,Modal } from '@directives';
import { Main,Typography,Variable } from '@styles';
import { styles } from './listrik.style';

class ListrikComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Listrik",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = { 
            phoneNumber:null,
            noMeter:null,
            listContact: [],
            listContactFilter: [],
            popupContacts: false,
            loadingContact: false,
            selectedLink: 'token'
        };
    }

    componentDidMount(){
        this.setMyNumber();
     }
 
     setMyNumber(){
         this.setState({phoneNumber: this.props.personal.data.phone_number});
     }
 
     selectContact(e){
         this.setState({
             phoneNumber: e,
             popupContacts: false
         });
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
                <View style={styles.wrapSelect}>
                    <Grid>
                        <Col style={{borderRightWidth:1,borderColor:'#efefef'}}>
                            <TouchableHighlight onPress={()=> this.setState({selectedLink: 'token'})} underlayColor="transparent">
                                <Text style={this.state.selectedLink == 'token' ? styles.itemLinkActive : styles.itemLink}>Token Listrik</Text>
                            </TouchableHighlight>
                        </Col>
                        <Col>
                            <TouchableHighlight onPress={()=> this.setState({selectedLink: 'tagihan'})} underlayColor="transparent">
                                <Text style={this.state.selectedLink == 'tagihan' ? styles.itemLinkActive : styles.itemLink}>Tagihan Listrik</Text>
                            </TouchableHighlight>
                        </Col>
                    </Grid>
                </View>

                <View style={Main.container}>

                    {/* ====== START INPUT PHONE NUMBER ====== */}
                    {this.state.selectedLink == 'token' ? <View style={styles.wrapPhoneNumber}>
                        <TextInput
                            style={[Typography.singleText,styles.inputSinglePhoneNumber]}
                            placeholder="Enter phone number"
                            keyboardType="phone-pad"
                            underlineColorAndroid="transparent"
                            dataDetectorTypes="phoneNumber"
                            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                            value={this.state.phoneNumber}
                        />
                    </View>
                    : null}
                    <View style={styles.wrapPhoneNumber}>
                        <TextInput
                            style={[Typography.singleText,styles.inputSinglePhoneNumber]}
                            placeholder="No. Meter"
                            underlineColorAndroid="transparent"
                            dataDetectorTypes="phoneNumber"
                            onChangeText={(noMeter) => this.setState({noMeter})}
                            value={this.state.noMeter}
                        />
                    </View>
                    {/* ====== END INPUT PHONE NUMBER ====== */}
                </View>
                <Image style={styles.line} source={require('@assets/img/bg/line.png')} />

                <ScrollView style={{backgroundColor: Variable.backgroundGray}}>
                    <View style={{paddingTop:15,paddingBottom:15,paddingLeft:7.5,paddingRight:7.5}}>
                        {this.state.selectedLink == 'token' ? <Grid>
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
                        </Grid> : null }

                        <View style={{paddingLeft:7.5,paddingRight:7.5}}>
                            {this.state.selectedLink == 'token' ? 
                            <AlertBox 
                                type="info" 
                                title="Informasi Detail"
                                text="Masukan nomer handphone untuk menerima kode Token."
                            /> :
                            <AlertBox 
                                type="info" 
                                title="Informasi Detail"
                                text={["Masukan nomer handphone untuk menerima kode Token.","Pembayran tagihan listrik tidak dapat dilakukan pada pukul 23.45-00.30 WIB sesuai dengan ketentuan PLN.","Proses verifikasi pembayaran membutuhkan waktu maksimul 2x24 jam."]}
                            />
                            }
                        </View>
                    </View>
                </ScrollView>

                {/* ====== START FOOTER ====== */}
                {this.state.selectedLink == "token" ? <FooterButton text= "Rp 50,000" textButton="Continue" onClick={()=> this.props.navigation.navigate('ListrikConfirmation')}/> : null}
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
)(ListrikComponent)
