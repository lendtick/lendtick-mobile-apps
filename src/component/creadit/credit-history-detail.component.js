import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Dimensions from 'Dimensions';
import { Col, Grid } from "react-native-easy-grid";

import { Component,Typography ,Variable} from '../../styles/index';
import { CartDirective } from '../../directive/index';
import { styles } from './credit.style';

class CreditHistoryDetail extends React.Component {
    static navigationOptions = {
        title: "Credit History Detail",
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
        headerRight: (<CartDirective />),
    };

    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <ScrollView>
                    <View style={Component.container}>
                        <View style={[Component.wrapInfo,{paddingBottom:5}]}>
                            <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                                <Text style={[Typography.singleText,{marginBottom:5}]}>Next Payment Amount</Text>
                                <Text style={Typography.label}>Rp 500,000</Text>
                            </View>
                            <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                                <Text style={[Typography.singleText,{marginBottom:5}]}>Payment Due Date</Text>
                                <Text style={Typography.label}>17 August 2018</Text>
                            </View>
                            <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                                <Grid>
                                    <Col>
                                        <Text style={[Typography.singleText,{marginBottom:5}]}>Last Payment On</Text>
                                        <Text style={Typography.label}>Rp 500,000</Text>
                                    </Col>
                                    <Col>
                                        <Text style={{textAlign:'right',color:Variable.colorPrimaryText}}>Rp 500,000</Text>
                                    </Col>
                                </Grid>
                            </View>
                            <View>
                                <Text style={[Typography.singleText,{marginBottom:5}]}>Unpaid Balance</Text>
                                <Text style={Typography.label}>Rp 500,000</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default CreditHistoryDetail;