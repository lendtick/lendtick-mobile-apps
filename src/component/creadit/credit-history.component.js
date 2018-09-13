import React from 'react';
import { View, Text, ScrollView, Image, TouchableHighlight } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import Feather from 'react-native-vector-icons/Feather';
import Dimensions from 'Dimensions';
import AutoHeightImage from 'react-native-auto-height-image';

import { Component } from '../../styles/index';
import { CartDirective } from '../../directive/index';
import { styles } from './credit.style';

class CreditHistoryComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Credit History",
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
                <View style={styles.filterCreditHistory}>
                    {/* ====== START FILTER CREDIT HISTORY ====== */}
                    <Grid>
                        <Col style={{borderRightWidth:1,borderColor:'#efefef'}}>
                            <TouchableHighlight onPress={()=> console.log('asd')} underlayColor="transparent">
                                <View>
                                    <Text style={styles.filterName}>Filter by name</Text>
                                    <Feather name="chevron-down" size={18} color="#8fa0cd"  style={styles.filterIcon}/>
                                </View>
                            </TouchableHighlight>
                        </Col>
                        <Col>
                            <TouchableHighlight onPress={()=> console.log('asd')} underlayColor="transparent">
                                <View>
                                    <Text style={styles.filterName}>Filter by date</Text>
                                    <Feather name="calendar" size={18} color="#8fa0cd"  style={styles.filterIcon}/>
                                </View>
                            </TouchableHighlight>
                        </Col>
                    </Grid>
                    {/* ====== END FILTER CREDIT HISTORY ====== */}
                </View>
                <Image style={styles.line} source={require('../../../assets/bg/line.png')} />
                <ScrollView>
                    <View style={[Component.container,{marginTop:20}]}>
                        
                        {/* ====== START LIST CREDIT HISTORY ====== */}
                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('CreditHistoryDetail')} underlayColor="transparent">
                            <View style={styles.itemCredit}>
                                <Grid>
                                    <Col style={{width:40}}>
                                        <AutoHeightImage width={35} source={require('../../../assets/icons/kredit-history/img01.png')}/>
                                    </Col>
                                    <Col style={{paddingLeft:15}}>
                                        <Text style={styles.creditName}>Multi Guna</Text>
                                        <Text style={styles.creditPrice}>Rp 500,000</Text>
                                    </Col>
                                    <Col style={{width:100}}>
                                        <Text style={styles.itemDate}>27 Jan 2018</Text>
                                    </Col>
                                </Grid>                    
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('CreditHistoryDetail')} underlayColor="transparent">
                            <View style={styles.itemCredit}>
                                <Grid>
                                    <Col style={{width:40}}>
                                        <AutoHeightImage width={35} source={require('../../../assets/icons/kredit-history/img02.png')}/>
                                    </Col>
                                    <Col style={{paddingLeft:15}}>
                                        <Text style={styles.creditName}>Usaha</Text>
                                        <Text style={styles.creditPrice}>Rp 500,000</Text>
                                    </Col>
                                    <Col style={{width:100}}>
                                        <Text style={styles.itemDate}>27 Jan 2018</Text>
                                    </Col>
                                </Grid>                    
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('CreditHistoryDetail')} underlayColor="transparent">
                            <View style={styles.itemCredit}>
                                <Grid>
                                    <Col style={{width:40}}>
                                        <AutoHeightImage width={35} source={require('../../../assets/icons/kredit-history/img03.png')}/>
                                    </Col>
                                    <Col style={{paddingLeft:15}}>
                                        <Text style={styles.creditName}>Multi Griya</Text>
                                        <Text style={styles.creditPrice}>Rp 500,000</Text>
                                    </Col>
                                    <Col style={{width:100}}>
                                        <Text style={styles.itemDate}>27 Jan 2018</Text>
                                    </Col>
                                </Grid>                    
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('CreditHistoryDetail')} underlayColor="transparent">
                            <View style={styles.itemCredit}>
                                <Grid>
                                    <Col style={{width:40}}>
                                        <AutoHeightImage width={35} source={require('../../../assets/icons/kredit-history/img01.png')}/>
                                    </Col>
                                    <Col style={{paddingLeft:15}}>
                                        <Text style={styles.creditName}>Multi Guna</Text>
                                        <Text style={styles.creditPrice}>Rp 500,000</Text>
                                    </Col>
                                    <Col style={{width:100}}>
                                        <Text style={styles.itemDate}>27 Jan 2018</Text>
                                    </Col>
                                </Grid>                    
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('CreditHistoryDetail')} underlayColor="transparent">
                            <View style={styles.itemCredit}>
                                <Grid>
                                    <Col style={{width:40}}>
                                        <AutoHeightImage width={35} source={require('../../../assets/icons/kredit-history/img02.png')}/>
                                    </Col>
                                    <Col style={{paddingLeft:15}}>
                                        <Text style={styles.creditName}>Usaha</Text>
                                        <Text style={styles.creditPrice}>Rp 500,000</Text>
                                    </Col>
                                    <Col style={{width:100}}>
                                        <Text style={styles.itemDate}>27 Jan 2018</Text>
                                    </Col>
                                </Grid>                    
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('CreditHistoryDetail')} underlayColor="transparent">
                            <View style={styles.itemCredit}>
                                <Grid>
                                    <Col style={{width:40}}>
                                        <AutoHeightImage width={35} source={require('../../../assets/icons/kredit-history/img03.png')}/>
                                    </Col>
                                    <Col style={{paddingLeft:15}}>
                                        <Text style={styles.creditName}>Multi Griya</Text>
                                        <Text style={styles.creditPrice}>Rp 500,000</Text>
                                    </Col>
                                    <Col style={{width:100}}>
                                        <Text style={styles.itemDate}>27 Jan 2018</Text>
                                    </Col>
                                </Grid>                    
                            </View>
                        </TouchableHighlight>
                        {/* ====== END LIST CREDIT HISTORY ====== */}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default CreditHistoryComponent;