import React from 'react';
import { View,Text,Image } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";

import { Component,Typography,Variable} from '../../styles/index';
import { styles } from './product.style';

class ProductSpesificationComponent extends React.Component {
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

                <View style={[Component.container,{marginTop:-15,paddingBottom:15}]}>
                    <View style={[Component.wrapInfo,{paddingBottom:5}]}>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Merk</Text>
                            <Text style={Typography.label}>ALEXANDRE CHRISTIE</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Warna</Text>
                            <Text style={Typography.label}>Bulao</Text>
                        </View>
                        <View>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Jenis Barang</Text>
                            <Text style={Typography.label}>Bekas</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default ProductSpesificationComponent;