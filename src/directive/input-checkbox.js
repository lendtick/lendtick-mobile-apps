import React from 'react';
import { TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';
import { Variable } from '@styles';

class InputCheckbox extends React.Component {
    render() {
        return (
            <TouchableHighlight onPress={this.props.onChange} style={{position:'relative'}} underlayColor="transparent">
                {this.props.checked ? <AntDesign name="checksquareo" size={20} color={Variable.colorPrimaryText} /> : <AntDesign name="closesquareo" style={this.props.textRight ? {textAlign:'right'} : null} size={20} color={Variable.colorPrimaryText} />}
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
    checked: false
}


export default InputCheckbox;