import React from 'react';
import { View,Text,ScrollView,TouchableHighlight,ActivityIndicator } from 'react-native';
import Dimensions from 'Dimensions';
import Feather from 'react-native-vector-icons/Feather';
import { Col,Row,Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';

import { Component } from '../../../styles/index';
import { CartDirective,InputCheckbox } from '../../../directive/index';
import { styles } from './address.style';
import profileService from '../profile-service';
import { store } from '../../../service/store';

class AddressComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Alamat Pengiriman",
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
            isloading: true,
            data: []
        };

        store.subscribe(() => {
            let obj = store.getState().address;
            console.log(obj.isUpdate);
            if(obj.isUpdate){
                this.fetchAddress();
            }
        });
    }

    componentDidMount(){
        this.fetchAddress();
        this.props.setAddress(false);
    }

    fetchAddress(){
        profileService.getUserAddress().then(res =>{
            console.log(res);
            if(res.status){
                this.setState({
                    isloading: false,
                    data: res.data
                });
            }else{
                alert(res.message);
            }
            
        }, err=>{
            console.log(err);
        });
    }

    onUpdateMainAddress(obj){
        console.log(obj);
    }

    render() {
        return (
            <View style={[styles.wrapper]}>
                {this.state.isloading ? 
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="small" color="#6a6a6a" />
                </View>
                :
                <View style={{height:'100%'}}>
                    {/* ====== START ADDRESS ====== */}
                    {this.state.data.length != 0 ? 
                    <View style={{height:'100%'}}>
                        <ScrollView>
                            <View style={[Component.container,{paddingTop:15,paddingBottom:15}]}>
                                {this.state.data.map((x,i) =>(
                                    <View key={i} style={styles.itemAddress}>
                                        <View style={styles.headerAddress}>
                                            <Grid>
                                                <Col>
                                                    <Text style={styles.titleAddress}>{x.address_name}</Text>
                                                    <Text style={styles.descAddress}>{x.address_text}</Text>
                                                </Col>
                                                <Col style={{width:35}}>
                                                    <InputCheckbox onChange={()=> this.onUpdateMainAddress(x)} alignRight={true} checked={x.is_main_address == "1"}/>
                                                </Col>
                                            </Grid>
                                        </View>
                                        <View style={styles.bodyAddress}>
                                            <Grid>
                                                <Row style={{marginBottom:15}}>
                                                    <Col>
                                                        <Text style={styles.titleAddress}>Nama Penerima</Text>
                                                        <Text style={styles.descAddress}>{x.receiver_name}</Text>
                                                    </Col>
                                                    <Col style={{width:'40%'}}>
                                                        <Text style={styles.titleAddress}>Handphone</Text>
                                                        <Text style={styles.descAddress}>{x.receiver_phone}</Text>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginBottom:15}}>
                                                    <Col>
                                                        <Text style={styles.titleAddress}>POS Kode</Text>
                                                        <Text style={styles.descAddress}>{x.postal_code}</Text>
                                                    </Col>
                                                    <Col style={{width:'40%'}}>
                                                        <Text style={styles.titleAddress}>Kota</Text>
                                                        <Text style={styles.descAddress}>{x.city_or_district}</Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Text style={styles.titleAddress}>Alamat Lengkap</Text>
                                                        <Text style={styles.descAddress}>{x.address_latlong_text}</Text>
                                                    </Col>
                                                </Row>
                                            </Grid>
                                        </View>
                                        <View style={{borderTopWidth:1,borderColor: '#efefef'}}>
                                            <Grid>
                                                <Col>
                                                    <TouchableHighlight onPress={()=> this.props.navigation.navigate('AddressDetail',x)} underlayColor="#fafafa">
                                                        <Text style={styles.linkDefault}>Detail</Text>
                                                    </TouchableHighlight>
                                                </Col>
                                                <Col>
                                                    <TouchableHighlight onPress={()=> this.props.navigation.navigate('AddressForm',x)} underlayColor="#fafafa">
                                                        <Text style={styles.linkPrimary}>Edit</Text>
                                                    </TouchableHighlight>
                                                </Col>
                                            </Grid>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                        <TouchableHighlight style={styles.positionAddAddress} onPress={() => this.props.navigation.navigate('AddressForm')} underlayColor="transparent">
                            <View style={styles.addAddress}>
                                <Feather name="plus" size={28} style={{top:7.5,left:7.5}} color="#ffffff" />
                            </View>
                        </TouchableHighlight>
                    </View>
                    : null}
                    {/* ====== END ADDRESS ====== */}
                    
                </View>
                }
                
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
)(AddressComponent)