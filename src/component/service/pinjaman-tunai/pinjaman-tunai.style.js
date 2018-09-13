import { StyleSheet } from 'react-native';
import { Variable } from '../../../styles/index';
import Dimensions from 'Dimensions';

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

    // Jenis Pinjaman
    // ======================= //
    itemPinjaman: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#efefef',
        borderRadius: Variable.borderRadius,
        marginBottom: 15,
        ...Variable.boxShadow
    },
    textPinjaman:{
        width: '100%',
        color: Variable.colorTitle,
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 14,
    },
    imgItem:{
        width: 50,
        height: 50,
        left: '50%',
        marginLeft: -25,
        marginBottom: 10
    },

    // Counter
    // ======================= //
    wrapCounter: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: Variable.colorPrimary2,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginBottom: 15,
        borderColor: Variable.colorPrimary
    },
    textCounter:{
        textAlign: 'center',
        fontSize: 18,
        color: Variable.colorPrimaryText,
        fontWeight: '700'
    }
});