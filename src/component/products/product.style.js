import { StyleSheet } from 'react-native';
import { Variable } from '@styles';

export const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: '#f8f8ff',
        position: 'relative',
        zIndex: 1,
        height: '100%'
    },
    line:{
        marginBottom: -12
    },
    borderLine:{
        borderBottomWidth: 1,
        borderColor: '#dfdfdf',
        paddingBottom: 15,
        marginBottom:15
    },
    
    // Slider
    // ========================= //
    wrapSlider:{},

    // Products
    // ========================= //
    wrapProducts:{
        marginTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
    },
    WrapDescProduct:{
        padding: 15,
    },
    descProduct:{
        borderWidth: 1,
        borderColor: '#efefef',
        backgroundColor: '#fff',
        borderRadius: Variable.borderRadius,
        ...Variable.boxShadow
    },
    titleDesc:{
        color: Variable.colorTitle,
        fontWeight: '700',
        marginTop: 5,
        marginBottom: 3,
        marginBottom: 15,
    },

    // Attributes
    // ======================= //
    itemAttribute: {
        paddingLeft: 7.5,
        paddingRight: 7.5,
        paddingBottom: 15,
    },
    textattributeActive:{
        borderWidth: 1,
        borderColor: Variable.colorPrimary,
        padding: 20,
        width: '100%',
        color: Variable.colorPrimaryText,
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 14,
        borderRadius: Variable.borderRadius,
        ...Variable.boxShadow,
        backgroundColor: Variable.colorPrimary2
    },
    textAttribute:{
        borderWidth: 1,
        borderColor: '#efefef',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 15,
        paddingLeft: 15,
        width: '100%',
        color: Variable.colorTitle,
        fontWeight: '700',
        textAlign: 'center',
        fontFamily: Variable.fontRegular,
        fontSize: 14,
        borderRadius: Variable.borderRadius,
        overflow: 'hidden',
        ...Variable.boxShadow
    },

    // Tab Detail Product
    // ========================= //
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
        color: Variable.colorTitle,
        textTransform: 'uppercase',
        fontFamily: Variable.fontBold
    },
    itemLinkActive:{
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 14,
        color: Variable.colorPrimary,
        textTransform: 'uppercase',
        fontFamily: Variable.fontBold
    },

    // Info Product
    // ========================= //
    imgThumb:{
        width: 100,
        height: 100,
        backgroundColor: '#ffffff'
    },

    // Spinner
    // ========================= //
    wrapSpinner:{
        marginTop:15,
        width:120
    },
    spinnerBtn:{
        width: 30,
        height:30,
        borderWidth:1,
        borderColor: '#dfdfdf',
        borderRadius:15,
        ...Variable.boxShadow,
        backgroundColor: '#ffffff'
    }
});