import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, ActivityIndicator } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
<<<<<<< HEAD
import { LinearGradient } from 'expo';
=======
import { LinearGradient } from 'expo-linear-gradient';
>>>>>>> master
import { Variable } from '@styles';

class FooterButton extends React.Component {
    render() {
        return (
            <View style={styles.footer}>
                <Grid>
                    <Col>
                        <Text style={styles.footerText}>{this.props.text}</Text>
                    </Col>
                    <Col style={{width:150}}>
                        <TouchableHighlight onPress={this.props.onClick} underlayColor="transparent">
                            <LinearGradient
<<<<<<< HEAD
                                colors={this.props.disabled ? ['#999','#999'] : Variable.colorGradient}
=======
                                colors={this.props.disabled ? ['#999','#999'] : ['#25c4fd', '#aad95a']}
>>>>>>> master
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                style={{padding: 15,paddingTop:13}}>
                                {this.props.isSubmit ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.footerBtn}>{this.props.textButton}</Text> }
                            </LinearGradient>
                        </TouchableHighlight>
                    </Col>
                </Grid>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footer:{
        height: 48,
        borderTopWidth: 1,
        borderColor: '#efefef',
        backgroundColor: '#ffffff'
    },
    footerText:{
        paddingLeft:15,
        paddingRight:15,
        paddingTop: 10,
        fontWeight: '700',
        fontSize: 18,
        color: Variable.colorTitle,
        fontFamily: Variable.fontMedium
    },
    footerBtn:{
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: Variable.fontBold
    },
});

export default FooterButton;