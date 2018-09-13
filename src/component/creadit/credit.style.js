import { StyleSheet } from 'react-native';
import { Variable } from '../../styles/index';
import Dimensions from 'Dimensions';

export const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: '#ffffff',
        position: 'relative',
        zIndex: 1,
        height: '100%'
    },
    line:{
        marginBottom:-12
    },

    // ==================== //
    // Conuter
    // ==================== //
    wrapCounter:{
        ...Variable.boxShadow,
        backgroundColor: Variable.colorPrimary2,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Variable.colorPrimary,
        paddingTop: 70,
        paddingBottom: 70,
    },
    textCounter:{
        fontSize: 32,
        fontWeight: '700',
        color: Variable.colorPrimaryText,
        textAlign: 'center'
    },
    subCounter:{
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#efefef'
    },
    subTextCounter: {
        textAlign: 'center',
        color: Variable.colorContent
    },

    // ==================== //
    // Menu
    // ==================== //
    wrapMenu:{
        ...Variable.boxShadow,
        borderRadius: Variable.borderRadius,
        borderWidth: 1,
        borderColor: '#efefef',
        marginTop:30,
        marginBottom: 0,
        backgroundColor: '#ffffff',
    },
    linkIcon: {
        position: 'absolute',
        right: 20,
        top: 18
    },
    linkText:{
        padding: 20,
        color: Variable.colorContent,
        fontSize: 14
    },

    // ==================== //
    // Credit HIstory
    // ==================== //
    filterCreditHistory:{
        height: 50,
    },
    filterName:{
        padding:15,
        color: Variable.colorContent
    },
    filterIcon:{
        position: 'absolute',
        right: 15,
        top:15,
        zIndex: 3
    },
    itemCredit:{
        borderWidth: 1,
        borderRadius: Variable.borderRadius,
        borderColor: '#dfdfdf',
        padding: 20,
        marginBottom: 15,
        ...Variable.boxShadow
    },
    itemDate:{
        color: Variable.colorContent,
        textAlign: 'right'
    },
    creditName:{
        color: Variable.colorContent,
        fontSize: 14,
        marginBottom: 5
    },
    creditPrice:{
        color: Variable.colorTitle,
        fontSize: 16,
        fontWeight: '700'
    }
});