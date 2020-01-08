import React from 'react';
import { TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import Feather from 'react-native-vector-icons/Feather';
=======
import { AntDesign } from '@expo/vector-icons';
>>>>>>> master
import { Variable } from '@styles';

class InputCheckbox extends React.Component {
    render() {
        return (
            <TouchableHighlight onPress={this.props.onChange} style={{position:'relative'}} underlayColor="transparent">
<<<<<<< HEAD
                {this.props.checked ? <Feather name="check-square" size={20} color={Variable.colorPrimaryText} /> : <Feather name="square" style={this.props.textRight ? {textAlign:'right'} : null} size={20} color={Variable.colorPrimaryText} />}
=======
                {this.props.checked ? <AntDesign name="checksquareo" size={20} color={Variable.colorPrimaryText} /> : <AntDesign name="closesquareo" style={this.props.textRight ? {textAlign:'right'} : null} size={20} color={Variable.colorPrimaryText} />}
>>>>>>> master
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