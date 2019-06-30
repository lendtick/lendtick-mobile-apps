import React from 'react';
import { View,Text,ScrollView,Image,Dimensions,ActivityIndicator } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Col,Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';
import * as _ from 'lodash';
import AutoHeightImage from 'react-native-auto-height-image';
import { InputComponent,ButtonComponent } from '@directives';
import { Main,Variable,Typography } from '@styles';
import { styles } from './credit.style';
import creditService from './credit.service';


toDataUrl = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
};

base64MimeType = (encoded) => {
    var result = null;
    if (typeof encoded !== 'string') {
        return result;
    }
  
    var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {
        result = mime[1];
    }
    return result;
}


class CreditDocumentComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Melengkapi Dokumen",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = { 
            document1: null,
            document2: null,
            document3: null,
            loading1: false,
            loading2: false,
            loading3: false,
            arrDcument: []
        };
    }

    componentDidMount(){
        Permissions.askAsync(Permissions.CAMERA);
        Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.fetchDocument();
        this.setState({
            loading1: true,
            loading2: true,
            loading3: true
        });
    }

    pickupImage = async (param) => {
        var document_type = null;
        var doc_photo = null;
        const statusCamera = await Permissions.getAsync(Permissions.CAMERA);
        const statusCameraRoll = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (statusCamera.status === 'granted' && statusCameraRoll.status === 'granted') {
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
                        document_type = 'DOC001';
                        this.setState({
                            loading1: true,
                            document1: response
                        });
                    break;
                    case 'document2' : 
                        document_type = 'DOC002';
                        this.setState({
                            loading2: true,
                            document2: response
                        });
                    break;
                    case 'document3' : 
                        document_type = 'DOC003';
                        this.setState({
                            loading3: true,
                            document3: response
                        });
                    break;
                };
            }

            let obj = {
                id: this.props.personal.data.id_user,
                id_document_type: document_type,
                doc_photo: `data:image/png;base64,${response.base64}`
            }
            creditService.postDocument(obj).then(res =>{  
                this.fetchDocument();
            });
        }else{
            Permissions.askAsync(Permissions.CAMERA);
            Permissions.askAsync(Permissions.CAMERA_ROLL);
        }
    }

    fetchDocument(){
        creditService.getLoanDocument(this.props.credit.data.id).then(res =>{
            this.setState({arrDcument:[]});
            _.map(res['data'], (x)=>{
                switch(x.id_document_type){
                    case "DOC001" :
                        if(x.path){
                            toDataUrl(x.path, (e) => {
                                let imgData = e.replace('data:'+ base64MimeType(e) +';base64,','');
                                let obj = {
                                    type: base64MimeType(e),
                                    base64: imgData,
                                    uri: x.path
                                }
                                this.state.arrDcument.push(1);
                                this.setState({
                                    document1:obj,
                                    loading1:false,
                                    arrDcument: this.state.arrDcument
                                });
                                this.props.updateDoc1({
                                    uri: obj.uri,
                                    type: 'KTP'
                                });
                            });
                        }else{
                            this.setState({loading1:false});
                        }
                    break;
                    case "DOC002" :
                        if(x.path){
                            toDataUrl(x.path, (e) => {
                                let imgData = e.replace('data:'+ base64MimeType(e) +';base64,','');
                                let obj = {
                                    type: base64MimeType(e),
                                    base64: imgData,
                                    uri: x.path
                                }
                                this.state.arrDcument.push(1);
                                this.setState({
                                    document2:obj,
                                    loading2:false,
                                    arrDcument: this.state.arrDcument
                                });
                                this.props.updateDoc2({
                                    uri: obj.uri,
                                    type: 'ID CARD'
                                });
                            });
                        }else{
                            this.setState({loading2:false});
                        }
                    break;
                    case "DOC003" :
                        if(x.path){
                            toDataUrl(x.path, (e) => {
                                let imgData = e.replace('data:'+ base64MimeType(e) +';base64,','');
                                let obj = {
                                    type: base64MimeType(e),
                                    base64: imgData,
                                    uri: x.path
                                }
                                this.state.arrDcument.push(1);
                                this.setState({
                                    document3:obj,
                                    loading3:false,
                                    arrDcument: this.state.arrDcument
                                });
                                this.props.updateDoc3({
                                    uri: obj.uri,
                                    type: 'NPWP'
                                });
                            });
                        }else{
                            this.setState({loading3:false});
                        }
                    break;
                }
            });
        });
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
                    {this.state.loading1 ? 
                        <View style={{padding:30}}>  
                            <ActivityIndicator size="small" color="#333" style={{marginBottom:15}}/>
                        </View>
                    :
                        <View>
                            <InputComponent 
                            label="KTP"
                            iconName="upload"
                            placeholder="Unggah KTP"
                            value={this.state.document1 != null ? this.state.document1.uri.replace(/^.*[\\\/]/, '').substring(this.state.document1.uri.replace(/^.*[\\\/]/, '').length - 10, this.state.document1.uri.replace(/^.*[\\\/]/, '').length) : null}
                            isButton={true}
                            topIcon={2}
                            onClickBtn={()=> this.pickupImage('document1')}/>
                        {this.state.document1 != null ? <AutoHeightImage source={{uri: `data:${this.state.document1.type};base64,${this.state.document1.base64}`}} width={Dimensions.get('window').width - 30} style={{marginBottom:15}}/> : null}
                        </View>
                    }

                    {this.state.loading2 ? 
                        <View style={{padding:30}}>  
                            <ActivityIndicator size="small" color="#333" style={{marginBottom:15}}/>
                        </View>
                    :
                        <View>
                            <InputComponent 
                                label="ID CARD"
                                iconName="upload"
                                placeholder="Unggah ID CARD"
                                value={this.state.document2 != null ? this.state.document2.uri.replace(/^.*[\\\/]/, '').substring(this.state.document2.uri.replace(/^.*[\\\/]/, '').length - 10, this.state.document2.uri.replace(/^.*[\\\/]/, '').length) : null}
                                isButton={true}
                                topIcon={2}
                                onClickBtn={()=> this.pickupImage('document2')}/>
                            {this.state.document2 != null ? <AutoHeightImage source={{uri: `data:${this.state.document2.type};base64,${this.state.document2.base64}`}} width={Dimensions.get('window').width - 30} style={{marginBottom:15}}/> : null}
                        </View>
                    }

                    {this.state.loading3 ? 
                        <View style={{padding:30}}>  
                            <ActivityIndicator size="small" color="#333" style={{marginBottom:15}}/>
                        </View>
                        :
                        <View>
                            <InputComponent 
                                label="NPWP"
                                iconName="upload"
                                placeholder="Unggah NPWP"
                                value={this.state.document3 != null ? this.state.document3.uri.replace(/^.*[\\\/]/, '').substring(this.state.document3.uri.replace(/^.*[\\\/]/, '').length - 10, this.state.document3.uri.replace(/^.*[\\\/]/, '').length) : null}
                                isButton={true}
                                topIcon={2}
                                onClickBtn={()=> this.pickupImage('document3')}/>
                            {this.state.document3 != null ? <AutoHeightImage source={{uri: `data:${this.state.document3.type};base64,${this.state.document3.base64}`}} width={Dimensions.get('window').width - 30} style={{marginBottom:15}}/> : null}
                        </View>
                    }

                {!this.state.loading1 && !this.state.loading2 &&!this.state.loading3 ? 
                    <ButtonComponent 
                        type="primary" 
                        text="Lanjutkan" 
                        onClick={()=> this.props.navigation.navigate('CreditComplete')} 
                        disabled={this.state.arrDcument.length != 3} 
                        isSubmit={false}/> 
                : null }
                </View>

            </ScrollView>
        ) 
    }
}


const mapStateToProps = (state) => {
	return {
        personal: state.personal,
        credit: state.credit
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		updateDoc1: (e) => {
			dispatch({
				type: 'FILL_DOCUMENT1',
				document1: e
			})
        },
        updateDoc2: (e) => {
			dispatch({
				type: 'FILL_DOCUMENT2',
				document2: e
			})
        },
        updateDoc3: (e) => {
			dispatch({
				type: 'FILL_DOCUMENT3',
				document3: e
			})
        },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreditDocumentComponent)
