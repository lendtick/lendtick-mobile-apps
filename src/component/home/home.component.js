import React from 'react';
import { View, Image, TextInput, TouchableHighlight, Text, ScrollView } from 'react-native';
import Dimensions from 'Dimensions';
import Feather from 'react-native-vector-icons/Feather';
import { Col, Row, Grid } from "react-native-easy-grid";
import Carousel from 'react-native-snap-carousel';
import AutoHeightImage from 'react-native-auto-height-image';
import truncate from 'lodash/truncate';
import { Platform } from 'react-native';

import { BannerComponent,ItemProduct,CartDirective } from '../../directive/index';
import { Component,Typography,Variable } from '../../styles/index';
import { styles } from './home.style';

class HomeComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Home",
        headerStyle: {
            backgroundColor: '#fff',
            overflow: 'hidden',
        },
        headerTintColor: '#3a3a3a',
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: 14,
            color: '#3a3a3a',
            letterSpacing: .5,
            width: Dimensions.get('window').width - 35,
            textAlign: 'center'
        },
        headerRight: (
            <TouchableHighlight onPress={() => navigation.navigate('Shop')} underlayColor="transparent">
                <CartDirective />
            </TouchableHighlight>
        ),
    });

    constructor(props) {
        super(props);
        this.state = { 
            inputSearch: null,
            entries:[
                {id: "01", title: "coba 1", src:require("../../../assets/banner/img01.jpg"), link:""},
                {id: "02", title: "coba 2", src:require("../../../assets/banner/img01.jpg"), link:""},
                {id: "03", title: "coba 3", src:require("../../../assets/banner/img01.jpg"), link:""},
            ],
            productsPopular:[
                {id: "01", title: "Jaket merah", category:"Jacket", price: 14500, src:require("../../../assets/product/img01.jpg")},
                {id: "02", title: "Kemeja Gaya", category:"Baju", price: 15000, src:require("../../../assets/product/img02.jpg")},
                {id: "03", title: "Kemeja Putih Kondangan", category:"Baju", price: 14500, src:require("../../../assets/product/img03.jpg")},
            ],
            productsRecomended: [
                {id: "01", title: "Tas Wanita", category:"Bag", price: 14500, src:require("../../../assets/product/img04.jpg")},
                {id: "02", title: "Sepati Anti Paku", category:"Shoes", price: 15000, src:require("../../../assets/product/img05.jpg")},
                {id: "03", title: "Tas Wanita Coklat", category:"Bag", price: 14500, src:require("../../../assets/product/img06.jpg")},
            ]
        };
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <ScrollView>
                <View style={{paddingTop:30,paddingBottom:15}}>
                
                    {/* ====== START SEARCH ====== */}
                    <View style={Component.container}>
                        <View style={styles.wrapSearch}>
                            <TouchableHighlight style={styles.iconSearch} onPress={() => console.log('ok')} underlayColor="transparent">
                                <Feather name="search" size={20} color="#9f9f9f" />
                            </TouchableHighlight>
                            <TextInput
                                style={[Typography.singleText,styles.inputSingleSearch]}
                                placeholder="Search for product"
                                underlineColorAndroid="transparent"
                                onChangeText={(inputSearch) => this.setState({inputSearch})}
                                value={this.state.inputSearch}
                            />
                        </View>
                    </View>
                    {/* ====== END SEARCH ====== */}

                    {/* ====== START SLIDER ====== */}
                    <View style={styles.wrapSlider}>
                        <BannerComponent data={this.state.entries} height={110}/>
                    </View>
                    {/* ====== END SLIDER ====== */}

                    <View style={Component.container}>
                        {/* ====== START GRID ====== */}
                        <Grid style={styles.listPackage}>
                            <Col>
                                <TouchableHighlight onPress={() => console.log('test')} underlayColor="transparent">
                                    <View>
                                        <Image style={styles.imgPackage} source={require('../../../assets/packages/img01.png')} />
                                        <Text style={styles.textPackage}>Tiket Pesawat</Text>
                                    </View>
                                </TouchableHighlight>
                            </Col>
                            <Col>
                                <TouchableHighlight onPress={() => this.props.navigation.navigate('PaketData')} underlayColor="transparent">
                                    <View>
                                        <Image style={styles.imgPackage} source={require('../../../assets/packages/img02.png')} />
                                        <Text style={styles.textPackage}>Paket Data</Text>
                                    </View>
                                </TouchableHighlight>
                            </Col>
                            <Col>
                                <TouchableHighlight onPress={() => this.props.navigation.navigate('PinjamanTunai')} underlayColor="transparent">
                                    <View>
                                        <Image style={styles.imgPackage} source={require('../../../assets/packages/img03.png')} />
                                        <Text style={styles.textPackage}>Pinjaman Tunai</Text>
                                    </View>
                                </TouchableHighlight>
                            </Col>
                            <Col>
                                <TouchableHighlight onPress={() => this.props.navigation.navigate('Service')} underlayColor="transparent">
                                    <View>
                                        <Image style={styles.imgPackage} source={require('../../../assets/packages/img04.png')} />
                                        <Text style={styles.textPackage}>Semua Layanan</Text>
                                    </View>
                                </TouchableHighlight>
                            </Col>
                        </Grid>
                        {/* ====== END GRID ====== */}

                        {/* ====== START GRID ====== */}
                        <Grid style={styles.wrapAdds}>
                            <Row>
                                <Col style={ Platform.OS === 'ios' ? {paddingRight:15} : {paddingRight:0}}>
                                    <TouchableHighlight onPress={() => this.props.navigation.navigate('ListProduct')} underlayColor="transparent">
                                        <AutoHeightImage width={(Dimensions.get('window').width * 0.5) - 15} source={require('../../../assets/adds/img01.jpg')}/>
                                    </TouchableHighlight>
                                </Col>
                                <Col style={{paddingLeft:15}}>
                                    <Row>
                                        <TouchableHighlight onPress={() => console.log('aweu')} style={{marginBottom:14.5}} underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width * 0.5) - 30} source={require('../../../assets/adds/img02.jpg')}/>
                                        </TouchableHighlight>
                                    </Row>
                                    <Row>
                                        <TouchableHighlight onPress={() => console.log('aweu')} underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width * 0.5) - 30} source={require('../../../assets/adds/img03.jpg')}/>
                                        </TouchableHighlight>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TouchableHighlight onPress={() => console.log('aweu')} style={{marginTop: 15}} underlayColor="transparent">
                                        <AutoHeightImage width={Dimensions.get('window').width - 30} source={require('../../../assets/adds/img04.jpg')}/>
                                    </TouchableHighlight>
                                </Col>
                            </Row>
                        </Grid>
                        {/* ====== END GRID ====== */}
                    </View>

                    {/* ====== START POPULAR PRODUCT ====== */}
                    <View style={{marginTop: 30, paddingLeft: 15}}>
                        <Text style={{marginBottom:15,fontWeight:'700',color:Variable.colorTitle,fontSize:18}}>Popular</Text>
                        <Carousel
                            activeSlideAlignment="start"
                            loop={true}
                            ref={(b) => { this._carousel = b; }}
                            data={this.state.productsPopular}
                            renderItem={({item, index})=>{
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
                                            onClick={()=> this.props.navigation.navigate('ProductDetail')}
                                        />
                                    </View>
                                );
                            }}
                            sliderWidth={Dimensions.get('window').width - 15}
                            itemWidth={130}
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={1}
                            />
                    </View>
                    {/* ====== END POPULAR PRODUCT ====== */}

                    {/* ====== START RECOMENDED PRODUCT ====== */}
                    <View style={{marginTop: 30, paddingLeft: 15, marginBottom:15}}>
                        <Text style={{marginBottom:15,fontWeight:'700',color:Variable.colorTitle,fontSize:18}}>Recomendation</Text>
                        <Carousel
                            activeSlideAlignment="start"
                            loop={true}
                            ref={(b) => { this._carousel = b; }}
                            data={this.state.productsRecomended}
                            renderItem={({item, index})=>{
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
                                            onClick={()=> this.props.navigation.navigate('ProductDetail')}
                                        />
                                    </View>
                                );
                            }}
                            sliderWidth={Dimensions.get('window').width - 15}
                            itemWidth={130}
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={1}
                            />
                    </View>
                    {/* ====== END RECOMENDED PRODUCT ====== */}
                </View>
                </ScrollView>            
            </View>
        );
    }
}

export default HomeComponent;