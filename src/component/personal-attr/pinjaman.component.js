import React from 'react';
import { View,Text,ScrollView,Image,TouchableHighlight,ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo';
import { Col,Grid } from "react-native-easy-grid";
import { Variable,Typography } from '@styles';
import { styles } from './balance.style';

import personalAttrService from './personal-attr.service';

class PinjamanComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pinjaman",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            arrList: [],
            payment: 0
        };
    }

    componentDidMount(){
        this.fetchLoanProfile();
    }

    fetchLoanProfile(){
        this.setState({loading: true});
        personalAttrService.getLoanProfile().then(res =>{
            console.log(res);
            this.setState({
                loading: false,
                arrList: res.data.detail,
                payment: res.data.payment
            });
        }, err =>{
            this.setState({loading: false});
        });
    }

    render() { 
        return(
            <View style={{backgroundColor: '#f8f8ff',height:'100%'}}>
                {this.state.loading ? 
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="small" color="#6a6a6a" />
                </View>
                :
                <ScrollView>
                    <LinearGradient
                        colors={Variable.colorGradient}
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        style={{ 
                            paddingTop: 50, 
                            paddingBottom: 50, 
                            alignItems: 'center'
                        }}>
                         <Text style={[Typography.heading3,{color:'#ffffff',marginBottom:0}]}>Rp {this.state.payment.toLocaleString()}</Text>
                    </LinearGradient>
                    <View style={{backgroundColor:'#ffffff'}}>
                        <Text style={[Typography.singleText,{textAlign:'center',padding:15}]}>Pembayaran bulan ini</Text>
                    </View>
                    <Image style={{width:'100%',height:10}} source={require('@assets/img/bg/line.png')} />
                    <View style={{padding:15}}>
                        {this.state.arrList.map((x,i)=>(
                            <TouchableHighlight key={i} onPress={()=> this.props.navigation.navigate(x.loan_type,{
                                id: x.id_loan
                            })} underlayColor="transparent">
                                <Grid style={styles.itemPinjaman}>
                                    <Col style={{width:40,borderRightWidth:1,borderColor:'#dfdfdf'}}>
                                        <Text style={[Typography.heading6,{padding:15,textAlign:'center'}]}>{i + 1}</Text>
                                    </Col>
                                    <Col style={{padding:15}}>
                                        <Text style={Typography.singleText}>{x.loan_number}</Text>
                                        <Text style={Typography.singleText}>{x.loan_type}</Text>
                                        <Text style={[Typography.heading6,{marginBottom:0,marginTop:10}]}>Rp {x.installment.toLocaleString()} x {x.term}</Text>
                                    </Col>
                                    <Col style={{width:100,padding:15,backgroundColor:'#9bb9b6'}}>
                                        <Text style={[Typography.singleText,{textAlign:'center',color:'#fff'}]}>{x.status}</Text>
                                    </Col>
                                </Grid>
                            </TouchableHighlight>
                        ))}
                    </View>
                </ScrollView>
                }
            </View>
        ) 
    }
}


export default PinjamanComponent;