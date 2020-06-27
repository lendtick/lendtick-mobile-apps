import React, { Component } from 'react';
import { ScrollView,View,Image,TouchableHighlight,Text, Linking } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import { ButtonComponent, InputCheckbox, AlertBox } from '@directives';
import { Main,Variable,Input,Typography } from '@styles';
import { styles } from './credit.style';
import { TouchableOpacity } from 'react-native-gesture-handler';

class CreditTermComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Syarat dan Ketentuan",
        headerTitleStyle: Variable.headerTitleStyle,
        headerStyle: {
            elevation:0,
            backgroundColor: '#42A9A0',
            borderBottomWidth: 0,
        },
        headerTintColor: '#ffffff',
        headerLeft: null
    });

    constructor(props) {
        super(props);
        this.state = { 
            checked: false,
            tnc: {}
        };
    }

    componentDidMount() {
        this.fetchTermAndCondition();
    }
    

    fetchTermAndCondition = () => {
        this.setState({
            tnc:  {
                'title': 'Syarat & Ketentuan',
                'body': 'Suku bunga dapat berubah sesuai dengan kebijaksanaan pengurus KAI dan akan berlaku untuk penempatan yang dilakukan mulai tanggal efektif perubahan suku bunga tersebut. ',
                'link': 'http://www.koperasi-astra.com/product/simpanan'
            }
        })
    }

    hyperlink = async url => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert(`Tidak dapat membuka link: ${url}`);
        }
    }

    render() {
        const {tnc} = this.state;
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
                                    <View style={[styles.circleDetail,{borderColor: '#1d92bd',opacity:1}]}>
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
                
                    <View style={[Main.container,{marginTop: 15,paddingTop:5,paddingBottom: 30}]}>
                            <Text style={Typography.heading5}>{tnc.title !== undefined ? tnc.title : null}</Text>
                        <Text style={[Typography.singleText,{marginBottom:15}]}>
                            {tnc.body !== undefined ? tnc.body : null}
                        </Text>
                        <TouchableOpacity onPress={() => this.hyperlink(tnc.link !== undefined ? tnc.link : null)}>
                            <Text style={[Typography.singleText,{marginBottom:15}]}>
                                Sumber: {tnc.link !== undefined ? tnc.link : null}
                            </Text>
                        </TouchableOpacity>

                        <Grid>
                            <Col style={{width:35}}>
                                <InputCheckbox onChange={()=> this.setState({checked: !this.state.checked})} checked={this.state.checked}/>
                            </Col>
                            <Col>
                                <Text style={[Typography.singleText,{marginBottom:15,marginTop:3}]}>Saya menyetujui ketentuan ini</Text>
                            </Col>
                        </Grid>

                        {this.state.isFailed ? <View style={{marginTop: 15}}><AlertBox type="danger" text={this.state.message}/></View> : null}

                        <View style={{marginBottom: 15}} />
                        
                        <ButtonComponent type="primary" text="Menyetujui" onClick={()=> this.props.navigation.navigate('CreditDocument')} disabled={!this.state.checked} isSubmit={false}/>
                    </View>
                
                </ScrollView>
            </View>

        )
    }
}

export default CreditTermComponent