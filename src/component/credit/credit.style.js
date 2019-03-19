import { StyleSheet,Dimensions } from 'react-native';
import { Variable } from '@styles';

export const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: '#f8f8ff',
        minHeight: '100%'
    },
    itemLoan: {
        borderWidth: 1,
        borderColor: '#dfdfdf',
        backgroundColor: '#ffffff',
        borderRadius: Variable.borderRadius,
        padding: 15,
        borderStyle: 'dashed',
        ...Variable.boxShadow
    },
    textMenuLoan:{
        fontSize: 14,
        color: Variable.colorContent,
        fontFamily: Variable.fontMedium,
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
    }
});