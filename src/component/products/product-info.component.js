import React from 'react';
import { View,Text,Image } from 'react-native';
import Dimensions from 'Dimensions';
import { Col, Grid } from "react-native-easy-grid";
import Carousel from 'react-native-snap-carousel';
import truncate from 'lodash/truncate';
import StarRating from 'react-native-star-rating';
import Feather from 'react-native-vector-icons/Feather';

import { BannerComponent,ItemProduct } from '@directives';
import { Typography,Variable} from '@styles';
import { styles } from './product.style';

class ProductInfoComponent extends React.Component {

    onStarRatingPress(rating) {
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
                <View style={styles.WrapDescProduct}>
                    <View style={styles.descProduct}>
                        <Text style={[Typography.heading5,{marginBottom:0,padding:15}]}>
                            Jam pria Alexandre Christie Model number AC999 Silver Black
                        </Text>
                        <View style={{borderBottomWidth:1,borderTopWidth:1,borderColor:'#efefef',padding:15}}>
                            <Grid>
                                <Col><Text style={Typography.label}>Harga</Text></Col>
                                <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>Rp. 1.450.000</Text></Col>
                            </Grid>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef',padding:15}}>
                            <Grid>
                                <Col><Text style={Typography.label}>Uang Muka</Text></Col>
                                <Col><Text style={[Typography.singleText,{textAlign:'right'}]}>Rp. 450.000</Text></Col>
                            </Grid>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef',padding:15}}>
                            <Grid>
                                <Col><Text style={Typography.label}>Dijual oleh</Text></Col>
                                <Col><Text style={[Typography.singleText,{textAlign:'right',color:Variable.colorPrimary}]}>BLIBLI.COM</Text></Col>
                            </Grid>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef',padding:15}}>
                            <Grid>
                                <Col style={{width:Dimensions.get('window').width - 135}}><Text style={Typography.label}>Rating</Text></Col>
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
                    </View>
                </View>
                {/* ====== START INFO ====== */}

                {/* ====== START ATTRIBUTES ====== */}
                <View style={{marginTop:15,marginBottom:15,paddingLeft:7.5,paddingRight:7.5}}>
                    <Text style={[Typography.singleTitle,{paddingLeft:7.5}]}>Garansi</Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={styles.itemAttribute}>
                            <Text style={styles.textAttribute}>1 Tahun</Text>
                        </View>
                        <View style={styles.itemAttribute}>
                            <Text style={styles.textAttribute}>3 Tahun</Text>
                        </View>
                    </View>

                    <Text style={[Typography.singleTitle,{paddingLeft:7.5}]}>Warna</Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={styles.itemAttribute}>
                            <Text style={styles.textAttribute}>Silver</Text>
                        </View>
                        <View style={styles.itemAttribute}>
                            <Text style={styles.textAttribute}>Green</Text>
                        </View>
                        <View style={styles.itemAttribute}>
                            <Text style={styles.textAttribute}>Red</Text>
                        </View>
                    </View>
                </View>
                {/* ====== END ATTRIBUTES ====== */}

                {/* ====== START INFO ====== */}
                <Grid style={{backgroundColor:'white',borderTopWidth:1,borderColor:'#efefef'}}>
                    <Col style={{borderRightWidth:1,borderColor:'#efefef',padding:15, width:'33.3%'}}>
                        <Image style={{width:50,height:50,left:'50%',marginLeft:-25}} source={require('@assets/img/product/features/img01.png')} />
                        <Text style={[Typography.singleText,{textAlign:'center',marginTop:10}]}>Retur Mudah</Text>
                    </Col>
                    <Col style={{borderRightWidth:1,borderColor:'#efefef',padding:15, width:'33.3%'}}>
                        <Image style={{width:50,height:50,left:'50%',marginLeft:-25}} source={require('@assets/img/product/features/img02.png')} />
                        <Text style={[Typography.singleText,{textAlign:'center',marginTop:10}]}>Pembayaran Aman</Text>
                    </Col>
                    <Col style={{padding:15, width:'33.3%'}}>
                        <Image style={{width:50,height:50,left:'50%',marginLeft:-25}} source={require('@assets/img/product/features/img03.png')} />
                        <Text style={[Typography.singleText,{textAlign:'center',marginTop:10}]}>Kualitas Terjamin</Text>
                    </Col>
                </Grid>
                {/* ====== END INFO ====== */}    
                
                <Image style={[styles.line,{marginBottom:-15}]} source={require('@assets/img/bg/line.png')} />

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