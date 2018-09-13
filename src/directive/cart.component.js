import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Component } from '../styles/index';

class CartDirective extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    
    render() {
        return (
            <View style={Component.cartHeader}>
                <View  style={Component.countCartHeader}><Text style={Component.countCartHeaderText}>3</Text></View>
                <Feather name="shopping-cart" size={20} color="#6a6a6a" />
            </View>
        );
    }
}

export default CartDirective;