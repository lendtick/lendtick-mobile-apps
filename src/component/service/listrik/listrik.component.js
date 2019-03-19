import React from 'react';
import { View, Text, TouchableHighlight, ScrollView, TextInput, Image } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import { AlertBox,FooterButton } from '@directives';
import { Main,Typography,Variable } from '@styles';
import { styles } from './listrik.style';

class ListrikComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Listrik",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = { 
            selectedLink: 'token'
        };
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.wrapSelect}>
                    <Grid>
                        <Col style={{borderRightWidth:1,borderColor:'#efefef'}}>
                            <TouchableHighlight onPress={()=> this.setState({selectedLink: 'token'})} underlayColor="transparent">
                                <Text style={this.state.selectedLink == 'token' ? styles.itemLinkActive : styles.itemLink}>Token Listrik</Text>
                            </TouchableHighlight>
                        </Col>
                        <Col>
                            <TouchableHighlight onPress={()=> this.setState({selectedLink: 'tagihan'})} underlayColor="transparent">
                                <Text style={this.state.selectedLink == 'tagihan' ? styles.itemLinkActive : styles.itemLink}>Tagihan Listrik</Text>
                            </TouchableHighlight>
                        </Col>
                    </Grid>
                </View>

                <View style={Main.container}>

                    {/* ====== START INPUT PHONE NUMBER ====== */}
                    {this.state.selectedLink == 'token' ? <View style={styles.wrapPhoneNumber}>
                        <TextInput
                            style={[Typography.singleText,styles.inputSinglePhoneNumber]}
                            placeholder="Enter phone number"
                            underlineColorAndroid="transparent"
                            dataDetectorTypes="phoneNumber"
                            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                            value={this.state.phoneNumber}
                        />
                    </View>
                    : null}
                    <View style={styles.wrapPhoneNumber}>
                        <TextInput
                            style={[Typography.singleText,styles.inputSinglePhoneNumber]}
                            placeholder="No. Meter"
                            underlineColorAndroid="transparent"
                            dataDetectorTypes="phoneNumber"
                            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                            value={this.state.phoneNumber}
                        />
                    </View>
                    {/* ====== END INPUT PHONE NUMBER ====== */}
                </View>
                <Image style={styles.line} source={require('../../../../assets/img/bg/line.png')} />

                <ScrollView style={{backgroundColor: Variable.backgroundGray}}>
                    <View style={{paddingTop:15,paddingBottom:15,paddingLeft:7.5,paddingRight:7.5}}>
                        {this.state.selectedLink == 'token' ? <Grid>
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
                        </Grid> : null }

                        <View style={{paddingLeft:7.5,paddingRight:7.5}}>
                            {this.state.selectedLink == 'token' ? 
                            <AlertBox 
                                type="info" 
                                title="Informasi Detail"
                                text="Masukan nomer handphone untuk menerima kode Token."
                            /> :
                            <AlertBox 
                                type="info" 
                                title="Informasi Detail"
                                text={["Masukan nomer handphone untuk menerima kode Token.","Pembayran tagihan listrik tidak dapat dilakukan pada pukul 23.45-00.30 WIB sesuai dengan ketentuan PLN.","Proses verifikasi pembayaran membutuhkan waktu maksimul 2x24 jam."]}
                            />
                            }
                        </View>
                    </View>
                </ScrollView>

                {/* ====== START FOOTER ====== */}
                {this.state.selectedLink == "token" ? <FooterButton text= "Rp 100,000" textButton="Continue" onClick={()=> this.props.navigation.navigate('PaketDataConfirmation')}/> : null}
                {/* ====== END FOOTER ====== */}
            </View>
        );
    }
}

export default ListrikComponent;