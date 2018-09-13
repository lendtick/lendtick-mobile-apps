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
    logoProfile:{
        width: 120,
        height: 120,
        marginBottom:-15,
        left: '50%',
        marginLeft: -60
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

    // ======================= //
    // Author
    // ======================= //
    userImage:{
        width: 100,    
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#efefef'
    },
    userDesc:{
        paddingLeft: 15
    },
    name:{
        fontSize: 18,
        color: Variable.colorTitle,
        marginTop: 15,
        fontWeight: '700',
        marginBottom: 15
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
        paddingLeft: 50,
        color: Variable.colorContent,
        fontSize: 14
    },
    menuIcon:{
        color: '#cfcfcf',
        position: 'absolute',
        left: 20,
        top: 18
    }
});