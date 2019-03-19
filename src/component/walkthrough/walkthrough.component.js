import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight,AsyncStorage } from 'react-native';
import Swiper from 'react-native-swiper';
import { LinearGradient } from 'expo';
import { Typography,Variable } from '@styles';
import { styles } from './walkthrough.style';


class walkThroughComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    keepSign(){
        AsyncStorage.setItem('keeped', '1');
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={{height: '100%', position: 'relative'}}>
				{/* ====== START SWIPER ====== */}
                <Swiper 
                    style={styles.wrapper} 
                    showsButtons={false}
                    loop={false}
                    dotStyle={styles.dot}
                    activeDotStyle={styles.dotActive}
                    >
                    <View style={styles.slide}>
                        <Image 
                            style={styles.imgcontent}
                            source={require('../../../assets/img/walktrough/walkt1.png')} />
                        <Text style={Typography.heading5}>Terpercaya</Text>
                        <Text style={styles.text}>
                            Lorem mamat dolor sit amet, agam nullam mea no, cetero omittam at his Aperiri senserit ne per. No audire vivendo nominati eam.
                        </Text>
                    </View>
                    <View style={styles.slide}>
                        <Image 
                            style={styles.imgcontent}
                            source={require('../../../assets/img/walktrough/walkt2.png')} />
                        <Text style={Typography.heading5}>Mempermudah</Text>
                        <Text style={styles.text}>
                            Lorem ipsum dolor sit amet, agam nullam mea no, cetero omittam at his Aperiri senserit ne per. No audire vivendo nominati eam.
                        </Text>
                    </View>
                    <View style={styles.slide}>
                        <Image 
                            style={styles.imgcontent}
                            source={require('../../../assets/img/walktrough/walkt3.png')} />
                        <Text style={Typography.heading5}>Mewujudkan</Text>
                        <Text style={styles.text}>
                            Lorem ipsum dolor sit amet, agam nullam mea no, cetero omittam at his Aperiri senserit ne per. No audire vivendo nominati eam.
                        </Text>
                    </View>
                </Swiper>
                {/* ====== END SKIP BUTTON ====== */}

                {/* ====== START SKIP BUTTON ====== */}
				<View style={[styles.contentFixed,{right:15}]}>
					<TouchableHighlight onPress={()=> this.keepSign()} underlayColor="transparent">
                        <LinearGradient
                            colors={Variable.colorGradient}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            style={{ padding: 5, alignItems: 'center', borderRadius: 4, width: '100%' }}>
						    <Text style={{color:'#fff'}}>Sign In</Text>
                        </LinearGradient>
					</TouchableHighlight>
				</View>
				{/* ====== END SKIP BUTTON ====== */}
			</View>
        );
    }
}

export default walkThroughComponent;