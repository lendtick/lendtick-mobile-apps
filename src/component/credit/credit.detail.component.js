import React from 'react';
import { View,Text,TouchableHighlight,ScrollView,Image,Dimensions,ActivityIndicator,Alert } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';
import { InputComponent,ButtonComponent,Modal,InputCheckbox,AlertBox,InputMask,InputDropdown } from '@directives';
import { Variable,Typography,Input } from '@styles';
import * as _ from 'lodash';
import * as accounting from 'accounting';
import { styles } from './credit.style';
import creditService from './credit.service';

class CreditDetailComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pengajuan Pinjaman",
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
            loanType: null,
            nopinjaman: "6545645",
            checked1: false,
            checked2: false,
            openPopup: false,
            showSimulation: false,
            loading: false,
            arrOffset: [],
            selectedOffset: [],
            arrSelectedOffset: [],
            voucher: null,
            statusVoucher: 0,
            msgVoucher: null,
            isSubmitVoucher: false,
            isSubmitSimulation: false,
            isSubmitEligible: false,
            installments: 0,
            installmentsOrigin: 0,
            term: 0,
            total_loan: 0,
            total_interest: 0,
            msgEligible: null,
            statusEligible: 0,
            showBtnContinue: true,
            arrTerm: [],
            waktu: "1",
            jumlah: '0',
            totalPinjaman: '0',
        };
    }

    componentDidMount(){
        this.fetchMstLoanType(this.props.navigation.getParam('id'));
        this.fetchGetOffset();
        this.fetchLoanTerm();
        this.setState({loanType: this.props.navigation.getParam('name')});
    }

    // Fetch Master Loan Type
    // ====================== //
    fetchMstLoanType(id){
        this.setState({loading: true});
        creditService.getMstLoanType(id).then(res =>{
            this.setState(res['data']);
            this.setState({loading: false});
        }, err =>{
            this.setState({loading: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchMstLoanType(id)}],
                {cancelable: false},
            );
        });
    }

    // Fetch Loan Term
    // ======================== //
    fetchLoanTerm(){
        let arrTerm = [];
        creditService.getLoanTerm().then(res =>{
            _.map(res['data'],(x)=>{
                x.count_term = x.count_term.toString();
                let obj = {value:x.count_term, label:x.name_term};
                arrTerm.push(obj);
            });
            this.setState({arrTerm: arrTerm});
        });
    }

    // Fetch Get Offset
    // ====================== //
    fetchGetOffset(){
        this.setState({loading: true});
        creditService.getOffset().then(res =>{
            _.map(res['data'],(x)=>{
                x.checked = false;
                x.origin_unpaid_installment = x.unpaid_installment;
                x.installments = "Rp " + accounting.formatMoney(x.installments, "", 0, ",", ",");
                x.loan_approved = "Rp " + accounting.formatMoney(x.loan_approved, "", 0, ",", ","); 
                x.paid_installment = "Rp " + accounting.formatMoney(x.paid_installment, "", 0, ",", ","); 
                x.unpaid_installment = "Rp " + accounting.formatMoney(x.unpaid_installment, "", 0, ",", ","); 
            })
            this.setState({
                loading: false,
                arrOffset: res['data']
            });
            // console.log(res['data'])
        }, err =>{
            this.setState({loading: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchGetOffset()}],
                {cancelable: false},
            );
        });
    }

    // Select Offset
    // ====================== //
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

    // Submit Voucher
    // ====================== //
    submitVoucher(){
        this.setState({
            isSubmitVoucher: true,
            msgVoucher: null
        });
        creditService.getValidateVoucher(this.state.voucher,this.props.navigation.getParam('id')).then(res =>{
            this.setState({
                isSubmitVoucher: false,
                statusVoucher: res.status,
                msgVoucher: res.message
            });
        }, err =>{
            this.setState({isSubmitVoucher: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.selectOffset(e)}],
                {cancelable: false},
            );
        });
    }

    // Check Simulation
    // ====================== //
    checkSimulation(){
        let obj = {
            id_loan_type: this.props.navigation.getParam('id'),
            principal: creditService.convertFormatNumber(this.state.jumlah),
            period: Number(this.state.waktu),
            is_offset: this.state.arrSelectedOffset.length != 0,
            loan_offsets: []
        }
        this.setState(prevState => ({totalPinjaman: prevState.jumlah}))
        _.map(this.state.arrSelectedOffset,(x)=>{
            let objOffset = {
                id_loan: x.id_loan,
                unpaid_installment: x.origin_unpaid_installment,
                group: x.group
            };
            obj.loan_offsets.push(objOffset);
        });



        this.setState({isSubmitSimulation: true});

        creditService.postSimulation(obj).then(res =>{
            console.log(res)
            if(res['data'] === null) {
                this.setState({isSubmitSimulation: false});
                Alert.alert(
                    'Error',
                    res['message'],
                    [{text: 'OK'}],
                    {cancelable: false},
                );
            } else {
                console.log(res['data'])
                this.setState({
                    isSubmitSimulation: false,
                    showSimulation: true,
                    installmentsOrigin: res['data'].installments,
                    installments: 'Rp ' + accounting.formatMoney(res['data'].installments, "", 0, ",", ","),
                    term: res['data'].term,
                    fee: res['data'].fee,
                    total_interest: 'Rp ' + accounting.formatMoney(res['data'].total_interest, "", 0, ",", ","),
                    total_loan: 'Rp ' + accounting.formatMoney(res['data'].total_loan, "", 0, ",", ",")
                });
                this.scrollView.scrollToEnd({ animated: true }); 
            }
        }, err =>{
            this.setState({isSubmitSimulation: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.checkSimulation()}],
                {cancelable: false},
            );
        });
    }

    // Check Eligibitlity
    // ====================== //
    postEligibility(){
        this.setState({
            isSubmitEligible: true,
            showBtnContinue: false,
            msgEligible: null
        });

        let obj ={
            installment: this.state.installmentsOrigin,
            voucher_code: this.state.statusVoucher == 1 ? this.state.voucher : null,
            loan_offsets: []
        };
        _.map(this.state.arrSelectedOffset,(x)=>{
            let objOffset = {
                id_loan: x.id_loan,
                unpaid_installment: x.origin_unpaid_installment,
                group: x.group
            };
            obj.loan_offsets.push(objOffset);
        });

        creditService.postEligibility(obj).then(res =>{
            this.setState({
                msgEligible: res.message,
                statusEligible: res.status,
                showBtnContinue: true,
                isSubmitEligible: false
            });

            let loan_offsets = [];
            _.map(this.state.arrSelectedOffset,(x)=>{
                let objOffset = {
                    id_loan: x.id_loan,
                    unpaid_installment: x.origin_unpaid_installment,
                    group: x.group
                };
                loan_offsets.push(objOffset);
            });
            this.props.setGetData({
                id: this.props.navigation.getParam('id'),
                jumlah: this.state.jumlah,
                waktu: this.state.waktu,
                installments: this.state.installments,
                installmentsOrigin: this.state.installmentsOrigin,
                loanType: this.state.loanType,
                voucher_code: this.state.statusVoucher == 1 ? this.state.voucher : null,
                is_offset: this.state.arrSelectedOffset.length ? true : false,
                loan_offsets: loan_offsets,
                loan_request: creditService.convertFormatNumber(this.state.jumlah),
            });
            if(res.status === 1) {
                this.props.navigation.navigate('CreditTerm');
            }
        }, err =>{
            this.setState({isSubmitEligible: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.postEligibility()}],
                {cancelable: false},
            );
        });
    }

    // Save to Draft
    // ========================= //
    postSaveDraft(e){
        let moment = require("moment");
        let obj = {
            id_loan_type: this.props.navigation.getParam('id'),
            request_date: moment().format("YYYY-MM-DD"),
            loan_request: creditService.convertFormatNumber(this.state.jumlah),
            term_monthly: this.state.waktu,
            installments: this.state.installmentsOrigin,
            is_offset: this.state.selectedOffset.length ? true : false,
            loan_offsets: []
        };

        _.map(this.state.arrSelectedOffset,(x)=>{
            let objOffset = {
                id_loan: x.id_loan,
                unpaid_installment: x.origin_unpaid_installment,
                group: x.group
            };
            obj.loan_offsets.push(objOffset);
        });

        creditService.postLoanDraft(obj).then(res => {
            this.setState({showBtnContinue: false});
            setTimeout(()=>{
                if(e == 1){
                    
                }else{
                    this.props.navigation.navigate('Credit')
                }
             }, 1000);
        });
    }

    render() { 
        return(
            <View style={{backgroundColor:'#fff'}}>
                <ScrollView style={{backgroundColor:'#fff'}} ref={(view) => {this.scrollView = view;}}>
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
                    <View style={{padding:30,height: Dimensions.get('window').height - 150}}>  
                        <ActivityIndicator size="small" color="#333" style={{marginBottom:15}}/>
                    </View>
                    : 
                    <View style={{padding:15,paddingTop:20}}>
                        <InputComponent 
                            label="Tipe Pinjaman"
                            iconName={null}
                            keyboardType="default"
                            placeholder=""
                            disabled={true}
                            value={this.state.loanType}/>

                        <InputMask 
                            label="Silahkan isi nominal pinjaman"
                            iconName={null}
                            keyboardType="numeric"
                            placeholder="Masukan jumlah nominal"
                            value={this.state.jumlah}
                            onChange={(jumlah) => this.setState({jumlah})}/>

                        {/* <InputDropdown 
                            label="Silahkan pilih periode pinjaman"
                            iconName={null}
                            placeholder="Pilih tipe waktu"
                            value={this.state.waktu}
                            items={this.state.arrTerm}
                            onChange={(waktu) => this.setState({waktu})}/> */}
                        <View>
                        <InputComponent 
                            label="Silahkan isi periode pinjaman"
                            iconName={null}
                            placeholder="Periode pinjaman"
                            value={this.state.waktu}
                            keyboardType="phone-pad"
                            maxLength={2}
                            onChange={(waktu) => this.setState({waktu: parseInt(waktu) < 1 ? "1" : waktu})} />
                            <Text style={{position: 'absolute', right: 22, bottom: 30}}>Bulan</Text>
                        </View>

                        <InputComponent 
                            label="Offset"
                            iconName={null}
                            placeholder="List Pinjaman (multiple select)"
                            value={this.state.arrSelectedOffset.length + ' Pinjaman'}
                            isButton={true}
                            onClickBtn={()=>this.setState({openPopup: true})}/>

                        {/* ====== START REDEEM VOUCHER ====== */}
                        <View style={{padding:15,marginBottom:15,borderWidth:2,borderColor:Variable.colorPrimary,borderRadius:Variable.borderRadius}}>
                             <InputComponent 
                                label="Kode Voucher"
                                iconName={null}
                                keyboardType="default"
                                placeholder="Masukan kode voucher"
                                value={this.state.voucher}
                                onChange={(voucher) => this.setState({voucher})}/>
                            
                            {this.state.msgVoucher && this.state.statusVoucher == 0 ? <View style={{marginBottom:15}}><AlertBox  type="danger" title={null} text={this.state.msgVoucher}/></View> : null }
                            {this.state.msgVoucher && this.state.statusVoucher == 1 ? <View style={{marginBottom:15}}><AlertBox  type="success" title={null} text={this.state.msgVoucher}/></View> : null }
                            
                            <ButtonComponent type="primary" text="Reedem Voucher" onClick={()=> this.submitVoucher()} disabled={this.state.isSubmitVoucher} isSubmit={this.state.isSubmitVoucher} />
                        </View>
                        {/* ====== END REDEEM VOUCHER ====== */}

                        <View style={{
                            padding:15,
                            borderTopLeftRadius:Variable.borderRadius,
                            borderTopRightRadius:Variable.borderRadius,
                            borderBottomWidth: 1,
                            borderColor: '#efefef',
                            backgroundColor: '#f8f8ff'}}>
                            <ButtonComponent 
                                type="primary" 
                                text="Simulasikan Kredit" 
                                onClick={()=> this.checkSimulation()} 
                                disabled={this.state.isSubmitSimulation || this.state.jumlah == '0' || this.state.waktu == ''} 
                                isSubmit={this.state.isSubmitSimulation}/>
                        </View>
                        {this.state.showSimulation ? 
                        <View>
                            <Grid style={{
                                padding:15,
                                borderBottomWidth: 1,
                                borderColor: '#efefef',
                                backgroundColor: '#f8f8ff'}}>
                                <Col>
                                    <Text style={Typography.singleText}>Total Pinjaman :</Text>
                                </Col>
                                <Col>
                                    <Text style={[Typography.label,{textAlign:'right'}]}>{this.state.totalPinjaman}</Text>
                                </Col>
                            </Grid>
                            <Grid style={{
                                padding:15,
                                borderBottomWidth: 1,
                                borderColor: '#efefef',
                                backgroundColor: '#f8f8ff'}}>
                                <Col>
                                    <Text style={Typography.singleText}>Lama Angsuran :</Text>
                                </Col>
                                <Col>
                                    <Text style={[Typography.singleText,{color:Variable.colorPrimary,textAlign:'right'}]}>{this.state.term} bulan</Text>
                                </Col>
                            </Grid>
                            <Grid style={{
                                padding:15,
                                borderBottomWidth: 1,
                                borderColor: '#efefef',
                                backgroundColor: '#f8f8ff'}}>
                                <Col>
                                    <Text style={Typography.singleText}>Angsuran per bulan :</Text>
                                </Col>
                                <Col>
                                    <Text style={[Typography.label,{textAlign:'right'}]}>{this.state.installments}</Text>
                                </Col>
                            </Grid>
                            <Grid style={{
                                padding:15,
                                borderBottomWidth: 1,
                                borderColor: '#efefef',
                                backgroundColor: '#f8f8ff'}}>
                                <Col>
                                    <Text style={Typography.singleText}>Biaya Admin :</Text>
                                </Col>
                                <Col>
                                    <Text style={[Typography.singleText,{color:Variable.colorPrimary,textAlign:'right'}]}>{this.state.fee['Admin']}</Text>
                                </Col>
                            </Grid>

                            <Grid style={{
                                padding:15,
                                borderBottomWidth: 1,
                                borderColor: '#efefef',
                                backgroundColor: '#f8f8ff'}}>
                                <Col>
                                    <Text style={Typography.singleText}>Biaya Asuransi :</Text>
                                </Col>
                                <Col>
                                    <Text style={[Typography.singleText,{color:Variable.colorPrimary,textAlign:'right'}]}>{this.state.fee['Insurance']}</Text>
                                </Col>
                            </Grid>
                            <Grid style={{
                                padding:15,
                                borderBottomWidth: 1,
                                borderColor: '#efefef',
                                backgroundColor: '#f8f8ff'}}>
                                <Col>
                                    <Text style={Typography.singleText}>Biaya Provisi :</Text>
                                </Col>
                                <Col>
                                    <Text style={[Typography.singleText,{color:Variable.colorPrimary,textAlign:'right'}]}>{this.state.fee['Provisi (1%) Pinjaman']}</Text>
                                </Col>
                            </Grid>
                            <Grid style={{
                                padding:15,
                                borderBottomWidth: 1,
                                borderColor: '#efefef',
                                backgroundColor: '#f8f8ff'}}>
                                <Col>
                                    <Text style={Typography.singleText}>Jumlah bunga yang harus dibayar :</Text>
                                </Col>
                                <Col>
                                    <Text style={[Typography.singleText,{color:Variable.colorPrimary,textAlign:'right'}]}>{this.state.total_interest}</Text>
                                </Col>
                            </Grid>
                            <Grid style={{
                                padding:15,
                                borderBottomWidth: 1,
                                borderColor: '#efefef',
                                backgroundColor: '#f8f8ff'}}>
                                <Col>
                                    <Text style={Typography.singleText}>Jumlah yang harus dibayar :</Text>
                                </Col>
                                <Col>
                                    <Text style={[Typography.singleText,{color:Variable.colorPrimary,textAlign:'right'}]}>{this.state.total_loan}</Text>
                                </Col>
                            </Grid>

                            {this.state.arrSelectedOffset.length ? 
                            <Grid style={{
                                padding:15,
                                borderBottomLeftRadius:Variable.borderRadius,
                                borderBottomRightRadius:Variable.borderRadius,
                                backgroundColor: '#f8f8ff'}}>
                                <Col><Text style={Typography.singleText}>Total :</Text></Col>
                                <Col><Text style={[Typography.heading6,{marginBottom:0, textAlign:'right'}]}>{this.state.total_loan}</Text></Col>
                            </Grid>
                            : null}

                            {this.state.msgEligible && this.state.statusEligible == 0 ? <View style={{marginTop:15}}><AlertBox  type="danger" title={null} text={this.state.msgEligible}/></View> : null }
                            {this.state.msgEligible && this.state.statusEligible == 1 ? <View style={{marginTop:15}}><AlertBox  type="success" title={null} text={this.state.msgEligible}/></View> : null }

                            {this.state.showBtnContinue ? 
                                <View>
                                    <TouchableHighlight onPress={()=> this.props.navigation.popToTop()} underlayColor="transparent" style={{marginTop: 15, marginBottom: 15}}>
                                        <Text style={[Input.singleLink,{textAlign:'center'}]}>Kembali</Text>
                                    </TouchableHighlight>
                                    <ButtonComponent type="primary" text="Lanjutkan" onClick={()=> this.postEligibility()}  disabled={this.state.isSubmitEligible} isSubmit={this.state.isSubmitEligible}/>
                                </View>
                                :
                                <View style={{marginTop: 15, marginBottom: 15}}>
                                    <ActivityIndicator size="small" color="#333" style={{marginBottom:15}}/> 
                                </View>
                            }
                        </View>
                        : null }

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
                                    value={x.loan_number}
                                    onChange={() => console.log("a")}/>

                                <InputComponent 
                                    label="Tipe Pinjaman"
                                    iconName={null}
                                    keyboardType="default"
                                    placeholder=""
                                    value={x.loan_type}
                                    onChange={(val2) => this.setState({val2})}/>   

                                <InputComponent 
                                    label="Angsuran per bulan"
                                    iconName={null}
                                    keyboardType="default"
                                    placeholder=""
                                    value={x.installments}
                                    onChange={(val3) => this.setState({val3})}/>    

                                <Grid style={{padding:15,borderWidth:1, borderRadius:4, borderColor: '#dfdfdf', borderStyle: 'dashed'}}>
                                    <Col>
                                        <Text style={Typography.singleText}>Angsuran per bulan</Text>
                                        <Text style={[Typography.heading6,{marginBottom:0}]}>{x.loan_approved}</Text>
                                    </Col>
                                    <Col>
                                        <Text style={[Typography.singleText,{textAlign:'right'}]}>Sisa Angsuran</Text>
                                        <Text style={[Typography.singleText,{textAlign:'right',color:Variable.colorPrimary,fontFamily:Variable.fontBold}]}>{x.unpaid_term}</Text>
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

const mapStateToProps = (state) => {
	return {
        credit: state.credit
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setGetData: (e) => {
			dispatch({
				type: 'FILL_LOAN',
				data: e
			})
        },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreditDetailComponent)
