import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View,Text,Platform} from 'react-native';
<<<<<<< HEAD
import Feather from 'react-native-vector-icons/Feather';
=======
import { AntDesign } from '@expo/vector-icons';
>>>>>>> master
import { TextInputMask } from 'react-native-masked-text';
import * as _ from 'lodash';
import { Typography, Input,Variable } from '@styles';

class InputMask extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{position:'relative'}}>
                <View style={[Input.wrapInput,{backgroundColor:this.props.disabled ? '#f8f8ff' : '#ffffff'}]}>
                    {this.props.label != null ? <Text style={[Typography.label,{marginBottom:5}]}>{this.props.label}</Text> : null}
<<<<<<< HEAD
                    {this.props.showIcon ? <Feather name={this.props.iconName} size={18} color={this.props.iconColor} style={this.props.label != null ? [Input.icon,{top: 10}] : [Input.icon,{top:8 + this.props.topIcon}]}/> : null}
=======
                    {this.props.showIcon ? <AntDesign name={this.props.iconName} size={18} color={this.props.iconColor} style={this.props.label != null ? [Input.icon,{top: 10}] : [Input.icon,{top:8 + this.props.topIcon}]}/> : null}
>>>>>>> master
                    <TextInputMask
                        type={'money'}
                        placeholder={this.props.placeholder}
                        options={{
                            precision: 0,
                            separator: ',',
                            delimiter: ',',
                            unit: 'Rp ',
                            suffixUnit: ''
                        }}
                        style={Input.inputText}
                        value={this.props.value}
                        onChangeText={this.props.onChange}
                    />
                </View>
                {this.props.disabled ? <View style={{position:'absolute',left:0,top:0,backgroundColor:'#fff',width:'100%',height: '100%', opacity:0.7}} /> : null}
            </View>
        );
    }
}

InputMask.propTypes = {
    label: PropTypes.string,
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    showIcon: PropTypes.bool,
    topIcon: PropTypes.number,
    disabled: PropTypes.bool
};

InputMask.defaultProps = {
    label: 'Label Name',
    iconName: 'user',
    iconColor: '#b6c4e4',
    placeholder: 'Placeholder Name',
    value: null,
    showIcon: true,
    topIcon: 0,
    disabled: false
}


export default InputMask;