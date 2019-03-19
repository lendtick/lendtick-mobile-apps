import React, { Component } from 'react';
import { ScrollView,View,StatusBar,Text } from 'react-native';
import { connect } from 'react-redux';
import { ButtonComponent, BlockLogo } from '@directives';
import { Main,Variable,Typography } from '@styles';

class ForgotPassSuccessComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Lupa Kata Sandi",
        headerTitleStyle: Variable.headerTitleStyle,
        headerLeft: null
    });

    constructor(props) {
        super(props);
        this.state = {};
    }

    onSubmit(){
        this.props.navigation.navigate('Login');
    }

    _onFinishCheckingCode(e){
        this.setState({isValid: e});
    }

    render() {
        return (
            <View style={{height:'100%',backgroundColor:'white'}}>
                <ScrollView>
                
                    <BlockLogo />
                
                    <View style={[Main.container,{marginTop: 15,paddingBottom: 30}]}>
                        <StatusBar barStyle="dark-content" />
                        
                        <View style={{padding: 30, marginBottom: 30, backgroundColor: Variable.backgroundGray}}>
                            <Text style={Typography.heading5}>Terimakasih</Text>
                            <Text style={[Typography.singleText]}>
                                {this.props.login.responseForgotPass}
                            </Text>
                        </View>
                        
                        <ButtonComponent type="primary" text="Kembali Login" onClick={()=> this.onSubmit()} disabled={false} isSubmit={false}/>
                    </View>
                
                </ScrollView>
            </View>

        )
    }
}


const mapStateToProps = (state) => {
	return {
		login: state.login
	}
}

export default connect(
	mapStateToProps
)(ForgotPassSuccessComponent)