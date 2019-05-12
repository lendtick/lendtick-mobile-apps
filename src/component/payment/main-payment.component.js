import React from 'react';
import { ScrollView,View,Text,TouchableHighlight, Dimensions } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import Feather from 'react-native-vector-icons/Feather';
import { ButtonComponent,Modal } from '@directives';
import { Main,Variable,Typography } from '@styles';

class MainPaymentComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Pembayaran",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = {
            selectType: 'va',
            popUpOrder: false
        };
    }

    gotoPayment(e){
        switch(e){
            case "va" :
                this.props.navigation.navigate('VAPayment');
            break;
            case "middleloan" :
                this.props.navigation.navigate('MiddlePayment');
            break;
            case "microloan" :
                this.props.navigation.navigate('MicroloanPayment');
            break;
            case "split" :
                this.props.navigation.navigate('SplitPayment');
            break;
        }
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
                            <Col><Text style={Typography.singleText}>Total Tagihan</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Rp 104.000</Text></Col>
                        </Grid>
                    </View>
                    <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1, borderColor: '#dfdfdf'}]}>
                        <Grid>
                            <Col><Text style={Typography.singleText}>Total Belanja</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Rp 104.000</Text></Col>
                        </Grid>
                    </View>
                    <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1, borderColor: '#dfdfdf',marginBottom:15}]}>
                        <Grid>
                            <Col><Text style={Typography.singleText}>Total Bayar</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Rp 104.000</Text></Col>
                        </Grid>
                    </View>
                    <View style={Main.container}>
                        <ButtonComponent type="primary" text="Produk yang dibeli" onClick={()=> this.setState({popUpOrder: true})} />
                    </View>
                    {/* ======= End Information ========= */}

                    {/* ======= Start List Payment ========= */}
                    <View style={Main.container}>
                        <Text style={[Typography.singleTitle,{marginTop:30,marginBottom:15}]}>Pilih Metode pembayaran</Text>
                        
                        <TouchableHighlight onPress={()=> this.setState({selectType: 'va'})} underlayColor="transparent">
                            <View style={{flex: 1, flexDirection: 'row',padding:15, backgroundColor:'white',borderWidth:1,borderBottomWidth:0,borderColor:'#efefef'}}>
                                <Feather name={this.state.selectType == 'va' ? "check-circle" : "circle"} size={14} style={{marginRight: 10, top:2}} color={Variable.colorPrimary} />
                                <Text style={[Typography.singleText,this.state.selectType == 'va' ? {color:Variable.colorPrimary,fontFamily: Variable.fontBold} : null]}>Virtual Account</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={()=> this.setState({selectType: 'middleloan'})} underlayColor="transparent">
                            <View style={{flex: 1, flexDirection: 'row',padding:15, backgroundColor:'white',borderWidth:1,borderColor:'#efefef'}}>
                                <Feather name={this.state.selectType == 'middleloan' ? "check-circle" : "circle"} size={14} style={{marginRight: 10, top:2}} color={Variable.colorPrimary} />
                                <Text style={[Typography.singleText,this.state.selectType == 'middleloan' ? {color:Variable.colorPrimary,fontFamily: Variable.fontBold} : null]}>Middleloan</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={()=> this.setState({selectType: 'microloan'})} underlayColor="transparent">
                            <View style={{flex: 1, flexDirection: 'row',padding:15, backgroundColor:'white',borderWidth:1,borderTopWidth:0,borderColor:'#efefef'}}>
                                <Feather name={this.state.selectType == 'microloan' ? "check-circle" : "circle"} size={14} style={{marginRight: 10, top:2}} color={Variable.colorPrimary} />
                                <Text style={[Typography.singleText,this.state.selectType == 'microloan' ? {color:Variable.colorPrimary,fontFamily: Variable.fontBold} : null]}>Microloan</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={()=> this.setState({selectType: 'split'})} underlayColor="transparent">
                            <View style={{flex: 1, flexDirection: 'row',padding:15, backgroundColor:'white',borderWidth:1,borderTopWidth:0,borderBottomWidth:1,borderColor:'#efefef'}}>
                                <Feather name={this.state.selectType == 'split' ? "check-circle" : "circle"} size={14} style={{marginRight: 10, top:2}} color={Variable.colorPrimary} />
                                <Text style={[Typography.singleText,this.state.selectType == 'split' ? {color:Variable.colorPrimary,fontFamily: Variable.fontBold} : null]}>Split (Middleloan & VA)</Text>
                            </View>
                        </TouchableHighlight>

                        <View style={{marginTop:15, marginBottom:15}}>
                            <ButtonComponent type="primary" text="Pilih" onClick={()=> this.gotoPayment(this.state.selectType)} />
                        </View>
                    </View>
                    {/* ======= End List Payment ========= */}

                </ScrollView>

                {/* ====== START Contacts ====== */}
                <Modal 
                    isOpen={this.state.popUpOrder}
                    title="Daftar beli"
                    textRight="Tutup"
                    rightClick={()=> this.setState({popUpOrder: false})}
                    height={Dimensions.get('window').height - (Dimensions.get('window').height * 0.45)}
                    width={Dimensions.get('window').width - 30}
                    textLeft={null}>
                   <View style={[Main.container,{paddingTop:15,paddingBottom:15,borderBottomWidth:1,borderTopWidth:1, borderColor: '#dfdfdf'}]}>
                        <Grid>
                            <Col><Text style={Typography.singleText}>Pulsa m3 100 rb</Text></Col>
                            <Col><Text style={[Typography.heading6,{textAlign:'right',marginBottom:0}]}>Rp 104.000</Text></Col>
                        </Grid>
                    </View>
                </Modal>
                {/* ====== END Contacts ====== */}
            </View>
        ) 
    }
}


export default MainPaymentComponent;