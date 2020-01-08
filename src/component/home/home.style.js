import { StyleSheet } from 'react-native';
import { Variable } from '../../styles/variable';

export const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: '#FFFFFF',
        position: 'relative',
        zIndex: 1,
        height: '100%'
    },
    
    // Slider
    // ========================= //
    wrapSlider:{
        paddingTop: 0,
        position: 'relative',
    },

    wrapSliderMin:{
        paddingBottom: 10,
        position: 'relative'
    },

    // Service
    // ========================= //
    wrapService:{
        position: 'relative',
        paddingLeft: 7.5,
        paddingRight: 7.5,
        paddingTop: 30,
        paddingBottom: 30,
    },
    itemProduct:{
        paddingLeft: 7.5,
        paddingRight: 7.5,
        marginBottom: 15,
        alignItems: 'center',
    },

    // Addsense
    // ========================= //
    wrapAdds: {
        backgroundColor: "#fff",
        marginTop: -15,
        paddingTop:30,
        paddingBottom:30,
        marginBottom: 30,
    },

    itemTitle:{
        paddingLeft: 20,
        paddingRight: 7.5,
        marginBottom: 15,
        alignItems: 'center',
        color: Variable.colorTitle,
        backgroundColor:'#F0F0F0'
    },
    labelItem:{
        fontSize: 14,
        color: '#25282B',
        fontWeight: '400',
        fontFamily: Variable.fontRegular
    },

});