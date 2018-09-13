import React from 'react';
import { View,Text,TouchableHighlight,ScrollView } from 'react-native';
import Dimensions from 'Dimensions';
import truncate from 'lodash/truncate';

import { CartDirective,BannerComponent,ItemProductLine } from '../../directive/index';
import { styles } from './product.style';

class ListProductComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Product List",
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
            width: Dimensions.get('window').width - 150,
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
            entries:[
                {id: "01", title: "coba 1", src:require("../../../assets/banner/img01.jpg"), link:""},
                {id: "02", title: "coba 2", src:require("../../../assets/banner/img01.jpg"), link:""},
                {id: "03", title: "coba 3", src:require("../../../assets/banner/img01.jpg"), link:""},
            ],
        };
    }

    componentDidMount(){
        setTimeout(()=>{
            this.refs.scrollView.scrollTo({x: 0, y: 1, animated: true});
        },500);
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <ScrollView ref="scrollView">
                    {/* ====== START SLIDER ====== */}
                    <View style={styles.wrapSlider}>
                        <BannerComponent data={this.state.entries}  height={110}/>
                    </View>
                    {/* ====== END SLIDER ====== */}


                    {/* ====== START PRODUCTS ====== */}
                    <View style={styles.wrapProducts}>
                        <ItemProductLine 
                            imgSrc={require("../../../assets/product/img01.jpg")}
                            width={Dimensions.get('window').width - 30}
                            title={truncate('Makanan minuman',{
                                'length': 15,
                                'separator': '...'
                            })}
                            category='Makanan'
                            price={180000}
                            price2={12000}
                            onClick={()=> this.props.navigation.navigate('ProductDetail')}
                        />
                        <ItemProductLine 
                            imgSrc={require("../../../assets/product/img02.jpg")}
                            width={Dimensions.get('window').width - 30}
                            title={truncate('Makanan minuman',{
                                'length': 15,
                                'separator': '...'
                            })}
                            category='Makanan'
                            price={180000}
                            price2={12000}
                            onClick={()=> this.props.navigation.navigate('ProductDetail')}
                        />
                        <ItemProductLine 
                            imgSrc={require("../../../assets/product/img03.jpg")}
                            width={Dimensions.get('window').width - 30}
                            title={truncate('Makanan minuman',{
                                'length': 15,
                                'separator': '...'
                            })}
                            category='Makanan'
                            price={180000}
                            price2={12000}
                            onClick={()=> this.props.navigation.navigate('ProductDetail')}
                        />
                        <ItemProductLine 
                            imgSrc={require("../../../assets/product/img04.jpg")}
                            width={Dimensions.get('window').width - 30}
                            title={truncate('Makanan minuman',{
                                'length': 15,
                                'separator': '...'
                            })}
                            category='Makanan'
                            price={180000}
                            price2={12000}
                            onClick={()=> this.props.navigation.navigate('ProductDetail')}
                        />
                        <ItemProductLine 
                            imgSrc={require("../../../assets/product/img05.jpg")}
                            width={Dimensions.get('window').width - 30}
                            title={truncate('Makanan minuman',{
                                'length': 15,
                                'separator': '...'
                            })}
                            category='Makanan'
                            price={180000}
                            price2={12000}
                            onClick={()=> this.props.navigation.navigate('ProductDetail')}
                        />
                        <ItemProductLine 
                            imgSrc={require("../../../assets/product/img06.jpg")}
                            width={Dimensions.get('window').width - 30}
                            title={truncate('Makanan minuman',{
                                'length': 15,
                                'separator': '...'
                            })}
                            category='Makanan'
                            price={180000}
                            price2={12000}
                            onClick={()=> this.props.navigation.navigate('ProductDetail')}
                        />
                    </View>
                    {/* ====== END PRODUCTS ====== */}
                </ScrollView>   
            </View>
        );
    }
}

export default ListProductComponent;