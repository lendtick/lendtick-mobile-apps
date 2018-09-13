import React from 'react';
import Dimensions from 'Dimensions';
import { View,Text,Image,TouchableHighlight } from 'react-native';

import { Component,Typography,Input,Variable} from '../../styles/index';
import { styles } from './shop.style';

class CheckoutSuccessComponent extends React.Component {
    static navigationOptions = {
        title: "Sukses Pembelian",
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
    };

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={{height:'100%',flexDirection: 'column',justifyContent: 'center',backgroundColor:'#ffffff'}}>
                <Image style={styles.imgAction} source={require("../../../assets/icons/action/checked.png")} />
                <View style={[Component.container,{paddingTop:30,paddingBottom:15}]}>
                    <Text style={[Typography.singleTitle,{textAlign:'center',marginBottom:20,marginTop:0}]}>Pembelian Berhasil</Text>
                    <Text style={[Typography.singleText,{textAlign:'center',marginBottom:50}]}>Lorem ipsum dolor sit amet, pertinax assueverit sit ne. Choro eligendi at has, ad iudico facilisis has.</Text>
                    <TouchableHighlight style={[this.state.disabled ? Input.btnDisabled : Input.btnPrimary,{marginTop:10}]} onPress={()=> this.props.navigation.navigate('Home')} underlayColor={this.state.disabled ? '#999' : Variable.colorPrimary}>
                        <Text style={Input.btnText}>Kembali Belanja</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

export default CheckoutSuccessComponent;