import React from 'react';
import { View, Text, TouchableHighlight, ScrollView, TextInput, Image, Dimensions, ActivityIndicator } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';
import watch from 'redux-watch';
import { store } from '@services/store';
import * as _ from 'lodash';
import { FooterButton,Modal,ButtonComponent,InputComponent } from '@directives';
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
            token:null,
            selectedLink: 'token',
            isSubmitToken: false,
            billdetails: [],
            totalAmount: 'Rp 0',
            selectedBiller: null,
            providerName: null,
            providerImage: null,
        };
    }

    componentDidMount(){}

    fetchBiller(){
        if(this.state.token){
            let obj ={
                billerid: this.state.selectedLink === 'token' ? '9950101' : '9950102',
                accountnumber: this.state.token.split(' ').join('')
            };
            this.setState({isSubmitToken: true});
            billerService.postBillerInquiry(obj).then(res =>{
                console.log(res);
                let billdetails = res.data.response.billdetails;
                _.map(billdetails, (x)=>{
                    x['total'] = Number(x.totalamount) - Number(x.adminfee)
                    x['rp_total'] = "Rp " + x['total'].toLocaleString()
                });
                this.setState({
                    billdetails: billdetails,
                    isSubmitToken: false,
                    providerName: res.data.response.billername,
                    providerImage: null,
                });
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
            billersId: this.state.selectedLink === 'token' ? '9950101' : '9950102'
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
                        placeholder="Masukan nomor token"
                        value={this.state.token}
                        onChange={(token) => this.setState({token})}/>
                    <ButtonComponent type="primary" text="Submit Token" onClick={()=> this.fetchBiller()} disabled={this.state.isSubmitToken} isSubmit={this.state.isSubmitToken} />
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
                        {this.state.billdetails.map((item,i)=>(
                            <TouchableHighlight key={i} onPress={()=> this.selectBiller(item)} underlayColor="transparent">
                                <View style={[styles.whiteBox,this.state.selectedBiller == item ? styles.whiteBoxActive : null]}>
                                    <Text style={styles.titleWhiteBox}>{item.title}</Text>
                                    <Text style={styles.descWhiteBox}>{item.descriptions}</Text>
                                </View>
                            </TouchableHighlight>
                        ))}
                    </View>
                    }
                </ScrollView>
                {/* ====== END LIST ====== */}

                {/* ====== START FOOTER ====== */}
                {this.state.totalAmount != 'Rp 0' ? 
                    <FooterButton text={this.state.totalAmount} textButton="Continue" onClick={()=> this.props.navigation.navigate('ListrikConfirmation')}/>
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
