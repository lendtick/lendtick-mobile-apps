import React from 'react';
import { View, StatusBar} from 'react-native';
import Statusbar from '@styles';

const GeneralStatusBarColor = ({ backgroundColor, ...props }) => (
    <View style={[Statusbar.statusBar, {backgroundColor}]}>
        <StatusBar translucent backgroundColor={this.props.backgroundColor} barStyle={this.props.barStyle} />
    </View>
);

export default GeneralStatusBarColor;