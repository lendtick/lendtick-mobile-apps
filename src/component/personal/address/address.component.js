import React from 'react';
import { View,Text,ScrollView,TouchableHighlight,ActivityIndicator,Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Col,Row,Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';

import { Variable } from '@styles';
import { InputCheckbox } from '@directives';
import { styles } from './address.style';
import personalService from '../personal.service';
import { store } from '@services/store';

class AddressComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Alamat Pengiriman",
        headerTitleStyle: Variable.headerTitleStyle,
    });


    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            data: []
        };

        store.subscribe(() => {
            let obj = store.getState().address;
            if(obj.isUpdate){
                this.fetchAddress();
            }
        });
    }

    componentDidMount(){
        this.fetchAddress();
    }

    fetchAddress(){
        this.setState({isloading: true});
        personalService.getUserAddress().then(res =>{
            if(res.status){
                this.setState({
                    isloading: false,
                    data: res['data']
                });
                if(res['data'].length == 0) this.props.navigation.navigate('AddressForm');
            }else{
                alert(res.message);
            }
            this.props.setAddress(false);
        });
    }

    onUpdateMainAddress(obj){
        obj.is_main_address = 1;
        obj.id_user_address = Number(obj.id_user_address);
        this.setState({isloading: true});
        personalService.putAddress(obj).then(res =>{
            this.props.setAddress(true);
        }, err =>{
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.onUpdateMainAddress(obj)}],
                {cancelable: false},
            );
        });
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
                            <View style={{padding:15}}>
                                {this.state.data.map((x,i) =>(
                                    <View key={i} style={styles.itemAddress}>
                                        <View style={styles.headerAddress}>
                                            <Grid>
                                                <Col>
                                                    <Text style={styles.titleAddress}>{x.address_name}</Text>
                                                    <Text style={styles.descAddress}>{x.address_text}</Text>
                                                </Col>
                                                <Col style={{width:20}}>
                                                    <InputCheckbox onChange={()=> this.onUpdateMainAddress(x)} checked={x.is_main_address == "1"}/>
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