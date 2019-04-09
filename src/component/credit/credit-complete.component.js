import React, { Component } from 'react';
import { ScrollView,View,Image,Text,Dimensions,TouchableHighlight } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import AutoHeightImage from 'react-native-auto-height-image';
import { connect } from 'react-redux';
import { ButtonComponent, InputComponent , AlertBox} from '@directives';
import { Main,Variable,Typography,Input } from '@styles';
import { styles } from './credit.style';
import creditService from './credit.service';

class CreditCompleteComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Syarat dan Ketentuan",
        headerTitleStyle: Variable.headerTitleStyle,
        headerLeft: null
    });

    constructor(props) {
        super(props);
        this.state = { 
            checked: false,
            isSubmit: false,
            message: null,
            status: null
        };
    }

    componentDidMount(){
        console.log(this.props.credit.document1);
    }

    submitLoan(){
        let moment = require("moment");
        let obj = {
            id_loan_type: this.props.credit.data.id,
            loan_request: this.props.credit.data.loan_request,
            term_monthly: Number(this.props.credit.data.waktu),
            installments: this.props.credit.data.installmentsOrigin,
            is_offset: this.props.credit.data.is_offset,
            voucher_code: this.props.credit.data.voucher_code,
            request_date: moment().format("YYYY-MM-DD"),
            loan_offsets: this.props.credit.data.loan_offsets,
        };

        this.setState({
            isSubmit: true,
            message: null
        });

        console.log(obj);
        creditService.postReqLoan(obj).then(res =>{
            console.log(res);
            this.setState({isSubmit: false});
            this.props.navigation.navigate('CreditFinish');
        }, err =>{
            this.setState({isSubmit: false});
        });
    }

    render() {
        return (
            <View style={{height:'100%',backgroundColor:'white'}}>
                <ScrollView>
                
                    {/* ====== START STEP ====== */}
                    <View style={{padding:15,paddingBottom:30,paddingTop:30,backgroundColor: '#f8f8ff'}}>
                        <Grid>
                            <Col>
                                <View>
                                    <View style={[styles.circleDetail,{borderColor: '#6dbcad',opacity:1}]}>
                                        <Text style={[styles.circleDetailText,Typography.singleText]}>1</Text>
                                    </View>
                                    <Text style={[Typography.singleText,{textAlign:'center',fontSize:10}]}>Melengkapi Data</Text>
                                </View>
                            </Col>
                            <Col>
                                <View>
                                    <View style={[styles.circleDetail,{borderColor: '#6dbcad',opacity:1}]}>
                                        <Text style={[styles.circleDetailText,Typography.singleText]}>2</Text>
                                    </View>
                                    <Text style={[Typography.singleText,{textAlign:'center',fontSize:10}]}>Syarat dan Ketentuan</Text>
                                </View>
                            </Col>
                            <Col>
                                <View>
                                    <View style={[styles.circleDetail,{borderColor: '#6dbcad',opacity:1}]}>
                                        <Text style={[styles.circleDetailText,Typography.singleText]}>3</Text>
                                    </View>
                                    <Text style={[Typography.singleText,{textAlign:'center',fontSize:10}]}>Melengkapi Dokumen</Text>
                                </View>
                            </Col>
                            <Col>
                                <View>
                                    <View style={[styles.circleDetail,{borderColor: '#1d92bd',opacity:1}]}>
                                        <Text style={[styles.circleDetailText,Typography.singleText]}>4</Text>
                                    </View>
                                    <Text style={[Typography.singleText,{textAlign:'center',fontSize:10}]}>Selesai</Text>
                                </View>
                            </Col>
                        </Grid>
                    </View>
                    {/* ====== END STEP ====== */}

                    <Image style={{width:'100%',height:10}} source={require('@assets/img/bg/line.png')} />
                    <View style={[Main.container,{marginTop: 15,paddingTop:5,paddingBottom: 30}]}>
                        <Text style={Typography.heading5}>Summary</Text>
                        <View style={{position:'relative'}}>
                            <InputComponent 
                                label="Tipe Pinjaman"
                                iconName={null}
                                keyboardType="default"
                                placeholder=""
                                disabled={true}
                                value={this.props.credit.data.loanType}/>

                            <InputComponent 
                                label="Jumlah"
                                iconName={null}
                                keyboardType="default"
                                placeholder=""
                                disabled={true}
                                value={this.props.credit.data.jumlah}/>

                            <InputComponent 
                                label="Jangka waktu"
                                iconName={null}
                                keyboardType="default"
                                placeholder=""
                                disabled={true}
                                value={this.props.credit.data.waktu}/>

                            <InputComponent 
                                label="Tagihan per bulan"
                                iconName={null}
                                keyboardType="default"
                                placeholder=""
                                disabled={true}
                                value={this.props.credit.data.installments}/>
                        </View> 

                        {this.props.credit.document1 != null ?
                            <View style={{padding:15,borderWidth:1,borderColor:'#dfdfdf',borderRadius:Variable.borderRadius,borderStyle:'dashed',marginBottom:15}}>
                                <Text style={[Typography.heading6,{marginBottom:5}]}>{this.props.credit.document1.type}</Text>
                                <AutoHeightImage source={{uri: this.props.credit.document1.uri}} width={Dimensions.get('window').width - 62}/>
                            </View>
                        : null}

                        {this.props.credit.document2 != null ?
                            <View style={{padding:15,borderWidth:1,borderColor:'#dfdfdf',borderRadius:Variable.borderRadius,borderStyle:'dashed',marginBottom:15}}>
                                <Text style={[Typography.heading6,{marginBottom:5}]}>{this.props.credit.document2.type}</Text>
                                <AutoHeightImage source={{uri: this.props.credit.document2.uri}} width={Dimensions.get('window').width - 62}/>
                            </View>
                        : null}

                        {this.props.credit.document3 != null ?
                            <View style={{padding:15,borderWidth:1,borderColor:'#dfdfdf',borderRadius:Variable.borderRadius,borderStyle:'dashed',marginBottom:15}}>
                                <Text style={[Typography.heading6,{marginBottom:5}]}>{this.props.credit.document3.type}</Text>
                                <AutoHeightImage source={{uri: this.props.credit.document3.uri}} width={Dimensions.get('window').width - 62}/>
                            </View>
                        : null} 

                        <View style={{marginBottom: 15}} />
                            
                        {this.state.message ? <View style={{marginBottom:15}}><AlertBox  type={this.state.status == 1 ? 'success' : 'danger'} title={null} text={this.state.message}/></View> : null }
                       
                        <ButtonComponent type="primary" text="Ajukan" onClick={()=> this.submitLoan()}  disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/>
                        
                    </View>
                
                </ScrollView>
            </View>

        )
    }
}

const mapStateToProps = (state) => {
	return {
        credit: state.credit
	}
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreditCompleteComponent)
