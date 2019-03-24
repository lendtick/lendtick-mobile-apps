import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";

import { AlertBox,FooterButton } from '@directives';
import { Main,Typography, Variable} from '@styles';
import { styles } from './listrik.style';

class ListrikConfirmation extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Konfirmasi Listrik",
        headerTitleStyle: Variable.headerTitleStyle,
    });


    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={[styles.wrapper,{backgroundColor: Variable.backgroundGray}]}>
                <ScrollView>
                    {/* ====== START INFORMASI ====== */}
                    <View style={[Main.container]}>
                        <Text style={[Typography.singleTitle,{marginTop:15}]}>Informasi</Text>
                    </View>
                    <View style={[Main.wrapInfo,{paddingBottom:5,marginTop:0}]}>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Phone Number</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>089876567865</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#efefef', marginBottom:15}}>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Token Number</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>4234343</Text>
                        </View>
                        <View>
                            <Text style={[Typography.singleText,{marginBottom:5}]}>Harga</Text>
                            <Text style={[Typography.label,{marginBottom:15}]}>Rp 500,000</Text>
                        </View>
                    </View>
                    {/* ====== END INFORMASI ====== */}
                </ScrollView>

                {/* ====== START FOOTER ====== */}
                <FooterButton text="Rp 500.000" textButton="Konfirmasi" onClick={()=> console.log("asdasd")}/>
                {/* ====== END FOOTER ====== */}
            </View>
        );
    }
}

export default ListrikConfirmation;