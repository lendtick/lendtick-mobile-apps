import React from 'react';
import { View,Text,TouchableHighlight,Dimensions } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { Variable,Typography } from '@styles';
import * as _ from 'lodash';

class CreditComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Credit",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() { 
        return(
            <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    backgroundColor: '#fff'
                }}>
                <AutoHeightImage width={Dimensions.get('window').width} source={require('@assets/img/coming-soon.png')} />
                <Text style={[Typography.heading5,{textAlign:'center'}]}>Segera Hadir</Text>
                <Text style={[Typography.singleText,{textAlign:'center'}]}>kemudahan pengajuan pinjaman untuk anda</Text>
            </View>
        ) 
    }
}

export default CreditComponent;
