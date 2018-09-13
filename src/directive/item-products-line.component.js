import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { Col, Row, Grid } from "react-native-easy-grid";
import PropTypes from 'prop-types';
import { Variable,Typography } from '../styles/index';

class ItemProductLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <TouchableHighlight onPress={this.props.onClick} underlayColor="transparent">
                <View style={[styles.item,{width:this.props.width}]}>
                    <Grid>
                        <Col style={{width:120}}>
                            <AutoHeightImage style={styles.imgStyle} width={120} source={this.props.imgSrc}/>
                        </Col>
                        <Col style={styles.content}>
                            <Text style={styles.title}>{this.props.title}</Text>
                            <Text style={styles.category}>{this.props.category}</Text>
                            <Grid>
                                <Row style={{marginBottom:0,marginTop:10}}>
                                    <Col style={{width:50}}><Text style={Typography.singleText}>Harga</Text></Col>
                                    <Col style={{width:5}}><Text style={{textAlign:'center',color:Variable.colorContent}}>:</Text></Col>
                                    <Col><Text style={styles.price}> Rp {this.props.price.toLocaleString()}</Text></Col>
                                </Row>
                                <Row>
                                    <Col style={{width:50}}><Text style={Typography.singleText}>DP</Text></Col>
                                    <Col style={{width:5}}><Text style={{textAlign:'center',color:Variable.colorContent}}>:</Text></Col>
                                    <Col><Text style={[Typography.singleText,{fontSize:12}]}> Rp {this.props.price2.toLocaleString()}</Text></Col>
                                </Row>
                            </Grid>
                        </Col>
                    </Grid>
                </View>
            </TouchableHighlight>
        );
    }
}

ItemProductLine.propTypes = {
    title: PropTypes.string,
    category: PropTypes.string,
    imgSrc: PropTypes.number,
    width: PropTypes.number,
    price: PropTypes.number,
    price2: PropTypes.number,
    onClick: PropTypes.func,
};

const styles = StyleSheet.create({
    item:{
        borderWidth: 1,
        borderColor: '#efefef',
        ...Variable.boxShadow,
        borderRadius: Variable.borderRadius,
        marginBottom: 15,
        backgroundColor: '#ffffff',
    },
    content:{
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    title:{
        color: Variable.colorTitle,
        fontWeight: '700',
        marginTop: 5,
        marginBottom: 3
    },
    category: {
        color: Variable.colorContent,
        fontSize: 12,
        marginBottom: 8,
    },
    price: {
        color: Variable.colorPrimary,
        fontWeight: '700',
    },
    imgStyle:{
        borderRightWidth: 1,
        borderColor: '#efefef'
    },
});

export default ItemProductLine;