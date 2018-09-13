import React from 'react';
import { 
    View, 
    Text, 
    ScrollView,
    TouchableHighlight, 
    ActivityIndicator, 
    KeyboardAvoidingView,
    Image,
    ImageBackground 
} from 'react-native';
import Dimensions from 'Dimensions';
import Feather from 'react-native-vector-icons/Feather';

import { CartDirective } from '../../directive/index';
import { InputComponent } from '../../directive/index';
import { Input, Variable } from '../../styles/index';
import { styles } from './login.style';

class ForgotPasswordComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Forgot Password",
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
        this.state = {  };
    }
    render() {
        return (
            <ImageBackground source={require('../../../assets/bg/bg1.png')} style={{width: '100%', height: '100%'}}>
            <ScrollView>
                <View style={styles.wrapper}>

                     <View style={{height:160}}>
                        <View style={styles.wrapHeader}>
                            <Image 
                                style={{width:'200%',height:'200%'}}
                                source={require('../../../assets/bg/bg2.png')} />
                        </View>
                        <Image 
                            style={styles.logo}
                            source={require('../../../assets/icon-square.png')} />
                    </View>

                    <KeyboardAvoidingView behavior="position">

                        {/* ====== START FORM LOGIN ====== */}
                        <View style={styles.main}>
                            <InputComponent 
                                label="Email"
                                iconName={null}
                                keyboardType="email-address"
                                placeholder="Enter email address"
                                value={this.state.EmailCorp}
                                onChange={(EmailCorp) => this.setState({EmailCorp})}/>
                        </View>
                        {/* ====== END FORM LOGIN ====== */}
                    </KeyboardAvoidingView>

                    <View style={{paddingLeft:60, paddingRight: 60,position:'relative',zIndex:2}}>
                        <TouchableHighlight style={[this.state.disabled ? Input.btnDisabled : Input.btnPrimary,{marginTop:30}]} onPress={()=> this.props.navigation.navigate('Home')} underlayColor={this.state.disabled ? '#999' : Variable.colorPrimary}>
                            {this.state.isSubmit ? <ActivityIndicator size="small" color="#fff" /> : <Text style={Input.btnText}>SEND EMAIL</Text> }
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
            </ImageBackground>
        );
    }
}

export default ForgotPasswordComponent;