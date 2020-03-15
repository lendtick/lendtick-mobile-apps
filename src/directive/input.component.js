import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text, TouchableHighlight } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import * as _ from 'lodash';
import { Typography, Input } from '@styles';
import moment from 'moment';
import 'moment/locale/id';

// Dependencies
import { connect } from 'react-redux';

// Reducer
// ======================= //
export const inputReducer = (state = {
    isFocus: false,
    arrDate:[],
}, action) => {
	switch (action.type) {
		case 'ON_FOCUS':
			state = {
                ...state,
                isFocus: action.value
            }
        break;
        case 'UPDATE_DATE' :
            state = {
                ...state,
                arrDate: action.arrDate
            }
        break;
	}
	return state;
}

class InputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            now: null
        };
    }

    componentDidMount(){
        let moment = require("moment");
        this.setState({now:moment().format('YYYY-MM-DD')});
    }
    
    render() {
        return (
            <View style={{position:'relative'}}>
                <View style={[Input.wrapInput,{backgroundColor:this.props.disabled ? '#f8f8ff' : '#ffffff'}]}>
                    {this.props.label != null ? <Text style={Typography.label}>{this.props.label}</Text> : null}
                    {this.props.showIcon ? 
                        <TouchableHighlight onPress={this.props.onClickIcon} underlayColor="transparent" style={this.props.label != null ? [Input.icon,{top: 10}] : [Input.icon,{top:8 + this.props.topIcon}]}>
                            <AntDesign name={this.props.iconName} size={18} color={this.props.iconColor}/>
                        </TouchableHighlight> : null}
                    {this.props.isDate ? 

                    <DatePicker
                        style={{width: '100%', marginTop:5,marginBottom:0, height:15}}
                        date={this.props.value}
                        mode="date"
                        placeholder={this.props.placeholder}
                        format="DD MMM YYYY"
                        minDate={moment().subtract(60, 'years').toDate()}
                        maxDate={moment().subtract(15, 'years').toDate()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                display: 'none'
                            },
                            dateInput: {
                                marginLeft: 0,
                                padding:0,
                                borderWidth:0,
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                            }
                        }}
                        onDateChange={this.props.onChange}
                    />

                    :
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder={this.props.placeholder}
                        placeholderTextColor="#9f9f9f"
                        style={Input.inputText}
                        onFocus={() => this.props.onFocus(true)}
                        onBlur={() => this.props.onFocus(false)}
                        onChangeText={this.props.onChange}
                        value={this.props.value}
                        keyboardType={this.props.keyboardType}
                        isButton={this.props.isButton}
                        secureTextEntry={this.props.secureTextEntry}
                    />
                    }
                    {this.props.isButton ? <TouchableHighlight style={Input.highlight} onPress={this.props.onClickBtn} underlayColor="transparent"><Text></Text></TouchableHighlight> : null}
                </View>
                {this.props.disabled ? <View style={{position:'absolute',left:0,top:0,width:'100%',height: '100%', opacity:0.5,backgroundColor:'#ffffff'}} /> : null}
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
    dateName: PropTypes.string,
    onChange: PropTypes.func,
    onClickIcon: PropTypes.func,
    showIcon: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    isButton: PropTypes.bool,
    isDate: PropTypes.bool,
    keyboardType: PropTypes.string,
    topIcon: PropTypes.number,
    disabled: PropTypes.bool
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
    isDate: false,
    keyboardType: 'default',
    topIcon: 0,
    disabled: false
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
        onChangeDate: (arrDate) =>{
            dispatch({
				type: 'UPDATE_DATE',
				arrDate: arrDate
			})
        }
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InputComponent);