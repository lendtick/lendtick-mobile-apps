import React from 'react';
import { View, Text, TouchableHighlight, ScrollView } from 'react-native';
import Dimensions from 'Dimensions';
import Feather from 'react-native-vector-icons/Feather';

import { CartDirective } from '../../directive/index';
import { Variable, Component } from '../../styles/index';
import { styles } from './credit.style';

class CreaditComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Credit",
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
            <View style={styles.wrapper}>
                <ScrollView>
                    <View style={styles.wrapCounter}>
                        <Text style={styles.textCounter}>Rp 25,000,000</Text>
                    </View>
                    <View style={styles.subCounter}>
                        <Text style={styles.subTextCounter}>Batas cicilan - Rp 50,000,000</Text>
                    </View>

                    <View style={Component.container}>
                        <View style={styles.wrapMenu}>
                            <TouchableHighlight onPress={()=> this.props.navigation.navigate('CreditHistory')} underlayColor="#fafafa">
                                <View style={{borderBottomWidth: 1, borderColor: '#efefef'}}>
                                    <Text style={styles.linkText}>Catatan Kredit</Text>
                                    <Feather name="chevron-right" size={18} color={Variable.colorContent}  style={styles.linkIcon}/>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={()=> console.log('aweee')} underlayColor="#fafafa">
                                <View>
                                    <Text style={styles.linkText}>Lihat Pesanan Saya</Text>
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

export default CreaditComponent;