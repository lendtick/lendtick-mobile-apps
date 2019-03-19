import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View,Text,Platform} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import RNPickerSelect from 'react-native-picker-select';
import * as _ from 'lodash';
import { Typography, Input,Variable } from '@styles';

class InputDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            now: null
        };
    }

    render() {
        const placeholder = {
            label: this.props.placeholder,
            value: null
        };

        return (
            <View style={this.props.label != null ? Input.wrapInput : [Input.wrapInput,{marginBottom:0}]}>
                {this.props.label != null ? <Text style={[Typography.label,{marginBottom:5}]}>{this.props.label}</Text> : null}
                {this.props.showIcon ? <Feather name={this.props.iconName} size={18} color={this.props.iconColor} style={this.props.label != null ? [Input.icon,{top: 10}] : [Input.icon,{top:8 + this.props.topIcon}]}/> : null}
                <RNPickerSelect
                    placeholder={placeholder}
                    items={this.props.items}
                    onValueChange={this.props.onChange}
                    value={this.props.value}
                    style={Platform.OS === 'ios' ? Input.inputText : Input.inputTextDropdown}
                    placeholderTextColor={Variable.colorContent}
                />
            </View>
        );
    }
}

InputDropdown.propTypes = {
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

InputDropdown.defaultProps = {
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


export default InputDropdown;