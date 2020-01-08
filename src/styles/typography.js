import { Variable } from './variable';

let headingStyle = {
    fontWeight: '700',
    letterSpacing: 0.364,
    color: Variable.colorTitle,
    marginBottom: 15,
    fontFamily: Variable.fontBold
}

export default TypographyStyle = {
    singleText: {
        fontSize: 14,
        fontWeight: '400',
        color: Variable.colorContent,
        fontFamily: Variable.fontRegular
    },
    singleTitle:{
        fontSize: 16,
        fontWeight: '700',
        color: Variable.colorTitle,
        marginBottom: 15,
        fontFamily: Variable.fontBold
    },
    heading1: {
        fontSize: 48,        
        lineHeight: 52,
        ...headingStyle
    },
    heading2: {
        fontSize: 36,
        lineHeight: 48,
        ...headingStyle
    },
    heading3: {
        fontSize: 30,
        lineHeight: 36,
        ...headingStyle
    },
    heading4: {
        fontSize: 24,
        lineHeight: 30,
        ...headingStyle
    },
    heading5: {
        fontSize: 18,
        lineHeight: 24,
        ...headingStyle
    },
    heading6: {
        fontSize: 14,
        lineHeight: 18,
        ...headingStyle
    },
    label:{
        fontSize: 14,
        color: Variable.colorTitle,
        fontWeight: '700',
        fontFamily: Variable.fontMedium
    },
    defaultLink: {
        color: Variable.colorDefault,
        letterSpacing: 1,
        fontWeight: '400',
        fontSize: 12,
        fontFamily: Variable.fontRegular
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        fontFamily: Variable.fontRegular
    }
};