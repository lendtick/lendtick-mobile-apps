import React, { Component } from 'react';
import { ScrollView,View,Image,Text,Dimensions } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import AutoHeightImage from 'react-native-auto-height-image';

import { ButtonComponent, InputComponent } from '@directives';
import { Main,Variable,Typography } from '@styles';
import { styles } from './credit.style';

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
            loanType: 'Microloan',
            jumlah: 'Rp 5.000.000',
            time: '22 Juni 2020',
            jmlTagihan: 'Rp 500.000'
        };
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
                                value={this.state.loanType}/>

                            <InputComponent 
                                label="Jumlah"
                                iconName={null}
                                keyboardType="default"
                                placeholder=""
                                value={this.state.jumlah}/>

                            <InputComponent 
                                label="Jangka waktu"
                                iconName={null}
                                keyboardType="default"
                                placeholder=""
                                value={this.state.time}/>

                            <InputComponent 
                                label="Tagihan Perbulan"
                                iconName={null}
                                keyboardType="default"
                                placeholder=""
                                value={this.state.jmlTagihan}/>
                            <View style={{position:'absolute',left:0,top:0,backgroundColor:'#fff',width:'100%',height: '100%', opacity:0.1}} />
                        </View> 

                        <View style={{padding:15,borderWidth:1,borderColor:'#dfdfdf',borderRadius:Variable.borderRadius,borderStyle:'dashed',marginBottom:15}}>
                            <AutoHeightImage source={{uri: 'https://data2.unhcr.org/images/documents/big_ce41a5548be1a9bf770a61532e851c61188f78d6.jpg'}} width={Dimensions.get('window').width - 62} style={{marginBottom:15}}/> 
                        </View>
                        <View style={{padding:15,borderWidth:1,borderColor:'#dfdfdf',borderRadius:Variable.borderRadius,borderStyle:'dashed',marginBottom:15}}>
                            <AutoHeightImage source={{uri: 'https://elonka.com/kryptos/sanborn/KGBCyrillic.jpg'}} width={Dimensions.get('window').width - 62} style={{marginBottom:15}}/> 
                        </View>
                        <View style={{padding:15,borderWidth:1,borderColor:'#dfdfdf',borderRadius:Variable.borderRadius,borderStyle:'dashed',marginBottom:15}}>
                            <AutoHeightImage source={{uri: 'https://www.dgassistant.com/images/screenshots/en/full/transport-document-shipping-note.png'}} width={Dimensions.get('window').width - 62}/> 
                        </View>

                        <View style={{marginBottom: 15}} />
                        
                        <ButtonComponent type="primary" text="Kembali" onClick={()=> this.props.navigation.popToTop()}  disabled={false} isSubmit={false}/>
                    </View>
                
                </ScrollView>
            </View>

        )
    }
}

export default CreditCompleteComponent 