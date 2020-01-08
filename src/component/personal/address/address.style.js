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

    // Address
    // ===================== //
    itemAddress:{
        ...Variable.boxShadow,
        backgroundColor:'#ffffff',
        borderWidth: 1,
        borderColor: '#efefef',
        borderRadius: Variable.borderRadius,
        marginBottom: 15
    },
    headerAddress:{
        borderBottomWidth:1,
        borderColor:'#efefef',
        padding:20
    },
    bodyAddress:{
        padding: 20
    },
    titleAddress:{
        color: Variable.colorContent,
        fontSize: 14,
        marginBottom: 5,
        fontFamily: Variable.fontBold
    },
    descAddress:{
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
    positionAddAddress:{
        position: 'absolute',
        zIndex: 3,
        bottom: 15,
        right: 15,
    },
    addAddress:{
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: Variable.colorPrimary,
        borderWidth: 1,
        borderColor: '#ffffff'
    }
});