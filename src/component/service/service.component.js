import React from 'react';
import { View, TouchableHighlight, ScrollView, Image, Text } from 'react-native';
import Dimensions from 'Dimensions';
import { Col, Row, Grid } from "react-native-easy-grid";

import { CartDirective,BannerComponent } from '../../directive/index';
import { Component } from '../../styles/index';
import { styles } from './service.style';

class ServiceComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Service",
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
        this.state = { 
            entries:[
                {id: "01", title: "coba 1", src:require("../../../assets/banner/img01.jpg"), link:""},
                {id: "02", title: "coba 2", src:require("../../../assets/banner/img01.jpg"), link:""},
                {id: "03", title: "coba 3", src:require("../../../assets/banner/img01.jpg"), link:""},
            ]
        };
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <ScrollView>
                <View style={{paddingTop:15,paddingBottom:15}}>

                    {/* ====== START SLIDER ====== */}
                    <BannerComponent data={this.state.entries} height={110}/>
                    {/* ====== END SLIDER ====== */}

                    <View style={Component.container}>
                        {/* ====== START GRID ====== */}
                        <Grid style={styles.listPackage}>
                            <Row>
                                <Col>
                                    <TouchableHighlight onPress={() => this.props.navigation.navigate('PaketData')} underlayColor="transparent">
                                        <View>
                                            <Image style={styles.imgPackage} source={require('../../../assets/packages/img01.png')} />
                                            <Text style={styles.textPackage}>Tiket Pesawat</Text>
                                        </View>
                                    </TouchableHighlight>
                                </Col>
                                <Col>
                                    <TouchableHighlight onPress={() => this.props.navigation.navigate('PaketData')} underlayColor="transparent">
                                        <View>
                                            <Image style={styles.imgPackage} source={require('../../../assets/packages/img02.png')} />
                                            <Text style={styles.textPackage}>Paket Data</Text>
                                        </View>
                                    </TouchableHighlight>
                                </Col>
                                <Col>
                                    <TouchableHighlight onPress={() => this.props.navigation.navigate('PinjamanTunai')} underlayColor="transparent">
                                        <View>
                                            <Image style={styles.imgPackage} source={require('../../../assets/packages/img03.png')} />
                                            <Text style={styles.textPackage}>Pinjaman Tunai</Text>
                                        </View>
                                    </TouchableHighlight>
                                </Col>
                                <Col>
                                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Pulsa')} underlayColor="transparent">
                                        <View>
                                            <Image style={styles.imgPackage} source={require('../../../assets/packages/img05.png')} />
                                            <Text style={styles.textPackage}>Pulsa</Text>
                                        </View>
                                    </TouchableHighlight>
                                </Col>
                            </Row>
                            <Row style={{marginTop:25}}>
                                <Col style={{width:'25%'}}>
                                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Listrik')} underlayColor="transparent">
                                        <View>
                                            <Image style={styles.imgPackage} source={require('../../../assets/packages/img06.png')} />
                                            <Text style={styles.textPackage}>Listrik</Text>
                                        </View>
                                    </TouchableHighlight>
                                </Col>
                            </Row>
                        </Grid>
                        {/* ====== END GRID ====== */}
                    </View>
                
                </View>
                </ScrollView>
            </View>
        );
    }
}

export default ServiceComponent;