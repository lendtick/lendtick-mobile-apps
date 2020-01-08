import React from 'react';
import { View,ScrollView,Image,StyleSheet,ActivityIndicator,KeyboardAvoidingView } from 'react-native';
import { Constants } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import InputPersonal from './personal-input/input-personal';
import InputBank from './personal-input/input-bank';
import InputEmployee from './personal-input/input-employee';
import InputSallary from './personal-input/input-salary';
import InputDocument from './personal-input/input-document';

import { Panel } from '@directives';
import { Variable } from '@styles';

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

class DataPersonalComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Data Personal",
        headerTitleStyle: Variable.headerTitleStyle,
        headerStyle: {
            elevation:0,
            backgroundColor: '#42A9A0',
            borderBottomWidth: 0,
        },
        headerTintColor: '#ffffff',
    });

    constructor(props) {
        super(props);
        this.state = {
            collapse1: false,
            collapse2: false,
            collapse3: false,
            collapse4: false,
            collapse5: true,
            imageProfile: null
        };
    }

    componentDidMount(){
        setTimeout(()=>{
            toDataUrl(this.props.personal.data.personal_photo, (e) => {
                this.setState({imageProfile: e});
            });
        }, 500);
    }
    
    render() { 
        return(
            <View style={{height:'100%',backgroundColor:'white'}}>
                <KeyboardAvoidingView behavior="position">
                    <ScrollView>
                        <View style={{position:'relative',marginBottom: 70}}>
                            <LinearGradient
                                colors={Variable.colorGradient}
                                style={{ height: 100 }}
                                start={[0, 0]}
                                end={[1, 0]}
                            />
                            <View style={styles.wrapUser}></View>
                            {this.state.imageProfile ? <Image style={styles.imgUser} source={{uri: this.state.imageProfile}} /> : <View style={[styles.imgUser,{borderWidth:1, borderColor:'#dfdfdf'}]}><ActivityIndicator size="small" color="#333" style={{top:38}}/></View>}
                        </View>

                        <Panel title="Personal Data" onClick={() => this.setState({collapse1: !this.state.collapse1})} collapse={this.state.collapse1}>
                            {/* Start Data Personal */}
                            <InputPersonal />
                            {/* End Data Personal */}
                        </Panel>    
                        <Panel title="Data Pegawai" onClick={() => this.setState({collapse5: !this.state.collapse5})} collapse={this.state.collapse5}>
                            <InputEmployee />
                        </Panel>
                        <Panel title="Data Gaji" onClick={() => this.setState({collapse3: !this.state.collapse3})} collapse={this.state.collapse3}>
                            {/* Start Data Sallary */}
                            <InputSallary />
                            {/* End Data Sallary */}
                        </Panel>    
                        <Panel title="Informasi Bank" onClick={() => this.setState({collapse4: !this.state.collapse4})} collapse={this.state.collapse4}>
                            {/* Start Data Bank */}
                            <InputBank />
                            {/* End Data Bank */}
                        </Panel>    
                        <Panel title="Informasi Dokumen" onClick={() => this.setState({collapse2: !this.state.collapse2})} collapse={this.state.collapse2}>
                            {/* Start Data Bank */}
                            <InputDocument />
                            {/* End Data Bank */}
                        </Panel>  
                        
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        ) 
    }
}

const styles = StyleSheet.create({
    wrapUser: {
        position: 'absolute',
        width: 110,
        height: 110,
        left: 0,
        backgroundColor: 'white',
        bottom: -55,
        left: '50%',
        marginLeft: -55,
        borderRadius: 55
    },
    imgUser:{
        position: 'absolute',
        bottom: -50,
        marginLeft: -50,
        left: '50%',
        width: 100,
        height: 100,
        borderRadius: 50,
    }
});


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
)(DataPersonalComponent)
