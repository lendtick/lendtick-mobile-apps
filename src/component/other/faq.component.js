import React from 'react';
import { ScrollView,View, Text, TouchableHighlight, Platform } from 'react-native';
import { LinearGradient } from 'expo';
import { Col,Grid } from "react-native-easy-grid";
import { BlockLogo } from '@directives';
import Feather from 'react-native-vector-icons/Feather';
import { Main,Variable,Typography } from '@styles';

class FAQComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "FAQ",
        headerTitleStyle: Variable.headerTitleStyle,
    });

    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() { 
        return(
            <View style={{height:'100%',backgroundColor:'white'}}>
                <ScrollView>
                    <BlockLogo />
                    <View style={[Main.container,{paddingTop: 15, paddingBottom: 15}]}> 
                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('GantiPassUser');}} underlayColor="transparent">
                            <Grid style={{padding:15, backgroundColor:'white',borderWidth:1,borderBottomWidth:0,borderColor:'#efefef'}}>
                                <Col>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Feather name="help-circle" size={14} style={{marginRight: 10}} color={Variable.colorContent} />
                                        <Text style={Typography.singleText}>Lorem ipsum dolor sit amet, dicunt habemus electram cum cu quodsi.</Text>
                                    </View>
                                </Col>
                                <Col style={{width:45}}><Feather name="chevron-right" size={18} style={{textAlign:'right',top:'50%',marginTop: -9}} color={Variable.colorContent} /></Col>
                            </Grid>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('FAQ');}} underlayColor="transparent">
                            <Grid style={{padding:15, backgroundColor:'white',borderWidth:1,borderBottomWidth:0,borderColor:'#efefef'}}>
                                <Col>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Feather name="help-circle" size={14} style={{marginRight: 10}} color={Variable.colorContent} />
                                        <Text style={Typography.singleText}>Duo ne oratio quidam vituperatoribus, ceteros assentior similique sit ex, omnes intellegam sea an.</Text>
                                    </View>
                                </Col>
                                <Col style={{width:45}}><Feather name="chevron-right" size={18} style={{textAlign:'right',top:'50%',marginTop: -9}} color={Variable.colorContent} /></Col>
                            </Grid>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('FAQ');}} underlayColor="transparent">
                            <Grid style={{padding:15, backgroundColor:'white',borderWidth:1,borderBottomWidth:0,borderColor:'#efefef'}}>
                                <Col>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Feather name="help-circle" size={14} style={{marginRight: 10}} color={Variable.colorContent} />
                                        <Text style={Typography.singleText}>Possim equidem veritus per ad, ad amet aeterno blandit sed. Nec ea perpetua inciderint, eos te iuvaret voluptatibus.</Text>
                                    </View>
                                </Col>
                                <Col style={{width:45}}><Feather name="chevron-right" size={18} style={{textAlign:'right',top:'50%',marginTop: -9}} color={Variable.colorContent} /></Col>
                            </Grid>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('FAQ');}} underlayColor="transparent">
                            <Grid style={{padding:15, backgroundColor:'white',borderWidth:1,borderBottomWidth:0,borderColor:'#efefef'}}>
                                <Col>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Feather name="help-circle" size={14} style={{marginRight: 10}} color={Variable.colorContent} />
                                        <Text style={Typography.singleText}>Nibh consul inermis vel ne, his wisi debitis id, cu eam indoctum mediocrem </Text>
                                    </View>
                                </Col>
                                <Col style={{width:45}}><Feather name="chevron-right" size={18} style={{textAlign:'right',top:'50%',marginTop: -9}} color={Variable.colorContent} /></Col>
                            </Grid>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('About');}} underlayColor="transparent">
                            <Grid style={{padding:15, backgroundColor:'white',borderWidth:1,borderBottomWidth:0 ,borderColor:'#efefef'}}>
                                <Col>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Feather name="alert-circle" size={14} style={{marginRight: 10}} color={Variable.colorContent} />
                                        <Text style={Typography.singleText}>Ea qui commune pericula, est id verterem electram, soleat periculis cum ut.</Text>
                                    </View>
                                </Col>
                                <Col style={{width:45}}><Feather name="chevron-right" size={18} style={{textAlign:'right',top:'50%',marginTop: -9}} color={Variable.colorContent} /></Col>
                            </Grid>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('GantiPassUser');}} underlayColor="transparent">
                            <Grid style={{padding:15, backgroundColor:'white',borderWidth:1,borderBottomWidth:0,borderColor:'#efefef'}}>
                                <Col>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Feather name="help-circle" size={14} style={{marginRight: 10}} color={Variable.colorContent} />
                                        <Text style={Typography.singleText}>Lorem ipsum dolor sit amet, dicunt habemus electram cum cu quodsi.</Text>
                                    </View>
                                </Col>
                                <Col style={{width:45}}><Feather name="chevron-right" size={18} style={{textAlign:'right',top:'50%',marginTop: -9}} color={Variable.colorContent} /></Col>
                            </Grid>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('FAQ');}} underlayColor="transparent">
                            <Grid style={{padding:15, backgroundColor:'white',borderWidth:1,borderBottomWidth:0,borderColor:'#efefef'}}>
                                <Col>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Feather name="help-circle" size={14} style={{marginRight: 10}} color={Variable.colorContent} />
                                        <Text style={Typography.singleText}>Duo ne oratio quidam vituperatoribus, ceteros assentior similique sit ex, omnes intellegam sea an.</Text>
                                    </View>
                                </Col>
                                <Col style={{width:45}}><Feather name="chevron-right" size={18} style={{textAlign:'right',top:'50%',marginTop: -9}} color={Variable.colorContent} /></Col>
                            </Grid>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('FAQ');}} underlayColor="transparent">
                            <Grid style={{padding:15, backgroundColor:'white',borderWidth:1,borderColor:'#efefef'}}>
                                <Col>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Feather name="help-circle" size={14} style={{marginRight: 10}} color={Variable.colorContent} />
                                        <Text style={Typography.singleText}>Possim equidem veritus per ad, ad amet aeterno blandit sed. Nec ea perpetua inciderint, eos te iuvaret voluptatibus.</Text>
                                    </View>
                                </Col>
                                <Col style={{width:45}}><Feather name="chevron-right" size={18} style={{textAlign:'right',top:'50%',marginTop: -9}} color={Variable.colorContent} /></Col>
                            </Grid>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        ) 
    }
}


export default FAQComponent;