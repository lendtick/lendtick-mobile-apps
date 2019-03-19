import React from 'react';
import { View,Text,TouchableHighlight,ScrollView,TextInput,Image,Dimensions,ActivityIndicator } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { Contacts } from 'expo';
import * as _ from 'lodash';
import { Main,Typography,Variable } from '@styles';
import { FooterButton,Modal } from '@directives';
import { styles } from './paket-data.style';

class PaketDataComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Paket Data",
        headerTitleStyle: Variable.headerTitleStyle,
    });


    constructor(props) {
        super(props);
        this.state = { 
            phoneNumber:null,
            listContact: [],
            listContactFilter: [],
            popupContacts: false,
            loadingContact: false
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
                <View style={{paddingTop:15,paddingBottom:15}}>
                    <View style={Main.container}>
                        {/* ====== START INPUT PHONE NUMBER ====== */}
                        <View style={styles.wrapPhoneNumber}>
                            <TouchableHighlight onPress={()=> console.log('asd')} underlayColor="transparent" style={styles.iconPhoneNumber}>
                                <Feather name="arrow-right" size={20} color="#9f9f9f" />
                            </TouchableHighlight>
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
                <Image style={styles.line} source={require('../../../../assets/img/bg/line.png')} />

                {/* ====== START LIST ====== */}
                <ScrollView style={{backgroundColor: Variable.backgroundGray}}>
                    <View style={[Main.container,{paddingTop:15}]}>

                        <TouchableHighlight onPress={()=> console.log('asd')} underlayColor="transparent">
                            <View style={styles.whiteBox}>
                                <Text style={styles.titleWhiteBox}>XL Data Combo XTRA 12 GB</Text>
                                <Text style={styles.descWhiteBox}>COMBO EXTRA 2GB+10GB(4G), XTRA Nelepon 50 menit ke semua operator</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=> console.log('asd')} underlayColor="transparent">
                            <View style={styles.whiteBox}>
                                <Text style={styles.titleWhiteBox}>XL Data Combo XTRA 12 GB</Text>
                                <Text style={styles.descWhiteBox}>COMBO EXTRA 2GB+10GB(4G), XTRA Nelepon 50 menit ke semua operator</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=> console.log('asd')} underlayColor="transparent">
                            <View style={styles.whiteBox}>
                                <Text style={styles.titleWhiteBox}>XL Data Combo XTRA 12 GB</Text>
                                <Text style={styles.descWhiteBox}>COMBO EXTRA 2GB+10GB(4G), XTRA Nelepon 50 menit ke semua operator</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=> console.log('asd')} underlayColor="transparent">
                            <View style={styles.whiteBox}>
                                <Text style={styles.titleWhiteBox}>XL Data Combo XTRA 12 GB</Text>
                                <Text style={styles.descWhiteBox}>COMBO EXTRA 2GB+10GB(4G), XTRA Nelepon 50 menit ke semua operator</Text>
                            </View>
                        </TouchableHighlight>

                    </View>
                </ScrollView>
                {/* ====== END LIST ====== */}

                {/* ====== START FOOTER ====== */}
                <FooterButton text="Rp 100.000" textButton="Continue" onClick={()=> this.props.navigation.navigate('PaketDataConfirmation')}/>
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
)(PaketDataComponent)
