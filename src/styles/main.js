import { Variable } from './variable';
// import Dimensions from 'Dimensions';
import {Dimensions} from 'react-native';

export default MainStyle = {
    // Container
    // ==================== //
    container:{
        paddingLeft: 15,
        paddingRight: 15
    },

    // Modal
    // ==================== //
    modalWrap: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#000',
        opacity: 0.5
    },
    modalContent: {
        backgroundColor: '#fff',
        width: Dimensions.get('window').width - 30,
        borderRadius: 4,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)'
    },
    modalHeader: {
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    modalTitle: {
        color: Variable.colorTitle,
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center',
        padding: 15,
        fontFamily: Variable.fontMedium,
    },
    modalFooter:{
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#eee'
    },
    btnModal: {
        width: '50%',
    },
    btnTextModal: {
        textAlign: 'center',
        padding: 15,
        fontSize: 14,
        color: Variable.colorContent,
        fontFamily: Variable.fontRegular,
    },
    btnModalPrimary: {
        color: '#fff',
        backgroundColor: Variable.colorPrimary
    },

    // ======================== //
    // Info
    // ========================= //
    wrapInfo:{
        borderRadius: Variable.borderRadius,
        borderWidth: 1,
        borderColor: '#efefef',
        marginBottom: 0,
        padding: 20,
        backgroundColor: '#ffffff',
        ...Variable.boxShadow
    }
};