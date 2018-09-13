import React from 'react';
import { View,Text,Image } from 'react-native';
import Dimensions from 'Dimensions';
import { Col, Row, Grid } from "react-native-easy-grid";
import Carousel from 'react-native-snap-carousel';
import truncate from 'lodash/truncate';
import StarRating from 'react-native-star-rating';

import { BannerComponent,AlertBox,ItemProduct } from '../../directive/index';
import { Component,Typography,Variable} from '../../styles/index';
import { styles } from './product.style';

class ProductInfoComponent extends React.Component {

    onStarRatingPress(rating) {
        console.log(rating);
    }

    _renderItemProduct ({item, index}) {
        return (
            <View style={{paddingRight: 15}}>
                <ItemProduct 
                    imgSrc={item.src}
                    width={115}
                    title={truncate(item.title,{
                        'length': 15,
                        'separator': '...'
                    })}
                    category={item.category}
                    price={item.price}
                    onClick={()=> console.log('Aweu')}
                />
            </View>
        );
    }

    render() {
        return (
            <View>
                {/* ====== START WRAP IMAGES ====== */}
                <View style={styles.wrapSlider}>
                    <BannerComponent data={this.props.data} height={220} autoplay={false} loop={false} aligment="center"/>
                </View>
                {/* ====== END WRAP IMAGES ====== */}

                {/* ====== START INFO ====== */}
                <View style={styles.descProduct}>
                    <Text style={Typography.heading5}>Jam pria Alexandre Christie Model number AC999 Silver Black</Text>
                    <Text style={[Typography.singleText,{marginBottom:5}]}>Harga Rp. 1.450.000</Text>
                    <Text style={[Typography.singleText,{marginBottom:25}]}>Uang Muka Rp. 450.000</Text>

                    <AlertBox 
                        type="info" 
                        title="Pengiriman dalam 24 Jam"
                        text="Gratis ongkir"
                    /> 
                </View>
                {/* ====== START INFO ====== */}

                <Image style={[styles.line,{marginTop:15}]} source={require('../../../assets/bg/line.png')} />

                {/* ====== START ATTRIBUTES ====== */}
                <View style={[Component.container,{marginTop:15,marginBottom:15}]}>
                    <Text style={Typography.singleTitle}>Warna</Text>
                    <Grid>
                        <Row style={{marginLeft:-7.5,marginRight:-7.5}}>
                            <Col>
                                <View style={styles.itemAttribute}>
                                    <Text style={styles.textAttribute}>Cokelat</Text>
                                </View>
                            </Col>
                            <Col>
                                <View style={styles.itemAttribute}>
                                    <Text style={styles.textAttribute}>Abu</Text>
                                </View>
                            </Col>
                        </Row>
                    </Grid>

                    <Text style={Typography.singleTitle}>Garansi</Text>
                    <Grid>
                        <Row style={{marginLeft:-7.5,marginRight:-7.5}}>
                            <Col style={{width:'50%'}}>
                                <View style={styles.itemAttribute}>
                                    <Text style={styles.textAttribute}>1 Tahun</Text>
                                </View>
                            </Col>
                        </Row>
                    </Grid>
                </View>
                {/* ====== END ATTRIBUTES ====== */}

                {/* ====== START INFO ====== */}
                <View style={[Component.container,{borderTopWidth:1, borderColor: '#efefef',paddingBottom:15,paddingTop:15}]}>
                    <Grid>
                        <Col><Text style={Typography.singleText}>DIJUAL OLEH</Text></Col>
                        <Col><Text style={[Typography.singleText,{color:Variable.colorPrimaryText,textAlign:'right'}]}>BLIBLI.COM</Text></Col>
                    </Grid>
                </View>
                <View style={[Component.container,{borderTopWidth:1, borderColor: '#efefef',paddingBottom:15,paddingTop:15}]}>
                    <Grid>
                        <Col style={{width:Dimensions.get('window').width - 105}}><Text style={Typography.singleText}>Rating</Text></Col>
                        <Col>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={3.5}
                                starSize={15}
                                fullStarColor={'#f1c40f'}
                                selectedStar={(rating) => console.log(rating)}
                            />
                        </Col>
                    </Grid>
                </View>
                {/* ====== END INFO ====== */}    
                
                <Image style={[styles.line,{marginBottom:-15}]} source={require('../../../assets/bg/line.png')} />

                {/* ====== START RECOMENDED PRODUCT ====== */}
                <View style={{marginTop: 30, paddingLeft: 15, marginBottom:15}}>
                    <Text style={{marginBottom:15,fontWeight:'700',color:Variable.colorTitle,fontSize:18}}>Produk terkait</Text>
                    <Carousel
                        activeSlideAlignment="start"
                        loop={true}
                        ref={(b) => { this._carousel = b; }}
                        data={this.props.dataMoreProduct}
                        renderItem={this._renderItemProduct}
                        sliderWidth={Dimensions.get('window').width - 15}
                        itemWidth={130}
                        inactiveSlideScale={1}
                        inactiveSlideOpacity={1}
                        />
                </View>
                {/* ====== END RECOMENDED PRODUCT ====== */}
            </View>
        );
    }
}

export default ProductInfoComponent;