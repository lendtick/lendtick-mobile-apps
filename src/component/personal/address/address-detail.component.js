import React from 'react';
import { View,Text,ScrollView,TouchableHighlight,ActivityIndicator,Alert } from 'react-native';
import { Col,Row,Grid } from "react-native-easy-grid";

import { Main,Variable,Typography,Input } from '@styles';
import { InputCheckbox,ButtonComponent,AlertBox } from '@directives';
import { styles } from './address.style';

import { connect } from 'react-redux';
import personalService from '../personal.service';

class AddressDetailComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Detail Alamat",
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
            checked: false,
            isSubmit: false,
            message: null,
            isFailed: false
        };
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.setState(navigation.state.params);
        this.setState({checked: navigation.state.params.is_main_address == "1"});
    }

    deleteAddressna(){
        this.setState({
            isSubmit: true,
            isFailed: false
        });
        let obj = {id_user_address: this.state.id_user_address};
        personalService.deleteAddress(obj).then(res =>{
            if(res.status == 0){
                this.setState({
                    isSubmit: false,
                    isFailed: true,
                    message: res.message
                })
            }else{
                this.setState({isSubmit: false});
                this.props.setAddress(true);
                this.props.navigation.goBack();
            }
        }, err =>{
            this.setState({isSubmit: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.deleteAddressna()}],
                {cancelable: false},
            );
        })
    }

    onUpdateMainAddress(){
        var obj = {
            is_main_address: 1,
            id_user_address: this.state.id_user_address,
            address_name: this.state.address_name,
            receiver_name: this.state.receiver_name,
            address_text: this.state.address_text,
            city_or_district: this.state.city_or_district,
            postal_code: this.state.postal_code,
            receiver_phone: this.state.receiver_phone,
            address_longitude: this.state.address_longitude,
            address_latlong_text: this.state.address_latlong_text,
            address_latitude: this.state.address_latitude
        }
        this.setState({isSubmit: true});
        personalService.putAddress(obj).then(res =>{
            this.setState({isSubmit: false});
            this.props.setAddress(true);
            this.props.navigation.goBack();
        }, err =>{
            this.setState({isSubmit: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.onUpdateMainAddress()}],
                {cancelable: false},
            );
        });
    }
    
    render() {
        
        return (
            <View style={[styles.wrapper]}>
                <ScrollView>

                   <View style={[Main.wrapInfo,{paddingBottom:5}]}>
                        <Grid>
                            <Row style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15,paddingBottom:15}}>
                                <Col>
                                    <Text style={[Typography.singleText,{marginBottom:5}]}>Kota</Text>
                                    <Text style={Typography.label}>{this.state.city_or_district}</Text>
                                </Col>
                            </Row>
                            <Row style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15,paddingBottom:15}}>
                                <Col>
                                    <Text style={[Typography.singleText,{marginBottom:5}]}>Nama Penerima</Text>
                                    <Text style={Typography.label}>{this.state.receiver_name}</Text>
                                </Col>
                            </Row>
                            <Row style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15,paddingBottom:15}}>
                                <Col>
                                    <Text style={[Typography.singleText,{marginBottom:5}]}>No.HP Penerima</Text>
                                    <Text style={Typography.label}>{this.state.receiver_phone}</Text>
                                </Col>
                            </Row>
                            <Row style={{marginBottom:15}}>
                                <Col>
                                    <Text style={[Typography.singleText,{marginBottom:5}]}>Alamat Lengkap</Text>
                                    <Text style={Typography.label}>{this.state.address_latlong_text}</Text>
                                </Col>
                            </Row>
                            <Row style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15,paddingTop:5,paddingBottom:15}}>
                                <Col>
                                    <Text style={[Typography.singleText,{marginBottom:5}]}>Nama Alamat</Text>
                                    <Text style={Typography.label}>{this.state.address_name}</Text>
                                </Col>
                            </Row>
                            <Row style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15,paddingBottom:15}}>
                                <Col>
                                    <Text style={[Typography.singleText,{marginBottom:5}]}>Kode POS</Text>
                                    <Text style={Typography.label}>{this.state.postal_code}</Text>
                                </Col>
                            </Row>
                            
                            
                            {this.state.is_main_address !== '1' ? 
                            <Row>
                                <Col style={{width:35}}>
                                    <InputCheckbox onChange={()=> this.onUpdateMainAddress()} checked={this.state.checked}/>
                                </Col>
                                <Col>
                                    <Text style={[Typography.singleText,{marginBottom:15,marginTop:3,color:Variable.colorPrimaryText}]}>Jadikan Alamat utama</Text>
                                </Col>
                            </Row>
                            : null}
                        </Grid>
                    </View>

                <View style={{paddingLeft:15,paddingRight:15,marginTop: 20}}>
                    {this.state.isSubmit ?
                    <View style={{marginBottom: 20,position:'relative',zIndex:2}}><ActivityIndicator size="small" color="#333"/></View>
                    :
                    <View style={{marginBottom: 20,position:'relative',zIndex:2}}>

                        {this.state.isFailed ? <View style={{marginBottom:15}}><AlertBox type="danger" text={this.state.message}/></View> : null}
                        
                        <ButtonComponent type="primary" text="Ubah alamat" onClick={() => this.props.navigation.navigate('AddressForm',this.state)} disabled={false} isSubmit={false}/>
                        
                        <TouchableHighlight style={{marginTop:15,marginBottom:15}} onPress={()=> this.deleteAddressna()} underlayColor="transparent">
                            <Text style={Input.btnTextDanger}>Hapus alamat ini</Text>
                        </TouchableHighlight>
                    </View> 
                    }
                </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		address: state.address
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setAddress: (e) => {
			dispatch({
				type: 'UPDATE_ADDRESS',
				isUpdate: e
			})
        },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddressDetailComponent)