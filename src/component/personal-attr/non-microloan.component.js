import React from 'react';
import { View,Text,ScrollView } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import { Variable,Typography } from '@styles';
import { ButtonComponent } from '@directives';
import { styles } from './balance.style';

class NonMicroloanComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Detail Pinjaman",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() { 
        return(
            <View style={{backgroundColor: '#f8f8ff',height:'100%'}}>

                {/* ====== START LOAN NUMBER ====== */}
                <View style={{padding:15,backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#dfdfdf', ...Variable.boxShadow}}>
                    <Text style={[Typography.singleText,{color: Variable.colorTitle,fontFamily:Variable.fontBold}]}>No. 12423423423</Text>
                </View>
                {/* ====== END LOAN NUMBER ====== */}

                <ScrollView>
                    {/* ====== START STEP ====== */}
                    <View style={{padding:15,paddingTop:30,paddingBottom:30}}>
                        <Grid>
                            <Col>
                                <View>
                                    <View style={[styles.circleDetail,{opacity:1}]}>
                                        <Text style={[styles.circleDetailText,Typography.singleText]}>1</Text>
                                    </View>
                                    <Text style={[Typography.singleText,{textAlign:'center',fontSize:10}]}>Pengajuan</Text>
                                </View>
                            </Col>
                            <Col>
                                <View>
                                    <View style={[styles.circleDetail,{borderColor: Variable.colorPrimary,opacity:1}]}>
                                        <Text style={[styles.circleDetailText,Typography.singleText]}>2</Text>
                                    </View>
                                    <Text style={[Typography.singleText,{textAlign:'center',fontSize:10}]}>Approval</Text>
                                </View>
                            </Col>
                            <Col>
                                <View>
                                    <View style={[styles.circleDetail,{borderStyle:'dotted'}]}>
                                        <Text style={[styles.circleDetailText,Typography.singleText]}>3</Text>
                                    </View>
                                    <Text style={[Typography.singleText,{textAlign:'center',fontSize:10}]}>Konfirmasi</Text>
                                </View>
                            </Col>
                            <Col>
                                <View>
                                    <View style={[styles.circleDetail,{borderStyle:'dotted'}]}>
                                        <Text style={[styles.circleDetailText,Typography.singleText]}>4</Text>
                                    </View>
                                    <Text style={[Typography.singleText,{textAlign:'center',fontSize:10}]}>Uang diterima</Text>
                                </View>
                            </Col>
                        </Grid>
                    </View>
                    {/* ====== END STEP ====== */}

                    {/* ====== START DESC ====== */}
                    <View style={[styles.wrapDetailDescPinjaman,{paddingTop:30,paddingBottom:30}]}>
                        <Text style={Typography.heading6}>Konfirmasi jumlah pinjaman</Text>
                        <Text style={[Typography.singleText,{marginBottom:15}]}>
                            jumlah pinjaman yang anda ajukan sebelumnya 100.000.000, di approve hanya 98.000.000
                        </Text>
                        <ButtonComponent type="primary" text="Konfirmasi" disabled={false} isSubmit={false}/>
                    </View>
                    {/* ====== START DESC ====== */}

                    {/* ====== START COUNTER ====== */}
                    <View style={{padding:15,paddingTop:30,paddingBottom:30}}>
                        <Grid>
                            <Col>
                                <Text style={[Typography.singleText,{textAlign: 'center'}]}>Tenor</Text>
                                <Text style={[Typography.heading4,{textAlign: 'center',marginBottom:10,marginTop:10}]}>60</Text>
                                <Text style={[Typography.singleText,{textAlign: 'center'}]}>Bulanan</Text>
                            </Col>
                            <Col>
                                <Text style={[Typography.singleText,{textAlign: 'center'}]}>dibayar</Text>
                                <Text style={[Typography.heading4,{textAlign: 'center',marginBottom:10,marginTop:10}]}>12</Text>
                                <Text style={[Typography.singleText,{textAlign: 'center'}]}>Bulanan</Text>
                            </Col>
                            <Col>
                                <Text style={[Typography.singleText,{textAlign: 'center'}]}>sisa</Text>
                                <Text style={[Typography.heading4,{textAlign: 'center',marginBottom:10,marginTop:10}]}>48</Text>
                                <Text style={[Typography.singleText,{textAlign: 'center'}]}>Bulanan</Text>
                            </Col>
                        </Grid>
                    </View>
                    {/* ====== END COUNTER ====== */}

                    {/* ====== START KETERANGAN ====== */}
                    <View style={[styles.wrapDetailDescPinjaman,{padding:0}]}>
                        <Grid style={{padding:15,borderBottomWidth:1,borderColor:'#dfdfdf'}}>
                            <Col><Text style={Typography.label}>Tipe Pinjaman</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>Multiguna</Text></Col>
                        </Grid>
                        <Grid style={{padding:15,borderBottomWidth:1,borderColor:'#dfdfdf'}}>
                            <Col><Text style={Typography.label}>Tanggal Mengajukan</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>12 Januari 2019</Text></Col>
                        </Grid>
                        <Grid style={{padding:15,borderBottomWidth:1,borderColor:'#dfdfdf'}}>
                            <Col><Text style={Typography.label}>Tanggal Pencairan</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>19 Januari 2019</Text></Col>
                        </Grid>
                        <Grid style={{padding:15}}>
                            <Col><Text style={Typography.label}>Estimasi Tanggal Lunas</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>20 Februari 2022</Text></Col>
                        </Grid>
                    </View>
                    {/* ====== END KETERANGAN ====== */}

                    {/* ====== START KETERANGAN ====== */}
                    <Grid style={{padding:15,marginTop:15}}>
                        <Col><Text style={[Typography.heading6,{textAlign:'center',marginBottom:0}]}>Cicilan Ke</Text></Col>
                        <Col><Text style={[Typography.heading6,{textAlign:'center',marginBottom:0}]}>Tanggal Bayar</Text></Col>
                        <Col><Text style={[Typography.heading6,{textAlign:'center',marginBottom:0}]}>Jumlah</Text></Col>
                    </Grid>
                    <View style={[styles.wrapDetailDescPinjaman,{padding:0,marginTop:0}]}>
                        <Grid style={{padding:15,borderBottomWidth:1,borderColor:'#dfdfdf'}}>
                            <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>1</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>12 Februari 2019</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>Rp 1.200.000</Text></Col>
                        </Grid>
                        <Grid style={{padding:15}}>
                        <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>2</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>-</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'center'}]}>Rp 1.200.000</Text></Col>
                        </Grid>
                    </View>
                    {/* ====== END KETERANGAN ====== */}
                </ScrollView>
            </View>
        ) 
    }
}


export default NonMicroloanComponent;