import React from 'react';
import { View, TouchableHighlight, Image, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Dimensions from 'Dimensions';
import { Variable } from '../styles/index';
import PropTypes from 'prop-types';

class BannerComponent extends React.Component {
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
                    marginTop: 15,
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                    padding: 0,
                }}
                dotStyle={{
                    margin: 0,
                    width: 20,
                    height: 8,
                    borderRadius: 4,
                    marginHorizontal: 0,
                    backgroundColor: Variable.colorPrimary,
                }}
                inactiveDotStyle={{
                    backgroundColor: '#dfdfdf',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
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
                <Carousel
                    autoplay={this.props.autoplay}
                    loop={this.props.loop}
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.data}
                    renderItem={({item, index})=>{
                        return (
                            <TouchableHighlight onPress={() => console.log('aweu')} style={styles.slide} underlayColor="transparent">
                                <Image style={[styles.imageSlide,{height:this.props.height}]} source={item.src}/>
                            </TouchableHighlight>
                        );
                    }}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width - 60}
                    activeSlideAlignment={this.props.aligment}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                />
                { this.pagination }
            </View>
        );
    }
}

BannerComponent.propTypes = {
    autoplay: PropTypes.bool,
    loop: PropTypes.bool,
    height: PropTypes.number,
    aligment: PropTypes.string
};

BannerComponent.defaultProps = {
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
        borderColor: '#efefef',
        borderWidth: 1,
        overflow: 'hidden',
        borderRadius: Variable.borderRadius,
        overflow: 'hidden'
    },
    imageSlide: {
        width: Dimensions.get('window').width - 45,
    },
});

export default BannerComponent;