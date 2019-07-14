import { StyleSheet } from 'react-native';
import { Variable } from '@styles';

export const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: Variable.backgroundGray,
        position: 'relative',
        zIndex: 1,
        height: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },

    // History
    // ===================== //
    itemHistory:{
        ...Variable.boxShadow,
        backgroundColor:'#ffffff',
        borderWidth: 1,
        borderColor: '#efefef',
        borderRadius: Variable.borderRadius,
        marginBottom: 15,
        shadowColor: '#D3D3D3',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
    },
    headerHistory:{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    bodyHistory:{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    titleHistory:{
        color: Variable.colorContent,
        fontSize: 14,
        marginBottom: 5,
        fontFamily: Variable.fontExtraLight
    },
    invoiceHistory:{
        color: Variable.colorPrimary,
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 5,
        fontFamily: Variable.fontLight
    },
    descHistory:{
        color: Variable.colorTitle,
        fontWeight: '700',
        fontSize: 14,
        fontFamily: Variable.fontLight
    },
    priceHistory:{
        color: '#FF6F00',
        fontWeight: '700',
        fontSize: 20,
        fontFamily: Variable.fontLight
    },
    linkDefault:{
        textAlign:'center',
        padding: 15,
        color: Variable.colorPrimaryText,
        fontWeight:'700',
        fontFamily: Variable.fontBold
    },
    linkPrimary:{
        textAlign:'center',
        padding: 15,
        color: '#ffffff',
        backgroundColor: Variable.colorPrimary,
        fontWeight:'700',
        fontFamily: Variable.fontBold
    },
    positionAddHistory:{
        position: 'absolute',
        zIndex: 3,
        bottom: 15,
        right: 15,
    },
    addHistory:{
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: Variable.colorPrimary,
        borderWidth: 1,
        borderColor: '#ffffff'
    },
    statusHistorySuccess:{
        backgroundColor:'#D5F5E3',
        fontFamily: Variable.fontRegular,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    statusHistoryWarning:{
        backgroundColor:'#FCF3CF',
        fontFamily: Variable.fontRegular,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    singleStatusSuccess:{
        color: '#0B5345',
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 5,
        fontFamily: Variable.fontMedium
    },
    singleStatusWarning:{
        color: '#78281F',
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 5,
        fontFamily: Variable.fontMedium
    },
});