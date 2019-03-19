import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Main } from '@styles';

const Modal = (props) => {
    if(props.isOpen){
        return (
            <View style={Main.modalWrap}>
                <View style={Main.modalOverlay}></View>
                <View style={[Main.modalContent,{width: props.width}]}>
                    {props.title != null ? <View style={Main.modalHeader}>
                        <Text style={Main.modalTitle}>{props.title}</Text>
                        </View> : null}
                    
                    <View style={[{height:200},props.contentStyle,{height: props.height}]}>
                        <ScrollView ref={props.refs !== undefined ? props.refs : null}>
                            {props.children}
                        </ScrollView>
                    </View>

                    <View style={Main.modalFooter}>
                        {props.textLeft != null ? <TouchableHighlight onPress={props.leftClick} style={props.textRight != null ? [Main.btnModal,{borderRightWidth: 1,borderColor: '#eee'}] : [Main.btnModal,{width:'100%'}]} underlayColor="#fafafa">
                            <Text style={Main.btnTextModal}>
                                {props.textLeft}
                            </Text>
                        </TouchableHighlight> : null}
                        {props.textRight != null ? <TouchableHighlight onPress={props.rightClick} style={props.textLeft != null ? [Main.btnModal,{borderLeftWidth: 1,borderColor: '#eee'}] : [Main.btnModal,{width:'100%'}]} underlayColor="#fafafa">
                            <Text style={ props.enabledSubmit || props.enabledSubmit === undefined ? [Main.btnTextModal,Main.btnModalPrimary] : [Main.btnTextModal, {backgroundColor: '#eee'}]}>
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