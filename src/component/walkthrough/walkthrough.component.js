import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import Swiper from 'react-native-swiper';
import { Typography } from '../../styles/index';
import {styles} from './walkthrough.style';

class walkThroughComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
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
                            source={require('../../../assets/icons/walktrough/walkt1.png')} />
                        <Text style={Typography.heading5}>Lorem Ipsum Dolor</Text>
                        <Text style={styles.text}>
                            Lorem mamat dolor sit amet, agam nullam mea no, cetero omittam at his Aperiri senserit ne per. No audire vivendo nominati eam.
                        </Text>
                    </View>
                    <View style={styles.slide}>
                        <Image 
                            style={styles.imgcontent}
                            source={require('../../../assets/icons/walktrough/walkt2.png')} />
                        <Text style={Typography.heading5}>Lorem Ipsum Dolor</Text>
                        <Text style={styles.text}>
                            Lorem ipsum dolor sit amet, agam nullam mea no, cetero omittam at his Aperiri senserit ne per. No audire vivendo nominati eam.
                        </Text>
                    </View>
                    <View style={styles.slide}>
                        <Image 
                            style={styles.imgcontent}
                            source={require('../../../assets/icons/walktrough/walkt3.png')} />
                        <Text style={Typography.heading5}>Lorem Ipsum Dolor</Text>
                        <Text style={styles.text}>
                            Lorem ipsum dolor sit amet, agam nullam mea no, cetero omittam at his Aperiri senserit ne per. No audire vivendo nominati eam.
                        </Text>
                    </View>
                </Swiper>
                {/* ====== END SKIP BUTTON ====== */}

                {/* ====== START SKIP BUTTON ====== */}
                <View style={[styles.contentFixed,{left:15}]}>
					<TouchableHighlight onPress={()=> this.props.navigation.navigate('Home')} underlayColor="transparent">
						<Text style={styles.login}>Home</Text>
					</TouchableHighlight>
				</View>
				<View style={[styles.contentFixed,{right:15}]}>
					<TouchableHighlight onPress={()=> this.props.navigation.navigate('Profile')} underlayColor="transparent">
						<Text style={[styles.login,{textAlign:'right'}]}>Sign In</Text>
					</TouchableHighlight>
				</View>
				{/* ====== END SKIP BUTTON ====== */}
			</View>
        );
    }
}

export default walkThroughComponent;