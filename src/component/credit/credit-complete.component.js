import React, { Component } from 'react';
import { ScrollView,View,Image,TouchableHighlight,Text } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import { ButtonComponent, InputCheckbox, AlertBox } from '@directives';
import { Main,Variable,Input,Typography } from '@styles';
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
                        <Text style={Typography.heading5}>Selesai</Text>
                        <Text style={[Typography.singleText,{marginBottom:15}]}>
                            Lorem ipsum dolor sit amet, ad per quando oblique sensibus, ne nam antiopam elaboraret, ea integre docendi pertinax vel. Alterum reformidans mei ex. Nec id tritani iuvaret, commodo qualisque iudicabit ei nam. Ea pericula intellegat usu, in erat tritani qui.
                        </Text>

                        <View style={{marginBottom: 15}} />
                        
                        <ButtonComponent type="primary" text="Kembali" onClick={()=> this.props.navigation.popToTop()}  disabled={false} isSubmit={false}/>
                    </View>
                
                </ScrollView>
            </View>

        )
    }
}

export default CreditCompleteComponent 