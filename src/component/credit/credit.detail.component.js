import React from 'react';
import { View,Text,TouchableHighlight,ScrollView,Image,Dimensions,ActivityIndicator } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import { InputComponent,ButtonComponent,Modal,InputCheckbox } from '@directives';
import { Variable,Typography,Input } from '@styles';
import * as _ from 'lodash';
import { styles } from './credit.style';
import creditService from './credit.service';

class CreditDetailComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pengajuan Pinjaman",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = { 
            loanType: "Middle Loan",
            nopinjaman: "6545645",
            checked1: false,
            checked2: false,
            openPopup: false,
            showSimulation: false,
            loading: false,
            arrOffset: [],
            selectedOffset: [],
            arrSelectedOffset: [],
            voucher: null
        };
    }

    componentDidMount(){
        this.fetchMstLoanType(this.props.navigation.getParam('id'));
        this.fetchGetOffset();
    }

    fetchMstLoanType(id){
        this.setState({loading: true});
        creditService.getMstLoanType(id).then(res =>{
            this.setState(res.data);
            this.setState({loading: false});
        }, err =>{
            this.setState({loading: false});
        });
    }

    fetchGetOffset(){
        this.setState({loading: true});
        creditService.getOffset().then(res =>{
            _.map(res.data,(x)=>{
                x.checked = false;
                x.installments = "Rp " + x.installments.toLocaleString();
                x.loan_approved = "Rp " + x.loan_approved.toLocaleString();
                x.paid_installment = "Rp " + x.paid_installment.toLocaleString();
                x.unpaid_installment = "Rp " + x.unpaid_installment.toLocaleString();
            })
            this.setState({
                loading: false,
                arrOffset: res.data
            });
        }, err =>{
            this.setState({loading: false});
        });
    }

    selectOffset(e){
        e.checked = !e.checked;
        this.setState({arrOffset: this.state.arrOffset});

        let selectedOffset = [];
        let arrSelectedOffset = [];
        _.map(this.state.arrOffset, (x)=>{
            if(x.checked){
                selectedOffset.push(x.loan_type);
                arrSelectedOffset.push(x);
            }
        });
        this.setState({
            selectedOffset: selectedOffset,
            arrSelectedOffset: arrSelectedOffset
        });
    }

    submitVoucher(){
        let obj ={
            voucher_code: this.state.voucher,
            id_loan: this.props.navigation.getParam('id')
        };
        creditService.reedemVoucher(obj).then(res =>{
            console.log(res);
        }, err =>{
            console.log(err);
        })
    }


    render() { 
        return(
            <View>
                <ScrollView style={{backgroundColor:'#fff'}}>
                    {/* ====== START STEP ====== */}
                    <View style={{padding:15,paddingBottom:30,paddingTop:30,backgroundColor: '#f8f8ff'}}>
                        <Grid>
                            <Col>
                                <View>
                                    <View style={[styles.circleDetail,{borderColor: '#1d92bd',opacity:1}]}>
                                        <Text style={[styles.circleDetailText,Typography.singleText]}>1</Text>
                                    </View>
                                    <Text style={[Typography.singleText,{textAlign:'center',fontSize:10}]}>Melengkapi Data</Text>
                                </View>
                            </Col>
                            <Col>
                                <View>
                                    <View style={[styles.circleDetail,{borderStyle:'dotted'}]}>
                                        <Text style={[styles.circleDetailText,Typography.singleText]}>2</Text>
                                    </View>
                                    <Text style={[Typography.singleText,{textAlign:'center',fontSize:10}]}>Syarat dan Ketentuan</Text>
                                </View>
                            </Col>
                            <Col>
                                <View>
                                    <View style={[styles.circleDetail,{borderStyle:'dotted'}]}>
                                        <Text style={[styles.circleDetailText,Typography.singleText]}>3</Text>
                                    </View>
                                    <Text style={[Typography.singleText,{textAlign:'center',fontSize:10}]}>Melengkapi Dokumen</Text>
                                </View>
                            </Col>
                            <Col>
                                <View>
                                    <View style={[styles.circleDetail,{borderStyle:'dotted'}]}>
                                        <Text style={[styles.circleDetailText,Typography.singleText]}>4</Text>
                                    </View>
                                    <Text style={[Typography.singleText,{textAlign:'center',fontSize:10}]}>Selesai</Text>
                                </View>
                            </Col>
                        </Grid>
                    </View>
                    {/* ====== END STEP ====== */}

                    <Image style={{width:'100%',height:10}} source={require('@assets/img/bg/line.png')} />

                    {/* ====== START INPUT ====== */}
                    {this.state.loading ? 
                    <View style={{padding:30}}>  
                        <ActivityIndicator size="small" color="#333" style={{marginBottom:15}}/>
                    </View>
                    : 
                    <View style={{padding:15,paddingTop:20}}>
                        <View style={{position:'relative'}}>
                            <InputComponent 
                                label="Tipe Pinjaman"
                                iconName={null}
                                keyboardType="default"
                                placeholder=""
                                value={this.state.loanType}/>

                            <View style={{position:'absolute',left:0,top:0,backgroundColor:'#fff',width:'100%',height: '100%', opacity:0.5}} />
                        </View>

                        <InputComponent 
                            label="Jumlah"
                            iconName={null}
                            keyboardType="numeric"
                            placeholder="Masukan jumlah nominal"
                            value={this.state.jumlah}
                            onChange={(jumlah) => this.setState({jumlah})}/>

                        <InputComponent 
                            label="Jangka Waktu"
                            iconName={null}
                            keyboardType="default"
                            placeholder="Atur jangka waktu"
                            isDate={true}
                            value={this.state.waktu}
                            onChange={(waktu) => this.setState({waktu})}/>

                        <View style={{position:'relative'}}>
                            <InputComponent 
                                label="Bunga"
                                iconName={null}
                                keyboardType="default"
                                value={this.state.is_flat ? this.state.interest_flat + "%" : this.state.interest_effective + "%"}/>

                            <View style={{position:'absolute',left:0,top:0,backgroundColor:'#fff',width:'100%',height: '100%', opacity:0.5}} />
                        </View>

                        <InputComponent 
                            label="Offset"
                            iconName={null}
                            placeholder="List Pinjaman (multiple select)"
                            value={this.state.selectedOffset.join()}
                            isButton={true}
                            onClickBtn={()=>this.setState({openPopup: true})}/>

                        {this.state.arrSelectedOffset.map((x,i)=>(
                            <View key={i} style={{padding:15,marginBottom:15,borderWidth:1,borderColor:'#dfdfdf',borderRadius:Variable.borderRadius,borderStyle:'dashed'}}>
                                <View style={{position:'relative'}}>
                                    <InputComponent 
                                        label="No Pinjaman"
                                        iconName={null}
                                        keyboardType="numeric"
                                        placeholder=""
                                        value={x.id_loan}
                                        onChange={(val1) => this.setState({val1})}/>

                                    <InputComponent 
                                        label="Tipe Pinjaman"
                                        iconName={null}
                                        keyboardType="default"
                                        placeholder=""
                                        value={x.loan_type}
                                        onChange={(val2) => this.setState({val2})}/>   

                                    <InputComponent 
                                        label="Jumlah Pinjaman"
                                        iconName={null}
                                        keyboardType="default"
                                        placeholder=""
                                        value={"Rp " + x.loan_approved}
                                        onChange={(val3) => this.setState({val3})}/>    

                                    <Grid style={{padding:15,borderWidth:1, borderRadius:4, borderColor: '#dfdfdf', borderStyle: 'dashed'}}>
                                        <Col>
                                            <Text style={Typography.singleText}>Jumlah Pinjaman</Text>
                                            <Text style={[Typography.heading6,{marginBottom:0}]}>{x.paid_installment}</Text>
                                        </Col>
                                        <Col>
                                            <Text style={[Typography.singleText,{textAlign:'right'}]}>Sisa Angsuran</Text>
                                            <Text style={[Typography.singleText,{textAlign:'right',color:Variable.colorPrimary,fontFamily:Variable.fontBold}]}>{x.unpaid_installment}</Text>
                                        </Col>
                                    </Grid>
                                    <View style={{position:'absolute',left:0,top:0,backgroundColor:'#fff',width:'100%',height: '100%', opacity:0.1}} />
                                </View>               
                            </View>
                        ))}

                        {/* ====== START REDEEM VOUCHER ====== */}
                        <View style={{padding:15,marginBottom:15,borderWidth:1,borderColor:'#dfdfdf',borderRadius:Variable.borderRadius,borderStyle:'dashed'}}>
                             <InputComponent 
                                label="Kode Voucher"
                                iconName={null}
                                keyboardType="default"
                                placeholder="Masukan kode voucher"
                                value={this.state.voucher}
                                onChange={(voucher) => this.setState({voucher})}/>
                            <ButtonComponent type="default" text="Reedem Voucher" onClick={()=> this.submitVoucher()}/>
                        </View>
                        {/* ====== END REDEEM VOUCHER ====== */}

                        <View style={{
                            padding:15,
                            borderTopLeftRadius:Variable.borderRadius,
                            borderTopRightRadius:Variable.borderRadius,
                            borderBottomWidth: 1,
                            borderColor: '#efefef',
                            backgroundColor: '#f8f8ff'}}>
                            <ButtonComponent type="default" text="Simulasikan Kredit" onClick={()=> this.setState({showSimulation: !this.state.showSimulation})}/>
                        </View>
                        {this.state.showSimulation ? 
                        <View>
                            <Grid style={{
                                padding:15,
                                borderBottomWidth: 1,
                                borderColor: '#efefef',
                                backgroundColor: '#f8f8ff'}}>
                                <Col><Text style={[Typography.singleText,{color:Variable.colorPrimary}]}>10 bulan</Text></Col>
                                <Col><Text style={[Typography.label,{textAlign:'right'}]}>Rp 1.250.000</Text></Col>
                            </Grid>
                            <Grid style={{
                                padding:15,
                                borderBottomLeftRadius:Variable.borderRadius,
                                borderBottomRightRadius:Variable.borderRadius,
                                backgroundColor: '#f8f8ff'}}>
                                <Col><Text style={Typography.singleText}>Total :</Text></Col>
                                <Col><Text style={[Typography.heading6,{marginBottom:0, textAlign:'right'}]}>Rp 12.500.000</Text></Col>
                            </Grid>
                        </View>
                        : null }


                        <View style={{marginTop: 15, marginBottom: 15}}>
                            <TouchableHighlight onPress={()=> this.props.navigation.navigate('Credit')} underlayColor="transparent">
                                <Text style={[Input.singleLink,{textAlign:'center'}]}>Kembali</Text>
                            </TouchableHighlight>
                        </View>
                        
                        <ButtonComponent type="primary" text="Lanjutkan" onClick={()=> this.props.navigation.navigate('CreditTerm')}/>

                    </View>
                    }
                    {/* ====== START INPUT ====== */}
                </ScrollView>
                {/* ====== Take Camera ====== */}
                <Modal 
                    isOpen={this.state.openPopup}
                    title="Pilih Tipe Pinjaman"
                    textRight="Tutup"
                    rightClick={()=> this.setState({openPopup: false})}
                    height={Dimensions.get('window').height - 360}
                    width={Dimensions.get('window').width - 30}
                    textLeft={null}>
                    {this.state.arrOffset.map((x,i)=>(
                        <View key={i} style={{padding:15,borderBottomWidth:1,borderColor:'#dfdfdf'}}>
                            <View style={{position:'relative'}}>
                                <InputComponent 
                                    label="No Pinjaman"
                                    iconName={null}
                                    keyboardType="numeric"
                                    placeholder=""
                                    value={x.id_loan}
                                    onChange={(val1) => this.setState({val1})}/>

                                <InputComponent 
                                    label="Tipe Pinjaman"
                                    iconName={null}
                                    keyboardType="default"
                                    placeholder=""
                                    value={x.loan_type}
                                    onChange={(val2) => this.setState({val2})}/>   

                                <InputComponent 
                                    label="Jumlah Pinjaman"
                                    iconName={null}
                                    keyboardType="default"
                                    placeholder=""
                                    value={"Rp " + x.loan_approved}
                                    onChange={(val3) => this.setState({val3})}/>    

                                <Grid style={{padding:15,borderWidth:1, borderRadius:4, borderColor: '#dfdfdf', borderStyle: 'dashed'}}>
                                    <Col>
                                        <Text style={Typography.singleText}>Jumlah Pinjaman</Text>
                                        <Text style={[Typography.heading6,{marginBottom:0}]}>{x.paid_installment}</Text>
                                    </Col>
                                    <Col>
                                        <Text style={[Typography.singleText,{textAlign:'right'}]}>Sisa Angsuran</Text>
                                        <Text style={[Typography.singleText,{textAlign:'right',color:Variable.colorPrimary,fontFamily:Variable.fontBold}]}>{x.unpaid_installment}</Text>
                                    </Col>
                                </Grid>

                                <Grid style={{marginTop:15,position:'relative',zIndex:10}}>
                                    <Col style={{width:30}}>
                                        <InputCheckbox onChange={()=> this.selectOffset(x)} checked={x.checked }/>
                                    </Col>
                                    <Col>
                                        <Text style={Typography.singleText}>Pilih {x.loan_type}</Text>
                                    </Col>
                                </Grid>

                                <View style={{position:'absolute',left:0,top:0,backgroundColor:'#fff',width:'100%',height: '100%', opacity:0.1}} />
                            </View>               
                        </View>
                    ))}
                </Modal>
                {/* ====== Take Camera ====== */}
            </View>
                        
        ) 
    }
}


export default CreditDetailComponent;