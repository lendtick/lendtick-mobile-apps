import React from 'react';
import { View,Text,TouchableHighlight,ScrollView,ActivityIndicator } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { Col,Grid } from "react-native-easy-grid";
import { AlertBox,ButtonComponent } from '@directives';
import { Variable } from '@styles';
import { styles } from './credit.style';
import { connect } from 'react-redux';
import creditService from './credit.service';

class CreditComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Credit",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = { 
            titleError: null,
            arrError: [],
            directPage: 'CreditDetail',
            loading: false
        };
    }

    componentDidMount(){
        this.fetchInfoUser();
    }

    fetchInfoUser(){
        this.setState({loading: true});
        creditService.getInfoUserFullfillment(this.props.personal.data.id_user).then(res =>{
            if(res.data.validasi.length){
                let arrVaidation = [];
                res.data.validasi.map((x,i)=>{
                    arrVaidation.push(x);
                });
                this.setState({
                    titleError: res.message,
                    arrError: arrVaidation
                });
            }
            this.setState({loading: false});
        }, err =>{
            this.setState({loading: false});
        });
    }

    render() { 
        return(
            <ScrollView style={{padding: 30,  backgroundColor: '#f8f8ff'}}>
                {this.state.loading ? 
                    <View style={{padding:30}}>  
                        <ActivityIndicator size="small" color="#333" style={{marginBottom:15}}/>
                    </View>
                : 
                <View >
                    <Grid style={{paddingBottom:30}}>
                        <Col style={{paddingRight:15}}>
                            <TouchableHighlight onPress={()=> this.props.navigation.navigate(this.state.directPage,{
                                id: "LOAN0001"
                            })} underlayColor="transparent">
                                <View style={styles.itemLoan}>
                                    <AutoHeightImage width={80} style={{left:'50%',marginLeft:-40,margin: 5}} source={require('@assets/img/credit/loan.png')} />
                                    <Text style={styles.textMenuLoan}>Loan</Text>
                                </View>
                            </TouchableHighlight>
                        </Col>
                        <Col style={{paddingLeft:15}}>
                            <TouchableHighlight onPress={()=> this.props.navigation.navigate('CreditDetail')} underlayColor="transparent">
                                <View style={styles.itemLoan}>
                                    <AutoHeightImage width={80} style={{left:'50%',marginLeft:-40,margin: 5}} source={require('@assets/img/credit/middleloan.png')} />
                                    <Text style={styles.textMenuLoan}>Middle Loan</Text>
                                </View>
                            </TouchableHighlight>
                        </Col>
                    </Grid>
                    <AlertBox 
                        type="warning" 
                        title={this.state.titleError}
                        text={this.state.arrError}
                    />
                    
                    <View style={{marginTop:15}} />
                    <ButtonComponent type="primary" text="Masuk ke Halaman Personal" onClick={()=> this.props.navigation.navigate('User')}/>
                    <View style={{height:60}}/>
                </View>
                }
            </ScrollView>
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
)(CreditComponent)
