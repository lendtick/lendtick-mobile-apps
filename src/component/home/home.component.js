import React from 'react';
import { ScrollView,View,Text,Dimensions,TouchableHighlight,Platform,ActivityIndicator,Alert } from 'react-native';
import { Permissions } from 'expo';
import { SafeAreaView } from 'react-navigation';
import { Col,Grid, Row } from "react-native-easy-grid";
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import AutoHeightImage from 'react-native-auto-height-image';

import { HeaderSearch, BannerComponent, ItemProduct } from '@directives';
import { Variable } from '@styles';
import { styles } from './home.style';
import truncate from 'lodash/truncate';
import homeService from './home.service';

class HomeComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Home",
        headerTitleStyle: Variable.headerTitleStyle,
    });
    constructor(props) {
        super(props);
        this.state = { 
            notification: null,
            loading: false,
            entries:[],
            productsPopular:[
                {id: "01", title: "Jaket merah", category:"Jacket", price: 14500, src:require("@assets/img/product/img01.jpg")},
                {id: "02", title: "Kemeja Gaya", category:"Baju", price: 15000, src:require("@assets/img/product/img02.jpg")},
                {id: "03", title: "Kemeja Putih Kondangan", category:"Baju", price: 14500, src:require("@assets/img/product/img03.jpg")},
            ],
            productsRecomended: [
                {id: "01", title: "Tas Wanita", category:"Bag", price: 14500, src:require("@assets/img/product/img04.jpg")},
                {id: "02", title: "Sepati Anti Paku", category:"Shoes", price: 15000, src:require("@assets/img/product/img05.jpg")},
                {id: "03", title: "Tas Wanita Coklat", category:"Bag", price: 14500, src:require("@assets/img/product/img06.jpg")},
            ]
        };
    }

    componentWillMount(){
        if(this.props.personal.data == null) this.fetchUser();
        this.fetchContent();

        const status = Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
    }

    fetchUser(){
        homeService.getInfoUser().then(res =>{
            this.props.setGetData(res['data']);
        }, err =>{
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchUser()}],
                {cancelable: false},
            );
        });
    }

    fetchContent(){
        this.setState({loading: true});
        let arrContent = [];
        homeService.getImageContent().then(res =>{
            res.data.map((x)=>{
                let obj = {
                    id: x.id_content,
                    title: x.title,
                    src: {uri: x.image_path}
                };
                arrContent.push(obj);
            });
            this.setState({
                entries: arrContent,
                loading: false
            });
        }, err =>{
            this.setState({loading: false});
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchUser()}],
                {cancelable: false},
            );
        });
    }

    _handleNotification = (notification) => {
        this.setState({notification: notification});
    };

    render() { 
        return(
            <SafeAreaView>
                <View style={styles.wrapper}>
                    <ScrollView>
                        
                        {/* Start Header */}
                        <HeaderSearch onClickCart={()=> this.props.navigation.navigate('Payment')}/>
                        {/* End Header */}

                        {/* Start Banner */}
                        {this.state.loading ? 
                        <ActivityIndicator size="small" color="#333" style={{marginBottom:15, marginTop:30}}/> :
                        <View style={styles.wrapSlider}>
                            <BannerComponent data={this.state.entries} height={180}/>
                        </View>}
                        {/* End Banner */}

                        {/* Start Wrap Service */}
                        <View style={styles.wrapService}>
                            <Grid>
                                <Row>
                                    <Col style={styles.itemProduct}>
                                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('Pulsa')} underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item9.png')} />
                                        </TouchableHighlight>
                                    </Col>
                                    <Col style={styles.itemProduct}>
                                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('PaketData')} underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item2.png')} />
                                        </TouchableHighlight>
                                    </Col>
                                    <Col style={styles.itemProduct}>
                                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('Listrik')} underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item8.png')} />
                                        </TouchableHighlight>
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col style={styles.itemProduct}>
                                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('ListProduct')} underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item4.png')} />
                                        </TouchableHighlight>
                                    </Col>
                                    <Col style={styles.itemProduct}>
                                        <TouchableHighlight onPress={()=> console.log("Service")} underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item3.png')} />
                                        </TouchableHighlight>
                                    </Col>
                                    <Col style={styles.itemProduct}>
                                        <TouchableHighlight onPress={()=> console.log("Service")} underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item6.png')} />
                                        </TouchableHighlight>
                                    </Col>
                                </Row> */}
                            </Grid>
                         </View>
                        {/* End Wrap Service */}

                        {/* Start Grid */} 
                        {/* <Grid style={styles.wrapAdds}>
                            <Row>
                                <Col style={ Platform.OS === 'ios' ? {paddingRight:15,paddingLeft: 15} : {paddingLeft: 15,paddingRight:0}}>
                                    <TouchableHighlight onPress={() => console.log('aweu')} underlayColor="transparent">
                                        <AutoHeightImage width={(Dimensions.get('window').width * 0.5) - 15} source={require('@assets/img/adds/img01.jpg')}/>
                                    </TouchableHighlight>
                                </Col>
                                <Col style={Platform.OS === 'ios' ? {paddingLeft:15,paddingRight:15} : {paddingLeft:30,paddingRight:15}}>
                                    <Row>
                                        <TouchableHighlight onPress={() => console.log('aweu')} style={{marginBottom:14.5}} underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width * 0.5) - 30} source={require('@assets/img/adds/img02.jpg')}/>
                                        </TouchableHighlight>
                                    </Row>
                                    <Row>
                                        <TouchableHighlight onPress={() => console.log('aweu')} underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width * 0.5) - 30} source={require('@assets/img/adds/img03.jpg')}/>
                                        </TouchableHighlight>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{paddingLeft:15}}>
                                    <TouchableHighlight onPress={() => console.log('aweu')} style={{marginTop: 15}} underlayColor="transparent">
                                        <AutoHeightImage width={Dimensions.get('window').width - 30} source={require('@assets/img/adds/img04.jpg')}/>
                                    </TouchableHighlight>
                                </Col>
                            </Row>
                        </Grid> */}
                        {/* End Grid */}

                        {/* ====== START POPULAR PRODUCT ====== */}
                        {/* <View style={{marginTop: -5, paddingLeft: 15, paddingBottom: 30}}>
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
                        </View> */}
                        {/* ====== END POPULAR PRODUCT ====== */}

                        {/* ====== START RECOMENDED PRODUCT ====== */}
                        {/* <View style={{paddingLeft: 15,backgroundColor:"#ffffff", paddingTop: 30, paddingBottom: 30}}>
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
                        </View> */}
                        {/* ====== END RECOMENDED PRODUCT ====== */}
                    </ScrollView>
                </View>
            </SafeAreaView>
        ) 
    }
}

const mapStateToProps = (state) => {
	return {
        personal: state.personal
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setGetData: (e) => {
			dispatch({
				type: 'UPDATE_DATA_PERSONAL',
				data: e
			})
        },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeComponent)