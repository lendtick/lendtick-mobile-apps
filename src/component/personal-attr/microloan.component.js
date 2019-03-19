import React from 'react';
import { View,Text,ScrollView,Image } from 'react-native';
import { LinearGradient } from 'expo';
import { Col,Grid } from "react-native-easy-grid";
import { Variable,Typography } from '@styles';
import { styles } from './balance.style';

class MicroloanComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Microlan",
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
                        <Text style={[Typography.singleText,{textAlign:'center',padding:15}]}>Tagihan bulan ini</Text>
                    </View>
                    <Image style={{width:'100%',height:10}} source={require('@assets/img/bg/line.png')} />

                    {/* ====== START KETERANGAN ====== */}
                    <Grid style={{padding:15,marginTop:15}}>
                        <Col><Text style={[Typography.heading6,{textAlign:'center',marginBottom:0}]}>Tanggal</Text></Col>
                        <Col><Text style={[Typography.heading6,{textAlign:'center',marginBottom:0}]}>Jumlah</Text></Col>
                        <Col></Col>
                    </Grid>
                    <View style={[styles.wrapDetailDescPinjaman,{padding:0,marginTop:0}]}>
                        <Grid style={{padding:15,borderBottomWidth:1,borderColor:'#dfdfdf'}}>
                            <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>1 Januari 2019</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>400.000</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>0</Text></Col>
                        </Grid>
                        <Grid style={{padding:15}}>
                        <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>18 Januari 2018</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>100.000</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>0</Text></Col>
                        </Grid>
                    </View>
                    {/* ====== END KETERANGAN ====== */}
                </ScrollView>
            </View>
        ) 
    }
}


export default MicroloanComponent;