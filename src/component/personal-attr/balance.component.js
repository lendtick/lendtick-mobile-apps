import React from 'react';
import { View,Text,TouchableHighlight } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { Variable,Input } from '@styles';
import { ButtonComponent } from '@directives';
import { styles } from './balance.style';

class BalanceComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Balance",
        headerTitleStyle: Variable.headerTitleStyle,
<<<<<<< HEAD
=======
        headerStyle: {
            elevation:0,
            backgroundColor: '#42A9A0',
            borderBottomWidth: 0,
        },
        headerTintColor: '#ffffff',
>>>>>>> master
    });

    constructor(props) {
        super(props);
        this.state = {
            openPopup: false
        };
    }

    render() { 
        return(
            <View style={styles.wrapper}>
                <View style={{height:160}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={[styles.itemLoan,{borderTopLeftRadius:20,borderBottomLeftRadius:20}]}>
                            <AutoHeightImage width={80} style={{left:'50%',marginLeft:-40,margin: 5}} source={require('@assets/img/balance/img01.png')} />
                            <Text style={styles.textMenuLoan}>Microloan Balance</Text>
                        </View>
                        <View style={[styles.itemLoan,{borderLeftWidth:0,borderTopRightRadius:20,borderBottomRightRadius:20}]}>
                            <AutoHeightImage width={80} style={{left:'50%',marginLeft:-40,margin: 5}} source={require('@assets/img/balance/img02.png')} />
                            <Text style={styles.textMenuLoan}>Middle Loan Balance</Text>
                        </View>
                    </View>
                </View>

                <View style={{marginTop: 30, marginBottom: 30}}>
                    <TouchableHighlight onPress={()=> this.props.navigation.navigate('BalanceAbout')} underlayColor="transparent">
                        <Text style={[Input.singleLink,{textAlign:'center'}]}>penjelasan microlan dan middle loan ? </Text>
                    </TouchableHighlight>
                </View>
                
                <ButtonComponent type="primary" text="Request Middle Loan" onClick={()=> this.props.navigation.navigate('BalancePinjaman')}/>
            </View>
        ) 
    }
}


export default BalanceComponent;