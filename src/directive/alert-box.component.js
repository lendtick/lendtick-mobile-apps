import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { Variable } from '@styles';
import PropTypes from 'prop-types';
import lodashMap from 'lodash/map';

class AlertBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        let color;
        let textColor;
        switch(this.props.type){
            case 'warning' : 
                color = styles.warning;
                textColor = styles.textWarning;
                titleColor = styles.textWarning;
            break;
            case 'info' : 
                color = styles.info; 
                textColor = styles.textInfo;
                titleColor = styles.textInfo;
            break;
            case 'success' : 
                color = styles.success; 
                textColor = styles.textSuccess;
                titleColor = styles.textSuccess;
            break;
            case 'danger' : 
                color = styles.danger; 
                textColor = styles.textDanger;
                titleColor = styles.textDanger;
            break;
        }

        let content;
        switch(typeof(this.props.text)){
            case 'string' :
                content = <Text style={[styles.textAlert,textColor]}>{this.props.text}</Text>;
            break;
            case 'object' : 
                content = lodashMap(this.props.text, (x,i)=>{
                    return <Grid key={i}><Col style={{width:20}}><Text style={[styles.textAlert,textColor]}>{i + 1}. </Text></Col><Col><Text style={[styles.textAlert,textColor]}>{x}</Text></Col></Grid>;
                });
            break;
        }
        return (
            <View style={[styles.wrapAlert,color]}>
                {this.props.title != null ? <Text style={[styles.titleAlert, titleColor]}>{this.props.title}</Text> : null}
                {content}
            </View>
        );
    }
}

AlertBox.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
};

AlertBox.defaultProps = {
    title: null,
    text: 'Some text',
    type: 'warning',
}

const styles = StyleSheet.create({
    wrapAlert:{
        ...Variable.boxShadow,
        paddingLeft:15,
        paddingTop:15,
        paddingBottom:7.5,
        paddingRight:15,
        borderWidth: 1,
        borderRadius: Variable.borderRadius,
    },
    titleAlert:{
        fontSize: 14,
        fontWeight: '700',
        // color: Variable.colorTitle,
        fontFamily: Variable.fontBold,
        marginBottom: 7.5,
    },
    textAlert:{
        fontSize: 14,
        marginBottom: 7.5,
        fontFamily: Variable.fontRegular,
    },

    // Warning
    // ========================= //
    warning:{
        backgroundColor: '#fcf8e3',
        borderColor: '#faebcc',
    },
    textWarning:{
        color: '#8a6d3b',
    },
    titleWarning:{
        color: '#8a6d3b',
    },

    // Info
    // ========================= //
    info:{
        backgroundColor: '#d9edf7',
        borderColor: '#bce8f1',
    },
    textInfo:{
        color: '#31708f',
    },
    titleInfo:{
        color: '#31708f',
    },

    // Success
    // ========================= //
    success:{
        backgroundColor: '#dff0d8',
        borderColor: '#d6e9c6',
    },
    textSuccess:{
        color: '#3c763d',
    },
    titleSuccess:{
        color: '#3c763d',
    },

    // Info
    // ========================= //
    danger:{
        backgroundColor: '#f2dede',
        borderColor: '#ebccd1',
    },
    textDanger:{
        color: '#a94442',
    },
    titleDanger:{
        color: '#a94442',
    },
});

export default AlertBox;