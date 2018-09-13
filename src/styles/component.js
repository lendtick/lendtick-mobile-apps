import { Variable } from './variable';
import Dimensions from 'Dimensions';

export default ComponentStyle = {
    // Container
    // ==================== //
    container:{
        paddingLeft: 15,
        paddingRight: 15
    },
    
    // Cart
    // ==================== //
    cartHeader: {
        marginRight: 15,
        flexDirection: 'row'
    },
    countCartHeader: {
        
        backgroundColor: Variable.colorPrimary,
        borderRadius: 11,
        width: 22,
        height: 22,
        marginRight: 5
    },
    countCartHeaderText: {
        color: '#ffffff',
        textAlign: 'center',
        width: 22,
        fontSize: 12,
        paddingTop: 3
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
        color: Variable.colorContent
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
        marginTop:30,
        marginBottom: 0,
        padding: 20,
        backgroundColor: '#ffffff',
        ...Variable.boxShadow
    }
};