import React from 'react';
import { View,ScrollView, Text,Platform } from 'react-native';
import { Col,Row } from "react-native-easy-grid";

import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
Validator.setMessages('en', en);

import { Typography, Variable } from '@styles';
import { InputComponent,ButtonComponent,AlertBox,InputCheckbox } from '@directives';
import { styles } from './address.style';

import { connect } from 'react-redux';
import personalService from '../personal.service';

class AddressFormComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Alamat Pengiriman",
        headerTitleStyle: Variable.headerTitleStyle,
    });


    constructor(props) {
        super(props);
        this.state = { 
            address_name: null,
            receiver_name: null,
            address_text: null,
            city_or_district: null,
            postal_code: null,
            receiver_phone: null,
            address_longitude: null,
            address_latlong_text: null,
            address_latitude: null,
            isSuccess: false,
            isFailed: false,
            isSubmit: false,
            isInvalid: false,
            isUpdate: false,
            checked: false,
        };
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.setState(navigation.state.params);
        if(this.state.address_name != null){
            this.setState({isUpdate: true});
        }
        setTimeout(()=>{
            if(this.state.address_name != null){
                this.setState({isUpdate: true});
            }

            if(this.state.is_main_address === "1"){
                this.setState({checked: true});
            }
        }, 1000);
    }

    // Validation
    // ======================== //
    validationSubmit(){
        this.setState({
            isSuccess: false,
            isFailed: false,
            isInvalid: false
        });
        let data = {
            address_name: this.state.address_name,
            receiver_name: this.state.receiver_name,
            address_text: this.state.address_text,
            city_or_district: this.state.city_or_district,
            postal_code: this.state.postal_code,
            receiver_phone: this.state.receiver_phone,
            address_longitude: 'address_longitude',
            address_latlong_text: this.state.address_latlong_text,
            address_latitude: 'address_latitude'
        };

        let rules = {
            address_name: 'required',
            receiver_name: 'required',
            address_text: 'required',
            city_or_district: 'required',
            postal_code: 'required',
            receiver_phone: 'required',
            address_longitude: 'required',
            address_latlong_text: 'required',
            address_latitude: 'required',
        };

        let validation = new Validator(data, rules);
        if(validation.passes()){
            this.onSubmit(data);
        }else{
            this.setState({isInvalid: true});
        }
    }
    // Submit
    // ======================== //
    onSubmit(data){
        this.setState({
            isSuccess: false,
            isFailed: false,
            isSubmit: true,
            isInvalid: false,
        });

        if(this.state.isUpdate){
            // Update Address
            // ================== //
            data['id_user_address'] = this.state.id_user_address;
            data['is_main_address'] = this.state.checked ? 1 : 0;
            personalService.putAddress(data).then(res =>{
                this.setState({
                    isSuccess: true,
                    isSubmit: false,
                });
                this.props.setAddress(true);
            }, err =>{
                this.setState({
                    isFailed: true,
                    isSubmit: false
                });
            });
        }else{
            // Post Address
            // ================== //
            personalService.postAddress(data).then(res =>{
                this.setState({
                    isSuccess: true,
                    isSubmit: false,
                    address_name: null,
                    receiver_name: null,
                    address_text: null,
                    city_or_district: null,
                    postal_code: null,
                    receiver_phone: null,
                    address_longitude: null,
                    address_latlong_text: null,
                    address_latitude: null
                });
                this.props.setAddress(true);
            }, err =>{
                this.setState({
                    isFailed: true,
                    isSubmit: false
                });
            });
        }   
    }

    render() {
        return (
            <View style={[styles.wrapper,{backgroundColor: "#fff"}]}>
                <ScrollView>
                <View style={{padding:15}}>
                    {/* ==================== START FORM ==================== */ }
                    <InputComponent 
                        label="Nama alamat"
                        iconName={null}
                        placeholder="Masukan nama alamat"
                        value={this.state.address_name}
                        onChange={(address_name) => this.setState({address_name})}/>
                    <InputComponent 
                        label="Nama penerima"
                        iconName={null}
                        placeholder="Masukan nama penerima"
                        value={this.state.receiver_name}
                        onChange={(receiver_name) => this.setState({receiver_name})}/>
                    <InputComponent 
                        label="No. Hanphone penerima"
                        iconName={null}
                        keyboardType="phone-pad"
                        placeholder="Masukan nomor hanphone penerima"
                        value={this.state.receiver_phone}
                        onChange={(receiver_phone) => this.setState({receiver_phone})}/>
                    <InputComponent 
                        label="Nama kota atau kecamatan"
                        iconName={null}
                        placeholder="Masukan kota atau kecamatan"
                        value={this.state.city_or_district}
                        onChange={(city_or_district) => this.setState({city_or_district})}/>
                    <InputComponent 
                        label="Kode POS"
                        iconName={null}
                        placeholder="Masukan kode POS"
                        value={this.state.postal_code}
                        onChange={(postal_code) => this.setState({postal_code})}/>
                    <InputComponent 
                        label="Alamat"
                        iconName={null}
                        placeholder="Masukan alamat"
                        value={this.state.address_latlong_text}
                        onChange={(address_latlong_text) => this.setState({address_latlong_text})}/>
                    <InputComponent 
                        label="Alamat spesifik"
                        iconName={null}
                        placeholder="Masukan spesifik alamat"
                        value={this.state.address_text}
                        onChange={(address_text) => this.setState({address_text})}/>
                    <Row>
                        <Col style={{width:35}}>
                            <InputCheckbox onChange={()=> this.setState({checked: !this.state.checked})} checked={this.state.checked}/>
                        </Col>
                        <Col>
                            <Text style={[Typography.singleText,{marginBottom:15,marginTop:3,color:Variable.colorPrimaryText}]}>Jadikan Alamat utama</Text>
                        </Col>
                    </Row>

                    {this.state.isFailed ? <AlertBox type="danger" text={this.state.isUpdate ? "Ubah alamat gagal, silakan coba lagi" : "Tambah alamat gagal, silakan coba lagi"}/>: null}
                    {this.state.isInvalid ? <AlertBox type="warning" text="Tambah alamat gagal, Pastikan anda telah memasukan data dengan benar"/>: null}
                    {this.state.isSuccess ? <AlertBox type="success" text={this.state.isUpdate ? "Ubah alamat berhasil" : "Tambah alamat berhasil"}/>: null}

                    <View style={{marginTop:15}}/>

                    <ButtonComponent type="primary" text={this.state.isUpdate ? "UBAH ALAMAT" : "TAMBAH ALAMAT"} onClick={()=> this.validationSubmit()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/>
                    {/* ==================== END FORM ==================== */ }
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
)(AddressFormComponent)