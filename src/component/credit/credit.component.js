import React from 'react';
import { View,Text,TouchableHighlight,ScrollView } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { Col,Grid } from "react-native-easy-grid";
import { Variable } from '@styles';
import { styles } from './credit.style';

class CreditComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Credit",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    render() { 
        return(
            <View style={styles.wrapper}>
                <ScrollView style={{padding: 30}}>
                    <Grid style={{paddingBottom:30}}>
                        <Col style={{paddingRight:15}}>
                            <TouchableHighlight onPress={()=> console.log("Service")} underlayColor="transparent">
                                <View style={styles.itemLoan}>
                                    <AutoHeightImage width={80} style={{left:'50%',marginLeft:-40,margin: 5}} source={require('@assets/img/credit/loan.png')} />
                                    <Text style={styles.textMenuLoan}>Loan</Text>
                                </View>
                            </TouchableHighlight>
                        </Col>
                        <Col style={{paddingLeft:15}}>
                            <TouchableHighlight onPress={()=> console.log("Service")} underlayColor="transparent">
                                <View style={styles.itemLoan}>
                                    <AutoHeightImage width={80} style={{left:'50%',marginLeft:-40,margin: 5}} source={require('@assets/img/credit/middleloan.png')} />
                                    <Text style={styles.textMenuLoan}>Middle Loan</Text>
                                </View>
                            </TouchableHighlight>
                        </Col>
                    </Grid>
                    <View style={{height:30}}></View>
                </ScrollView>
            </View>
        ) 
    }
}


export default CreditComponent;