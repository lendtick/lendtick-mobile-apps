import React from 'react';
import { View, Text, TouchableHighlight,ActivityIndicator,StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Input,Variable } from '../styles/index';

class ButtonComponent extends React.Component {
    render() {
        let elem;
        switch(this.props.type){
            case "primary" :
                elem =  <TouchableHighlight style={[this.props.disabled ? Input.btnDisabled : Input.btnPrimary]} onPress={this.props.onClick} underlayColor={this.props.disabled ? '#999' : Variable.colorPrimary}>
                            {this.props.isSubmit ? <ActivityIndicator size="small" color="#fff" /> : <Text style={Input.btnText}>{this.props.text}</Text> }
                        </TouchableHighlight>;
            break;
            case "default" :
                elem =  <TouchableHighlight style={[this.props.disabled ? Input.btnDisabled : Input.btnDefault]} onPress={this.props.onClick} underlayColor={this.props.disabled ? '#999' : '#fff'}>
                            <Text style={[Input.btnTextDefaul,this.props.disabled ? {color:'#fff'} : null]}>{this.props.text}</Text>
                        </TouchableHighlight>;
            break;
        }

        return (
            <View style={{position:'relative'}}>
                {elem}
                {this.props.disabled ? <View style={styles.blockUI}></View> : null}
            </View>
        );
    }
}

ButtonComponent.propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    isSubmit: PropTypes.bool,
    text: PropTypes.string
};

ButtonComponent.defaultProps = {
    disabled: false,
    isSubmit: false,
    type: 'default',
    text: 'BUTTON'
}

const styles = StyleSheet.create({
    blockUI: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'transparent'
    }
});

export default ButtonComponent;