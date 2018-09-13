import React from 'react';
import { View, Text, TouchableHighlight, ScrollView, TextInput, Image } from 'react-native';
import Dimensions from 'Dimensions';
import { Col, Row, Grid } from "react-native-easy-grid";
import Feather from 'react-native-vector-icons/Feather';

import { Component,Typography } from '../../../styles/index';
import { CartDirective,FooterButton } from '../../../directive/index';
import { styles } from './pulsa.style';

class PulsaCompnent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pulsa",
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
            <View style={styles.wrapper}>
                <View style={{paddingTop:15,paddingBottom:15}}>
                    <View style={Component.container}>
                        {/* ====== START INPUT PHONE NUMBER ====== */}
                        <View style={styles.wrapPhoneNumber}>
                            <TouchableHighlight onPress={()=> console.log('asd')} underlayColor="transparent" style={styles.iconPhoneNumber}>
                                <Feather name="arrow-right" size={20} color="#9f9f9f" />
                            </TouchableHighlight>
                            <TextInput
                                style={[Typography.singleText,styles.inputSinglePhoneNumber]}
                                placeholder="Enter phone number"
                                underlineColorAndroid="transparent"
                                dataDetectorTypes="phoneNumber"
                                onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                                value={this.state.phoneNumber}
                            />
                        </View>

                        <Text style={styles.centerTextPhone}>Or get from</Text>

                        <View style={styles.wrapSelectPhoneLink}>
                            <Grid>
                                <Col style={{borderRightWidth:1,borderColor:'#efefef'}}>
                                    <TouchableHighlight onPress={()=> console.log('asd')} underlayColor="transparent">
                                        <Text style={styles.phoneLink}>My Number</Text>
                                    </TouchableHighlight>
                                </Col>
                                <Col>
                                    <TouchableHighlight onPress={()=> console.log('asd')} underlayColor="transparent">
                                        <Text style={styles.phoneLink}>Browse Contact</Text>
                                    </TouchableHighlight>
                                </Col>
                            </Grid>
                        </View>
                        {/* ====== END INPUT PHONE NUMBER ====== */}
                    </View>
                </View>
                <Image style={styles.line} source={require('../../../../assets/bg/line.png')} />

                <ScrollView>
                    <View style={{paddingTop:15,paddingBottom:15,paddingLeft:7.5,paddingRight:7.5}}>
                        <Grid>
                            <Row>
                                <Col>
                                    <View style={styles.itemPulsa}>
                                        <Text style={styles.textPulsa}>Rp. 5000</Text>
                                    </View>
                                </Col>
                                <Col>
                                    <View style={styles.itemPulsa}>
                                        <Text style={styles.textPulsa}>Rp. 10,000</Text>
                                    </View>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <View style={styles.itemPulsa}>
                                        <Text style={styles.textPulsa}>Rp. 15,000</Text>
                                    </View>
                                </Col>
                                <Col>
                                    <View style={styles.itemPulsa}>
                                        <Text style={styles.textPulsa}>Rp. 20,000</Text>
                                    </View>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <View style={styles.itemPulsa}>
                                        <Text style={styles.textPulsa}>Rp. 50,000</Text>
                                    </View>
                                </Col>
                                <Col>
                                    <View style={styles.itemPulsa}>
                                        <Text style={styles.textPulsa}>Rp. 100,000</Text>
                                    </View>
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                </ScrollView>

                {/* ====== START FOOTER ====== */}
                <FooterButton text="Rp 100.000" textButton="Continue" onClick={()=> this.props.navigation.navigate('PaketDataConfirmation')}/>
                {/* ====== END FOOTER ====== */}

            </View>
        );
    }
}

export default PulsaCompnent;