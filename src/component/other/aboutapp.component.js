import React from 'react';
import { View,Text,ScrollView,Platform } from 'react-native';
import { BlockLogo } from '@directives';
import { Main,Variable,Typography } from '@styles';

class AboutAppsComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Tentang Aplikasi",
        headerTitleStyle: Variable.headerTitleStyle,
        headerStyle: {
            elevation:0,
            backgroundColor: '#42A9A0',
            borderBottomWidth: 0,
        },
        headerTintColor: '#ffffff',
    });

    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() { 
        return(
            <View style={{height:'100%',backgroundColor:'white'}}>
                <ScrollView>
                    <View style={[Main.container,{marginTop: 15,paddingBottom: 15}]}>                        
                        <View style={{padding: 30, backgroundColor: Variable.backgroundGray}}>
                            <Text style={Typography.heading5}>Versi Aplkasi</Text>
                            <Text style={[Typography.singleText,{marginBottom:15}]}>
                                v1.18.6-20
                            </Text>
                        </View>                    
                    </View>
                </ScrollView>
            </View>
        ) 
    }
}


export default AboutAppsComponent;