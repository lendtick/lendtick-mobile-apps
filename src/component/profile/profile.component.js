import React from 'react';
import { View,Text,TouchableHighlight,ScrollView,AsyncStorage } from 'react-native';
import Dimensions from 'Dimensions';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';

import { Component, Variable, Typography } from '../../styles/index';
import ProfileUser from './profile-user.component';
import { CartDirective } from '../../directive/index';
import { styles } from './profile.style';

class ProfileComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Profile",
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
            width: Dimensions.get('window').width - 35,
            textAlign: 'center'
        },
        headerLeft: null,
        headerRight: (
            <TouchableHighlight onPress={() => navigation.navigate('Shop')} underlayColor="transparent">
                <CartDirective />
            </TouchableHighlight>
        ),
    });

    constructor(props) {
        super(props);
        this.state = {  };
    }

    logout(){
        this.props.navigation.navigate('Main');
        AsyncStorage.removeItem('token');   
        this.props.setLogin(false);
    }

    render() {
        return (
            
            <View style={[styles.wrapper]}>
                <ScrollView>
                <View style={[Component.container,{paddingTop:30,paddingBottom:15}]}>
            
                    <ProfileUser />

                    <View style={styles.wrapMenu}>
                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('ProfileInfo')} underlayColor="#fafafa">
                            <View style={{borderBottomWidth: 1, borderColor: '#efefef'}}>
                                <Text style={styles.linkText}>Profile</Text>
                                <Feather name="user" size={18} color={Variable.colorContent}  style={styles.menuIcon}/>
                                <Feather name="chevron-right" size={18} color={Variable.colorContent}  style={styles.linkIcon}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('Contact')} underlayColor="#fafafa">
                            <View style={{borderBottomWidth: 1, borderColor: '#efefef'}}>
                                <Text style={styles.linkText}>Hubungi Kami</Text>
                                <Feather name="phone" size={18} color={Variable.colorContent}  style={styles.menuIcon}/>
                                <Feather name="chevron-right" size={18} color={Variable.colorContent}  style={styles.linkIcon}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('About')} underlayColor="#fafafa">
                            <View>
                                <Text style={styles.linkText}>Tentang Kami</Text>
                                <Feather name="info" size={18} color={Variable.colorContent}  style={styles.menuIcon}/>
                                <Feather name="chevron-right" size={18} color={Variable.colorContent}  style={styles.linkIcon}/>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <Text style={[Typography.singleTitle,{marginTop:25}]}>Pengaturan</Text>
                    <View style={[styles.wrapMenu,{marginTop:0}]}>
                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('Address')} underlayColor="#fafafa">
                            <View style={{borderBottomWidth: 1, borderColor: '#efefef'}}>
                                <Text style={styles.linkText}>Alamat Pengiriman</Text>
                                <Feather name="map" size={18} color={Variable.colorContent}  style={styles.menuIcon}/>
                                <Feather name="chevron-right" size={18} color={Variable.colorContent}  style={styles.linkIcon}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('ChangePass')} underlayColor="#fafafa">
                            <View style={{borderBottomWidth: 1, borderColor: '#efefef'}}>
                                <Text style={styles.linkText}>Ubah kata sandi</Text>
                                <Feather name="lock" size={18} color={Variable.colorContent}  style={styles.menuIcon}/>
                                <Feather name="chevron-right" size={18} color={Variable.colorContent}  style={styles.linkIcon}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=> this.logout()} underlayColor="#fafafa">
                            <View>
                                <Text style={[styles.linkText,{color:'#ed2a34'}]}>Keluar</Text>
                                <Feather name="log-out" size={18} style={styles.menuIcon}/>
                                <Feather name="chevron-right" size={18} color={Variable.colorContent}  style={styles.linkIcon}/>
                            </View>
                        </TouchableHighlight>
                    </View>

                </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		login: state.login
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setLogin: (e) => {
			dispatch({
				type: 'SET_LOGIN',
				isLogin: e
			})
        },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileComponent)