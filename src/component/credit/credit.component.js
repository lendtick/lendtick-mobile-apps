import React from 'react';
import { View,Text,TouchableHighlight,ScrollView,ActivityIndicator,Alert } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { Col,Grid } from "react-native-easy-grid";
import { AlertBox,ButtonComponent } from '@directives';
import { Variable, Input } from '@styles';
import { styles } from './credit.style';
import watch from 'redux-watch';
import { store } from '@services/store';
import { connect } from 'react-redux';
import creditService from './credit.service';
import * as _ from 'lodash';
import * as accounting from 'accounting';
import RBSheet from "react-native-raw-bottom-sheet";

class CreditComponent extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: "Credit",
        headerTitleStyle: Variable.headerTitleStyle,
        headerStyle: {
            elevation:0,
            backgroundColor: '#42A9A0',
            borderBottomWidth: 0,
        },
        headerTintColor: '#ffffff',
    });
    

    constructor(props) {
        super(props);
        this.state = { 
            titleError: null,
            arrError: [],
            loading: false,
            arrLoan: [],
            loanBalance: 0,
        };

        let watchPersonal = watch(store.getState, 'personal.data')
        store.subscribe(watchPersonal((newVal, oldVal, objectPath) => {
            this.fetchInfoUser();
        }));
    }

    componentDidMount(){
        try{
            this.fetchInfoUser();
        }catch(err){}
    }

    fetchMasterLoan(){
        creditService.getMasterLoan().then(res =>{
            let data = _.chunk(res.data,2);
            this.setState({
                arrLoan: data,
                loading: false
            });
        });
    }

    fetchLoanBalance(){
        creditService.getUserBalance().then(res =>{
            this.setState({
                loanBalance: res.data.loan_plafond,
            });
        },err =>{
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchLoanBalance()}],
                {cancelable: true},
            );
        });
    }

    fetchInfoUser(){
        this.setState({loading: true});
        creditService.getInfoUserFullfillment(this.props.personal.data.id_user).then(res =>{
            if(res['data'].validasi.length){
                let arrVaidation = [];
                res['data'].validasi.map((x,i)=>{
                    arrVaidation.push(x);
                });
                this.setState({
                    titleError: res.message,
                    arrError: arrVaidation,
                    loading: false
                });
            }else{
                this.fetchMasterLoan(); 
                this.fetchLoanBalance();           
            }
        }, err =>{
            this.setState({loading: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchInfoUser()}],
                {cancelable: false},
            );
        });
    }

    render() { 
        return(
            <ScrollView style={{padding: 15,  backgroundColor: '#f8f8ff'}}>
                {this.state.loading ? 
                    <View style={{padding:30}}>  
                        <ActivityIndicator size="small" color="#333" style={{marginBottom:15}}/>
                    </View>
                : 
                <View>
                    {this.state.arrError.length ? 
                    <View>
                        <AlertBox 
                            type="warning" 
                            title={this.state.titleError}
                            text={this.state.arrError}
                        />
                        <View style={{marginTop:15}} />
                            <ButtonComponent type="default" text="Cek kembali status kredit" onClick={()=> this.fetchInfoUser()}/>
                        <View style={{height:60}}/>
                        <View style={{marginTop:15}} />
                            <ButtonComponent type="primary" text="Masuk ke Halaman Personal" onClick={()=> this.props.navigation.navigate('User')}/>
                        <View style={{height:60}}/>
                    </View>
                    : 
                    <View>
                        <Col style={{paddingRight:7.5, marginBottom: 10}}>
                            <View style={styles.itemBalance}>
                                <Text style={styles.textHeaderLoanBalance}>Saldo</Text>
                                <Text style={styles.textLoanBalance}>Rp {accounting.formatMoney(this.state.loanBalance, "", 0, ",", ",")}</Text>
                            </View>
                            <TouchableHighlight onPress={() => this.RBSheet.open()} underlayColor="transparent">
                                <View style={{marginBottom: 10, marginTop: 7.5}}>
                                    <Text style={[Input.singleLink,{textAlign:'right',marginLeft: 5}]}>Apa itu saldo?</Text>
                                </View>
                            </TouchableHighlight>

                            {/* Tips */}
                            <View style={{marginBottom: 10, marginTop: 5, marginLeft: 5}}>
                                <Text style={styles.textHeaderTips}>Tips</Text>
                                <Text style={styles.textTips}>- Balance saldo didapatkan dari informasi gaji dan pinjaman</Text>
                                <Text style={styles.textTips}>- Tentukan product pinjaman dengan bunga yang menarik</Text>
                            </View>

                            {/* Tips */}
                            <View style={{marginBottom: 10, marginTop: 15, marginLeft: 5}}>
                                <Text style={styles.textHeaderTips}>KAS - Product for your Needs</Text>
                            </View>
                        </Col>
                        
                        {this.state.arrLoan.map((x,index) => (
                            <Grid key={index} style={{marginBottom: 15}}>
                                {x.map((item,i) => {
                                    if(i == 0){
                                        return (<Col style={{paddingRight:7.5}} key={i}>
                                            <TouchableHighlight onPress={()=> this.props.personal.data == null ? this.props.navigation.navigate('LoginUser') : this.props.navigation.navigate('CreditDetail',{
                                                id: item.id_loan_type,
                                                name: item.name_loan_type
                                            })} underlayColor="transparent">
                                                <View style={styles.itemLoan}>
                                                    <AutoHeightImage source={{uri: item.icon_loan_type}} width={80} style={{left:'50%',marginLeft:-40,margin: 5}}/>
                                                    <Text style={styles.textMenuLoan}>{item.name_loan_type}</Text>
                                                </View>
                                            </TouchableHighlight>
                                        </Col>);
                                    }else{
                                        return (<Col style={{paddingRight:7.5}} key={i}>
                                            <TouchableHighlight onPress={()=> this.props.personal.data == null ? this.props.navigation.navigate('LoginUser') : this.props.navigation.navigate('CreditDetail',{
                                                id: item.id_loan_type,
                                                name: item.name_loan_type
                                            })} underlayColor="transparent">
                                                <View style={styles.itemLoan}>
                                                    <AutoHeightImage source={{uri: item.icon_loan_type}} width={80} style={{left:'50%',marginLeft:-40,margin: 5}}/>
                                                    <Text style={styles.textMenuLoan}>{item.name_loan_type}</Text>
                                                </View>
                                            </TouchableHighlight>
                                        </Col>);
                                    }
                                })}
                            </Grid>
                        ))}
                    </View>
                    }
                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                          }}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        height={400}
                        duration={500}
                        customStyles={{
                        wrapper: {
                            backgroundColor: "transparent"
                        },
                        draggableIcon: {
                            backgroundColor: "#000"
                        }
                        }}
                    >
                       <ScrollView style={{marginBottom: 10, marginTop: 5, marginLeft: 10, marginRight: 10}}>
                            <Text style={styles.textHeaderTips}>Apa itu Saldo?</Text>
                            <Text style={styles.textTips}> Balance saldo didapatkan dari informasi gaji dan pinjaman</Text>
                            <Text style={styles.textTips}> Tentukan product pinjaman dengan bunga yang menarik</Text>

                            <Text style={[styles.textHeaderTips, {marginTop:25}]}>Bayar dengan Saldo</Text>
                            <Text style={styles.textTips}> Balance saldo didapatkan dari informasi gaji dan pinjaman</Text>

                        </ScrollView>
                    </RBSheet>
                </View>
                }
            </ScrollView>
        ) 
    }
}


const mapStateToProps = (state) => {
	return {
        personal: state.personal
	}
}
const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreditComponent)
