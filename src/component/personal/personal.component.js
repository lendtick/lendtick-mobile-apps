import React from 'react';
import { ScrollView,View,Text,ActivityIndicator,TouchableHighlight,AsyncStorage,Alert,StatusBar, Platform } from 'react-native';
import { Constants } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';
import AutoHeightImage from 'react-native-auto-height-image';
import { Col,Grid } from "react-native-easy-grid";
import { AntDesign } from '@expo/vector-icons';
import watch from 'redux-watch';
import { connect } from 'react-redux';
import { Variable,Main,Input,Typography } from '@styles';
import personalService from './personal.service';
import { store } from '@services/store';

class personalComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Personal",
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
            name: null,
            id: null,
            loading: true,
            loadingAddress: true,
            validDate: null,
            notification: {},
            pageAddress: null
        };

        store.subscribe(() => {
            let obj = store.getState().address;
            if(obj.isUpdate){
                this.fetchAddress();
            }
        });
    }

    componentWillMount(){
        AsyncStorage.getItem('token').then((token)=>{
            if(token){
                this.fetchUser();
                this.fetchAddress();
            }else{
                this.props.navigation.navigate('LoginUser');
            }
        });
    }

    logout(){
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('username');
        AsyncStorage.removeItem('isNew').then((result)=>{
            this.props.navigation.navigate('LoginUser');
        });
    }

    fetchUser(){
        this.setState({loading: true});
        personalService.getInfoUser().then(res =>{
            let dataUser = res['data'];
            this.props.setGetData(dataUser);
            let moment = require("moment");
            let dateBecomeMember = dataUser.date_become_member ? moment(dataUser.date_become_member.substring(0, 10)).add(1800, 'days').format('DD MMM YYYY') : '-';
            this.setState({
                name: dataUser.name,
                id: dataUser.id_koperasi,
                validDate: "Valid date : " + dateBecomeMember,
                becomeMember: "Join date: " + moment(dataUser.date_become_member).format('DD MMM YYYY'),
                loading: false
            });
        }, err =>{
            this.setState({loading: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchUser()}],
                {cancelable: false},
            );
        });
    }

    fetchAddress(){
        personalService.getUserAddress().then(res =>{
            this.setState({loadingAddress: false});
            if(res['data'].length){
                this.setState({pageAddress: "Address"});
            }else{
                this.setState({pageAddress: "AddressForm"});
            }
        });
    }

    render() { 
        return(
            <View style={{height:'100%',backgroundColor: Variable.backgroundGray}}>
                <ScrollView>
                    <View style={[Main.container,{paddingTop: 15, paddingBottom: 5}]}> 
                        <LinearGradient
                            colors={['#25c4fd', '#aad95a']}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            style={{ padding: 15, borderRadius: 4, width: '100%', marginBottom: 15 }}>
                            <AutoHeightImage width={150} source={require('@assets/img/koperasi-astra-new.png')} />

                            {this.state.loading ? <Text style={[Typography.singleText,{marginTop:15, color:'white'}]}>Loading...</Text> :
                            <View>
                                <Text style={[Typography.heading5,{marginTop:15,marginBottom:5, color:'white'}]}>{this.state.name}</Text>
                                <Text style={[Typography.heading6,{marginBottom:15, color:'white'}]}>{this.state.id}</Text>
                                {/* <Text style={[Typography.singleText,{marginBottom:0, color:'white', textAlign:'right'}]}>{this.state.validDate}</Text> */}
                                <Text style={[Typography.singleText,{marginBottom:0, color:'white', textAlign:'right'}]}>{this.state.becomeMember}</Text>
                            </View>}
                        </LinearGradient>

                    </View>

                    {!this.state.loading ? 
                    <View style={{marginBottom: 20, width: 112,left:'50%', marginLeft: -56}}>
                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('QRCode',{
                            code: this.state.id,
                            name: this.state.name
                        });}} underlayColor="transparent">
                            <View style={{flex: 1, flexDirection: 'row',alignItems: 'center'}}>
                                <AntDesign name="qrcode" size={14} color={Variable.colorPrimaryText} />
                                <Text style={[Input.singleLink,{textAlign:'center',marginLeft: 5}]}>Lihat QR Code</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    : null }

                    {!this.state.loading ? 
                    <Grid style={{backgroundColor:'white',borderBottomWidth:1,borderTopWidth:1,borderColor:'#efefef'}}>
                        <Col style={{borderRightWidth:1,borderColor:'#efefef',padding:15, width:'33.3%'}}>
                            <TouchableHighlight onPress={()=>{this.props.navigation.navigate('ListHistoryOrder')}} underlayColor="transparent">
                                <View>
                                    <AntDesign name="shoppingcart" size={24} style={{textAlign:'center',marginBottom:10}} color={Variable.colorContent} />
                                    <Text style={[Typography.singleText,{textAlign:'center'}]}>Pembelian Saya</Text>
                                </View>
                            </TouchableHighlight>
                        </Col>
                        <Col style={{borderRightWidth:1,borderColor:'#efefef',padding:15, width:'33.3%'}}>
                            <TouchableHighlight onPress={()=>{this.props.navigation.navigate('Balance');}} underlayColor="transparent">
                                <View>
                                    <AntDesign name="wallet" size={24} style={{textAlign:'center',marginBottom:10}} color={Variable.colorContent} />
                                    <Text style={[Typography.singleText,{textAlign:'center'}]}>Saldo</Text>
                                </View>
                            </TouchableHighlight>
                        </Col>
                        <Col style={{padding:15, width:'33.3%'}}>
                            <TouchableHighlight onPress={()=>{this.props.navigation.navigate('Pinjaman');}} underlayColor="transparent">
                                <View>
                                    <AntDesign name="folder1" size={24} style={{textAlign:'center',marginBottom:10}} color={Variable.colorContent} />
                                    <Text style={[Typography.singleText,{textAlign:'center'}]}>Pinjaman Saya</Text>
                                </View>
                            </TouchableHighlight>
                        </Col>
                    </Grid>
                    : null }

                    <View style={[Main.container,{paddingTop: 15, paddingBottom: 15}]}> 
                        {this.state.loading ? <ActivityIndicator size="small" color="#333" style={{marginBottom:15}}/> :
                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('DataPersonal');}} underlayColor="transparent">
                            <Grid style={{padding:15, backgroundColor:'white',borderWidth:1,borderBottomWidth:0,borderColor:'#efefef'}}>
                                <Col>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <AntDesign name="user" size={14} style={{marginRight: 10, top:2}} color={Variable.colorContent} />
                                        <Text style={Typography.singleText}>Data Personal</Text>
                                    </View>
                                </Col>
                                <Col><AntDesign name="right" size={18} style={{textAlign:'right',top:-2}} color={Variable.colorContent} /></Col>
                            </Grid>
                        </TouchableHighlight>
                        }
                        {this.state.loadingAddress ? null :
                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate(this.state.pageAddress);}} underlayColor="transparent">
                            <Grid style={{padding:15, backgroundColor:'white',borderWidth:1,borderBottomWidth:0,borderColor:'#efefef'}}>
                                <Col>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <AntDesign name="home" size={14} style={{marginRight: 10, top:2}} color={Variable.colorContent} />
                                        <Text style={Typography.singleText}>Pengaturan Alamat</Text>
                                    </View>
                                </Col>
                                <Col><AntDesign name="right" size={18} style={{textAlign:'right',top:-2}} color={Variable.colorContent} /></Col>
                            </Grid>
                        </TouchableHighlight>
                        }
                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('GantiPassUser');}} underlayColor="transparent">
                            <Grid style={{padding:15, backgroundColor:'white',borderWidth:1,borderBottomWidth:0,borderColor:'#efefef'}}>
                                <Col>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <AntDesign name="lock" size={14} style={{marginRight: 10, top:2}} color={Variable.colorContent} />
                                        <Text style={Typography.singleText}>Ubah kata sandi</Text>
                                    </View>
                                </Col>
                                <Col><AntDesign name="right" size={18} style={{textAlign:'right',top:-2}} color={Variable.colorContent} /></Col>
                            </Grid>
                        </TouchableHighlight>
                        {/* <TouchableHighlight onPress={()=>{this.props.navigation.navigate('FAQ');}} underlayColor="transparent">
                            <Grid style={{padding:15, backgroundColor:'white',borderWidth:1,borderBottomWidth:0,borderColor:'#efefef'}}>
                                <Col>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <AntDesign name="help-circle" size={14} style={{marginRight: 10, top:2}} color={Variable.colorContent} />
                                        <Text style={Typography.singleText}>Bantuan</Text>
                                    </View>
                                </Col>
                                <Col><AntDesign name="right" size={18} style={{textAlign:'right',top:-2}} color={Variable.colorContent} /></Col>
                            </Grid>
                        </TouchableHighlight> */}
                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('About');}} underlayColor="transparent">
                            <Grid style={{padding:15, backgroundColor:'white',borderWidth:1,borderBottomWidth:0,borderColor:'#efefef'}}>
                                <Col>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <AntDesign name="infocirlceo" size={14} style={{marginRight: 10, top:2}} color={Variable.colorContent} />
                                        <Text style={Typography.singleText}>Tentang Koperasi Astra</Text>
                                    </View>
                                </Col>
                                <Col><AntDesign name="right" size={18} style={{textAlign:'right',top:-2}} color={Variable.colorContent} /></Col>
                            </Grid>
                        </TouchableHighlight>
                        


                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('AboutApp');}} underlayColor="transparent">
                            <Grid style={{padding:15, backgroundColor:'white',borderWidth:1,borderBottomWidth:0,borderColor:'#efefef'}}>
                                <Col>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <AntDesign name="mobile1" size={14} style={{marginRight: 10, top:2}} color={Variable.colorContent} />
                                        <Text style={Typography.singleText}>Tentang Aplikasi </Text>
                                    </View>
                                </Col>
                                <Col><AntDesign name="right" size={18} style={{textAlign:'right',top:-2}} color={Variable.colorContent} /></Col>
                            </Grid>
                        </TouchableHighlight>


                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('Contact');}} underlayColor="transparent">
                            <Grid style={{padding:15, backgroundColor:'white',borderWidth:1,borderBottomWidth:0,borderColor:'#efefef'}}>
                                <Col>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <AntDesign name="customerservice" size={14} style={{marginRight: 10, top:2}} color={Variable.colorContent} />
                                        <Text style={Typography.singleText}>Hubungi kami</Text>
                                    </View>
                                </Col>
                                <Col><AntDesign name="right" size={18} style={{textAlign:'right',top:-2}} color={Variable.colorContent} /></Col>
                            </Grid>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{this.logout();}} underlayColor="transparent">
                            <Grid style={{padding:15, backgroundColor:'#da6d6d',borderWidth:1,borderColor:'#efefef'}}>
                                <Col>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <AntDesign name="arrowright" size={14} style={{marginRight: 10}} color="#fff" />
                                        <Text style={[Typography.singleText,{color:'#fff'}]}>Keluar</Text>
                                    </View>
                                </Col>
                                <Col><AntDesign name="right" size={18} style={{textAlign:'right',top:-2}} color="#fff" /></Col>
                            </Grid>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        ) 
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
		setGetData: (e) => {
			dispatch({
				type: 'UPDATE_DATA_PERSONAL_HOME',
				data: e
			})
        },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(personalComponent)
