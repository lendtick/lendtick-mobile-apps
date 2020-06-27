import React from 'react';
import { ScrollView,View,Text,Dimensions,TouchableHighlight,Platform,ActivityIndicator,Alert, StatusBar, AsyncStorage} from 'react-native';
import { Constants } from 'expo';
import * as Permissions from 'expo-permissions';
import { SafeAreaView } from 'react-navigation';
import { Col,Grid, Row } from "react-native-easy-grid";
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import AutoHeightImage from 'react-native-auto-height-image';
import watch from 'redux-watch';
import { store } from '@services/store';

import { HeaderSearch, BannerComponent, ItemProduct, HeaderHome } from '@directives';
import { Variable, Typography } from '@styles';
import { styles } from './home.style';
import truncate from 'lodash/truncate';
import homeService from './home.service';

if (Platform.OS === 'android') {
    SafeAreaView.setStatusBarHeight(0);
}

class HomeComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Home",
        headerTitleStyle: Variable.headerTitleStyle,
        headerStyle: {
            elevation:0,
            backgroundColor: '#42A9A0',
            borderBottomWidth: 0,
        },
        headerTintColor: '#ffffff',
    });
    constructor(props) {
        super(props);
        this.state = { 
            notification: null,
            loading: false,
            entries:[],
            entriesMin:[],
            productsPopular:[
                {id: "01", title: "Jaket merah", category:"Jacket", price: 14500, src:require("@assets/img/product/img01.jpg")},
                {id: "02", title: "Kemeja Gaya", category:"Baju", price: 15000, src:require("@assets/img/product/img02.jpg")},
                {id: "03", title: "Kemeja Putih Kondangan", category:"Baju", price: 14500, src:require("@assets/img/product/img03.jpg")},
            ],
            productsRecomended: [
                {id: "01", title: "Tas Wanita", category:"Bag", price: 14500, src:require("@assets/img/product/img04.jpg")},
                {id: "02", title: "Sepati Anti Paku", category:"Shoes", price: 15000, src:require("@assets/img/product/img05.jpg")},
                {id: "03", title: "Tas Wanita Coklat", category:"Bag", price: 14500, src:require("@assets/img/product/img06.jpg")},
            ],
            name : null,
            saldo : null,
        };
    }

    
    componentDidMount() {
        // console.log('addlisten')
        this.props.navigation.addListener('didFocus', this.onScreenFocus)
    }

    onScreenFocus = () => {
        // Screen was focused, our on focus logic goes here
        // console.log('update')
        AsyncStorage.getItem('token').then((token)=>{
            if(token){
                // console.log('token ini : ',token);
                this.fetchUser();
                this.fetchBalance();
            }else {
                // console.log('token ini : ',token);
                this.setState({
                    saldo: null,
                    name: null
                })
            }
        });
        
        // this.forceUpdate()
    }

    componentWillMount(){
        // console.log('BAH DATA: ', this.props.home);
        // if (this.props.home){
        //     this.setState({
        //         name:this.props.home.name
        //     });
        // }
        AsyncStorage.getItem('token').then((token)=>{
            if(token){
                // console.log('token ini : ',token);
                this.fetchUser();
                this.fetchBalance();
            }else {
                // console.log('token ini : ',token);
            }
        });
        this.fetchContent();

        const status = Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
    }

    fetchUser(){
        homeService.getInfoUser().then(res =>{
            let dataUser = res['data'];
            this.props.setGetData(dataUser);
            this.setState({
                name: dataUser.name,
            });
        }, err =>{
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchUser()}],
                {cancelable: false},
            );
        });
    }

    fetchBalance(){
        homeService.getBalance().then(res =>{
            console.log(res.data);
            this.setState({
                saldo: res.data.balance,
            });
        },err =>{
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchBalance()}],
                {cancelable: true},
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
                entriesMin: arrContent,
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

    onFocus = async routeName => {
        let x = await AsyncStorage.getItem('token');
        if(x === null) {
            this.props.navigation.navigate("LoginUser")
        } else {
            this.props.navigation.navigate(routeName);
        }
    }

    render() { 
        return(
            <SafeAreaView>
                <StatusBar barStyle='light-content'/>
                <View style={styles.wrapper}>
                    <ScrollView>
                        {/* Start Header */}
                        <HeaderSearch onClickCart={()=> this.props.navigation.navigate('Payment')}/>
                        {/* End Header */}
                        
                        {/* Start Banner */}
                        {this.state.loading ? 
                        <ActivityIndicator size="small" color="#333" style={{marginBottom:15, marginTop:30}}/> :
                        <View style={styles.wrapSlider}>
                            <BannerComponent data={this.state.entries} height={250}/>
                        </View>}
                        {/* End Banner */}
                        
                        {/* Header Home */}
                        <HeaderHome name={this.state.name ? this.state.name : '-'} saldo={this.state.saldo ? this.state.saldo : 0}/>
                        {/* End Header Home */}

                        {/* Start Wrap Service */}
                        <View style={styles.wrapService}>
                            <Grid>
                                <Row>
                                    <Col style={styles.itemProduct}>
                                        <TouchableHighlight onPress={()=> this.onFocus('Pulsa')} underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width / 6) - 17.5} source={require('@assets/img/icon-service/pulsa-outline.png')} />
                                        </TouchableHighlight>
                                        <Text style={styles.labelItem}>Pulsa</Text>
                                    </Col>
                                    <Col style={styles.itemProduct}>
                                        <TouchableHighlight onPress={()=> this.onFocus('PaketData')} underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width / 6) - 17.5} source={require('@assets/img/icon-service/internet-outline.png')} />
                                        </TouchableHighlight>
                                        <Text style={styles.labelItem}>Paket</Text>
                                        <Text style={styles.labelItem}>Internet</Text>
                                    </Col>
                                    <Col style={styles.itemProduct}>
                                        <TouchableHighlight onPress={()=> this.onFocus('Listrik')} underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width / 6) - 17.5} source={require('@assets/img/icon-service/listrik-outline.png')} />
                                        </TouchableHighlight>
                                        <Text style={styles.labelItem}>Listrik</Text>
                                    </Col>
                                    <Col style={styles.itemProduct}>
                                        <TouchableHighlight onPress={()=> this.onFocus('ListProduct')} underlayColor="transparent" disabled={true}>
                                            <AutoHeightImage width={(Dimensions.get('window').width / 6) - 17.5} source={require('@assets/img/icon-service/pesawat-outline.png')} />
                                        </TouchableHighlight>
                                        <Text style={styles.labelItem}>Tiket</Text>
                                        <Text style={styles.labelItem}>Pesawat</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={styles.itemProduct}>
                                        <TouchableHighlight onPress={()=> this.onFocus('Bpjs')} underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width / 6) - 17.5} source={require('@assets/img/icon-service/bpjs-outline.png')} />
                                        </TouchableHighlight>
                                        <Text style={styles.labelItem}>BPJS</Text>
                                    </Col>
                                    <Col style={styles.itemProduct}>
                                        <TouchableHighlight onPress={()=> this.onFocus('Air')}  underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width / 6) - 17.5} source={require('@assets/img/icon-service/air-outline.png')} />
                                        </TouchableHighlight>
                                        <Text style={styles.labelItem}>Tagihan</Text>
                                        <Text style={styles.labelItem}>Air</Text>
                                    </Col>
                                    <Col style={styles.itemProduct}>
                                        <TouchableHighlight onPress={()=> this.onFocus('Credit')} underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width / 6) - 17.5} source={require('@assets/img/icon-service/simpanpinjam-outline.png')} />
                                        </TouchableHighlight>
                                        <Text style={styles.labelItem}>Simpan</Text>
                                        <Text style={styles.labelItem}>Pinjam</Text>
                                    </Col>
                                    {/* <Col style={styles.itemProduct}>
                                        <TouchableHighlight onPress={()=> console.log("Service")} underlayColor="transparent">
                                            <AutoHeightImage width={(Dimensions.get('window').width / 6) - 17.5} source={require('@assets/img/icon-service/lainlain-outline.png')} />
                                        </TouchableHighlight>
                                        <Text style={styles.labelItem}>Lain-Lain</Text>
                                    </Col> */}
                                </Row>
                            </Grid>
                         </View>
                        {/* End Wrap Service */}

                        {/* Start Grid */} 
                        <Grid style={styles.wrapAdds}>
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
                        </Grid>
                        {/* End Grid */}

                        {/* ====== START POPULAR PRODUCT ====== */}
                        <View style={{marginTop: -5, paddingLeft: 15, paddingBottom: 30}}>
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
                        <View style={{paddingLeft: 15,backgroundColor:"#ffffff", paddingTop: 30, paddingBottom: 30}}>
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
                    </ScrollView>
                </View>
            </SafeAreaView>
        ) 
    }
}

const mapStateToProps = (state) => {
	return {
        home: state.home
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setGetData: (e) => {
			dispatch({
				type: 'UPDATE_DATA_PERSONAL_HOME',
				data: e
			})
        },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeComponent)