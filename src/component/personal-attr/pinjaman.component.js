import React from 'react';
import { View,Text,ScrollView,Image,TouchableHighlight,ActivityIndicator,Alert } from 'react-native';
import { LinearGradient } from 'expo';
import Feather from 'react-native-vector-icons/Feather';
import { Col,Grid } from "react-native-easy-grid";
import { Variable,Typography } from '@styles';
import { styles } from './balance.style';
import * as accounting from 'accounting';

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
            if(res.data.detail){
                res.data.detail.map((x)=>{
                    if(x.loan_type == "Pinjaman Microloan") x.page = "MiddleLoan";
                    if(x.loan_type == "Multiguna") x.page = "Loan";
                    if(x.group == 1) x.group_code = "LC";
                    if(x.group == 3) x.group_code = "ML";
                });
            }
            this.setState({
                loading: false,
                arrList: res.data.detail,
                payment: res.data.payment
            });
        }, err =>{
            this.setState({loading: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchLoanProfile()}],
                {cancelable: false},
            );
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
                         <Text style={[Typography.heading3,{color:'#ffffff',marginBottom:0}]}>Rp {accounting.formatMoney(this.state.payment, "", 0, ",", ",")}</Text>
                    </LinearGradient>
                    <View style={{backgroundColor:'#ffffff'}}>
                        <Text style={[Typography.singleText,{textAlign:'center',padding:15}]}>Pembayaran bulan ini</Text>
                    </View>
                    <Image style={{width:'100%',height:10}} source={require('@assets/img/bg/line.png')} />
                    <View style={{padding:15}}>
                        {this.state.arrList.map((x,i)=>(
                            <TouchableHighlight key={i} onPress={()=> this.props.navigation.navigate(x.page,{
                                id: x.id_loan,
                                group: x.group_code,
                                payment: this.state.payment
                            })} underlayColor="transparent">
                                <Grid style={styles.itemPinjaman}>
                                    <Col style={{width:40,borderRightWidth:1,borderColor:'#f0f0f0'}}>
                                        <Text style={[Typography.heading6,{padding:15,textAlign:'center'}]}>{i + 1}</Text>
                                    </Col>
                                    <Col>
                                        <View style={{padding:15}}>
                                            {x.loan_number ? <Text style={Typography.singleText}>{x.loan_number}</Text> : null}
                                            <Text style={Typography.singleText}>{x.loan_type}</Text>
                                            <Text style={[Typography.heading6,{marginBottom:0,marginTop:10}]}>Rp {accounting.formatMoney(x.installment, "", 0, ",", ",")} x {x.term}</Text>
                                        </View>
                                        <View style={{padding:5,paddingLeft:15,paddingRight:15,backgroundColor:'#f0f0f0'}}>
                                            <Grid>
                                                <Col><Text style={Typography.singleText}>Status: {x.status}</Text></Col>
                                                <Col style={{width:25}}><Feather name={x.status == 'Lunas' ? 'check' : 'eye'} size={18} style={{textAlign:'right',marginTop:1}} color={Variable.colorPrimary}/></Col>
                                            </Grid>
                                        </View>
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