import React from 'react';
import { View, TouchableHighlight, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
// import Dimensions from 'Dimensions';
import { Variable } from '@styles';
import PropTypes from 'prop-types';

class BannerMinComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeSlide: 0
         };
    }

    get pagination () {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={this.props.data.length}
                activeDotIndex={activeSlide}
                containerStyle={{ 
                    marginTop: -20,
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                    padding: 0,
                }}
                dotStyle={{
                    margin: 0,
                    width: 20,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: Variable.colorPrimary,
                }}
                inactiveDotStyle={{
                    backgroundColor: '#9a9a9a',
                    borderWidth: 1,
                    borderColor: '#fff',
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                }}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
            />
        );
    }
    
    render() {
        return (
            <View>
                {/* <Carousel
                    autoplay={this.props.autoplay}
                    loop={false}
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.data}
                    renderItem={({item, index})=>{
                        return (
                            <TouchableHighlight onPress={() => console.log('aweu')} style={styles.slide} underlayColor="transparent">
                                <Image style={[styles.imageSlide,{height:this.props.height}]} source={require('@assets/img/adds/img03.jpg')}/>
                            </TouchableHighlight>
                        );
                    }}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width}
                    activeSlideAlignment={this.props.aligment}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                />
                { this.pagination } */}
                <TouchableHighlight onPress={() => console.log('aweu')} style={styles.slide} underlayColor="transparent">
                    <Image style={[styles.imageSlide,{height:this.props.height}]} source={{uri:'https://commercestrorage.blob.core.windows.net/image-banner/Screen%20Shot%202019-07-18%20at%2022.41.59.png'}}/>
                </TouchableHighlight>
            </View>
        );
    }
}

BannerMinComponent.propTypes = {
    autoplay: PropTypes.bool,
    loop: PropTypes.bool,
    height: PropTypes.number,
    aligment: PropTypes.string
};

BannerMinComponent.defaultProps = {
    autoplay: true,
    loop: true,
    height: 110,
    aligment: 'center'
}

const styles = StyleSheet.create({
    paginationSLide:{
        position: 'relative',
        marginBottom: 0,
        bottom: 0,
    },
    dot:{
        backgroundColor: '#dfdfdf',
        width: 8,
        height: 8
    },
    dotActive: {
        backgroundColor: Variable.colorPrimary,
        width: 20,
        height: 8
    },
    slide: {
        overflow: 'hidden',
        marginLeft:7.5,
        marginRight:7.5,
        borderRadius:7.5
    },
    imageSlide: {
        width: Dimensions.get('window').width,
    },
    wrapper:{
        marginTop: -15,
        paddingTop:30,
        paddingBottom:30,
        marginBottom: 30,
    }
});

export default BannerMinComponent;