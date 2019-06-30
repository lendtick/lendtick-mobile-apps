import React, { Component } from 'react';
import { ScrollView,View,StatusBar,TouchableHighlight,Text,Alert } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';

import registerService from './register.service';
import { ButtonComponent, BlockLogo, InputCheckbox, AlertBox } from '@directives';
import { Main,Variable,Input,Typography } from '@styles';

class TermComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Register",
        headerTitleStyle: Variable.headerTitleStyle,
        headerLeft: null
    });

    constructor(props) {
        super(props);
        this.state = { 
            isSubmit: false,
            checked: false,
            isFailed: false,
            message: null
        };
    }

    onSubmit(){
        this.setState({isSubmit: true});
        registerService.postRegister(this.props.register.data).then(res =>{
            if(res.status){
                this.setState({isSubmit: false});
                this.props.setRegister(res['data']);
                this.props.navigation.navigate('Otp');
            }else{
                this.setState({
                    isFailed: true,
                    isSubmit: false,
                    message: res.message
                });
            }
        }, err =>{
            this.setState({isSubmit: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.onSubmit()}],
                {cancelable: false},
            );
        })
    }

    render() {
        return (
            <View style={{height:'100%',backgroundColor:'white'}}>
                <ScrollView>
                
                    <BlockLogo />
                
                    <View style={[Main.container,{marginTop: 15,paddingBottom: 15}]}>
                        <StatusBar barStyle="dark-content" />
                        
                        <View style={{padding: 30, backgroundColor: Variable.backgroundGray}}>
                            <Text style={Typography.heading5}>Syarat & Ketentuan</Text>
                            <Text style={[Typography.singleText,{marginBottom:15}]}>
                                Dengan mencentang ini, Anda Setuju untuk memberikan data anda kepada Koperasi Astra International untuk digunakan sebagai syarat administrasi pendafataran anggota baru Koperasi Astra Internation. 
                            </Text>
                            <Grid>
                                <Col style={{width:35}}>
                                    <InputCheckbox onChange={()=> this.setState({checked: !this.state.checked})} checked={this.state.checked}/>
                                </Col>
                                <Col>
                                    <Text style={[Typography.singleText,{marginBottom:15,marginTop:3}]}>Saya menyetujui ketentuan ini</Text>
                                </Col>
                            </Grid>
                        </View>

                        {this.state.isFailed ? <View style={{marginTop: 20}}><AlertBox type="danger" text={this.state.message}/></View> : null}

                        <View style={{marginTop: 20}}>
                            <TouchableHighlight onPress={()=> this.props.navigation.navigate('Register')} underlayColor="transparent">
                                <Text style={[Input.singleLink,{textAlign:'center'}]}>Kembali</Text>
                            </TouchableHighlight>
                        </View>

                        <View style={{marginBottom: 20}} />
                        
                        <ButtonComponent type="primary" text="Menyetujui" onClick={()=> this.onSubmit()} disabled={this.state.isSubmit || !this.state.checked} isSubmit={this.state.isSubmit}/>
                    </View>
                
                </ScrollView>
            </View>

        )
    }
}

const mapStateToProps = (state) => {
	return {
		register: state.register
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setRegister: (e) => {
			dispatch({
				type: 'FILL_REGISTER',
				data: e
			})
        },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TermComponent)