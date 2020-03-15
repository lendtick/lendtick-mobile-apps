import React from 'react';
import { ScrollView,View,Dimensions,TouchableHighlight,ActivityIndicator, AsyncStorage, Text } from 'react-native';
import { NavigationEvents } from "react-navigation";
import { Col,Grid, Row } from "react-native-easy-grid";
import AutoHeightImage from 'react-native-auto-height-image';
import { HeaderSearch, BannerComponent } from '@directives';
import { Variable } from '@styles';
import { styles } from './biller.style';

class BillerComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Services",
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
            entries:[],
        };
    }

    componentWillMount(){
        this.fetchContent();
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

    onFocus = async () => {
        let x = await AsyncStorage.getItem('token');
        if(x === null) {
            this.props.navigation.navigate("LoginUser")
        }
    }

    render() { 
        return(
            <View style={styles.wrapper}>
                <NavigationEvents onWillFocus={() => this.onFocus()} />
                <ScrollView>

                    {/* Start Banner */}
                    {this.state.loading ? 
                    <ActivityIndicator size="small" color="#333" style={{marginBottom:15, marginTop:30}}/> :
                    <View style={styles.wrapSlider}>
                        <BannerComponent data={this.state.entries} height={180}/>
                    </View>}
                    {/* End Banner */}

                    {/* Start Wrap Service */}
                    <View style={[styles.wrapService,{paddingBottom:15}]}>
                        <Grid>
                        <Row>
                            <Col style={styles.itemProduct}>
                                <TouchableHighlight onPress={()=> this.props.navigation.navigate('Pulsa')} underlayColor="transparent">
                                    <AutoHeightImage width={(Dimensions.get('window').width / 6) - 17.5} source={require('@assets/img/icon-service/pulsa-outline.png')} />
                                </TouchableHighlight>
                                <Text style={styles.labelItem}>Pulsa</Text>
                            </Col>
                            <Col style={styles.itemProduct}>
                                <TouchableHighlight onPress={()=> this.props.navigation.navigate('PaketData')} underlayColor="transparent">
                                    <AutoHeightImage width={(Dimensions.get('window').width / 6) - 17.5} source={require('@assets/img/icon-service/internet-outline.png')} />
                                </TouchableHighlight>
                                <Text style={styles.labelItem}>Paket</Text>
                                <Text style={styles.labelItem}>Internet</Text>
                            </Col>
                            <Col style={styles.itemProduct}>
                                <TouchableHighlight onPress={()=> this.props.navigation.navigate('Listrik')} underlayColor="transparent">
                                    <AutoHeightImage width={(Dimensions.get('window').width / 6) - 17.5} source={require('@assets/img/icon-service/listrik-outline.png')} />
                                </TouchableHighlight>
                                <Text style={styles.labelItem}>Listrik</Text>
                            </Col>
                            <Col style={styles.itemProduct}>
                                <TouchableHighlight onPress={()=> this.props.navigation.navigate('ListProduct')} underlayColor="transparent"  disabled={true}>
                                    <AutoHeightImage width={(Dimensions.get('window').width / 6) - 17.5} source={require('@assets/img/icon-service/pesawat-outline.png')} />
                                </TouchableHighlight>
                                <Text style={styles.labelItem}>Tiket</Text>
                                <Text style={styles.labelItem}>Pesawat</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={styles.itemProduct}>
                                <TouchableHighlight onPress={()=> this.props.navigation.navigate('Bpjs')} underlayColor="transparent">
                                    <AutoHeightImage width={(Dimensions.get('window').width / 6) - 17.5} source={require('@assets/img/icon-service/bpjs-outline.png')} />
                                </TouchableHighlight>
                                <Text style={styles.labelItem}>BPJS</Text>
                            </Col>
                            <Col style={styles.itemProduct}>
                                <TouchableHighlight onPress={()=> this.props.navigation.navigate('Air')} underlayColor="transparent">
                                    <AutoHeightImage width={(Dimensions.get('window').width / 6) - 17.5} source={require('@assets/img/icon-service/air-outline.png')} />
                                </TouchableHighlight>
                                <Text style={styles.labelItem}>Tagihan</Text>
                                <Text style={styles.labelItem}>Air</Text>
                            </Col>
                            <Col style={styles.itemProduct}>
                                <TouchableHighlight onPress={()=> this.props.navigation.navigate('Credit')} underlayColor="transparent">
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
                            {/* <Row>
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
                            <Row>
                                <Col style={[styles.itemProduct,styles.itemProductDisable]}>
                                    <TouchableHighlight onPress={()=> console.log("Service")} underlayColor="transparent">
                                        <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item3.png')} />
                                    </TouchableHighlight>
                                </Col>
                                <Col style={[styles.itemProduct,styles.itemProductDisable]}>
                                    <TouchableHighlight onPress={()=> console.log("Service")} underlayColor="transparent">
                                        <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item1.png')} />
                                    </TouchableHighlight>
                                </Col>
                               
                                <Col style={[styles.itemProduct,styles.itemProductDisable]}>
                                    <TouchableHighlight onPress={()=> console.log("Service")} underlayColor="transparent">
                                        <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item7.png')} />
                                    </TouchableHighlight>
                                </Col>
                            </Row>
                            <Row> 
                                <Col style={[styles.itemProduct,styles.itemProductDisable]}>
                                    <TouchableHighlight onPress={()=> this.props.navigation.navigate('ListProduct')} underlayColor="transparent">
                                        <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item4.png')} />
                                    </TouchableHighlight>
                                </Col>
                                <Col style={[styles.itemProduct,styles.itemProductDisable]}>
                                    <TouchableHighlight onPress={()=> console.log("Service")} underlayColor="transparent">
                                        <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item5.png')} />
                                    </TouchableHighlight>
                                </Col>
                                <Col style={[styles.itemProduct,styles.itemProductDisable]}>
                                    <TouchableHighlight onPress={()=> console.log("Service")} underlayColor="transparent">
                                        <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item10.png')} />
                                    </TouchableHighlight>
                                </Col>
                            </Row>
                            */}
                        </Grid>
                        </View>
                    {/* End Wrap Service */}
                </ScrollView>
            </View>
        ) 
    }
}


export default BillerComponent;