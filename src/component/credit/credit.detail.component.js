import React from 'react';
import { View,Text,TouchableHighlight,ScrollView,Image } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { Col,Grid } from "react-native-easy-grid";
import { InputComponent,InputDropdown,ButtonComponent } from '@directives';
import { Variable,Typography,Input } from '@styles';
import { styles } from './credit.style';

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
            arrOffset: [
                {label: "Tipe Pinjaman No Pinjaman (jumlah pinjaman  tenor)", value: 'item1'},
                {label: "Multi Guna 123456412  (50.0000.000, 60 bulan)", value: 'item2'},
                {label: "Middle Loan 123456412  (50.0000.000, 60 bulan)", value: 'item3'}
            ]
        };
    }


    render() { 
        return(
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
                <View style={{padding:15,paddingTop:20}}>
                    <View style={{position:'relative'}}>
                        <InputComponent 
                            label="Tipe Pinjaman"
                            iconName={null}
                            keyboardType="default"
                            placeholder="Masukan nama lengkap"
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
                            value="10%"/>

                        <View style={{position:'absolute',left:0,top:0,backgroundColor:'#fff',width:'100%',height: '100%', opacity:0.5}} />
                    </View>

                    <InputDropdown 
                        label="Offset"
                        iconName={null}
                        placeholder="List Pinjaman (multiple select)"
                        value={this.state.offset}
                        items={this.state.arrOffset}
                        onChange={(offset) => this.setState({offset})}/> 

                    <View style={{padding:15,paddingBottom:0,borderWidth:1,borderColor:'#dfdfdf',borderRadius:Variable.borderRadius,borderStyle:'dashed'}}>
                        <InputComponent 
                            label="No Pinjaman"
                            iconName={null}
                            keyboardType="numeric"
                            placeholder=""
                            value={this.state.nopinjaman}
                            onChange={(nopinjaman) => this.setState({nopinjaman})}/>        

                        <View style={{position:'relative'}}>
                            <InputComponent 
                                label="Tipe Pinjaman"
                                iconName={null}
                                keyboardType="default"
                                placeholder="Masukan nama lengkap"
                                value={this.state.loanType}/>

                            <View style={{position:'absolute',left:0,top:0,backgroundColor:'#fff',width:'100%',height: '100%', opacity:0.5}} />
                        </View> 
                        <InputComponent 
                            label="Jumlah"
                            iconName={null}
                            keyboardType="numeric"
                            placeholder="Masukan jumlah nominal"
                            value={this.state.jumlah2}
                            onChange={(jumlah2) => this.setState({jumlah2})}/>
                        <InputComponent 
                            label="Jumlah Angsuran"
                            iconName={null}
                            keyboardType="numeric"
                            placeholder="Masukan jumlah angsuran"
                            value={this.state.jumlahAngsuran}
                            onChange={(jumlahAngsuran) => this.setState({jumlahAngsuran})}/>
                        <InputComponent 
                            label="Sisa Angsuran"
                            iconName={null}
                            keyboardType="numeric"
                            placeholder="Masukan jumlah sisa angsuran"
                            value={this.state.jumlahSisaAngsuran}
                            onChange={(jumlahSisaAngsuran) => this.setState({jumlahSisaAngsuran})}/>
                    </View>

                    <View style={{
                        marginTop:15,
                        padding:15,
                        borderTopLeftRadius:Variable.borderRadius,
                        borderTopRightRadius:Variable.borderRadius,
                        borderBottomWidth: 1,
                        borderColor: '#efefef',
                        backgroundColor: '#f8f8ff'}}>
                        <ButtonComponent type="default" text="Simulasikan Kredit" onClick={()=> console.log("asd")}/>
                    </View>
                    <Grid style={{
                        padding:15,
                        borderBottomWidth: 1,
                        borderColor: '#efefef',
                        backgroundColor: '#f8f8ff'}}>
                        <Col><Text style={Typography.label}>Rp 1.250.000</Text></Col>
                        <Col><Text style={[Typography.singleText,{textAlign:'right',color:Variable.colorPrimary}]}>x10 bulan</Text></Col>
                    </Grid>
                    <View style={{
                        padding:15,
                        borderBottomLeftRadius:Variable.borderRadius,
                        borderBottomRightRadius:Variable.borderRadius,
                        backgroundColor: '#f8f8ff'}}>
                        <Text style={[Typography.heading6,{marginBottom:0}]}>Rp 12.500.000</Text>
                    </View>


                    <View style={{marginTop: 15, marginBottom: 15}}>
                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('Credit')} underlayColor="transparent">
                            <Text style={[Input.singleLink,{textAlign:'center'}]}>Kembali</Text>
                        </TouchableHighlight>
                    </View>
                    
                    <ButtonComponent type="primary" text="Lanjutkan" onClick={()=> this.props.navigation.navigate('CreditTerm')}/>

                </View>
                {/* ====== START INPUT ====== */}

            </ScrollView>
        ) 
    }
}


export default CreditDetailComponent;