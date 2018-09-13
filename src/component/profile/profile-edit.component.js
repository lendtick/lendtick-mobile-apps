import React from 'react';
import { View,Text,ScrollView,TouchableHighlight } from 'react-native';
import Dimensions from 'Dimensions';
import Feather from 'react-native-vector-icons/Feather';

import { Component,Variable,Input,Typography } from '../../styles/index';
import { CartDirective,InputComponent } from '../../directive/index';
import { styles } from './profile.style';

class ProfileEditComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Edit Profile",
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
        this.state = {};
    }
    render() {
        return (
            <View style={[styles.wrapper]}>
                <ScrollView>
                <View style={[Component.container,{paddingTop:15,paddingBottom:15}]}>
                    {/* ==================== START FORM ==================== */ }
                    <InputComponent 
                        label="Nama Lengkap"
                        iconName={null}
                        placeholder="Masukan nama lengkap"
                        value={this.state.fullName}
                        onChange={(fullName) => this.setState({fullName})}/>
                     <InputComponent 
                        label="Perusahaan"
                        iconName={null}
                        placeholder="Masukan nama perusahaan"
                        value={this.state.Company}
                        onChange={(Company) => this.setState({Company})}/>
                    <InputComponent 
                        label="Photo Identitas"
                        iconName={null}
                        placeholder="Browse file"
                        value={this.state.Photo}
                        onChange={(Photo) => this.setState({Photo})}/>
                    <InputComponent 
                        label="Photo Identitas Perusahaan"
                        iconName={null}
                        placeholder="Browse file"
                        value={this.state.CompanyPhoto}
                        onChange={(CompanyPhoto) => this.setState({CompanyPhoto})}/>
                    <InputComponent 
                        label="Nomor Telepon"
                        iconName={null}
                        placeholder="Masukan nomor telepon"
                        value={this.state.Telephone}
                        onChange={(Telephone) => this.setState({Telephone})}/>
                    <InputComponent 
                        label="Email"
                        iconName={null}
                        placeholder="Masukan alamat email"
                        value={this.state.Email}
                        onChange={(Email) => this.setState({Email})}/>
                    <InputComponent 
                        label="Photo Probadi"
                        iconName={null}
                        placeholder="Browse file"
                        value={this.state.PersonalPhoto}
                        onChange={(PersonalPhoto) => this.setState({PersonalPhoto})}/>

                    <TouchableHighlight style={[this.state.disabled ? Input.btnDisabled : Input.btnPrimary,{marginTop:10}]} onPress={()=> console.log('Aweu')} underlayColor={this.state.disabled ? '#999' : Variable.colorPrimary}>
                        {this.state.isSubmit ? <ActivityIndicator size="small" color="#fff" /> : <Text style={Input.btnText}>Masukan</Text> }
                    </TouchableHighlight>
                    {/* ==================== END FORM ==================== */ }
                </View>
                </ScrollView>
            </View>
        );
    }
}

export default ProfileEditComponent;