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

    wrapSelect:{
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#efefef',
        backgroundColor: '#ffffff',
        ...Variable.boxShadow
    },
    itemLink:{
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 14,
        color: Variable.colorContent,
        fontWeight: '700'
    },
    itemLinkActive:{
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 14,
        color: Variable.colorPrimary,
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
        width: '100%',
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
        textAlign: 'center',
        color: Variable.colorTitle,
        fontSize: 14
    },
    titleGradientBox:{
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 14,
        color: '#ffffff',
        fontFamily: Variable.fontBold
    },
    descWhiteBox:{
        color: Variable.colorContent,
        fontSize: 14,
    },

    // Pulsa
    // ======================= //
    itemPulsa: {
        paddingLeft: 7.5,
        paddingRight: 7.5,
        paddingBottom: 15,
        width: '50%',
    },
    textPulsa:{
        borderWidth: 1,
        borderColor: '#efefef',
        padding: 20,
        width: '100%',
        color: Variable.colorTitle,
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 14,
        borderRadius: Variable.borderRadius,
        ...Variable.boxShadow
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