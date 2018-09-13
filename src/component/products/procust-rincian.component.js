import React from 'react';
import { View,Text,Image } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";

import { Component,Typography} from '../../styles/index';
import { styles } from './product.style';

class ProductRincianComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View>
                <View style={[Component.container,{paddingTop:30,paddingBottom:15}]}>
                    <Grid>
                        <Col style={{width:115}}>
                            <Image style={styles.imgThumb} source={require('../../../assets/product/img07.jpg')} />
                        </Col>
                        <Col>
                            <Text style={Typography.heading6}>Jam pria Alexandre Christie Model number AC999 Silver Black</Text>
                            <Text style={Typography.singleText}>Harga Rp. 1.450.000</Text>
                            <Text style={Typography.singleText}>Uang Muka Rp. 450.000</Text>
                        </Col>
                    </Grid>
                </View>

                <Image style={[styles.line,{marginTop:15}]} source={require('../../../assets/bg/line.png')} />

                <View style={[Component.container,{paddingTop:15,paddingBottom:15}]}>
                    <Text style={Typography.heading6}>Deskripsi Produk</Text>
                    <Text style={[Typography.singleText,{marginBottom:15}]}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, 
                    </Text>
                    <Text style={Typography.singleText}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                    </Text>
                </View>
            </View>
            
        );
    }
}

export default ProductRincianComponent;