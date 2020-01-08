import { Platform, Dimensions } from 'react-native';
import * as Font from 'expo-font';

let fontRegular = 'font-regular';
let fontMedium = 'font-medium';
let fontBold = 'font-bold';
let fontLight = 'font-light';
let fontExtraLight = 'font-extra-light';
let fontThin = 'font-thin';
let winHeight = Dimensions.get('window').height;
export const Variable = {
    colorTitle: "#3a3a3a",
    colorContent: "#6a6a6a",
    fontRegular: fontRegular,
    fontBold: fontBold,
    fontMedium: fontMedium,
    fontLight:fontLight,
    fontExtraLight:fontExtraLight,
    fontThin:fontThin,
    backgroundGray:'#f8f8ff',
    // colorGradient:['#6dbcad', '#1b91be'],
    colorGradient:['#42A9A0', '#42A9A0'],
    colorPrimary: '#34847D',
    colorPrimary2: '#2c6d67',
    colorPrimaryText: '#34847D',
    borderRadius: 4,
    borderRadiusCircle: 23,
    fontSize: 14,
    headerHeight: 40,
    boxShadow: {
        backgroundColor: '#ffffff',
        ...Platform.select({
            ios: {
                shadowColor: "#cfcfcf",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 10,
            }
        }),
    },
    headerTitleStyle:{
        // backgroundColor: "#fff",
        color: "#fff",
        fontSize: 16,
        fontFamily: fontMedium,
        fontWeight: Platform.OS === 'ios' ? '600' : '500',
    }
};