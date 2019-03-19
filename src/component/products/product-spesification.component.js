import React from 'react';
import { View,Text,Image } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";

import { Typography} from '@styles';
import { styles } from './product.style';
import { Variable } from '@styles';

class ProductSpesificationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={{padding:15,backgroundColor:'#f8f8ff'}}>
                <View style={{marginBottom:15,borderWidth:1,borderColor:'#efefef',backgroundColor:'#ffffff',borderRadius:4,...Variable.boxShadow}}>
                    <Grid>
                        <Col style={{width:100}}>
                            <Image style={styles.imgThumb} source={require('../../../assets/img/product/img07.jpg')} />
                        </Col>
                        <Col style={{padding:15}}>
                            <Text style={Typography.heading6}>Jam pria Alexandre Christie Model number AC999 Silver Black</Text>
                        </Col>
                    </Grid>
                    <View style={{borderBottomWidth:1,borderTopWidth:1,borderColor:'#efefef',padding:15}}>
                        <Grid>
                            <Col><Text style={Typography.label}>Harga</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>Rp. 1.450.000</Text></Col>
                        </Grid>
                    </View>
                    <View style={{padding:15,borderBottomWidth:1,borderColor:'#efefef'}}>
                        <Grid>
                            <Col><Text style={Typography.label}>Uang Muka</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>Rp. 450.000</Text></Col>
                        </Grid>
                    </View>
                </View>

                <View style={{borderWidth:1,borderColor:'#efefef',backgroundColor:'#ffffff',borderRadius:4,...Variable.boxShadow}}>
                    <Text style={[Typography.heading6,{padding:15,marginBottom:0}]}>Spesifikasi</Text>
                    <View style={{borderBottomWidth:1,borderTopWidth:1,borderColor:'#efefef',padding:15}}>
                        <Grid>
                            <Col><Text style={Typography.label}>Merek</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>G-Tas</Text></Col>
                        </Grid>
                    </View>
                    <View style={{padding:15,borderBottomWidth:1,borderColor:'#efefef'}}>
                        <Grid>
                            <Col><Text style={Typography.label}>Ukuran</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>37</Text></Col>
                        </Grid>
                    </View>
                    <View style={{padding:15,borderBottomWidth:1,borderColor:'#efefef'}}>
                        <Grid>
                            <Col><Text style={Typography.label}>Stock</Text></Col>
                            <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>Available</Text></Col>
                        </Grid>
                    </View>
                </View>
            </View>
        );
    }
}

export default ProductSpesificationComponent;