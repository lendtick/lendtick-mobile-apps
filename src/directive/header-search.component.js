import React from 'react';
import { StyleSheet,TextInput,TouchableHighlight,Platform,Text,View } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Col,Grid } from "react-native-easy-grid";
import { Variable } from '@styles';

class HeaderSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            text: null
        };
    }
    render(){
        return(
            <LinearGradient
                colors={Variable.colorGradient}
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                style={{ padding: 15, alignItems: 'center', width: '100%' }}>
                <Grid>
                    <Col style={{paddingLeft:0}}>
                        <Grid style={styles.wrapInput}>
                            <Col>
                                <TextInput
                                    placeholder="Cari produk..."
                                    style={styles.input}
                                    onChangeText={(text) => this.setState({text})}
                                    value={this.state.text}
                                />
                            </Col>
                            <Col style={{width:30}}>
                                <TouchableHighlight onPress={()=> console.log("Cari")} underlayColor="transparent">
                                    <Foundation name="magnifying-glass" size={18} color={Variable.colorContent} style={{textAlign:'center', top:-2,marginTop: Platform.OS === 'ios' ? 0 : 6}}/>
                                </TouchableHighlight>
                            </Col>
                        </Grid>
                    </Col>
                </Grid>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    wrapInput: {
        backgroundColor: '#ffffff',
        padding: 10,
        paddingLeft: 15,
        borderRadius: 4
    },
    input: {
        color: Variable.colorContent,
        fontFamily: Variable.fontRegular,
    },
    counter: {
        borderWidth: 1,
        borderColor: '#e74c3c',
        width: 26,
        height: 26,
        fontSize: 12,
        borderRadius: 13,
        backgroundColor: '#e74c3c',
        color: '#ffffff',
        textAlign: 'center',
        zIndex: 3,
        overflow: 'hidden',
        marginLeft: 10,
        marginRight: 5,
        paddingTop:5,
        marginTop:7
    }
});

const mapStateToProps = (state) => {
	return {
        cart: state.cart
	}
}
const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderSearch)