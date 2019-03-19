import React from 'react';
import { StyleSheet,TextInput,TouchableHighlight,Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo';
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
                                    <Feather name="search" size={18} color={Variable.colorContent} style={{textAlign:'center', top:-2,marginTop: Platform.OS === 'ios' ? 0 : 6}}/>
                                </TouchableHighlight>
                            </Col>
                        </Grid>
                    </Col>
                    <Col style={{width:45}}>
                        <TouchableHighlight onPress={()=> console.log("Cart")} underlayColor="transparent">
                            <Feather name="shopping-cart" size={24} color="#ffffff" style={{textAlign:'right', top:6,marginTop: Platform.OS === 'ios' ? 2 : 8}}/>
                        </TouchableHighlight>
                    </Col>
                </Grid>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    wrapInput: {
        backgroundColor: "#fff",
        padding: 10,
        paddingLeft: 15,
        borderRadius: 4
    },
    input: {
        color: Variable.colorContent,
        fontFamily: Variable.fontRegular,
    }
});

export default HeaderSearch;