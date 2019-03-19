import React, { Component } from 'react';
import { ScrollView,View,KeyboardAvoidingView,Platform } from 'react-native';
import { LinearGradient } from 'expo';

import { ButtonComponent, BlockLogo, InputComponent } from '@directives';
import { Main,Variable } from '@styles';

class GantiPassUserComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Ganti Password",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = { 
            isSubmit: false,
            oldPassword: null,
            newPassword: null,
            confirmPassword: null,
            hidePassword: true
        };
    }

    onSubmit(){
        this.setState({isSubmit: true, isFailed: false});
        setTimeout(()=>{
            this.setState({isSubmit: false});
            this.props.navigation.navigate('Personal');
        }, 3000);
    }

    render() {
        return (
            <View style={{height:'100%',backgroundColor:'white'}}>
                <KeyboardAvoidingView behavior="position">
                <ScrollView>
                    <BlockLogo />

                    <View style={[Main.container,{marginTop: 15}]}>                        
                        <View>
                            <InputComponent 
                                label="Password lama"
                                iconName={null}
                                placeholder="Masukan password lama"
                                secureTextEntry={this.state.hidePassword}
                                value={this.state.oldPassword}
                                onChange={(oldPassword) => this.setState({oldPassword})}/>

                            <InputComponent 
                                label="Password baru"
                                iconName={null}
                                placeholder="Masukan password baru"
                                secureTextEntry={this.state.hidePassword}
                                value={this.state.newPassword}
                                onChange={(newPassword) => this.setState({newPassword})}/>    

                            <InputComponent 
                                label="Konfirmasi baru"
                                iconName={null}
                                placeholder="Masukan konfirmasi password"
                                secureTextEntry={this.state.hidePassword}
                                value={this.state.confirmPassword}
                                onChange={(confirmPassword) => this.setState({confirmPassword})}/>        

                        </View>

                        <ButtonComponent type="primary" text="SIMPAN" onClick={()=> this.onSubmit()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/>
                    </View>
                
                </ScrollView>
                </KeyboardAvoidingView>
            </View>

        )
    }
}

export default GantiPassUserComponent;