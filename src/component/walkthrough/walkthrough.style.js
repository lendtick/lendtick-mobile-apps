import { StyleSheet } from 'react-native';
import { Variable } from '@styles';

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
        height: 8,
        marginBottom: 15
    },
    dotActive: {
        backgroundColor: Variable.colorPrimary,
        width: 20,
        height: 8,
        marginBottom: 15
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
        color: Variable.colorContent,
        fontFamily: Variable.fontRegular
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
        backgroundColor: Variable.colorPrimary,
        color: '#fff',
        textAlign: 'center',
        padding: 15,
        borderRadius: Variable.borderRadius,
        overflow: 'hidden',
        marginBottom: 15
    },
});