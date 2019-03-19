import React from 'react';
import { View,Text,Image,Dimensions } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";

import { Main,Typography, Variable} from '@styles';
import { styles } from './product.style';

class ProductRincianComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={{backgroundColor:'#ffffff',minHeight:Dimensions.get('window').height - 220}}>
                <View style={{padding:15,backgroundColor:'#f8f8ff'}}>
                    <View style={{borderWidth:1,borderColor:'#efefef',backgroundColor:'#ffffff',borderRadius:4,...Variable.boxShadow}}>
                        <Grid>
                            <Col style={{width:100}}>
                                <Image style={styles.imgThumb} source={require('@assets/img/product/img07.jpg')} />
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
                        <View style={{padding:15}}>
                            <Grid>
                                <Col><Text style={Typography.label}>Uang Muka</Text></Col>
                                <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>Rp. 450.000</Text></Col>
                            </Grid>
                        </View>
                    </View>
                </View>

                <View style={[Main.container,{paddingTop:15,paddingBottom:15}]}>
                    <Text style={Typography.heading6}>Deskripsi</Text>
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