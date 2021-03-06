import React from 'react';
import { View, Text, TouchableHighlight,ActivityIndicator,StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';
import { Input, Variable } from '@styles';

class ButtonComponent extends React.Component {

    render() {
        let elem;
        switch(this.props.type){
            case "primary" :
                elem =  <TouchableHighlight onPress={this.props.onClick} style={{width: '100%'}} underlayColor="transparent">
                            <LinearGradient
                                colors={this.props.disabled ? ['#999','#999'] : Variable.colorGradient}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                style={{ padding: 15, alignItems: 'center', borderRadius: 4, width: '100%' }}>
                                {this.props.isSubmit ? <ActivityIndicator size="small" color="#fff" /> : <Text style={Input.btnText}>{this.props.text}</Text> }
                            </LinearGradient>
                        </TouchableHighlight>;
            break;
            case "default" :
                elem =  <TouchableHighlight style={[this.props.disabled ? Input.btnDisabled : Input.btnDefault]} onPress={this.props.onClick} underlayColor={this.props.disabled ? '#999' : '#fff'}>
                            {this.props.isSubmit ?  <ActivityIndicator size="small" color="#fff" /> : <Text style={[Input.btnTextDefaul,this.props.disabled ? {color:'#fff'} : null]}>{this.props.text}</Text>}
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