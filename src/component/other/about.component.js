import React from 'react';
import { View,Text,ScrollView,Platform } from 'react-native';
import { BlockLogo } from '@directives';
import { Main,Variable,Typography } from '@styles';

class AbotComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "About",
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
                    <View style={[Main.container,{marginTop: 15,paddingBottom: 30}]}>                        
                        <View style={{padding: 30, marginBottom: 50, backgroundColor: Variable.backgroundGray}}>
                            <Text style={Typography.heading5}>Tentang Koperasi Astra</Text>
                            <Text style={[Typography.singleText,{marginBottom:15}]}>
                                Lorem ipsum dolor sit amet, dicunt habemus electram cum cu, ius et alii quodsi. Ridens laoreet accusata sit at, inimicus indoctum imperdiet ei qui. Duo ne oratio quidam vituperatoribus, ceteros assentior similique sit ex, omnes intellegam sea an. Ea qui commune pericula, est id verterem electram, soleat periculis cum ut.
                            </Text>
                            <Text style={[Typography.singleText]}>
                                Possim equidem veritus per ad, ad amet aeterno blandit sed. Nec ea perpetua inciderint, eos te iuvaret voluptatibus. Nibh consul inermis vel ne, his wisi debitis id, cu eam indoctum mediocrem adversarium. Luptatum dignissim sadipscing ex nam, elitr inermis his te. Ut nam labore ceteros fuisset, in mei modo adolescens.
                            </Text>
                        </View>                    
                    </View>
                </ScrollView>
            </View>
        ) 
    }
}


export default AbotComponent;