import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import PropTypes from 'prop-types';
import { Variable } from '@styles';

class ItemProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <TouchableHighlight onPress={this.props.onClick} underlayColor="transparent">
                <View style={{width:this.props.width}}>
                    <View style={[styles.wrapImgStyle,{width:this.props.width}]}>
                        <AutoHeightImage style={styles.imgStyle} width={this.props.width} source={this.props.imgSrc}/>
                    </View>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.category}>{this.props.category}</Text>
                    <Text style={styles.price}>Rp {accounting.formatMoney(this.props.price, "", 0, ",", ",")}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

ItemProduct.propTypes = {
    title: PropTypes.string,
    category: PropTypes.string,
    imgSrc: PropTypes.number,
    width: PropTypes.number,
    price: PropTypes.number,
    onClick: PropTypes.func,
};

const styles = StyleSheet.create({
    title:{
        color: Variable.colorTitle,
        fontWeight: '700',
        fontFamily: Variable.fontBold,
        marginTop: 5,
        marginBottom: 3
    },
    category: {
        color: Variable.colorContent,
        fontSize: 12,
        fontFamily: Variable.fontRegular,
    },
    price: {
        color: Variable.colorPrimary,
        fontWeight: '700',
        fontFamily: Variable.fontRegular,
    },
    imgStyle:{
        borderRadius: Variable.borderRadius,
        borderWidth: 1,
        borderColor: '#efefef'
    },
    wrapImgStyle:{
        borderRadius: Variable.borderRadius,
        ...Variable.boxShadow
    }
});

export default ItemProduct;