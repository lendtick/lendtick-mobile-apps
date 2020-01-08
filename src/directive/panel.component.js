import React from 'react';
import { Text,View,TouchableHighlight,StyleSheet,Animated } from 'react-native'; //Step 1
import { AntDesign } from '@expo/vector-icons';
import { Col,Grid } from "react-native-easy-grid";
import { Variable, Typography } from '@styles';
import * as Animatable from 'react-native-animatable';

class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClose: true
        };
    }
    componentDidMount(){
        if(this.props.collapse) this.setState({isClose: false});
    }
    toggle(){
        this.props.onClick();
        this.setState({isClose: false});
    }

    coba(){
        if(!this.props.collapse){
            this.setState({isClose: true});
        }
    }
    render(){
        return(
            <View style={{marginBottom:-1, overflow:'hidden'}}>
                <TouchableHighlight style={styles.header} onPress={()=> this.toggle()} underlayColor="transparent">
                    <Grid>
                        <Col><Text style={[Typography.heading6,{marginBottom:0}]}>{this.props.title}</Text></Col>
                        <Col style={{width:50}}>
                            <AntDesign name={this.props.collapse ? 'down' : 'right'} size={20} color={Variable.colorContent} style={{textAlign:'right'}}/>
                        </Col>
                    </Grid>
                </TouchableHighlight>
                <Animatable.View style={[styles.body,this.state.isClose ? {display:'none'} : null]} animation={this.props.collapse ? "slideInUp" : "slideOutUp"} onAnimationEnd={()=> this.coba()}>
                    {this.props.children}
                </Animatable.View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    header: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#efefef',
        backgroundColor: '#fff',
        padding: 15,
        position: 'relative',
        zIndex: 9999,
    },
    body:{
        padding: 15,
        zIndex: 1
    }
});

export default Panel;