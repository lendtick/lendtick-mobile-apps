import React from 'react';
import { View,Text,TouchableHighlight,ScrollView,Platform } from 'react-native';
import Dimensions from 'Dimensions';
import truncate from 'lodash/truncate';
import { Col, Grid } from "react-native-easy-grid";
import * as _ from 'lodash';

import { HeaderSearch,BannerComponent,ItemProduct } from '@directives';
import { Variable } from '@styles';
import { styles } from './product.style';

class ListProductComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Product List",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = { 
            entries:[
                {id: "01", title: "coba 1", src:require("../../../assets/img/banner/img01.jpg"), link:""},
                {id: "02", title: "coba 2", src:require("../../../assets/img/banner/img01.jpg"), link:""},
                {id: "03", title: "coba 3", src:require("../../../assets/img/banner/img01.jpg"), link:""},
            ],
            products:[
                {id: "01", title: "Jaket merah", category:"Jacket", price: 14500, src:require("../../../assets/img/product/img01.jpg")},
                {id: "02", title: "Kemeja Gaya", category:"Baju", price: 15000, src:require("../../../assets/img/product/img02.jpg")},
                {id: "03", title: "Kemeja Putih Kondangan", category:"Baju", price: 14500, src:require("../../../assets/img/product/img03.jpg")},
                {id: "04", title: "Kemeja Gaya", category:"Baju", price: 15000, src:require("../../../assets/img/product/img02.jpg")},
                {id: "05", title: "Jaket merah", category:"Jacket", price: 14500, src:require("../../../assets/img/product/img01.jpg")},
                {id: "06", title: "Kemeja Gaya", category:"Baju", price: 15000, src:require("../../../assets/img/product/img02.jpg")},

            ],
            data: [],
            imageWidth: (Dimensions.get('window').width / 2) - 25
        };
    }

    componentDidMount(){
        setTimeout(()=>{
            this.refs.scrollView.scrollTo({x: 0, y: 1, animated: true});
        },500);
        let data = _.chunk(this.state.products,2);
        this.setState({data: data});
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <ScrollView ref="scrollView">
                    {/* Start Header */}
                    <HeaderSearch />
                    {/* End Header */}

                    {/* Start Banner */}
                    <View style={styles.wrapSlider}>
                        <BannerComponent data={this.state.entries} height={180}/>
                    </View>
                    {/* End Banner */}


                    {/* ====== START PRODUCTS ====== */}
                    
                    <View style={styles.wrapProducts}>
                        {this.state.data.map((x,index) => (
                            <Grid key={index} style={{marginBottom: 15}}>
                                {x.map((item,i) => {
                                    if(i == 0){
                                        return (<Col key={i}><ItemProduct 
                                            imgSrc={item.src}
                                            width={this.state.imageWidth}
                                            title={truncate(item.title,{
                                                'length': 15,
                                                'separator': '...'
                                            })}
                                            category={item.category}
                                            price={item.price}
                                            onClick={()=> this.props.navigation.navigate('ProductDetail')}
                                        /></Col>);
                                    }else{
                                        return (<Col key={i} style={{marginLeft:15}}><ItemProduct 
                                            imgSrc={item.src}
                                            width={this.state.imageWidth}
                                            title={truncate(item.title,{
                                                'length': 15,
                                                'separator': '...'
                                            })}
                                            category={item.category}
                                            price={item.price}
                                            onClick={()=> this.props.navigation.navigate('ProductDetail')}
                                        /></Col>);
                                    }
                                })}
                            </Grid>
                        ))}
                    </View>
                    {/* ====== END PRODUCTS ====== */}
                </ScrollView>   
            </View>
        );
    }
}

export default ListProductComponent;