import { StyleSheet } from 'react-native';
import { Variable } from '@styles';

export const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: '#ffffff',
        position: 'relative',
        zIndex: 1,
        height: '100%'
    },

    line:{
        marginBottom: -12
    },

    // Package
    // ========================= //
    listPackage: {
        marginTop: 30
    },
    imgPackage: {
        width: 70,
        height: 70,
        left: '50%',
        marginLeft: -35
    },
    textPackage: {
        textAlign: 'center',
        color: Variable.colorContent,
        lineHeight: 18,
        paddingLeft: 10,
        paddingRight: 10,
    },

    // Addsense
    // ========================= //
    wrapAdds: {
        marginTop: 30
    },

    // Phone Number
    // ===================== //
    wrapPhoneNumber:{
        position: 'relative',
        borderWidth: 1,
        borderColor: '#efefef',
        backgroundColor: '#ffffff',
        paddingLeft: 15,
        paddingRight: 45,
        height: 45,
        borderRadius: Variable.borderRadius,
        ...Variable.boxShadow
    },
    iconPhoneNumber: {
        position: 'absolute',
        top: 3,
        right: 15
    },
    inputSinglePhoneNumber:{
        height: 45
    },
    imgProvider:{
        width: 35,
        height: 35,
        borderLeftWidth: 1,
        paddingLeft:15,
        borderColor: '#efefef'
    },

    centerTextPhone:{
        textAlign:'center',
        marginTop:20,
        marginBottom:20,
        fontStyle:'italic',
        fontSize:12,
        color: '#999999'
    },

    wrapSelectPhoneLink:{
        height: 50,
        borderWidth: 1,
        borderColor: '#efefef',
        backgroundColor: '#ffffff',
        ...Variable.boxShadow
    },
    phoneLink:{
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 14,
        color: Variable.colorPrimaryText,
        fontWeight: '700'
    },

    // White Box
    // ===================== //
    whiteBox:{
        borderWidth: 1,
        borderColor: '#efefef',
        borderRadius: 2,
        backgroundColor: '#ffffff',
        padding: 20,
        marginBottom: 5,
        ...Variable.boxShadow
    },
    whiteBoxActive:{
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: Variable.colorPrimary,
        borderRadius: 2,
        backgroundColor: '#ffffff',
        padding: 20,
        marginBottom: 5,
        ...Variable.boxShadow
    },
    titleWhiteBox:{
        fontWeight: '700',
        color: Variable.colorTitle,
        fontSize: 14
    },
    titleGradientBox:{
        fontWeight: '700',
        textAlign: 'left',
        fontSize: 14,
        color: '#ffffff',
        fontFamily: Variable.fontBold
    },
    descWhiteBox:{
        color: Variable.colorContent,
        fontSize: 14,
    },

    // Contact Number
    // ===================== //
    listContact:{
        padding: 0,
        borderBottomWidth: 1,
        borderColor: '#efefef'
    },
    listContactText:{
        fontFamily: Variable.fontRegular,
        fontSize: 14,
        color: Variable.colorContent,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth:1,
        borderColor:'#dfdfdf'
    },
    
    // Gradient
    // ===================== //
    gradientBox: {
        padding:20,
        paddingTop:18,
        marginBottom:5,
        borderWidth: 1,
        borderColor: '#efefef',
        borderRadius: 2,
        backgroundColor: '#ffffff',
        ...Variable.boxShadow
    }
});