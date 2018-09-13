import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { Component, Input } from '../styles/index';

const Modal = (props) => {
    if(props.isOpen){
        return (
            <View style={Component.modalWrap}>
                <View style={Component.modalOverlay}></View>
                <View style={[Component.modalContent,{width: props.width}]}>
                    {props.title != null ? <View style={Component.modalHeader}>
                        <Text style={Component.modalTitle}>{props.title}</Text>
                        </View> : null}
                    
                    <View style={[{height:200},props.contentStyle,{height: props.height}]}>
                        <ScrollView ref={props.refs !== undefined ? props.refs : null}>
                            {props.children}
                        </ScrollView>
                    </View>

                    <View style={Component.modalFooter}>
                        {props.textLeft != null ? <TouchableHighlight onPress={props.leftClick} style={props.textRight != null ? [Component.btnModal,{borderRightWidth: 1,borderColor: '#eee'}] : [Component.btnModal,{width:'100%'}]} underlayColor="#fafafa">
                            <Text style={Component.btnTextModal}>
                                {props.textLeft}
                            </Text>
                        </TouchableHighlight> : null}
                        {props.textRight != null ? <TouchableHighlight onPress={props.rightClick} style={props.textLeft != null ? [Component.btnModal,{borderLeftWidth: 1,borderColor: '#eee'}] : [Component.btnModal,{width:'100%'}]} underlayColor="#fafafa">
                            <Text style={ props.enabledSubmit || props.enabledSubmit === undefined ? [Component.btnTextModal,Component.btnModalPrimary] : [Component.btnTextModal, {backgroundColor: '#eee'}]}>
                                {props.textRight}
                            </Text>
                        </TouchableHighlight> : null }
                    </View>
                </View>
            </View>
        );
    }else{
        return (null);
    }
}

Modal.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    title: PropTypes.string,
    contentStyle: PropTypes.object,
    textLeft: PropTypes.string,
    leftClick: PropTypes.func,
    textRight: PropTypes.string,
    rightClick: PropTypes.func,
    enabledSubmit: PropTypes.bool
}

Modal.defaultProps = {
    width: 300,
    height: 200,
    title: 'Title',
    contentStyle: null,
    children: null,
    textLeft: 'Cancel',
    textRight: 'Ok',
    enabledSubmit: true
}

export default Modal;