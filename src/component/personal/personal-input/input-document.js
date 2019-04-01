import React from 'react';
import { View,Dimensions,ActivityIndicator,Text } from 'react-native';
import { Permissions,ImagePicker } from 'expo';
import AutoHeightImage from 'react-native-auto-height-image';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Col,Grid } from "react-native-easy-grid";

import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';
Validator.setMessages('en', en);

import { InputComponent,ButtonComponent,InputDropdown,AlertBox } from '@directives';
import { Main,Variable,Typography } from '@styles';
import personalService from '../personal.service';

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

async function checkAllowCamera() {
    const { statusCamera } = await Permissions.getAsync(Permissions.CAMERA);
    const { statusCameraRoll } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (statusCamera === 'granted' && statusCameraRoll === 'granted') {
        return true;
    }
}

class InputDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false,
            isInvalid: false,
            isSuccess: false,
            isFailed: false,
            loading: false,
            message: null,

            fileDocument: null,
            openPopupGrade: false,
            selectedGrade: null,
            id_document_type: null,
            arrDocumentType: [],
            arrDocumentList: [],
        };
    }

    componentDidMount(){
        this.fetchMaster();
    }

    // Fetch Profile Document
    // ======================= //
    fetchProfileDocument(){
        let arrDocumentList = [];
        personalService.getProfileDocument().then(res =>{
            _.map(res.data, (x)=>{
                x.document_type_name = _.find(this.state.arrDocumentType, {value: x.id_document_type}).label;
                x.isloading = false
                arrDocumentList.push(x);
            });

            this.setState({
                arrDocumentList: arrDocumentList,
                loading: false
            });

            console.log(arrDocumentList);
        });
    }

    // Fetch Data
    // ==================== //
    fetchMaster(){  
        let arrDocumentType  = [];
        this.setState({loading: true});
        personalService.getDocumentType().then(res =>{
            _.map(res.data,(x)=>{
                let obj = {value: x.id_document_type , label: x.document_name };
                arrDocumentType .push(obj);
            });
            this.setState({
                arrDocumentType : arrDocumentType ,
                selectedGrade : _.find(arrDocumentType , {value: this.state.id_document_type })
            });
            this.fetchProfileDocument();
        });
    }

    pickupImage = async () => {
        if(checkAllowCamera()){
            let response = await ImagePicker.launchImageLibraryAsync({
                base64: true,
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                }
            });
            if (!response.cancelled) {
                this.setState({fileDocument: response});
            }
        }else{
            Permissions.askAsync(Permissions.CAMERA);
            Permissions.askAsync(Permissions.CAMERA_ROLL);
        }
    }

    // Validation
    // ======================== //
    validationSubmit(){
        if(this.state.fileDocument){
            let data = {
                id_user: this.props.personal.data.id_user,
                id_document_type: this.state.id_document_type,
                doc_photo: `data:image/png;base64,${this.state.fileDocument.base64}`
            };
    
            let rules = {
                id_document_type: 'required',
                doc_photo: 'required',
            };
    
            let validation = new Validator(data, rules);
            if(validation.passes()){
                this.onSubmit(data);
            }else{
                this.setState({isInvalid: true});
            }
        }else{
            this.setState({isInvalid: true});
        }
       
    }

    // Submit
    // ======================== //
    onSubmit(data){
        this.setState({
            isFailed: false,
            isInvalid: false,
            isSubmit: true,
            isSuccess: false
        });
        personalService.postDocument(data).then(res =>{
            if(res.status){
                this.setState({
                    isSubmit: false,
                    isSuccess: true
                });
                this.fetchProfileDocument();
            }else{
                this.setState({
                    isSubmit: false,
                    isFailed: true,
                    message: res.message
                });
            }
        }, err =>{
            this.setState({
                isFailed: true,
                isSubmit: false
            });
        });
    }

    // Delete
    // ========================= //
    removeDocument(e){
        e.isloading = true;
        let findIndex = _.findIndex(this.state.arrDocumentList,{id_user_document: e.id_user_document});
        let arrDocumentList = this.state.arrDocumentList;
        arrDocumentList[findIndex] = e;
        this.setState({arrDocumentList: arrDocumentList});
        personalService.deleteDocument({
            id_user_document:e.id_user_document,
            id: this.props.personal.data.id_user
        }).then(res =>{
            this.fetchMaster();
        });
    }

    render() { 
        return(
            <View> 
            
                <InputDropdown 
                    label="Tipe Dokumen"
                    iconName={null}
                    placeholder="Pilih tipe dokume"
                    value={this.state.id_document_type}
                    items={this.state.arrDocumentType}
                    onChange={(id_document_type) => this.setState({id_document_type})}/> 

                <InputComponent 
                    label="Unggah Dokumen"
                    iconName="upload"
                    placeholder="Unggah dokumen"
                    value={this.state.fileDocument != null ? this.state.fileDocument.uri.replace(/^.*[\\\/]/, '') : null}
                    isButton={true}
                    topIcon={2}
                    onClickBtn={()=> this.pickupImage()}/>
                {this.state.fileDocument != null ? <AutoHeightImage source={{uri: `data:${this.state.fileDocument.type};base64,${this.state.fileDocument.base64}`}} width={Dimensions.get('window').width - 30} style={{marginBottom:15}}/> : null}

                {this.state.isInvalid ? <View style={{marginBottom:15}}><AlertBox type="warning" text="Masukan data dengan benar"/></View>: null}
                {this.state.isFailed ? <View style={{marginBottom:15}}><AlertBox type="danger" text={this.state.message}/></View>: null}
                {this.state.isSuccess ? <View style={{marginBottom:15}}><AlertBox type="success" text="Submit berhasil"/></View>: null}
                
                <ButtonComponent type="primary" text="Tambah Dokumen" onClick={()=> this.validationSubmit()} disabled={this.state.isSubmit} isSubmit={this.state.isSubmit}/>

                {this.state.loading ? 
                    <ActivityIndicator size="small" color="#333" style={{top:38}}/> 
                :
                    <View style={{marginTop:15}}>
                         {this.state.arrDocumentList.map((x,i)=>(
                                <View key={i} style={{padding:15,borderWidth:1,borderColor:'#dfdfdf',borderRadius:Variable.borderRadius,borderStyle:'dashed',marginBottom:15}}>
                                    <Text style={[Typography.heading6,{marginBottom:5}]}>{x.document_type_name}</Text>
                                    <AutoHeightImage source={{uri: x.path}} width={Dimensions.get('window').width - 62} style={{marginBottom:15}}/> 
                                    <ButtonComponent type="default" text="Hapus" onClick={()=> this.removeDocument(x)} disabled={x.isloading} isSubmit={x.isloading}/>
                                    {/* <Grid>
                                        <Col style={{paddingRight:7.5}}>
                                            <ButtonComponent type="primary" text="Ubah" onClick={()=> console.log("ubah")} disabled={false} isSubmit={false}/>
                                        </Col>
                                        <Col style={{paddingLeft:7.5}}>
                                            <ButtonComponent type="default" text="Hapus" onClick={()=> this.removeDocument(x)} disabled={x.isloading} isSubmit={x.isloading}/>
                                        </Col>
                                    </Grid> */}
                                </View>
                            ))}
                    </View>
                }
            </View>
        )
    }
}


const mapStateToProps = (state) => {
	return {
		personal: state.personal
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setGetData: (e) => {
			dispatch({
				type: 'UPDATE_DATA_PERSONAL',
				data: e
			})
        },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InputDocument)