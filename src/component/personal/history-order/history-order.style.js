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
        marginBottom: 15
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
        fontFamily: Variable.fontBold
    },
    descHistory:{
        color: Variable.colorTitle,
        fontWeight: '700',
        fontSize: 14,
        fontFamily: Variable.fontRegular
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
    }
});