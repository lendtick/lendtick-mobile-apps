import React from 'react';
import { StyleSheet,TextInput,TouchableHighlight,Platform,Text,View } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Col,Grid, Row } from "react-native-easy-grid";
import { Variable } from '@styles';
import PropTypes from 'prop-types';
import * as accounting from 'accounting';

class HeaderHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            text: null
        };
    }
    render(){
        return(
            <LinearGradient
                colors={['#479f78', '#b5d766']}
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                style={{ padding: 15, alignItems: 'center', width: '100%' }}>
                <Grid>
                    <Col style={{paddingLeft:15}}>
                        <View style={{flex: 1, flexDirection: 'row', marginTop:10}}>
                            <AntDesign name="user" size={14} style={{marginRight: 10, top:2}} color='#ffffff' />
                            <Text style={{color:'#ffffff'}}>{this.props.name}</Text>
                        </View>
                    </Col>
                    <Col style={{paddingLeft:0}}>
                        <Row style={{flexDirection: 'row', justifyContent: 'flex-end', paddingRight:15}}>
                            <AutoHeightImage width={40} source={require('@assets/img/icons/kai-pay.png')} />
                        </Row>
                        <Text style={{color:'#ffffff', textAlign: 'right', paddingRight:15}}>Rp. {accounting.formatMoney(this.props.saldo, "", 0, ",", ",")}</Text>
                    </Col>
                </Grid>
            </LinearGradient>
        )
    }
}

HeaderHome.propTypes = {
    // autoplay: PropTypes.bool,
    // loop: PropTypes.bool,
    // height: PropTypes.number,
    // aligment: PropTypes.string
    name: PropTypes.string,
    saldo: PropTypes.number
};

HeaderHome.defaultProps = {
    // autoplay: true,
    // loop: true,
    // height: 110,
    // aligment: 'center'
    name: '-',
    saldo: '0',
}

const styles = StyleSheet.create({
    wrapInput: {
        backgroundColor: '#ffffff',
        padding: 10,
        paddingLeft: 15,
        borderRadius: 4
    },
    input: {
        color: Variable.colorContent,
        fontFamily: Variable.fontRegular,
    },
    counter: {
        borderWidth: 1,
        borderColor: '#e74c3c',
        width: 26,
        height: 26,
        fontSize: 12,
        borderRadius: 13,
        backgroundColor: '#e74c3c',
        color: '#ffffff',
        textAlign: 'center',
        zIndex: 3,
        overflow: 'hidden',
        marginLeft: 10,
        marginRight: 5,
        paddingTop:5,
        marginTop:7
    }
});

const mapStateToProps = (state) => {
	return {
        cart: state.cart
	}
}
const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderHome)