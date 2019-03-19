import React from 'react';
import { View,Text,ScrollView,Image,TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo';
import { Col,Grid } from "react-native-easy-grid";
import { Variable,Typography } from '@styles';
import { styles } from './balance.style';

class PinjamanComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pinjaman",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() { 
        return(
            <View style={{backgroundColor: '#f8f8ff',height:'100%'}}>
                <ScrollView>
                    <LinearGradient
                        colors={Variable.colorGradient}
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        style={{ 
                            paddingTop: 50, 
                            paddingBottom: 50, 
                            alignItems: 'center'
                        }}>
                         <Text style={[Typography.heading3,{color:'#ffffff',marginBottom:0}]}>Rp 3.250.000</Text>
                    </LinearGradient>
                    <View style={{backgroundColor:'#ffffff'}}>
                        <Text style={[Typography.singleText,{textAlign:'center',padding:15}]}>Pembayaran bulan ini</Text>
                    </View>
                    <Image style={{width:'100%',height:10}} source={require('../../../assets/img/bg/line.png')} />

                    <View style={{padding:15}}>
                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('Microloan')} underlayColor="transparent">
                            <Grid style={styles.itemPinjaman}>
                                <Col style={{width:40,borderRightWidth:1,borderColor:'#dfdfdf'}}>
                                    <Text style={[Typography.heading6,{padding:15,textAlign:'center'}]}>1</Text>
                                </Col>
                                <Col style={{padding:15}}>
                                    <Text style={Typography.singleText}>Pinjaman microloan (4123231)</Text>
                                    <Text style={[Typography.heading6,{marginBottom:0,marginTop:10}]}>Rp 500.000 x 1</Text>
                                </Col>
                                <Col style={{width:100,padding:15,backgroundColor:'#9bb9b6'}}>
                                    <Text style={[Typography.singleText,{textAlign:'center',color:'#fff'}]}>Lunas</Text>
                                </Col>
                            </Grid>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('NonMicroloan')} underlayColor="transparent">
                            <Grid style={styles.itemPinjaman}>
                                <Col style={{width:40,borderRightWidth:1,borderColor:'#dfdfdf'}}>
                                    <Text style={[Typography.heading6,{padding:15,textAlign:'center'}]}>2</Text>
                                </Col>
                                <Col style={{padding:15}}>
                                    <Text style={Typography.singleText}>Pinjaman Multiguna (4123232)</Text>
                                    <Text style={[Typography.heading6,{marginBottom:0,marginTop:10}]}>Rp 500.000 x 21</Text>
                                </Col>
                                <Col style={{width:100,padding:15,backgroundColor:'#a9a9a9'}}>
                                    <Text style={[Typography.singleText,{textAlign:'center',color:'#fff'}]}>Waiting Approval</Text>
                                </Col>
                            </Grid>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('NonMicroloan')} underlayColor="transparent">
                            <Grid style={styles.itemPinjaman}>
                                <Col style={{width:40,borderRightWidth:1,borderColor:'#dfdfdf'}}>
                                    <Text style={[Typography.heading6,{padding:15,textAlign:'center'}]}>3</Text>
                                </Col>
                                <Col style={{padding:15}}>
                                    <Text style={Typography.singleText}>Pinjaman Darurat (4123233)</Text>
                                    <Text style={[Typography.heading6,{marginBottom:0,marginTop:10}]}>Rp 500.000 x 1</Text>
                                </Col>
                                <Col style={{width:100,padding:15,backgroundColor:'#69baae'}}>
                                    <Text style={[Typography.singleText,{textAlign:'center',color:'#fff'}]}>Cicilan ke 21</Text>
                                </Col>
                            </Grid>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        ) 
    }
}


export default PinjamanComponent;