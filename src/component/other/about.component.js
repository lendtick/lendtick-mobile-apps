import React from 'react';
import { View,Text,ScrollView,Platform } from 'react-native';
import { BlockLogo } from '@directives';
import { Main,Variable,Typography } from '@styles';

class AbotComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Tentang Koperasi Astra",
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
                    <BlockLogo />
                    <View style={[Main.container,{marginTop: 15,paddingBottom: 15}]}>                        
                        <View style={{padding: 30, backgroundColor: Variable.backgroundGray}}>
                            <Text style={Typography.heading5}>Tentang Koperasi Astra</Text>
                            <Text style={[Typography.singleText,{marginBottom:15}]}>
                                Koperasi Astra merupakan salah satu upaya PT. Astra International Tbk, untuk menambah kesejahteraan karyawan tetapnya di seluruh anak perusahaan melalui manfaat ekonomi yang dikelola Koperasi. Sebagai koperasi konsumen, Koperasi Astra tidak hanya memfasilitasi berbagai produk layanan simpan pinjam namun juga mampu meningkatkan kinerja melalui anak perusahaan yang bergerak dalam berbagai bidang .
                            </Text>
                        </View>                    
                    </View>
                </ScrollView>
            </View>
        ) 
    }
}


export default AbotComponent;