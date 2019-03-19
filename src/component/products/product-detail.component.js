import React from 'react';
import { View,Text,TouchableHighlight,ScrollView } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import truncate from 'lodash/truncate';

import { FooterButton,ItemProduct } from '@directives';
import { Variable } from '@styles';
import ProductInfoComponent from './product-info.component';
import ProductSpesificationComponent from './product-spesification.component';
import ProductRincianComponent from './procust-rincian.component';
import { styles } from './product.style';

class ProductDetailComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Product Detail",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = { 
            entries:[
                {id: "01", title: "coba 1", src:require("../../../assets/img/product/detail/img01.png"), link:""},
                {id: "02", title: "coba 2", src:require("../../../assets/img/product/detail/img02.png"), link:""},
                {id: "03", title: "coba 3", src:require("../../../assets/img/product/detail/img03.png"), link:""},
            ],
            selectedLink: 'produk',
            productsRecomended: [
                {id: "01", title: "Tas Wanita", category:"Bag", price: 14500, src:require("../../../assets/img/product/img04.jpg")},
                {id: "02", title: "Sepati Anti Paku", category:"Shoes", price: 15000, src:require("../../../assets/img/product/img05.jpg")},
                {id: "03", title: "Tas Wanita Coklat", category:"Bag", price: 14500, src:require("../../../assets/img/product/img06.jpg")},
            ],
        };
    }

    componentDidMount(){
        setTimeout(()=>{
            this.refs.scrollView.scrollTo({x: 0, y: 1, animated: true});
        },500);
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
        let selectComponent = null;
        switch(this.state.selectedLink){
            case 'produk' :
                selectComponent = <ProductInfoComponent data={this.state.entries} dataMoreProduct={this.state.productsRecomended}/>;
            break;
            case 'rincian' :
                selectComponent = <ProductRincianComponent />;
            break;
            case 'spesifikasi' :
                selectComponent = <ProductSpesificationComponent />
            break;
        }
        return (
            <View style={styles.wrapper}>
                {/* ====== START TABS ====== */}
                <View style={styles.wrapSelect}>
                    <Grid>
                        <Col style={{borderRightWidth:1,borderColor:'#efefef'}}>
                            <TouchableHighlight onPress={()=> this.setState({selectedLink: 'produk'})} underlayColor="transparent">
                                <Text style={this.state.selectedLink == 'produk' ? styles.itemLinkActive : styles.itemLink}>Produk</Text>
                            </TouchableHighlight>
                        </Col>
                        <Col style={{borderRightWidth:1,borderColor:'#efefef'}}>
                            <TouchableHighlight onPress={()=> this.setState({selectedLink: 'rincian'})} underlayColor="transparent">
                                <Text style={this.state.selectedLink == 'rincian' ? styles.itemLinkActive : styles.itemLink}>Rincian</Text>
                            </TouchableHighlight>
                        </Col>
                        <Col>
                            <TouchableHighlight onPress={()=> this.setState({selectedLink: 'spesifikasi'})} underlayColor="transparent">
                                <Text style={this.state.selectedLink == 'spesifikasi' ? styles.itemLinkActive : styles.itemLink}>Spesifikasi</Text>
                            </TouchableHighlight>
                        </Col>
                    </Grid>
                </View>
                {/* ====== END TABS ====== */}
                
                <ScrollView ref="scrollView">
                    {selectComponent}
                </ScrollView>   

                {/* ====== START FOOTER ====== */}
                <FooterButton text="Rp 100.000" textButton="Continue" onClick={()=> this.props.navigation.navigate('ProductConfirm')}/>
                {/* ====== END FOOTER ====== */}
            </View>
        );
    }
}

export default ProductDetailComponent;