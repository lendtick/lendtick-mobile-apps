import React from 'react';
import { View,Text,ScrollView } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import { ButtonComponent,InputMask } from '@directives';
import { Main,Variable,Typography } from '@styles';

class SplitPayment extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pembayaran Split",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = { 
            middleloanCount: "75000",
            vaCount: "25000"
        };
    }

    render() { 
        return(
            <View style={{height:'100%',backgroundColor:'white'}}>
                <ScrollView>
                    {/* ======= Start Information ========= */}
                    <View style={Main.container}>
                        <Text style={[Typography.singleTitle,{marginTop:15}]}>Informasi</Text>
                    </View>
                    <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1,borderTopWidth:1, borderColor: '#dfdfdf'}]}>
                        <Grid>
                            <Col><Text style={Typography.singleText}>Total Belanja</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Rp  100.000</Text></Col>
                        </Grid>
                    </View>
                    {/* ======= End Information ========= */}

                    <View style={[Main.container,{marginTop:15, marginBottom:15}]}>
                        <InputMask 
                            label="Middleloan"
                            iconName={null}
                            keyboardType="numeric"
                            placeholder="Masukan jumlah nominal"
                            value={this.state.middleloanCount}
                            onChange={(middleloanCount) => this.setState({middleloanCount})}/>
                        <Text style={[Typography.singleText,{marginTop:-10,marginBottom:15,fontSize:12}]}>Max : Rp 3.000.000</Text>

                        <InputMask 
                            label="VA"
                            iconName={null}
                            keyboardType="numeric"
                            placeholder="Masukan jumlah nominal"
                            value={this.state.vaCount}
                            disabled={true}
                            onChange={(vaCount) => this.setState({vaCount})}/>
                        <ButtonComponent type="primary" text="Bayar" onClick={()=> this.props.navigation.navigate('Home')} />
                    </View>
                </ScrollView>
            </View>
        ) 
    }
}

export default SplitPayment;