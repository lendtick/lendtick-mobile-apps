import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { Variable } from '../styles/index';

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
                            <Text style={styles.footerBtn}>{this.props.textButton}</Text>
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
        borderColor: '#efefef'
    },
    footerText:{
        padding: 16,
        fontWeight: '700',
        color: Variable.colorTitle,
    },
    footerBtn:{
        padding: 16,
        textAlign: 'center',
        backgroundColor: Variable.colorPrimary,
        color: '#ffffff'
    },
});

export default FooterButton;