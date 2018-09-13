import React from 'react';
import { View,Text,ScrollView,TouchableHighlight,ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Dimensions from 'Dimensions';
import { Col,Row,Grid } from "react-native-easy-grid";

import ProfileUser from './profile-user.component';
import { Component,Typography,Variable,Input} from '../../styles/index';
import { CartDirective } from '../../directive/index';
import { styles } from './profile.style';

import profileService from './profile-service';

class ProfileInfo extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Profile Info",
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
            isloading: true
        };
    }

    componentWillMount() {
        this.fetchInfoUser();   
    }

    fetchInfoUser(){
        profileService.getInfoUser().then(res =>{
            this.setState(res.data[0]);
            this.setState({isloading: false});
        }, err =>{
            this.fetchInfoUser();
        })
    }

    render() {
        return (
            <View style={[styles.wrapper]}>
                {this.state.isloading ? 
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="small" color="#6a6a6a" />
                    </View>
                :
                    <ScrollView>
                    <View style={[Component.container,{paddingTop:30,paddingBottom:15}]}>
                        <ProfileUser />
                        <View style={[Component.wrapInfo,{paddingBottom:5}]}>
                            <Grid>
                                <Row style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                                    <Col style={{width:35}}>
                                        <Feather name="check-square" size={20} color={Variable.colorPrimaryText} />
                                    </Col>
                                    <Col>
                                        <Text style={[Typography.singleText,{marginBottom:5}]}>No Anggota KOPAI</Text>
                                        <Text style={Typography.label}>{this.state.id_koperasi}</Text>
                                    </Col>
                                </Row>
                                <Row style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                                    <Col style={{width:35}}>
                                        <Feather name="phone" size={20} color="#cfcfcf" />
                                    </Col>
                                    <Col>
                                        <Text style={[Typography.singleText,{marginBottom:5}]}>No.Handphone</Text>
                                        <Text style={Typography.label}>{this.state.phone_number}</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{width:35}}>
                                        <Feather name="user" size={20} color="#cfcfcf" />
                                    </Col>
                                    <Col>
                                        <Text style={[Typography.singleText,{marginBottom:5}]}>Company Name</Text>
                                        <Text style={Typography.label}>PT GIRBEX ABADI SENTOSA</Text>
                                    </Col>
                                </Row>
                            </Grid>
                        </View>
                    </View>
                    <View style={{paddingLeft:60, paddingRight: 60,position:'relative',zIndex:2}}>
                        <TouchableHighlight style={[this.state.disabled ? Input.btnDisabled : Input.btnPrimary,{marginTop:30}]} onPress={()=> this.props.navigation.navigate('ProfileEdit')} underlayColor={this.state.disabled ? '#999' : Variable.colorPrimary}>
                            {this.state.isSubmit ? <ActivityIndicator size="small" color="#fff" /> : <Text style={Input.btnText}>EDIT PROFILE</Text> }
                        </TouchableHighlight>
                    </View>
                    </ScrollView>
                }
            </View>
        );
    }
}

export default ProfileInfo;