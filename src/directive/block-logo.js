import React from 'react';
import { View,StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Variable } from '@styles';

class BlockLogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render(){
        return(
            <View style={{position:'relative',marginBottom: 70}}>
                <LinearGradient
                    colors={Variable.colorGradient}
                    style={{ height: 100 }}
                    start={[0, 0]}
                    end={[1, 0]}
                />
                <View style={styles.wrapLogo}></View>
                <Image 
                    style={styles.imgLogo}
                    source={require('@assets/img/logo-sign.png')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapLogo: {
        position: 'absolute',
        width: 110,
        height: 110,
        left: 0,
        backgroundColor: 'white',
        bottom: -55,
        left: '50%',
        marginLeft: -55,
        borderRadius: 55
    },
    imgLogo:{
        position: 'absolute',
        bottom: -62,
        marginLeft: -55.5,
        left: '50%',
    }
});

export default BlockLogo;