import React from 'react';
import { View,Text,ScrollView,TouchableHighlight,ActivityIndicator } from 'react-native';
import Dimensions from 'Dimensions';
import Feather from 'react-native-vector-icons/Feather';
import { Col,Row,Grid } from "react-native-easy-grid";

import { Component,Variable,Typography,Input } from '../../../styles/index';
import { CartDirective,InputCheckbox } from '../../../directive/index';
import { styles } from './address.style';

import { connect } from 'react-redux';
import profileService from '../profile-service';

class AddressDetailComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Detail Alamat",
        headerStyle: {
            backgroundColor: '#fff',
            overflow: 'hidden',
        },
        headerTintColor: '#3a3a3a',
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: 14,
            color: '#3a3a3a',
            letterSpacing: .5,
            width: Dimensions.get('window').width - 150,
            textAlign: 'center'
        },
        headerRight: (
            <TouchableHighlight onPress={() => navigation.navigate('Shop')} underlayColor="transparent">
                <CartDirective />
            </TouchableHighlight>
        ),
    });
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            isSubmit: false
        };
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.setState(navigation.state.params);
        this.setState({checked: navigation.state.params.is_main_address == "1"});
    }

    deleteAddressna(){
        this.setState({isSubmit: true});
        let obj = {id_user_address: this.state.id_user_address};
        profileService.deleteAddress(obj).then(res =>{
            this.setState({isSubmit: false});
            this.props.setAddress(true);
            this.props.navigation.goBack();
        }, err =>{
            this.setState({isSubmit: false});
        })
    }
    
    render() {
        
        return (
            <View style={[styles.wrapper]}>
                <ScrollView>
                <View style={Component.container}>

                   <View style={[Component.wrapInfo,{marginTop:15,paddingBottom:5}]}>
                        <Grid>
                            <Row style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                                <Col>
                                    <Text style={[Typography.singleText,{marginBottom:5}]}>Nama Alamat</Text>
                                    <Text style={Typography.label}>{this.state.address_name}</Text>
                                </Col>
                            </Row>
                            <Row style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                                <Col>
                                    <Text style={[Typography.singleText,{marginBottom:5}]}>Nama Penerima</Text>
                                    <Text style={Typography.label}>{this.state.receiver_name}</Text>
                                </Col>
                            </Row>
                            <Row style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                                <Col>
                                    <Text style={[Typography.singleText,{marginBottom:5}]}>No.HP Penerima</Text>
                                    <Text style={Typography.label}>{this.state.receiver_phone}</Text>
                                </Col>
                            </Row>
                            <Row style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                                <Col>
                                    <Text style={[Typography.singleText,{marginBottom:5}]}>Kode POS</Text>
                                    <Text style={Typography.label}>{this.state.postal_code}</Text>
                                </Col>
                            </Row>
                            <Row style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                                <Col>
                                    <Text style={[Typography.singleText,{marginBottom:5}]}>Kota</Text>
                                    <Text style={Typography.label}>{this.state.city_or_district}</Text>
                                </Col>
                            </Row>
                            <Row style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                                <Col>
                                    <Text style={[Typography.singleText,{marginBottom:5}]}>Alamat Lengkap</Text>
                                    <Text style={Typography.label}>{this.state.address_latlong_text}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width:35}}>
                                    <InputCheckbox onChange={()=> this.setState({checked: !this.state.checked})} checked={this.state.checked}/>
                                </Col>
                                <Col>
                                    <Text style={[Typography.singleText,{marginBottom:15,marginTop:3,color:Variable.colorPrimaryText}]}>Jadikan Alamat utama</Text>
                                </Col>
                            </Row>
                        </Grid>
                    </View>

                    {this.state.isSubmit ? 
                         <View style={{marginBottom: 20,marginTop: 20,position:'relative',zIndex:2}}><ActivityIndicator size="small" color="#6a6a6a" /> </View>
                    : 
                        <View style={{marginBottom: 20,position:'relative',zIndex:2}}>
                            <TouchableHighlight style={[this.state.disabled ? Input.btnDisabled : Input.btnPrimary,{marginTop:30}]} onPress={()=> this.props.navigation.navigate('AddressForm',this.state)} underlayColor={this.state.disabled ? '#999' : Variable.colorPrimary}>
                                {this.state.isSubmit ? <ActivityIndicator size="small" color="#fff" /> : <Text style={Input.btnText}>Ubah alamat</Text> }
                            </TouchableHighlight>
                            <TouchableHighlight style={{marginTop:15,marginBottom:15}} onPress={()=> this.deleteAddressna()} underlayColor={this.state.disabled ? '#999' : '#fff'}>
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