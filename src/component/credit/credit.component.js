import React from 'react';
import { View,Text } from 'react-native';
import { Variable } from '@styles';


class CreditComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Credit",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    render() { 
        return(
            <Text style={{color:Variable.colorPrimary}}>Asdasd</Text>
        ) 
    }
}


export default CreditComponent;