import { StyleSheet } from 'react-native';
import { Variable } from '../../styles/index';

export const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#ffffff'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot:{
        backgroundColor: '#dfdfdf',
        width: 8,
        height: 8
    },
    dotActive: {
        backgroundColor: Variable.colorPrimary,
        width: 20,
        height: 8
    },
    imgcontent: {
        width: 100,
        height: 100,
        marginBottom: 35,
    },
    text: {
		width: '100%',
		paddingLeft: 50,
		paddingRight: 50,
        textAlign: 'center',
        lineHeight: 20,
        fontSize: 14,
        color: Variable.colorContent
    },
    contentFixed: {
        position: 'absolute',
        bottom: 25,
        zIndex: 3,
    },
    login:{
        fontSize: 14,
        color: Variable.colorDefault,
        fontWeight: '700',
        letterSpacing: 1,
        width: 100,
        paddingTop: 50,
    },
});