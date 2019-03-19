import { StyleSheet,Dimensions } from 'react-native';
import { Variable } from '@styles';

export const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: '#f8f8ff',
        position: 'relative',
        zIndex: 1,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 30
    },
    itemLoan: {
        width: (Dimensions.get('window').width / 2) - 30,
        borderWidth: 1,
        borderColor: '#dfdfdf',
        backgroundColor: '#ffffff',
        padding: 15,
        ...Variable.boxShadow
    },
    textMenuLoan:{
        fontSize: 14,
        color: Variable.colorContent,
        fontFamily: Variable.fontRegular,
        textAlign: 'center',
        lineHeight: 18
    },

    // Item Credit Pinjaman
    itemPinjaman: {
        backgroundColor: '#fff',
        borderRadius: Variable.borderRadius,
        borderWidth: 1,
        borderColor: '#efefef',
        marginBottom: 15,
        overflow:'hidden',
        ...Variable.boxShadow
    },

    // Circle Item Detail Pinjaman
    circleDetail:{
        width:50,
        height:50,
        borderWidth:2,
        borderColor: '#dfdfdf',
        borderRadius:25,
        textAlign:'center',
        backgroundColor: '#fff',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
        opacity: 0.5,
        ...Variable.boxShadow
    },
    circleDetailText: {
        textAlign: 'center',
        top: 13,
        fontFamily: Variable.fontBold,
        color: Variable.colorTitle
    },
    wrapDetailDescPinjaman: {
        padding: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#dfdfdf'
    }
});