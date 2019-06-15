import React from 'react';
import { ScrollView,View,Dimensions,TouchableHighlight } from 'react-native';
import { Col,Grid, Row } from "react-native-easy-grid";
import AutoHeightImage from 'react-native-auto-height-image';
import { HeaderSearch, BannerComponent } from '@directives';
import { Variable } from '@styles';
import { styles } from './biller.style';

class BillerComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Services",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = { 
            entries:[
                {id: "01", title: "coba 1", src:require("@assets/img/banner/img01.jpg"), link:""},
                {id: "02", title: "coba 2", src:require("@assets/img/banner/img01.jpg"), link:""},
                {id: "03", title: "coba 3", src:require("@assets/img/banner/img01.jpg"), link:""},
            ],
        };
    }

    render() { 
        return(
            <View style={styles.wrapper}>
                <ScrollView>
                    {/* Start Header */}
                    <HeaderSearch onClickCart={()=> this.props.navigation.navigate('Payment')}/>
                    {/* End Header */}

                    {/* Start Banner */}
                    <View style={styles.wrapSlider}>
                        <BannerComponent data={this.state.entries} height={180}/>
                    </View>
                    {/* End Banner */}

                    {/* Start Wrap Service */}
                    <View style={[styles.wrapService,{paddingBottom:15}]}>
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
                            <Row>
                                <Col style={[styles.itemProduct,styles.itemProductDisable]}>
                                    <TouchableHighlight onPress={()=> console.log("Service")} underlayColor="transparent">
                                        <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item3.png')} />
                                    </TouchableHighlight>
                                </Col>
                                {/* <Col style={styles.itemProduct}>
                                    <TouchableHighlight onPress={()=> console.log("Service")} underlayColor="transparent">
                                        <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item5.png')} />
                                    </TouchableHighlight>
                                </Col>
                                <Col style={styles.itemProduct}>
                                    <TouchableHighlight onPress={()=> console.log("Service")} underlayColor="transparent">
                                        <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item7.png')} />
                                    </TouchableHighlight>
                                </Col> */}
                            </Row>
                            <Row>
                                {/* <Col style={styles.itemProduct}>
                                    <TouchableHighlight onPress={()=> this.props.navigation.navigate('ListProduct')} underlayColor="transparent">
                                        <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item4.png')} />
                                    </TouchableHighlight>
                                </Col>
                                <Col style={styles.itemProduct}>
                                    <TouchableHighlight onPress={()=> console.log("Service")} underlayColor="transparent">
                                        <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item1.png')} />
                                    </TouchableHighlight>
                                </Col>
                                <Col style={styles.itemProduct}>
                                    <TouchableHighlight onPress={()=> console.log("Service")} underlayColor="transparent">
                                        <AutoHeightImage width={(Dimensions.get('window').width / 3) - 17.5} source={require('@assets/img/icon-service/item10.png')} />
                                    </TouchableHighlight>
                                </Col> */}
                            </Row>
                        </Grid>
                        </View>
                    {/* End Wrap Service */}
                </ScrollView>
            </View>
        ) 
    }
}


export default BillerComponent;