import React from 'react';
import { TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';
import { Variable } from '../styles/index';

class InputCheckbox extends React.Component {
    render() {
        return (
            <TouchableHighlight onPress={this.props.onChange} style={{position:'relative'}} underlayColor="transparent">
                {this.props.checked ? <Feather name="check-square" style={this.props.alignRight ? {textAlign:'right'} : null} size={20} color={Variable.colorPrimaryText} /> : <Feather name="square" style={this.props.textRight ? {textAlign:'right'} : null} size={20} color={Variable.colorPrimaryText} />}
            </TouchableHighlight>
        );
    }
}

InputCheckbox.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    alignRight: PropTypes.bool,
};

InputCheckbox.defaultProps = {
    checked: false,
    alignRight: false,
}


export default InputCheckbox;