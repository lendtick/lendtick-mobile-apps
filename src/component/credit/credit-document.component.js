import React from 'react';
import { View,Text,ScrollView,Image,Dimensions } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import AutoHeightImage from 'react-native-auto-height-image';
import { ImagePicker,Permissions } from 'expo';
import { InputComponent,ButtonComponent } from '@directives';
import { Main,Variable,Typography } from '@styles';
import { styles } from './credit.style';

async function checkAllowCamera() {
    const { statusCamera } = await Permissions.getAsync(Permissions.CAMERA);
    const { statusCameraRoll } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    console.log(statusCamera,statusCameraRoll);
    if (statusCamera === 'granted' && statusCameraRoll === 'granted') {
        return true;
    }
}

class CreditDocumentComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Melengkapi Dokumen",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = { 
            document1: null
        };
    }

    componentDidMount(){
        Permissions.askAsync(Permissions.CAMERA);
        Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    pickupImage = async (param) => {
        if(checkAllowCamera()){
            let response = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: false,
                base64: true,
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                }
            });
            if (!response.cancelled) {
                switch(param){
                    case 'document1' : 
                        this.setState({document1: response});
                    break;
                    case 'document2' : 
                        this.setState({document2: response});
                    break;
                    case 'document3' : 
                        this.setState({document3: response});
                    break;
                };
            }
        }else{
            Permissions.askAsync(Permissions.CAMERA);
            Permissions.askAsync(Permissions.CAMERA_ROLL);
        }
    }


    render() { 
        return(
            <ScrollView style={{backgroundColor:'#fff'}}>
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
                                    <View style={[styles.circleDetail,{borderColor: '#1d92bd',opacity:1}]}>
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
                <View style={[Main.container,{marginTop: 15,paddingTop:10,paddingBottom: 30}]}>
                    <InputComponent 
                        label="Dokumen 1"
                        iconName="upload"
                        placeholder="Unggah Dokumen 1"
                        value={this.state.document1 != null ? this.state.document1.uri.replace(/^.*[\\\/]/, '') : null}
                        isButton={true}
                        topIcon={2}
                        onClickBtn={()=> this.pickupImage('document1')}/>
                    {this.state.document1 != null ? <AutoHeightImage source={{uri: `data:${this.state.document1.type};base64,${this.state.document1.base64}`}} width={Dimensions.get('window').width - 30} style={{marginBottom:15}}/> : null}

                    <InputComponent 
                        label="Dokumen 2"
                        iconName="upload"
                        placeholder="Unggah Dokumen 2"
                        value={this.state.document2 != null ? this.state.document2.uri.replace(/^.*[\\\/]/, '') : null}
                        isButton={true}
                        topIcon={2}
                        onClickBtn={()=> this.pickupImage('document2')}/>
                    {this.state.document2 != null ? <AutoHeightImage source={{uri: `data:${this.state.document2.type};base64,${this.state.document2.base64}`}} width={Dimensions.get('window').width - 30} style={{marginBottom:15}}/> : null}

                    <InputComponent 
                        label="Dokumen 3"
                        iconName="upload"
                        placeholder="Unggah Dokumen 3"
                        value={this.state.document3 != null ? this.state.document3.uri.replace(/^.*[\\\/]/, '') : null}
                        isButton={true}
                        topIcon={2}
                        onClickBtn={()=> this.pickupImage('document3')}/>
                    {this.state.document3 != null ? <AutoHeightImage source={{uri: `data:${this.state.document3.type};base64,${this.state.document3.base64}`}} width={Dimensions.get('window').width - 30} style={{marginBottom:15}}/> : null}

                    <ButtonComponent type="primary" text="Lanjutkan" onClick={()=> this.props.navigation.navigate('CreditComplete')} disabled={false} isSubmit={false}/>
                </View>

            </ScrollView>
        ) 
    }
}


export default CreditDocumentComponent;