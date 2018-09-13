import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text, TouchableHighlight } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

// Style
import { Typography, Input } from '../styles/index';

// Dependencies
import { connect } from 'react-redux';

// Reducer
// ======================= //
export const inputReducer = (state = {isFocus: false}, action) => {
	switch (action.type) {
		case 'ON_FOCUS':
			state = {
                ...state,
                isFocus: action.value
            }
        break;
	}
	return state;
}

class InputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    
    render() {
        return (
            <View style={this.props.label != null ? Input.wrapInput : [Input.wrapInput,{marginBottom:0}]}>
                {this.props.label != null ? <Text style={Typography.label}>{this.props.label}</Text> : null}
                {this.props.showIcon ? <Feather name={this.props.iconName} size={18} color={this.props.iconColor} style={this.props.label != null ? [Input.icon,{top: 39.5 + this.props.topIcon}] : [Input.icon,{top:8 + this.props.topIcon}]}/> : null}
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder={this.props.placeholder}
                    placeholderTextColor="#d0d0d0"
                    style={Input.inputText}
                    onFocus={() => this.props.onFocus(true)}
                    onBlur={() => this.props.onFocus(false)}
                    onChangeText={this.props.onChange}
                    value={this.props.value}
                    keyboardType={this.props.keyboardType}
                    isButton={this.props.isButton}
                    secureTextEntry={this.props.secureTextEntry}
                />
                {this.props.isButton ? <TouchableHighlight style={Input.highlight} onPress={this.props.onClickBtn} underlayColor="transparent"><Text></Text></TouchableHighlight> : null}
            </View>
        );
    }
}

InputComponent.propTypes = {
    label: PropTypes.string,
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    showIcon: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    isButton: PropTypes.bool,
    keyboardType: PropTypes.string,
    topIcon: PropTypes.number
};

InputComponent.defaultProps = {
    label: 'Label Name',
    iconName: 'user',
    iconColor: '#b6c4e4',
    placeholder: 'Placeholder Name',
    value: null,
    showIcon: true,
    secureTextEntry: false,
    isButton: false,
    keyboardType: 'default',
    topIcon: 0
}


const mapStateToProps = (state) => {
	return {
		input: state.input
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		onFocus: (event) => {
			dispatch({
				type: 'ON_FOCUS',
				value: event
			})
        },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InputComponent);