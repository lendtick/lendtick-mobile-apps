import React from 'react';
import { View,Text,ScrollView } from 'react-native';
import { BlockLogo } from '@directives';
import { Main,Variable,Typography } from '@styles';

class BalanceAboutComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Penjelasan",
        headerTitleStyle: Variable.headerTitleStyle,
<<<<<<< HEAD
=======
        headerStyle: {
            elevation:0,
            backgroundColor: '#42A9A0',
            borderBottomWidth: 0,
        },
        headerTintColor: '#ffffff',
>>>>>>> master
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
                    <View style={[Main.container,{marginTop: 15, paddingBottom:15}]}>                        
                        <View style={{padding: 30, marginBottom: 15, backgroundColor: Variable.backgroundGray}}>
                            <Text style={Typography.heading6}>Microlan</Text>
                            <Text style={[Typography.singleText,{marginBottom:15}]}>
                                pinjaman yang di dapat anggota tanpa harus mengajukan ke pihak koperasi. gunakan pinjaman microloan untuk kebutuhan anda sehari hari
                            </Text>

                            <Text style={Typography.heading6}>Middle Loan</Text>
                            <Text style={[Typography.singleText]}>
                                pinjaman jangka menengah yang dapat anda gunakan untuk belanja kebutuhan anda di aplikasi koperasi astra
                            </Text>
                        </View>                    
                    </View>
                </ScrollView>
            </View>
        ) 
    }
}


export default BalanceAboutComponent;