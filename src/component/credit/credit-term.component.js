import React, { Component } from 'react';
import { ScrollView,View,Image,TouchableHighlight,Text } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import { ButtonComponent, InputCheckbox, AlertBox } from '@directives';
import { Main,Variable,Input,Typography } from '@styles';
import { styles } from './credit.style';

class CreditTermComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Syarat dan Ketentuan",
        headerTitleStyle: Variable.headerTitleStyle,
        headerLeft: null
    });

    constructor(props) {
        super(props);
        this.state = { 
            checked: false,
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
                        <Text style={Typography.heading5}>Syarat & Ketentuan</Text>
                        <Text style={[Typography.singleText,{marginBottom:15}]}>
                            Lorem ipsum dolor sit amet, ad per quando oblique sensibus, ne nam antiopam elaboraret, ea integre docendi pertinax vel. Alterum reformidans mei ex. Nec id tritani iuvaret, commodo qualisque iudicabit ei nam. Ea pericula intellegat usu, in erat tritani qui.
                        </Text>
                        <Text style={[Typography.singleText,{marginBottom:15}]}>
                            Id congue minimum accusamus mea, eu nec putant moderatius repudiandae. Sit cu doctus epicuri, et clita mucius mel, at est audiam aliquip mandamus. In sed sonet vulputate appellantur, dicit utroque deserunt eu cum. In voluptua inciderint scribentur vim. Has dicat tempor neglegentur no.
                        </Text>
                        <Text style={[Typography.singleText,{marginBottom:15}]}>
                            Tation scripserit duo ex, pri probo eleifend in, at eripuit civibus his. Eam semper maluisset disputationi ne. Recusabo salutandi ei mea, ex esse probatus mnesarchum eos, ea semper fierent voluptaria ius. Prima harum omittantur.
                        </Text>

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